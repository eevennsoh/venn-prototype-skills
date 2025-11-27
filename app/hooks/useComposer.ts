"use client";

import React, { useRef, useEffect, useState, useMemo, useId, useCallback } from "react";
import { searchSkills, getDiscoverMoreSkill } from "@/lib/skills-queries";
import type { Skill } from "@/lib/skills";
import { useInlineEditor } from "./useInlineEditor";
import type { EditorNode } from "@/lib/editor-utils";

// Re-export EditorNode as Segment for backward compatibility
export type Segment = EditorNode;

interface UseComposerProps {
	prompt: string;
	onPromptChange: (value: string) => void;
	onContentStateChange?: (hasContent: boolean) => void;
	onSelectedSkillsChange?: (skills: Skill[]) => void;
	pendingSkill?: Skill | null;
	onPendingSkillConsumed?: () => void;
	onKeyArrow?: (direction: "up" | "down") => void;
	highlightedSkill?: Skill | null;
	isDisabled?: boolean;
	onSubmit: () => void;
}

interface UseComposerReturn {
	// Refs
	containerRef: React.RefObject<HTMLDivElement>;

	// State
	nodes: EditorNode[];
	selectedSkills: Skill[];
	suggestion: Skill | null;
	focusedSkillId: string | null;
	selectedSkillIds: string[];
	currentCommand: string;
	hasWrapping: boolean;

	// Computed
	promptText: string;
	hasContent: boolean;
	isComposerEmpty: boolean;
	ghostSuffix: string;
	shouldShowGhost: boolean;
	placeholderSkill: Skill | null;
	uniqueClass: string;

	// Handlers
	handleInput: (e: React.FormEvent<HTMLDivElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	handleSelect: () => void;
	handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;

	// Actions
	handleAddSkill: (skill: Skill) => void;
	handleRemoveSkill: (skillId: string) => void;
	handleClearAndFocus: () => void;
}

/**
 * Custom hook for managing the chat composer state and logic
 * Uses useInlineEditor internally for core editor functionality
 */
export function useComposer({
	prompt,
	onPromptChange,
	onContentStateChange,
	onSelectedSkillsChange,
	pendingSkill,
	onPendingSkillConsumed,
	onKeyArrow,
	highlightedSkill,
	isDisabled = false,
	onSubmit,
}: UseComposerProps): UseComposerReturn {
	// State for suggestions
	const [suggestion, setSuggestion] = useState<Skill | null>(null);
	const [currentCommand, setCurrentCommand] = useState<string>("");
	const [hasWrapping, setHasWrapping] = useState(false);
	const hasUserTypedRef = useRef(false);
	const componentId = useId();
	const uniqueClass = useMemo(() => `composer-${componentId.replace(/:/g, "")}`, [componentId]);

	// Use the inline editor hook
	const editor = useInlineEditor({
		onTextChange: (text) => {
			onPromptChange(text);
			if (text.length > 0 && !hasUserTypedRef.current) {
				hasUserTypedRef.current = true;
			}
		},
		onSkillsChange: onSelectedSkillsChange,
		onContentStateChange: (hasContent) => {
			onContentStateChange?.(hasContent);
			if (!hasContent) {
				hasUserTypedRef.current = false;
			}
		},
		isDisabled,
		onArrowUpDown: onKeyArrow,
		onCurrentWordChange: (word) => {
			setCurrentCommand(word);
			// Update suggestions based on current word
			if (word.length > 0) {
				const results = searchSkills(word);
				const existingSkills = editor.getSkills();
				const availableResults = results.filter((skill) => !existingSkills.some((s) => s.id === skill.id));
				setSuggestion(availableResults[0] || null);
			} else {
				setSuggestion(null);
			}
		},
		onSubmit: () => {
			onSubmit();
			editor.clear();
		},
	});

	// Get derived state
	const promptText = editor.getText();
	const selectedSkills = editor.getSkills();
	const hasContent = promptText.trim().length > 0 || selectedSkills.length > 0;
	const isComposerEmpty = editor.isEmpty();

	// Sync external prompt to internal state on clear
	useEffect(() => {
		if (prompt === "" && editor.nodes.length > 1 && selectedSkills.length === 0) {
			editor.clear();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prompt]);

	// Handle pending skill from suggestion selection
	useEffect(() => {
		if (pendingSkill) {
			if (!selectedSkills.some((s) => s.id === pendingSkill.id)) {
				editor.insertSkill(pendingSkill);
			}
			onPendingSkillConsumed?.();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pendingSkill]);

	// Check if content is wrapping to multiple lines
	useEffect(() => {
		const checkWrapping = () => {
			if (editor.containerRef.current) {
				const range = document.createRange();
				range.selectNodeContents(editor.containerRef.current);
				const rect = range.getBoundingClientRect();
				const minHeight = 24;
				const isMultiLine = rect.height > minHeight + 2;
				setHasWrapping(isMultiLine);
			}
		};
		const rAF = requestAnimationFrame(checkWrapping);
		return () => cancelAnimationFrame(rAF);
	}, [editor.nodes, editor.containerRef]);

	// Auto-focus on mount
	useEffect(() => {
		editor.focus();
	}, [editor]);

	// Custom keyboard handler that wraps the editor's handler
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			// Handle Tab for skill insertion
			if (e.key === "Tab" && suggestion && currentCommand) {
				e.preventDefault();
				editor.insertSkill(suggestion);
				setSuggestion(null);
				setCurrentCommand("");
				return;
			}

			// Delegate to editor's handler
			editor.handleKeyDown(e);
		},
		[editor, suggestion, currentCommand]
	);

	// Ghost text logic
	const discoverMore = getDiscoverMoreSkill();
	const isHighlightedDiscoverMore = highlightedSkill?.id === discoverMore.id;
	const ghostTargetSkill = (isHighlightedDiscoverMore ? null : highlightedSkill ?? null) ?? suggestion;
	const ghostSuffix = ghostTargetSkill && currentCommand ? ghostTargetSkill.name.substring(currentCommand.length) : "";

	// Only show ghost text if cursor is at the rightmost position
	const cursorPosition = editor.cursorPosition;
	const activeNode = editor.nodes[cursorPosition.nodeIndex];
	const isCursorAtEnd = activeNode?.type === "text" && cursorPosition.offset === activeNode.content.length;
	const shouldShowGhost = Boolean(ghostSuffix && currentCommand.length > 0 && isCursorAtEnd);

	// Placeholder skill
	const placeholderSkill = isHighlightedDiscoverMore ? null : highlightedSkill ?? null;

	// Action handlers for backward compatibility
	const handleAddSkill = useCallback(
		(skill: Skill) => {
			editor.insertSkill(skill);
		},
		[editor]
	);

	const handleRemoveSkill = useCallback(
		(skillId: string) => {
			editor.removeSkill(skillId);
		},
		[editor]
	);

	const handleClearAndFocus = useCallback(() => {
		editor.clear();
		onPromptChange("");
	}, [editor, onPromptChange]);

	return {
		// Refs
		containerRef: editor.containerRef,

		// State
		nodes: editor.nodes,
		selectedSkills,
		suggestion,
		focusedSkillId: editor.focusedSkillId,
		selectedSkillIds: editor.selectedSkillIds,
		currentCommand,
		hasWrapping,

		// Computed
		promptText,
		hasContent,
		isComposerEmpty,
		ghostSuffix,
		shouldShowGhost,
		placeholderSkill,
		uniqueClass,

		// Handlers
		handleInput: editor.handleInput,
		handleKeyDown,
		handleSelect: editor.handleSelect,
		handleClick: editor.handleClick,
		handlePaste: editor.handlePaste,

		// Actions
		handleAddSkill,
		handleRemoveSkill,
		handleClearAndFocus,
	};
}
