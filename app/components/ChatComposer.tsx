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
		inputRef,
		segments,
		selectedSkills,
		focusedSkillId,
		hasWrapping,
		currentTextSegment,
		promptText,
		hasContent,
		isComposerEmpty,
		ghostSuffix,
		shouldShowGhost,
		placeholderSkill,
		uniqueClass,
		handleInput,
		handleKeyDown,
		handleTagKeyDown,
		handleAddSkill,
		handleRemoveSkill,
		handleClearAndFocus,
		setFocusedSkillId,
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
							{placeholderSkill ? placeholderSkill.name : "Ask, @mention, or / for skills"}
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
								const isFocused = focusedSkillId === segment.skill.id;
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
										onFocus={() => {
											setFocusedSkillId(segment.skill.id);
										}}
										onBlur={() => {
											setFocusedSkillId(null);
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
											focusRingColor={isFocused ? token("color.border.focused") : undefined}
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
