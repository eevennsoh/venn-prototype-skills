"use client";

import { useRef, useState, useCallback, useEffect, useMemo, useLayoutEffect } from "react";
import type { Skill } from "@/lib/skills";
import {
	type EditorNode,
	type EditorPosition,
	type EditorSelection,
	normalizeNodes,
	nodesToText,
	nodesToSkills,
	isNodesEmpty,
	getNodeLength,
	findNearestTextPosition,
	domSelectionToEditorSelection,
	setDomSelectionFromPosition,
	setDomSelectionFromRange,
	insertSkillAtPosition,
	removeSkillById,
	deleteSelection,
	getCurrentWord,
	getSelectedSkillIds,
	isSelectionCollapsed,
	getSelectionBounds,
	generateTextNodeId,
	positionToAbsolute,
	absoluteToPosition,
	getTotalLength,
} from "@/lib/editor-utils";

// ============================================================================
// Types
// ============================================================================

export interface UseInlineEditorProps {
	/** Initial nodes */
	initialNodes?: EditorNode[];
	/** Callback when text content changes */
	onTextChange?: (text: string) => void;
	/** Callback when skills change */
	onSkillsChange?: (skills: Skill[]) => void;
	/** Callback when content state changes (empty/not empty) */
	onContentStateChange?: (hasContent: boolean) => void;
	/** Whether the editor is disabled */
	isDisabled?: boolean;
	/** Callback for up/down arrow keys (for external suggestion navigation) */
	onArrowUpDown?: (direction: "up" | "down") => void;
	/** Callback when the current word changes (for suggestions) */
	onCurrentWordChange?: (word: string) => void;
	/** Callback on submit (Enter key) */
	onSubmit?: () => void;
}

export interface UseInlineEditorReturn {
	// Refs
	containerRef: React.RefObject<HTMLDivElement>;

	// State
	nodes: EditorNode[];
	focusedSkillId: string | null;
	selectedSkillIds: string[];
	cursorPosition: EditorPosition;

	// Handlers to attach to container
	handleInput: (e: React.FormEvent<HTMLDivElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	handleSelect: () => void;
	handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;

	// Actions
	insertSkill: (skill: Skill) => void;
	removeSkill: (skillId: string) => void;
	clear: () => void;
	focus: () => void;

	// Derived state
	getText: () => string;
	getSkills: () => Skill[];
	isEmpty: () => boolean;
	getCurrentWord: () => string;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useInlineEditor({
	initialNodes,
	onTextChange,
	onSkillsChange,
	onContentStateChange,
	isDisabled = false,
	onArrowUpDown,
	onCurrentWordChange,
	onSubmit,
}: UseInlineEditorProps = {}): UseInlineEditorReturn {
	// Refs
	const containerRef = useRef<HTMLDivElement>(null);
	const isComposingRef = useRef(false);
	const pendingCursorRef = useRef<EditorPosition | null>(null);

	// State - single source of truth
	const [nodes, setNodes] = useState<EditorNode[]>(() => normalizeNodes(initialNodes || [{ type: "text", content: "", id: generateTextNodeId() }]));
	const [cursorPosition, setCursorPosition] = useState<EditorPosition>({ nodeIndex: 0, offset: 0 });
	const [selection, setSelection] = useState<EditorSelection | null>(null);
	const [focusedSkillId, setFocusedSkillId] = useState<string | null>(null);

	// Derived state
	const selectedSkillIds = useMemo(() => {
		if (!selection || isSelectionCollapsed(selection)) return [];
		return getSelectedSkillIds(nodes, selection);
	}, [nodes, selection]);

	const currentWord = useMemo(() => {
		return getCurrentWord(nodes, cursorPosition);
	}, [nodes, cursorPosition]);

	// Use ref to avoid infinite loop with callback in effect dependencies
	const onCurrentWordChangeRef = useRef(onCurrentWordChange);
	onCurrentWordChangeRef.current = onCurrentWordChange;

	// Notify parent of current word changes
	useEffect(() => {
		onCurrentWordChangeRef.current?.(currentWord);
	}, [currentWord]);

	// Use refs for callbacks to avoid infinite loops
	const onTextChangeRef = useRef(onTextChange);
	const onSkillsChangeRef = useRef(onSkillsChange);
	const onContentStateChangeRef = useRef(onContentStateChange);
	onTextChangeRef.current = onTextChange;
	onSkillsChangeRef.current = onSkillsChange;
	onContentStateChangeRef.current = onContentStateChange;

	// Notify parent of content changes
	useEffect(() => {
		const text = nodesToText(nodes);
		const skills = nodesToSkills(nodes);
		const hasContent = text.trim().length > 0 || skills.length > 0;

		onTextChangeRef.current?.(text);
		onSkillsChangeRef.current?.(skills);
		onContentStateChangeRef.current?.(hasContent);
	}, [nodes]);

	// ============================================================================
	// Cursor Sync - Restore cursor after React renders
	// ============================================================================

	useLayoutEffect(() => {
		if (pendingCursorRef.current && containerRef.current) {
			const pos = pendingCursorRef.current;
			pendingCursorRef.current = null;

			// Use requestAnimationFrame to ensure DOM is fully painted
			requestAnimationFrame(() => {
				if (containerRef.current) {
					setDomSelectionFromPosition(containerRef.current, pos);
				}
			});
		}
	}, [nodes]);

	// ============================================================================
	// Text Manipulation Helpers
	// ============================================================================

	/**
	 * Insert text at the current cursor position
	 */
	const insertTextAtCursor = useCallback(
		(text: string) => {
			const node = nodes[cursorPosition.nodeIndex];
			if (!node || node.type !== "text") {
				// If we're not on a text node, insert after current position
				const newNodes = [...nodes];
				newNodes.splice(cursorPosition.nodeIndex + 1, 0, {
					type: "text",
					content: text,
					id: generateTextNodeId(),
				});
				const normalized = normalizeNodes(newNodes);
				setNodes(normalized);

				// Find new cursor position
				const newPos = absoluteToPosition(normalized, positionToAbsolute(nodes, cursorPosition) + text.length);
				setCursorPosition(newPos);
				pendingCursorRef.current = newPos;
				return;
			}

			// Insert into existing text node
			const before = node.content.slice(0, cursorPosition.offset);
			const after = node.content.slice(cursorPosition.offset);
			const newContent = before + text + after;

			const newNodes = nodes.map((n, i) => (i === cursorPosition.nodeIndex ? { ...n, content: newContent } : n));

			const normalized = normalizeNodes(newNodes);
			setNodes(normalized);

			// Calculate new cursor position
			const newOffset = cursorPosition.offset + text.length;
			const newPos: EditorPosition = { nodeIndex: cursorPosition.nodeIndex, offset: newOffset };
			setCursorPosition(newPos);
			pendingCursorRef.current = newPos;
		},
		[nodes, cursorPosition]
	);

	/**
	 * Delete text backwards (backspace behavior)
	 */
	const deleteBackward = useCallback(() => {
		// If there's a selection, delete it
		if (selection && !isSelectionCollapsed(selection)) {
			deleteSelectedContent();
			return;
		}

		const node = nodes[cursorPosition.nodeIndex];

		// At start of text node - check if previous node is a skill
		if (node?.type === "text" && cursorPosition.offset === 0) {
			if (cursorPosition.nodeIndex > 0) {
				const prevNode = nodes[cursorPosition.nodeIndex - 1];
				if (prevNode?.type === "skill") {
					// Delete the skill
					removeSkillInternal(prevNode.skill.id);
					return;
				}
				// Merge with previous text node
				if (prevNode?.type === "text") {
					const newNodes = [...nodes];
					const mergedContent = prevNode.content + node.content;
					newNodes[cursorPosition.nodeIndex - 1] = {
						...prevNode,
						content: mergedContent,
					};
					newNodes.splice(cursorPosition.nodeIndex, 1);

					const normalized = normalizeNodes(newNodes);
					setNodes(normalized);

					const newPos: EditorPosition = {
						nodeIndex: cursorPosition.nodeIndex - 1,
						offset: prevNode.content.length,
					};
					setCursorPosition(newPos);
					pendingCursorRef.current = newPos;
					return;
				}
			}
			return; // At the very beginning
		}

		// Delete one character backward
		if (node?.type === "text" && cursorPosition.offset > 0) {
			const before = node.content.slice(0, cursorPosition.offset - 1);
			const after = node.content.slice(cursorPosition.offset);
			const newContent = before + after;

			const newNodes = nodes.map((n, i) => (i === cursorPosition.nodeIndex ? { ...n, content: newContent } : n));

			const normalized = normalizeNodes(newNodes);
			setNodes(normalized);

			const newPos: EditorPosition = {
				nodeIndex: cursorPosition.nodeIndex,
				offset: cursorPosition.offset - 1,
			};
			setCursorPosition(newPos);
			pendingCursorRef.current = newPos;
		}
	}, [nodes, cursorPosition, selection]);

	/**
	 * Delete text forward (delete key behavior)
	 */
	const deleteForward = useCallback(() => {
		// If there's a selection, delete it
		if (selection && !isSelectionCollapsed(selection)) {
			deleteSelectedContent();
			return;
		}

		const node = nodes[cursorPosition.nodeIndex];

		// At end of text node - check if next node is a skill
		if (node?.type === "text" && cursorPosition.offset >= node.content.length) {
			if (cursorPosition.nodeIndex < nodes.length - 1) {
				const nextNode = nodes[cursorPosition.nodeIndex + 1];
				if (nextNode?.type === "skill") {
					// Delete the skill
					removeSkillInternal(nextNode.skill.id);
					return;
				}
				// Merge with next text node
				if (nextNode?.type === "text") {
					const newNodes = [...nodes];
					const mergedContent = node.content + nextNode.content;
					newNodes[cursorPosition.nodeIndex] = {
						...node,
						content: mergedContent,
					};
					newNodes.splice(cursorPosition.nodeIndex + 1, 1);

					const normalized = normalizeNodes(newNodes);
					setNodes(normalized);
					pendingCursorRef.current = cursorPosition;
					return;
				}
			}
			return; // At the very end
		}

		// Delete one character forward
		if (node?.type === "text" && cursorPosition.offset < node.content.length) {
			const before = node.content.slice(0, cursorPosition.offset);
			const after = node.content.slice(cursorPosition.offset + 1);
			const newContent = before + after;

			const newNodes = nodes.map((n, i) => (i === cursorPosition.nodeIndex ? { ...n, content: newContent } : n));

			const normalized = normalizeNodes(newNodes);
			setNodes(normalized);
			pendingCursorRef.current = cursorPosition;
		}
	}, [nodes, cursorPosition, selection]);

	/**
	 * Replace selected content with text
	 */
	const replaceSelection = useCallback(
		(text: string) => {
			if (!selection) {
				insertTextAtCursor(text);
				return;
			}

			const { nodes: newNodes, newPosition } = deleteSelection(nodes, selection);

			// Now insert text at new position
			const node = newNodes[newPosition.nodeIndex];
			if (node?.type === "text") {
				const before = node.content.slice(0, newPosition.offset);
				const after = node.content.slice(newPosition.offset);
				const updatedNodes = newNodes.map((n, i) => (i === newPosition.nodeIndex ? { ...n, content: before + text + after } : n));

				const normalized = normalizeNodes(updatedNodes);
				setNodes(normalized);

				const newPos: EditorPosition = {
					nodeIndex: newPosition.nodeIndex,
					offset: newPosition.offset + text.length,
				};
				setCursorPosition(newPos);
				setSelection(null);
				pendingCursorRef.current = newPos;
			} else {
				// Insert as new text node
				const updatedNodes = [...newNodes];
				updatedNodes.splice(newPosition.nodeIndex + 1, 0, {
					type: "text",
					content: text,
					id: generateTextNodeId(),
				});

				const normalized = normalizeNodes(updatedNodes);
				setNodes(normalized);

				const newPos = absoluteToPosition(normalized, positionToAbsolute(newNodes, newPosition) + text.length);
				setCursorPosition(newPos);
				setSelection(null);
				pendingCursorRef.current = newPos;
			}
		},
		[nodes, selection, insertTextAtCursor]
	);

	// ============================================================================
	// BeforeInput Handler - Intercept all input before browser modifies DOM
	// ============================================================================

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleBeforeInput = (e: InputEvent) => {
			if (isDisabled) {
				e.preventDefault();
				return;
			}

			// Skip during IME composition
			if (isComposingRef.current) {
				return;
			}

			const inputType = e.inputType;

			// Handle different input types
			switch (inputType) {
				case "insertText":
				case "insertReplacementText": {
					e.preventDefault();
					const text = e.data || "";
					if (selection && !isSelectionCollapsed(selection)) {
						replaceSelection(text);
					} else {
						insertTextAtCursor(text);
					}
					break;
				}

				case "insertParagraph":
				case "insertLineBreak": {
					e.preventDefault();
					// Don't insert newlines - this is a single-line editor
					// Could optionally call onSubmit here
					break;
				}

				case "deleteContentBackward":
				case "deleteSoftLineBackward":
				case "deleteWordBackward": {
					e.preventDefault();
					deleteBackward();
					break;
				}

				case "deleteContentForward":
				case "deleteSoftLineForward":
				case "deleteWordForward": {
					e.preventDefault();
					deleteForward();
					break;
				}

				case "deleteByCut":
				case "deleteByDrag": {
					e.preventDefault();
					if (selection && !isSelectionCollapsed(selection)) {
						deleteSelectedContent();
					}
					break;
				}

				case "insertFromPaste":
				case "insertFromDrop": {
					// Let paste handler deal with this
					break;
				}

				case "historyUndo":
				case "historyRedo": {
					// Prevent browser undo/redo - we'd need our own undo stack
					e.preventDefault();
					break;
				}

				default:
					// For other input types, prevent and log for debugging
					if (inputType.startsWith("insert") || inputType.startsWith("delete")) {
						e.preventDefault();
					}
			}
		};

		container.addEventListener("beforeinput", handleBeforeInput);

		return () => {
			container.removeEventListener("beforeinput", handleBeforeInput);
		};
	}, [isDisabled, selection, insertTextAtCursor, deleteBackward, deleteForward, replaceSelection]);

	// ============================================================================
	// Input Handler - Fallback for browsers without beforeinput support
	// ============================================================================

	const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
		// With beforeinput handling, this should rarely fire
		// But keep it as a safety net for IME composition
		if (isComposingRef.current) {
			return;
		}

		// If beforeinput didn't handle it, try to sync from DOM
		// This is a fallback path
	}, []);

	// ============================================================================
	// Composition Handlers (for IME input)
	// ============================================================================

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleCompositionStart = () => {
			isComposingRef.current = true;
		};

		const handleCompositionEnd = (e: CompositionEvent) => {
			isComposingRef.current = false;

			// Insert the composed text
			const text = e.data || "";
			if (text) {
				if (selection && !isSelectionCollapsed(selection)) {
					replaceSelection(text);
				} else {
					insertTextAtCursor(text);
				}
			}
		};

		container.addEventListener("compositionstart", handleCompositionStart);
		container.addEventListener("compositionend", handleCompositionEnd);

		return () => {
			container.removeEventListener("compositionstart", handleCompositionStart);
			container.removeEventListener("compositionend", handleCompositionEnd);
		};
	}, [selection, insertTextAtCursor, replaceSelection]);

	// ============================================================================
	// Selection Handling
	// ============================================================================

	const handleSelect = useCallback(() => {
		if (!containerRef.current) return;

		const sel = window.getSelection();
		const editorSel = domSelectionToEditorSelection(containerRef.current, sel);

		if (editorSel) {
			setSelection(editorSel);
			setCursorPosition(editorSel.focus);

			// Update focused skill if cursor is on a skill
			const focusNode = nodes[editorSel.focus.nodeIndex];
			if (focusNode?.type === "skill" && isSelectionCollapsed(editorSel)) {
				setFocusedSkillId(focusNode.skill.id);
			} else if (isSelectionCollapsed(editorSel)) {
				setFocusedSkillId(null);
			}
		}
	}, [nodes]);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			handleSelect();
		},
		[handleSelect]
	);

	// Track selection changes via document selectionchange event
	useEffect(() => {
		const handleSelectionChange = () => {
			if (!containerRef.current) return;

			const sel = window.getSelection();
			if (!sel || sel.rangeCount === 0) return;

			// Only process if selection is within our container
			const range = sel.getRangeAt(0);
			if (!containerRef.current.contains(range.commonAncestorContainer)) return;

			const editorSel = domSelectionToEditorSelection(containerRef.current, sel);
			if (editorSel) {
				setSelection(editorSel);
				setCursorPosition(editorSel.focus);

				// Update focused skill state
				if (isSelectionCollapsed(editorSel)) {
					const focusNode = nodes[editorSel.focus.nodeIndex];
					if (focusNode?.type === "skill") {
						setFocusedSkillId(focusNode.skill.id);
					} else {
						setFocusedSkillId(null);
					}
				}
			}
		};

		document.addEventListener("selectionchange", handleSelectionChange);
		return () => {
			document.removeEventListener("selectionchange", handleSelectionChange);
		};
	}, [nodes]);

	// ============================================================================
	// Keyboard Navigation
	// ============================================================================

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (isDisabled) return;

			// Cmd+A: Select all
			if ((e.metaKey || e.ctrlKey) && e.key === "a") {
				e.preventDefault();
				selectAll();
				return;
			}

			// Enter: Submit
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				onSubmit?.();
				return;
			}

			// Delete when focused on a skill
			if ((e.key === "Backspace" || e.key === "Delete") && focusedSkillId) {
				e.preventDefault();
				removeSkillInternal(focusedSkillId);
				return;
			}

			// Left/Right arrow navigation
			if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
				handleHorizontalNavigation(e);
				return;
			}

			// Up/Down arrow navigation
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				handleVerticalNavigation(e);
				return;
			}
		},
		[isDisabled, focusedSkillId, onSubmit]
	);

	const handleHorizontalNavigation = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const direction = e.key === "ArrowLeft" ? "left" : "right";
			const currentNode = nodes[cursorPosition.nodeIndex];

			if (!currentNode) return;

			// If we're on a focused skill, move to adjacent text
			if (focusedSkillId) {
				e.preventDefault();
				const targetIndex = direction === "left" ? cursorPosition.nodeIndex - 1 : cursorPosition.nodeIndex + 1;

				if (targetIndex >= 0 && targetIndex < nodes.length) {
					const targetNode = nodes[targetIndex];
					if (targetNode.type === "text") {
						const newPos: EditorPosition = {
							nodeIndex: targetIndex,
							offset: direction === "left" ? targetNode.content.length : 0,
						};
						setCursorPosition(newPos);
						pendingCursorRef.current = newPos;
						setFocusedSkillId(null);
					} else if (targetNode.type === "skill") {
						setFocusedSkillId(targetNode.skill.id);
						setCursorPosition({ nodeIndex: targetIndex, offset: 0 });
					}
				} else {
					setFocusedSkillId(null);
				}
				return;
			}

			// Text node navigation
			if (currentNode.type === "text") {
				const atStart = cursorPosition.offset === 0;
				const atEnd = cursorPosition.offset >= currentNode.content.length;

				if (direction === "left" && atStart && cursorPosition.nodeIndex > 0) {
					const prevNode = nodes[cursorPosition.nodeIndex - 1];
					if (prevNode?.type === "skill") {
						e.preventDefault();
						setFocusedSkillId(prevNode.skill.id);
						setCursorPosition({ nodeIndex: cursorPosition.nodeIndex - 1, offset: 0 });
						return;
					}
				}

				if (direction === "right" && atEnd && cursorPosition.nodeIndex < nodes.length - 1) {
					const nextNode = nodes[cursorPosition.nodeIndex + 1];
					if (nextNode?.type === "skill") {
						e.preventDefault();
						setFocusedSkillId(nextNode.skill.id);
						setCursorPosition({ nodeIndex: cursorPosition.nodeIndex + 1, offset: 0 });
						return;
					}
				}
			}

			// Let browser handle normal text navigation
		},
		[nodes, cursorPosition, focusedSkillId]
	);

	const handleVerticalNavigation = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const direction = e.key === "ArrowUp" ? "up" : "down";

			// If suggestions handler provided, delegate to parent for suggestion navigation
			if (onArrowUpDown) {
				e.preventDefault();
				onArrowUpDown(direction);
				return;
			}

			// Clear focused skill when navigating
			if (focusedSkillId) {
				setFocusedSkillId(null);
			}

			// Let browser handle the vertical movement
			requestAnimationFrame(() => {
				if (!containerRef.current) return;

				const sel = window.getSelection();
				if (!sel || sel.rangeCount === 0) return;

				const editorSel = domSelectionToEditorSelection(containerRef.current, sel);
				if (!editorSel) return;

				const focusNode = nodes[editorSel.focus.nodeIndex];

				// If we landed on a skill, adjust to nearest text position
				if (focusNode?.type === "skill") {
					const adjusted = findNearestTextPosition(nodes, editorSel.focus, direction);

					if (nodes[adjusted.nodeIndex]?.type === "text") {
						setCursorPosition(adjusted);
						setDomSelectionFromPosition(containerRef.current, adjusted);
					}
				} else {
					setCursorPosition(editorSel.focus);
				}
			});
		},
		[nodes, onArrowUpDown, focusedSkillId]
	);

	// ============================================================================
	// Selection Actions
	// ============================================================================

	const selectAll = useCallback(() => {
		if (!containerRef.current || nodes.length === 0) return;

		const lastNode = nodes[nodes.length - 1];
		const lastOffset = getNodeLength(lastNode);

		const newSelection: EditorSelection = {
			anchor: { nodeIndex: 0, offset: 0 },
			focus: { nodeIndex: nodes.length - 1, offset: lastOffset },
		};

		setSelection(newSelection);
		setDomSelectionFromRange(containerRef.current, newSelection);
	}, [nodes]);

	const isAllSelected = useCallback(() => {
		if (!selection || isSelectionCollapsed(selection)) return false;

		const { start, end } = getSelectionBounds(nodes, selection);
		const lastNode = nodes[nodes.length - 1];

		const startsAtBeginning = start.nodeIndex === 0 && start.offset === 0;
		const endsAtEnd = end.nodeIndex === nodes.length - 1 && end.offset === getNodeLength(lastNode);

		return startsAtBeginning && endsAtEnd;
	}, [nodes, selection]);

	const clearEditor = useCallback(() => {
		const newNodes: EditorNode[] = [{ type: "text", content: "", id: generateTextNodeId() }];
		const newPosition: EditorPosition = { nodeIndex: 0, offset: 0 };

		setNodes(newNodes);
		setCursorPosition(newPosition);
		setFocusedSkillId(null);
		setSelection(null);
		pendingCursorRef.current = newPosition;

		requestAnimationFrame(() => {
			containerRef.current?.focus();
		});
	}, []);

	const deleteSelectedContent = useCallback(() => {
		if (!selection || isSelectionCollapsed(selection)) return;

		// If everything is selected, just clear
		if (isAllSelected()) {
			clearEditor();
			return;
		}

		const { nodes: newNodes, newPosition } = deleteSelection(nodes, selection);

		setNodes(newNodes);
		setSelection(null);
		setCursorPosition(newPosition);
		setFocusedSkillId(null);
		pendingCursorRef.current = newPosition;
	}, [nodes, selection, isAllSelected, clearEditor]);

	// ============================================================================
	// Paste Handling
	// ============================================================================

	const handlePaste = useCallback(
		(e: React.ClipboardEvent<HTMLDivElement>) => {
			e.preventDefault();

			const text = e.clipboardData.getData("text/plain");
			if (!text) return;

			// Remove newlines from pasted text
			const cleanText = text.replace(/[\r\n]+/g, " ");

			if (selection && !isSelectionCollapsed(selection)) {
				replaceSelection(cleanText);
			} else {
				insertTextAtCursor(cleanText);
			}
		},
		[selection, replaceSelection, insertTextAtCursor]
	);

	// ============================================================================
	// Public Actions
	// ============================================================================

	const insertSkill = useCallback(
		(skill: Skill) => {
			// Don't insert duplicates
			const existingSkills = nodesToSkills(nodes);
			if (existingSkills.some((s) => s.id === skill.id)) return;

			const { nodes: newNodes, newPosition } = insertSkillAtPosition(nodes, cursorPosition, skill);

			setNodes(newNodes);
			setCursorPosition(newPosition);
			setFocusedSkillId(null);
			setSelection(null);
			pendingCursorRef.current = newPosition;

			requestAnimationFrame(() => {
				containerRef.current?.focus();
			});
		},
		[nodes, cursorPosition]
	);

	const removeSkillInternal = useCallback(
		(skillId: string) => {
			const { nodes: newNodes, removedIndex } = removeSkillById(nodes, skillId);

			if (removedIndex === -1) return;

			// Calculate new cursor position
			let newPosition: EditorPosition;
			if (removedIndex < newNodes.length) {
				const nodeAtRemoved = newNodes[removedIndex];
				if (nodeAtRemoved?.type === "text") {
					newPosition = { nodeIndex: removedIndex, offset: 0 };
				} else {
					newPosition = { nodeIndex: Math.max(0, removedIndex - 1), offset: 0 };
				}
			} else {
				const lastIndex = Math.max(0, newNodes.length - 1);
				const lastNode = newNodes[lastIndex];
				newPosition = {
					nodeIndex: lastIndex,
					offset: lastNode?.type === "text" ? lastNode.content.length : 0,
				};
			}

			setNodes(newNodes);
			setCursorPosition(newPosition);
			setFocusedSkillId(null);
			setSelection(null);
			pendingCursorRef.current = newPosition;

			requestAnimationFrame(() => {
				containerRef.current?.focus();
			});
		},
		[nodes]
	);

	const focus = useCallback(() => {
		containerRef.current?.focus();
	}, []);

	// ============================================================================
	// Derived State Getters
	// ============================================================================

	const getText = useCallback(() => nodesToText(nodes), [nodes]);
	const getSkills = useCallback(() => nodesToSkills(nodes), [nodes]);
	const isEmpty = useCallback(() => isNodesEmpty(nodes), [nodes]);
	const getCurrentWordFn = useCallback(() => getCurrentWord(nodes, cursorPosition), [nodes, cursorPosition]);

	return {
		// Refs
		containerRef,

		// State
		nodes,
		focusedSkillId,
		selectedSkillIds,
		cursorPosition,

		// Handlers
		handleInput,
		handleKeyDown,
		handleSelect,
		handleClick,
		handlePaste,

		// Actions
		insertSkill,
		removeSkill: removeSkillInternal,
		clear: clearEditor,
		focus,

		// Derived state
		getText,
		getSkills,
		isEmpty,
		getCurrentWord: getCurrentWordFn,
	};
}
