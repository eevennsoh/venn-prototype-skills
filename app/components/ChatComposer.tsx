"use client";

import React, { useRef, useEffect, useState } from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import AddIcon from "@atlaskit/icon/core/add";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import SkillIcon from "@atlaskit/icon-lab/core/skill";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";
import { searchSkills } from "@/lib/skills-data";
import { getIcon } from "@/lib/icon-mapper";
import SkillLozenge from "./SkillLozenge";
import type { Skill } from "@/lib/types/skills";

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const editableRef = useRef<HTMLDivElement>(null);
	const [suggestion, setSuggestion] = useState<Skill | null>(null);
	const [currentCommand, setCurrentCommand] = useState<string>("");
	const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
	const isUpdatingRef = useRef(false);
	const hasUserTypedRef = useRef(false);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

	// Auto-focus on mount
	useEffect(() => {
		if (editableRef.current) {
			editableRef.current.focus();
		}
	}, []);

	useEffect(() => {
		adjustTextareaHeight();
	}, [prompt]);

	// Sync contentEditable text with prompt state when it changes externally
	useEffect(() => {
		if (editableRef.current && !isUpdatingRef.current) {
			const textNodes = Array.from(editableRef.current.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
			const currentText = textNodes.map((node) => node.textContent).join("");

			if (currentText !== prompt) {
				const selection = window.getSelection();
				const isEditorFocused = document.activeElement === editableRef.current;
				const cursorPos = isEditorFocused && selection?.focusNode?.nodeType === Node.TEXT_NODE ? selection.focusOffset : 0;

				// Remove all existing text nodes
				textNodes.forEach((node) => node.remove());

				// Add new text if prompt exists
				if (prompt) {
					const newTextNode = document.createTextNode(prompt);
					editableRef.current.appendChild(newTextNode);

					// Restore cursor position only if editor was focused
					if (isEditorFocused) {
						try {
							const range = document.createRange();
							range.setStart(newTextNode, Math.min(cursorPos, prompt.length));
							range.collapse(true);
							selection?.removeAllRanges();
							selection?.addRange(range);
						} catch (e) {
							// Cursor restoration failed, ignore
						}
					}
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prompt, selectedSkills.length]);

	// Track content state and notify parent
	useEffect(() => {
		const hasContent = prompt.trim().length > 0 || selectedSkills.length > 0;
		onContentStateChange?.(hasContent);
		onSelectedSkillsChange?.(selectedSkills);

		// Reset hasUserTyped flag when prompt is cleared
		if (prompt.trim().length === 0 && selectedSkills.length === 0) {
			hasUserTypedRef.current = false;
		}
	}, [prompt, selectedSkills, onContentStateChange, onSelectedSkillsChange]);

	// Extract the current word to provide suggestions for skill autocomplete
	useEffect(() => {
		// Get the last word being typed (after the last space)
		const words = prompt.split(" ");
		const lastWord = words[words.length - 1];

		if (lastWord.length > 0) {
			setCurrentCommand(lastWord);
			const results = searchSkills(lastWord);
			// Filter out already selected skills
			const availableResults = results.filter((skill) => !selectedSkills.some((s) => s.id === skill.id));
			// Show the first available suggestion for autocomplete
			setSuggestion(availableResults[0] || null);
		} else {
			setCurrentCommand("");
			setSuggestion(null);
		}
	}, [prompt, selectedSkills]);

	const handleAddSkill = (skill: Skill, clearFullPrompt = false) => {
		// Add the skill to the array
		setSelectedSkills((prev) => [...prev, skill]);

		if (clearFullPrompt) {
			// Clear the entire prompt (for external skill additions)
			onPromptChange("");
		} else {
			// Remove only the last word from the prompt (for Tab-accept)
			const words = prompt.split(" ");
			words.pop(); // Remove the partial command
			const newPrompt = words.join(" ");
			onPromptChange(newPrompt);
		}

		setSuggestion(null);
		setCurrentCommand("");
	};

	// Handle pending skill from suggestion selection
	useEffect(() => {
		if (pendingSkill) {
			// Check if skill is not already selected
			if (!selectedSkills.some((s) => s.id === pendingSkill.id)) {
				handleAddSkill(pendingSkill, true);
			}
			// Notify parent that pending skill was consumed
			onPendingSkillConsumed?.();

			// Restore focus to the editable div after skill selection (mouse or keyboard)
			setTimeout(() => {
				if (editableRef.current) {
					editableRef.current.focus();
					// Position cursor at the end
					const range = document.createRange();
					const sel = window.getSelection();

					// Find the text node (it comes after the lozenge spans)
					const textNodes = Array.from(editableRef.current.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
					const lastTextNode = textNodes[textNodes.length - 1];

					if (lastTextNode) {
						// Position cursor at the end of the text
						const textLength = (lastTextNode as Text).length;
						range.setStart(lastTextNode, textLength);
						range.collapse(true);
						sel?.removeAllRanges();
						sel?.addRange(range);
					} else if (editableRef.current.lastChild) {
						// If no text node, position after the lozenges
						range.setStartAfter(editableRef.current.lastChild);
						range.collapse(true);
						sel?.removeAllRanges();
						sel?.addRange(range);
					}
				}
			}, 10);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pendingSkill]);

	const handleRemoveSkill = (skillId: string) => {
		setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
	};

	return (
		<div style={{ padding: `0 ${token("space.100")}` }}>
			<div
				style={{
					backgroundColor: token("elevation.surface"),
					border: `${token("border.width")} solid ${token("color.border")}`,
					borderRadius: token("radius.medium"),
					padding: `${token("space.100")} ${token("space.100")} ${token("space.075")}`,
					boxShadow: "0px -2px 50px 8px rgba(30, 31, 33, 0.08)",
					overflow: "visible",
				}}
			>
				<div style={{ position: "relative", width: "100%", overflow: "visible" }}>
					{/* Placeholder text - shown when no skills and no prompt */}
					{selectedSkills.length === 0 && !prompt && (
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

					{/* Contenteditable div that allows inline flow */}
					<div
						ref={editableRef}
						contentEditable={!isDisabled}
						suppressContentEditableWarning
						onInput={(e) => {
							const target = e.currentTarget;
							isUpdatingRef.current = true;

							// Extract text content from the editable div, excluding the lozenges
							const textContent = Array.from(target.childNodes)
								.filter((node) => node.nodeType === Node.TEXT_NODE)
								.map((node) => node.textContent)
								.join("");
							onPromptChange(textContent);

							// Mark that user has started typing
							if (textContent.length > 0 && !hasUserTypedRef.current) {
								hasUserTypedRef.current = true;
							}

							setTimeout(() => {
								isUpdatingRef.current = false;
							}, 0);
						}}
						onKeyDown={(e) => {
							if (e.key === "Tab" && suggestion && currentCommand) {
								e.preventDefault();
								handleAddSkill(suggestion, false); // Tab-accept: remove only last word

								// Focus at the end of text after lozenge appears
								setTimeout(() => {
									if (editableRef.current) {
										editableRef.current.focus();
										const range = document.createRange();
										const sel = window.getSelection();

										// Find the text node (it comes after the lozenge spans)
										const textNodes = Array.from(editableRef.current.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
										const lastTextNode = textNodes[textNodes.length - 1];

										if (lastTextNode) {
											// Position cursor at the end of the text
											const textLength = (lastTextNode as Text).length;
											range.setStart(lastTextNode, textLength);
											range.collapse(true);
											sel?.removeAllRanges();
											sel?.addRange(range);
										} else if (editableRef.current.lastChild) {
											// If no text node, position after the lozenges
											range.setStartAfter(editableRef.current.lastChild);
											range.collapse(true);
											sel?.removeAllRanges();
											sel?.addRange(range);
										}
									}
								}, 10);
							} else if (e.key === "Backspace" && selectedSkills.length > 0 && prompt === "") {
								e.preventDefault();
								// Remove the last skill
								setSelectedSkills((prev) => prev.slice(0, -1));

								// Focus the editable div after removing skill
								setTimeout(() => {
									if (editableRef.current) {
										editableRef.current.focus();
									}
								}, 0);
							} else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
								// Only allow arrow key navigation if user has started typing
								if (hasUserTypedRef.current) {
									e.preventDefault();
									onKeyArrow?.(e.key === "ArrowUp" ? "up" : "down");
								}
							} else if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								onSubmit();
							}
						}}
						style={{
							width: "100%",
							border: "none",
							outline: "none",
							backgroundColor: "transparent",
							color: token("color.text"),
							minHeight: "24px",
							maxHeight: "120px",
							overflowY: "auto",
							padding: `${token("space.075")} ${token("space.075")}`,
							whiteSpace: "pre-wrap",
							wordWrap: "break-word",
							fontSize: "14px",
							fontFamily: "inherit",
							lineHeight: "1.43",
						}}
					>
						{selectedSkills.map((skill) => (
							<span
								key={`skill-lozenge-${skill.id}`}
								style={{
									display: "inline-block",
									verticalAlign: "middle",
									marginRight: token("space.025"),
									marginLeft: token("space.025"),
									paddingTop: token("space.025"),
									paddingBottom: token("space.025"),
								}}
								contentEditable={false}
							>
								<SkillLozenge icon={getIcon(skill.icon || "add", "small")} label={skill.name} color="blue" onClick={() => handleRemoveSkill(skill.id)} />
							</span>
						))}
					</div>

					{/* Ghost text suggestion overlay */}
					{((suggestion && currentCommand && prompt) || (highlightedSkill && prompt)) && (
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								pointerEvents: "none",
								padding: `${token("space.075")} ${token("space.075")}`,
								overflow: "hidden",
								whiteSpace: "pre-wrap",
								wordWrap: "break-word",
								zIndex: 1,
								fontSize: "14px",
								fontFamily: "inherit",
								lineHeight: "1.43",
							}}
						>
							{/* Invisible skill lozenges to match layout */}
							{selectedSkills.map((skill) => (
								<span
									key={`ghost-lozenge-${skill.id}`}
									style={{
										display: "inline-block",
										verticalAlign: "middle",
										marginRight: token("space.025"),
										marginLeft: token("space.025"),
										paddingTop: token("space.025"),
										paddingBottom: token("space.025"),
										opacity: 0,
									}}
								>
									<SkillLozenge icon={getIcon(skill.icon || "add", "small")} label={skill.name} color="blue" />
								</span>
							))}
							<span style={{ opacity: 0 }}>{prompt}</span>
							<span style={{ color: token("color.text.subtlest"), opacity: 0.5 }}>
								{highlightedSkill ? highlightedSkill.name.substring(prompt.length) : suggestion?.name.substring(currentCommand.length)}
							</span>
						</div>
					)}
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
							isDisabled={!(prompt.trim().length > 0 || selectedSkills.length > 0) || isDisabled}
							onClick={onSubmit}
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
					color: token("color.text.subtlest"),
					font: token("font.body.small"),
				}}
			>
				<div style={{ display: "flex", alignItems: "center", width: "12px", height: "12px" }}>
					<InformationCircleIcon label="" color="currentColor" size="small" />
				</div>
				<span>Uses AI. Verify results.</span>
			</div>
		</div>
	);
}
