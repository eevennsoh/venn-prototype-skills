"use client";

import React, { useRef, useEffect, useState, useMemo, useId, startTransition } from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import AddIcon from "@atlaskit/icon/core/add";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import SkillIcon from "@atlaskit/icon-lab/core/skill";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";
import { Text } from "@atlaskit/primitives";
import { searchSkills } from "@/lib/skills-data";
import { getIcon } from "@/lib/icon-mapper";
import SkillLozenge from "./SkillLozenge";
import type { Skill } from "@/lib/skills";

interface ChatComposerProps {
	prompt: string;
	onPromptChange: (value: string) => void;
	onSubmit: () => void;
	isDisabled?: boolean;
	onContentStateChange?: (hasContent: boolean) => void;
	onSelectedSkillsChange?: (skills: Skill[]) => void;
	pendingSkill?: Skill | null;
	onPendingSkillConsumed?: () => void;
	onKeyArrow?: (direction: "up" | "down") => void;
	highlightedSkill?: Skill | null;
}

// Segment represents either plain text or a skill tag in the inline flow
type Segment = { type: "text"; content: string } | { type: "skill"; skill: Skill };

export default function ChatComposer({
	prompt,
	onPromptChange,
	onSubmit,
	isDisabled = false,
	onContentStateChange,
	onSelectedSkillsChange,
	pendingSkill,
	onPendingSkillConsumed,
	onKeyArrow,
	highlightedSkill,
}: ChatComposerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLSpanElement>(null);
	const [segments, setSegments] = useState<Segment[]>([{ type: "text", content: "" }]);
	const [suggestion, setSuggestion] = useState<Skill | null>(null);
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
	const ghostTargetSkill = highlightedSkill ?? suggestion;
	const ghostSuffix = ghostTargetSkill && currentCommand ? ghostTargetSkill.name.substring(currentCommand.length) : "";
	const shouldShowGhost = Boolean(ghostSuffix && currentCommand.length > 0);

	return (
		<div style={{ padding: `0 ${token("space.100")}` }}>
			<div
				style={{
					backgroundColor: token("elevation.surface"),
					border: `${token("border.width")} solid ${token("color.border")}`,
					borderRadius: token("radius.xlarge"),
					padding: `${token("space.100")} ${token("space.100")} ${token("space.075")}`,
					boxShadow: "0px -2px 50px 8px rgba(30, 31, 33, 0.08)",
					overflow: "visible",
				}}
			>
				<style>{`
					.${uniqueClass}:empty::before {
						content: attr(data-placeholder);
						color: ${token("color.text.subtlest")};
						pointer-events: none;
					}
				`}</style>

				<div
					style={{
						position: "relative",
						width: "100%",
						overflow: "visible",
						cursor: "text",
					}}
					onClick={() => inputRef.current?.focus()}
				>
					{/* Placeholder text */}
					{isComposerEmpty && (
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								padding: `${token("space.075")} ${token("space.075")}`,
								pointerEvents: "none",
								userSelect: "none",
								color: token("color.text.subtlest"),
								fontSize: "14px",
								fontFamily: "inherit",
								lineHeight: "1.43",
							}}
						>
							{highlightedSkill ? highlightedSkill.name : "Ask, @mention, or / for skills"}
						</div>
					)}

					{/* Inline container with skills and text 
					    Uses inline formatting context for seamless text + tag layout:
					    - Container: display: block (establishes inline formatting context)
					    - Skills: display: inline-flex + verticalAlign: middle
					    - Input: display: inline-block + verticalAlign: middle
					    - Ghost text: display: inline + verticalAlign: middle
					    This allows all elements to flow naturally like a rich text editor */}
					<div
						ref={containerRef}
						style={{
							display: "block",
							minHeight: "24px",
							maxHeight: hasWrapping ? "none" : "24px",
							overflow: "visible",
							fontSize: "14px",
							fontFamily: "inherit",
							lineHeight: "1.43",
							padding: `${token("space.075")} ${token("space.075")}`,
						}}
					>
						{segments.map((segment, index) => {
							const isLastSegment = index === segments.length - 1;

							if (segment.type === "skill") {
								return (
									<div
										key={`skill-${segment.skill.id}-${index}`}
										contentEditable={false}
										tabIndex={0}
										onKeyDown={(e) => handleTagKeyDown(e, segment.skill.id)}
										onClick={(e) => {
											e.stopPropagation();
											e.currentTarget.focus();
										}}
										onFocus={(e) => {
											// Add visual feedback when focused
											e.currentTarget.style.outline = `2px solid ${token("color.border.focused")}`;
											e.currentTarget.style.outlineOffset = "2px";
										}}
										onBlur={(e) => {
											e.currentTarget.style.outline = "none";
										}}
										style={{
											display: "inline-flex",
											verticalAlign: "middle",
											marginRight: isLastSegment ? 0 : token("space.025"),
											marginBottom: hasWrapping ? token("space.025") : 0,
											outline: "none",
											cursor: "pointer",
										}}
									>
										<SkillLozenge
											icon={getIcon(segment.skill.icon || "add", "small", segment.skill.fill)}
											label={segment.skill.name}
											color="blue"
											fillColor={segment.skill.fill}
											onClick={() => handleRemoveSkill(segment.skill.id)}
										/>
									</div>
								);
							} else if (segment.type === "text") {
								// Only render contentEditable input for the last text segment
								if (isLastSegment) {
									return (
										<React.Fragment key={`text-${index}`}>
											<span
												ref={inputRef}
												contentEditable={!isDisabled}
												onInput={handleInput}
												onKeyDown={handleKeyDown}
												className={uniqueClass}
												data-placeholder={segments.length === 1 ? undefined : ""}
												style={{
													display: "inline-block",
													width: "auto",
													minWidth: "4px",
													outline: "none",
													verticalAlign: "middle",
													color: token("color.text"),
													fontSize: "14px",
													fontFamily: "inherit",
													lineHeight: "1.43",
													whiteSpace: "pre-wrap",
													overflowWrap: "break-word",
													wordBreak: "normal",
													caretColor: token("color.text"),
													opacity: isDisabled ? 0.6 : 1,
													pointerEvents: isDisabled ? "none" : "auto",
												}}
											/>
											{/* Ghost text suggestion suffix */}
											{shouldShowGhost && (
												<span
													style={{
														display: "inline",
														color: token("color.text.subtlest"),
														opacity: 0.5,
														pointerEvents: "none",
														verticalAlign: "middle",
														fontSize: "14px",
														fontFamily: "inherit",
														lineHeight: "1.43",
													}}
												>
													{ghostSuffix}
												</span>
											)}
										</React.Fragment>
									);
								} else {
									// Render static text for non-last text segments
									return segment.content ? (
										<span
											key={`text-${index}`}
											style={{
												display: "inline",
												verticalAlign: "middle",
												marginRight: token("space.025"),
												color: token("color.text"),
												fontSize: "14px",
												fontFamily: "inherit",
												lineHeight: "1.43",
											}}
										>
											{segment.content}
										</span>
									) : null;
								}
							}
							return null;
						})}
					</div>
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: token("space.100"),
					}}
				>
					{/* Left side: Tools */}
					<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
						<IconButton icon={AddIcon} label="Add" appearance="subtle" spacing="default" shape="circle" />
						<IconButton icon={CustomizeIcon} label="Edit" appearance="subtle" spacing="default" shape="circle" />
						<IconButton icon={SkillIcon} label="Preferences" appearance="subtle" spacing="default" shape="circle" />
					</div>

					{/* Right side: Send */}
					<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
						<IconButton icon={MicrophoneIcon} label="Voice Submit" appearance="subtle" spacing="default" shape="circle" />
						<IconButton
							icon={ArrowUpIcon}
							label="Submit"
							appearance="primary"
							spacing="default"
							isDisabled={!(promptText.trim().length > 0 || selectedSkills.length > 0) || isDisabled}
							onClick={() => {
								onSubmit();
								handleClearAndFocus();
							}}
							shape="circle"
						/>
					</div>
				</div>
			</div>

			{/* Disclaimer Footer */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: token("space.050"),
					paddingTop: token("space.100"),
					paddingBottom: token("space.100"),
				}}
			>
				<div style={{ display: "flex", alignItems: "center", width: "12px", height: "12px" }}>
					<InformationCircleIcon label="" color="currentColor" size="small" />
				</div>
				<Text size="small" color="color.text.subtlest">
					Uses AI. Verify results.
				</Text>
			</div>
		</div>
	);
}
