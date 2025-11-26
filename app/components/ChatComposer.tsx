"use client";

import React, { useRef, useEffect, useState } from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import AddIcon from "@atlaskit/icon/core/add";
import EditIcon from "@atlaskit/icon/core/edit";
import SettingsIcon from "@atlaskit/icon/core/settings";
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
	const [suggestion, setSuggestion] = useState<Skill | null>(null);
	const [currentCommand, setCurrentCommand] = useState<string>("");
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [prompt]);

	// Extract the current word to provide suggestions for skill autocomplete
	useEffect(() => {
		if (selectedSkill) {
			setSuggestion(null);
			setCurrentCommand("");
			return;
		}

		// Get the last word being typed (after the last space)
		const words = prompt.split(" ");
		const lastWord = words[words.length - 1];

		if (lastWord.length > 0) {
			setCurrentCommand(lastWord);
			const results = searchSkills(lastWord);
			setSuggestion(results[0] || null);
		} else {
			setCurrentCommand("");
			setSuggestion(null);
		}
	}, [prompt, selectedSkill]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Tab" && suggestion && currentCommand) {
			// Accept the autocomplete suggestion
			e.preventDefault();

			// Select the skill and clear the command text
			setSelectedSkill(suggestion);

			// Remove the command word from the prompt
			const words = prompt.split(" ");
			words.pop(); // Remove the partial command
			const newPrompt = words.join(" ");
			onPromptChange(newPrompt);

			setSuggestion(null);
			setCurrentCommand("");
		} else if (e.key === "Backspace" && selectedSkill && prompt === "") {
			// Remove selected skill if backspace is pressed on empty prompt
			setSelectedSkill(null);
		} else if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit();
		}
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
				}}
			>
				<div style={{ position: "relative", width: "100%", display: "flex", alignItems: "flex-start", gap: token("space.100") }}>
					{/* Selected Skill Lozenge */}
					{selectedSkill && (
						<div style={{ marginTop: "2px" }}>
							<SkillLozenge icon={getIcon(selectedSkill.icon || "add", "small")} label={selectedSkill.name} color="blue" onClick={() => setSelectedSkill(null)} />
						</div>
					)}

					<div style={{ position: "relative", flex: 1 }}>
						{/* Textarea input */}
						<textarea
							ref={textareaRef}
							value={prompt}
							onChange={(e) => {
								onPromptChange(e.target.value);
								setTimeout(adjustTextareaHeight, 0);
							}}
							onKeyDown={handleKeyDown}
							placeholder={selectedSkill ? "Add context..." : "Ask, @mention, or / for actions"}
							rows={1}
							disabled={isDisabled}
							style={{
								width: "100%",
								border: "none",
								outline: "none",
								backgroundColor: "transparent",
								resize: "none",
								fontSize: "14px",
								fontFamily: "inherit",
								color: token("color.text"),
								lineHeight: "1.43",
								minHeight: "20px",
								maxHeight: "120px",
								overflowY: "auto",
								position: "relative",
								zIndex: 2,
								padding: "8px 0",
								margin: 0,
							}}
						/>

						{/* Ghost text suggestion overlay */}
						{!selectedSkill && suggestion && currentCommand && (
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
									padding: "8px 0",
									margin: 0,
									overflow: "hidden",
									whiteSpace: "pre-wrap",
									wordWrap: "break-word",
									zIndex: 1,
									display: "flex",
									alignItems: "flex-start",
								}}
							>
								<span style={{ opacity: 0, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{prompt}</span>
								<span style={{ color: token("color.text.subtlest"), opacity: 0.5, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{suggestion.name.substring(currentCommand.length)}</span>
							</div>
						)}
					</div>
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
						<IconButton icon={SettingsIcon} label="Preferences" appearance="subtle" spacing="default" shape="circle" />
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
