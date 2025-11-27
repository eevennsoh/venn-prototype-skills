"use client";

import React, { useRef, useEffect, useState, useMemo, useId, startTransition } from "react";
import { searchSkills, getDiscoverMoreSkill } from "@/lib/skills-queries";
import type { Skill } from "@/lib/skills";

// Segment represents either plain text or a skill tag in the inline flow
export type Segment = { type: "text"; content: string } | { type: "skill"; skill: Skill };

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
	inputRef: React.RefObject<HTMLSpanElement>;
	containerRef: React.RefObject<HTMLDivElement>;

	// State
	segments: Segment[];
	selectedSkills: Skill[];
	suggestion: Skill | null;
	focusedSkillId: string | null;
	currentCommand: string;
	hasWrapping: boolean;

	// Computed
	currentTextSegment: string;
	promptText: string;
	hasContent: boolean;
	isComposerEmpty: boolean;
	ghostSuffix: string;
	shouldShowGhost: boolean;
	placeholderSkill: Skill | null;
	uniqueClass: string;

	// Handlers
	handleInput: (e: React.FormEvent<HTMLSpanElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) => void;
	handleTagKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, skillId: string) => void;
	handleAddSkill: (skill: Skill) => void;
	handleRemoveSkill: (skillId: string) => void;
	handleClearAndFocus: () => void;
	setFocusedSkillId: (id: string | null) => void;
}

/**
 * Custom hook for managing the chat composer state and logic
 * Extracts segment management, skill handling, input management, and focus logic
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
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLSpanElement>(null);
	const [segments, setSegments] = useState<Segment[]>([{ type: "text", content: "" }]);
	const [suggestion, setSuggestion] = useState<Skill | null>(null);
	const [focusedSkillId, setFocusedSkillId] = useState<string | null>(null);
	const [currentCommand, setCurrentCommand] = useState<string>("");
	const [hasWrapping, setHasWrapping] = useState(false);
	const hasUserTypedRef = useRef(false);
	const componentId = useId();
	const uniqueClass = useMemo(() => `composer-${componentId.replace(/:/g, "")}`, [componentId]);

	// Internal state for selected skills (synced with parent via callbacks)
	const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

	// Get the current text segment (last segment if it's text, or empty)
	const currentTextSegment = useMemo(() => {
		const lastSegment = segments[segments.length - 1];
		return lastSegment?.type === "text" ? lastSegment.content : "";
	}, [segments]);

	// Convert segments to prompt text
	const promptText = useMemo(() => {
		return segments
			.filter((s) => s.type === "text")
			.map((s) => s.content)
			.join(" ");
	}, [segments]);

	// Sync external prompt to internal input value only on mount or clear
	useEffect(() => {
		if (prompt === "" && segments.length > 1 && selectedSkills.length === 0) {
			// Clear state when prompt is cleared externally (but only if no skills are selected)
			setSegments([{ type: "text", content: "" }]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prompt]);

	// Auto-focus on mount
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	// Sync contentEditable with current text segment
	useEffect(() => {
		if (inputRef.current && inputRef.current.textContent !== currentTextSegment) {
			inputRef.current.textContent = currentTextSegment;
			// Move cursor to end
			const range = document.createRange();
			const sel = window.getSelection();
			if (inputRef.current.childNodes.length > 0) {
				range.selectNodeContents(inputRef.current);
				range.collapse(false);
			} else {
				// If empty, set cursor at start of empty element
				range.selectNode(inputRef.current);
				range.collapse(true);
			}
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [currentTextSegment]);

	// Track content state and notify parent
	const hasContent = promptText.trim().length > 0 || selectedSkills.length > 0;
	useEffect(() => {
		onContentStateChange?.(hasContent);
		onSelectedSkillsChange?.(selectedSkills);
		if (!hasContent) {
			hasUserTypedRef.current = false;
		}
	}, [hasContent, selectedSkills, onContentStateChange, onSelectedSkillsChange, promptText]);

	// Extract the current word for suggestions
	useEffect(() => {
		if (!currentTextSegment) {
			setCurrentCommand("");
			setSuggestion(null);
			return;
		}

		const lastWord = currentTextSegment.split(" ").pop() || "";
		if (lastWord.length > 0) {
			setCurrentCommand(lastWord);
			const results = searchSkills(lastWord);
			const availableResults = results.filter((skill) => !selectedSkills.some((s) => s.id === skill.id));
			setSuggestion(availableResults[0] || null);
		} else {
			setCurrentCommand("");
			setSuggestion(null);
		}
	}, [currentTextSegment, selectedSkills]);

	// Check if content is wrapping to multiple lines
	// Uses the same technique as Framer Composer for accurate detection
	useEffect(() => {
		const checkWrapping = () => {
			if (containerRef.current) {
				const range = document.createRange();
				range.selectNodeContents(containerRef.current);
				const rect = range.getBoundingClientRect();
				// Add small buffer (2px) to account for rounding/rendering differences
				const minHeight = 24;
				const isMultiLine = rect.height > minHeight + 2;
				setHasWrapping(isMultiLine);
			}
		};
		const rAF = requestAnimationFrame(checkWrapping);
		return () => cancelAnimationFrame(rAF);
	}, [segments, currentTextSegment]);

	// Maintain focus after segment updates (e.g., after adding a skill)
	useEffect(() => {
		// Only auto-focus if input exists and is not focused
		if (inputRef.current && document.activeElement !== inputRef.current) {
			inputRef.current.focus();
			// Place cursor at the end
			const range = document.createRange();
			const sel = window.getSelection();
			range.selectNodeContents(inputRef.current);
			range.collapse(false);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [segments]);

	const handleAddSkill = (skill: Skill) => {
		if (!selectedSkills.some((s) => s.id === skill.id)) {
			startTransition(() => {
				const updatedSkills = [...selectedSkills, skill];
				setSelectedSkills(updatedSkills);

				// Remove the partial word from current text segment
				const lastSegment = segments[segments.length - 1];
				let textBeforeSkill = "";

				if (lastSegment?.type === "text") {
					const beforeCursor = lastSegment.content;
					const lastSpaceIndex = beforeCursor.lastIndexOf(" ");
					const wordStart = lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1;
					textBeforeSkill = beforeCursor.slice(0, wordStart);
				}

				// Create new segments: update last text segment, add skill, add new empty text segment
				const newSegments: Segment[] = [
					...segments.slice(0, -1),
					...(textBeforeSkill ? [{ type: "text" as const, content: textBeforeSkill }] : []),
					{ type: "skill" as const, skill },
					{ type: "text" as const, content: "" },
				];

				setSegments(newSegments);
				setSuggestion(null);
				setCurrentCommand("");

				// Update parent with combined text from all text segments
				const combinedText = newSegments
					.filter((s) => s.type === "text")
					.map((s) => s.content)
					.join(" ");
				onPromptChange(combinedText);
				onSelectedSkillsChange?.(updatedSkills);
			});
		}
		// Focus is now managed by the useEffect watching segments
	};

	// Handle pending skill from suggestion selection
	useEffect(() => {
		if (pendingSkill) {
			if (!selectedSkills.some((s) => s.id === pendingSkill.id)) {
				handleAddSkill(pendingSkill);
			}
			onPendingSkillConsumed?.();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pendingSkill]);

	const handleRemoveSkill = (skillId: string) => {
		const updatedSkills = selectedSkills.filter((s) => s.id !== skillId);
		setSelectedSkills(updatedSkills);

		// Filter out the skill and consolidate consecutive text segments
		let updatedSegments = segments.filter((s) => !(s.type === "skill" && s.skill.id === skillId));

		// Consolidate consecutive text segments to avoid extra spaces
		const consolidatedSegments: Segment[] = [];
		for (let i = 0; i < updatedSegments.length; i++) {
			const segment = updatedSegments[i];
			const lastConsolidated = consolidatedSegments[consolidatedSegments.length - 1];

			if (segment.type === "text" && lastConsolidated?.type === "text") {
				// Merge consecutive text segments with a space if both have content
				const separator = lastConsolidated.content && segment.content ? " " : "";
				lastConsolidated.content = lastConsolidated.content + separator + segment.content;
			} else {
				consolidatedSegments.push({ ...segment });
			}
		}

		// Ensure we always have at least one text segment at the end
		if (consolidatedSegments.length === 0 || consolidatedSegments[consolidatedSegments.length - 1]?.type !== "text") {
			consolidatedSegments.push({ type: "text", content: "" });
		}

		setSegments(consolidatedSegments);
		setSuggestion(null);
		setCurrentCommand("");
		onSelectedSkillsChange?.(updatedSkills);

		// Focus is now managed by the useEffect watching segments
	};

	const handleClearAndFocus = () => {
		onPromptChange("");
		setSelectedSkills([]);
		setSegments([{ type: "text", content: "" }]);
		setSuggestion(null);
		setCurrentCommand("");
		hasUserTypedRef.current = false;
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
		const newValue = e.currentTarget.textContent || "";
		if (newValue.includes("\n")) return; // Prevent newlines

		startTransition(() => {
			// Update only the last text segment
			const newSegments = [...segments];
			const lastSegment = newSegments[newSegments.length - 1];

			if (lastSegment?.type === "text") {
				lastSegment.content = newValue;
			} else {
				// If last segment is not text, add a new text segment
				newSegments.push({ type: "text", content: newValue });
			}

			setSegments(newSegments);

			// Update parent with combined text from all text segments
			const combinedText = newSegments
				.filter((s) => s.type === "text")
				.map((s) => s.content)
				.join(" ");
			onPromptChange(combinedText);

			if (newValue.length > 0 && !hasUserTypedRef.current) {
				hasUserTypedRef.current = true;
			}
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
		if (e.key === "Tab" && suggestion && currentCommand) {
			e.preventDefault();
			handleAddSkill(suggestion);
		} else if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit();
			handleClearAndFocus();
		} else if (e.key === "Backspace" && currentTextSegment === "" && segments.length > 1) {
			// Delete previous segment if current text is empty
			e.preventDefault();
			const prevSegment = segments[segments.length - 2];
			if (prevSegment?.type === "skill") {
				handleRemoveSkill(prevSegment.skill.id);
			} else if (prevSegment?.type === "text") {
				// Remove the empty text segment and focus on previous text segment
				setSegments(segments.slice(0, -1));
			}
		} else if ((e.key === "ArrowUp" || e.key === "ArrowDown") && hasUserTypedRef.current) {
			e.preventDefault();
			onKeyArrow?.(e.key === "ArrowUp" ? "up" : "down");
		}
	};

	const handleTagKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, skillId: string) => {
		if (e.key === "Delete" || e.key === "Backspace") {
			e.preventDefault();
			e.stopPropagation();
			handleRemoveSkill(skillId);
		} else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			// Redirect typing to input
			e.preventDefault();
			e.stopPropagation();
			inputRef.current?.focus();
			startTransition(() => {
				const newSegments = [...segments];
				const lastSegment = newSegments[newSegments.length - 1];
				if (lastSegment?.type === "text") {
					lastSegment.content = lastSegment.content + e.key;
				}
				setSegments(newSegments);
				const combinedText = newSegments
					.filter((s) => s.type === "text")
					.map((s) => s.content)
					.join(" ");
				onPromptChange(combinedText);
			});
		}
	};

	const isComposerEmpty = segments.length === 1 && currentTextSegment === "";

	// Don't show ghost text for "Discover more skills" (it's not a selectable skill)
	const discoverMore = getDiscoverMoreSkill();
	const isHighlightedDiscoverMore = highlightedSkill?.id === discoverMore.id;
	const ghostTargetSkill = (isHighlightedDiscoverMore ? null : highlightedSkill) ?? suggestion;
	const ghostSuffix = ghostTargetSkill && currentCommand ? ghostTargetSkill.name.substring(currentCommand.length) : "";
	const shouldShowGhost = Boolean(ghostSuffix && currentCommand.length > 0);

	// Don't show placeholder for "Discover more skills" (it's not a selectable skill)
	const placeholderSkill = isHighlightedDiscoverMore ? null : highlightedSkill;

	return {
		// Refs
		inputRef,
		containerRef,

		// State
		segments,
		selectedSkills,
		suggestion,
		focusedSkillId,
		currentCommand,
		hasWrapping,

		// Computed
		currentTextSegment,
		promptText,
		hasContent,
		isComposerEmpty,
		ghostSuffix,
		shouldShowGhost,
		placeholderSkill,
		uniqueClass,

		// Handlers
		handleInput,
		handleKeyDown,
		handleTagKeyDown,
		handleAddSkill,
		handleRemoveSkill,
		handleClearAndFocus,
		setFocusedSkillId,
	};
}

