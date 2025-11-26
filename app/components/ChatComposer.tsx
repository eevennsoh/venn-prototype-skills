"use client";

import React, { useRef, useEffect } from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import AddIcon from "@atlaskit/icon/core/add";
import EditIcon from "@atlaskit/icon/core/edit";
import SettingsIcon from "@atlaskit/icon/core/settings";

interface ChatComposerProps {
	prompt: string;
	onPromptChange: (value: string) => void;
	onSubmit: () => void;
	isDisabled?: boolean;
}

export default function ChatComposer({ prompt, onPromptChange, onSubmit, isDisabled = false }: ChatComposerProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [prompt]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
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
				<div style={{ position: "relative", width: "100%" }}>
					<textarea
						ref={textareaRef}
						value={prompt}
						onChange={(e) => {
							onPromptChange(e.target.value);
							setTimeout(adjustTextareaHeight, 0);
						}}
						onKeyDown={handleKeyDown}
						placeholder="Ask, @mention, or / for actions"
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
						}}
					/>
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
