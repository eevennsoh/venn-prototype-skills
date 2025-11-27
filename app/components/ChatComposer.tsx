"use client";

import React from "react";

import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import ArrowUpIcon from "@atlaskit/icon/core/arrow-up";
import AddIcon from "@atlaskit/icon/core/add";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import SkillIcon from "@atlaskit/icon-lab/core/skill";
import InformationCircleIcon from "@atlaskit/icon/core/information-circle";
import { Text } from "@atlaskit/primitives";
import { getIcon } from "@/lib/icon-mapper";
import SkillLozenge from "./SkillLozenge";
import { useComposer } from "../hooks/useComposer";
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
	const {
		containerRef,
		nodes,
		selectedSkills,
		focusedSkillId,
		selectedSkillIds,
		hasWrapping,
		promptText,
		isComposerEmpty,
		ghostSuffix,
		shouldShowGhost,
		placeholderSkill,
		uniqueClass,
		handleInput,
		handleKeyDown,
		handleSelect,
		handleClick,
		handlePaste,
		handleRemoveSkill,
		handleClearAndFocus,
	} = useComposer({
		prompt,
		onPromptChange,
		onContentStateChange,
		onSelectedSkillsChange,
		pendingSkill,
		onPendingSkillConsumed,
		onKeyArrow,
		highlightedSkill,
		isDisabled,
		onSubmit,
	});

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
				<div
					style={{
						position: "relative",
						width: "100%",
						overflow: "visible",
						cursor: "text",
					}}
					onClick={() => containerRef.current?.focus()}
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
							{placeholderSkill ? placeholderSkill.name : "Ask, @mention, or / for skills"}
						</div>
					)}

					{/* Single contentEditable container with inline skills and text */}
					<div
						ref={containerRef}
						contentEditable={!isDisabled}
						suppressContentEditableWarning
						onInput={handleInput}
						onKeyDown={handleKeyDown}
						onSelect={handleSelect}
						onClick={handleClick}
						onPaste={handlePaste}
						style={{
							display: "block",
							minHeight: "24px",
							maxHeight: hasWrapping ? "none" : "24px",
							overflow: "visible",
							fontSize: "14px",
							fontFamily: "inherit",
							lineHeight: "1.43",
							padding: `${token("space.075")} ${token("space.075")}`,
							outline: "none",
							color: token("color.text"),
							caretColor: token("color.text"),
							whiteSpace: "pre-wrap",
							overflowWrap: "break-word",
							wordBreak: "normal",
							opacity: isDisabled ? 0.6 : 1,
							pointerEvents: isDisabled ? "none" : "auto",
						}}
					>
						{nodes.map((node, index) => {
							const isLastNode = index === nodes.length - 1;

							if (node.type === "skill") {
								const isFocused = focusedSkillId === node.skill.id;
								const isSelected = selectedSkillIds.includes(node.skill.id);
								return (
									<span
										key={`skill-${node.skill.id}`}
										data-node-index={index}
										data-node-type="skill"
										contentEditable={false}
										style={{
											display: "inline-flex",
											verticalAlign: "middle",
											marginRight: isLastNode ? 0 : token("space.025"),
											marginBottom: hasWrapping ? token("space.025") : 0,
											userSelect: "all",
											cursor: "pointer",
										}}
									>
										<SkillLozenge
											icon={getIcon(node.skill.icon || "add", "small", node.skill.fill)}
											label={node.skill.name}
											color="blue"
											fillColor={node.skill.fill}
											onClick={() => handleRemoveSkill(node.skill.id)}
											focusRingColor={isFocused || isSelected ? token("color.border.focused") : undefined}
										/>
									</span>
								);
							} else {
								// Text node - use stable ID-based key
								// The beforeinput handler prevents direct DOM modification,
								// so React's reconciliation should work correctly
								return (
									<span
										key={`text-${node.id}`}
										data-node-index={index}
										data-node-type="text"
										style={{
											display: "inline",
											verticalAlign: "middle",
										}}
									>
										{/* Use explicit text or zero-width space for empty spans */}
										{node.content || "\u200B"}
										{/* Ghost text after the last text segment when cursor is at end */}
										{isLastNode && shouldShowGhost && (
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
												contentEditable={false}
											>
												{ghostSuffix}
											</span>
										)}
									</span>
								);
							}
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
