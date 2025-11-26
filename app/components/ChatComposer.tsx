"use client";

import React, { useRef, useEffect, useState } from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import AddIcon from "@atlaskit/icon/core/add";
import EditIcon from "@atlaskit/icon/core/edit";
import SkillIcon from "@atlaskit/icon-lab/core/skill";
import { searchSkills } from "@/lib/skills-data";
import { getIcon } from "@/lib/icon-mapper";
import SkillLozenge from "./SkillLozenge";
import type { Skill } from "@/lib/types/skills";

interface ChatComposerProps {
	prompt: string;
	onPromptChange: (value: string) => void;
	onSubmit: () => void;
	isDisabled?: boolean;
}

export default function ChatComposer({ prompt, onPromptChange, onSubmit, isDisabled = false }: ChatComposerProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const editableRef = useRef<HTMLDivElement>(null);
	const [suggestion, setSuggestion] = useState<Skill | null>(null);
	const [currentCommand, setCurrentCommand] = useState<string>("");
	const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
	const isUpdatingRef = useRef(false);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

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
			setSuggestion(availableResults[0] || null);
		} else {
			setCurrentCommand("");
			setSuggestion(null);
		}
	}, [prompt, selectedSkills]);

	const handleAddSkill = (skill: Skill) => {
		// Add the skill to the array
		setSelectedSkills((prev) => [...prev, skill]);

		// Remove the command word from the prompt
		const words = prompt.split(" ");
		words.pop(); // Remove the partial command
		const newPrompt = words.join(" ");
		onPromptChange(newPrompt);

		setSuggestion(null);
		setCurrentCommand("");
	};

	const handleRemoveSkill = (skillId: string) => {
		setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
	};

	return (
		<div style={{ padding: `0 ${token("space.100")}` }}>
			<div
				style={{
					backgroundColor: token("elevation.surface"),
					border: `1px solid ${token("color.border")}`,
					borderRadius: "12px",
					padding: `${token("space.150")} ${token("space.150")} ${token("space.100")}`,
					boxShadow: "0px -2px 50px 8px rgba(30, 31, 33, 0.08)",
					overflow: "visible",
				}}
			>
				<div style={{ position: "relative", width: "100%", minHeight: "36px", overflow: "visible" }}>
					{/* Placeholder text - shown when no skills and no prompt */}
					{selectedSkills.length === 0 && !prompt && (
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								padding: `${token("space.100")} ${token("space.075")}`,
								color: token("color.text.subtlest"),
								fontSize: "14px",
								fontFamily: "inherit",
								lineHeight: "1.43",
								pointerEvents: "none",
								userSelect: "none",
							}}
						>
							Ask, @mention, or / for actions
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

							setTimeout(() => {
								isUpdatingRef.current = false;
							}, 0);
						}}
						onKeyDown={(e) => {
							if (e.key === "Tab" && suggestion && currentCommand) {
								e.preventDefault();
								handleAddSkill(suggestion);

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
							fontSize: "14px",
							fontFamily: "inherit",
							color: token("color.text"),
							lineHeight: "1.43",
							minHeight: "36px",
							maxHeight: "120px",
							overflowY: "auto",
							padding: `${token("space.100")} ${token("space.075")}`,
							whiteSpace: "pre-wrap",
							wordWrap: "break-word",
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
					{suggestion && currentCommand && prompt && (
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								pointerEvents: "none",
								fontSize: "14px",
								fontFamily: "inherit",
								lineHeight: "1.43",
								padding: `${token("space.100")} ${token("space.075")}`,
								overflow: "hidden",
								whiteSpace: "pre-wrap",
								wordWrap: "break-word",
								zIndex: 1,
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
							<span style={{ color: token("color.text.subtlest"), opacity: 0.5 }}>{suggestion.name.substring(currentCommand.length)}</span>
						</div>
					)}
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: token("space.150"),
					}}
				>
					{/* Left side: Tools */}
					<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
						<IconButton icon={AddIcon} label="Add" appearance="subtle" spacing="default" shape="circle" />
						<IconButton icon={EditIcon} label="Edit" appearance="subtle" spacing="default" shape="circle" />
						<IconButton icon={SkillIcon} label="Preferences" appearance="subtle" spacing="default" shape="circle" />
					</div>

					{/* Right side: Send */}
					<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
						<IconButton icon={MicrophoneIcon} label="Voice Submit" appearance="subtle" spacing="default" shape="circle" />
						<IconButton icon={ArrowUpIcon} label="Submit" appearance="primary" spacing="default" isDisabled={!prompt.trim() || isDisabled} onClick={onSubmit} shape="circle" />
					</div>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: `${token("space.075")} 0`,
				}}
			>
				<span style={{ fontSize: "12px", color: token("color.text.subtlest") }}>Uses AI. Verify results.</span>
			</div>
		</div>
	);
}
