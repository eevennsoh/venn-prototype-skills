"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";
import SkillListItem from "./SkillListItem";
import ChatGreeting from "./ChatGreeting";
import { useSkillSuggestions } from "@/app/hooks/useSkillSuggestions";
import type { Skill } from "@/lib/skills";

export interface SkillSuggestionsProps {
	onSkillSelect?: (skill: string) => void;
	onSkillHighlight?: (skill: Skill | null) => void;
	onSkillConfirm?: (skill: Skill) => void;
	arrowKeyPress?: { direction: "up" | "down"; timestamp: number } | null;
	onArrowKeyProcessed?: () => void;
	searchQuery?: string;
	shouldShowGreeting?: boolean;
}

export default function SkillSuggestions({ onSkillSelect, onSkillHighlight, onSkillConfirm, arrowKeyPress, onArrowKeyProcessed, searchQuery = "", shouldShowGreeting = true }: SkillSuggestionsProps) {
	const {
		containerRef,
		greetingOpacity,
		greetingTransform,
		skillsOpacity,
		skillsTransform,
		displayedSkills,
		suggestionLabel,
		greetingTransition,
		skillsTransition,
		greetingPointerEvents,
		handleItemMouseEnter,
		handleContainerMouseLeave,
		shouldHighlightItem,
	} = useSkillSuggestions({
		onSkillHighlight,
		arrowKeyPress,
		onArrowKeyProcessed,
		searchQuery,
		shouldShowGreeting,
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: token("space.200"),
				alignItems: "center",
				justifyContent: "flex-end",
				width: "100%",
				flex: 1,
				paddingTop: token("space.200"),
				paddingRight: token("space.200"),
				paddingBottom: token("space.300"),
				paddingLeft: token("space.200"),
				maxWidth: "360px",
				margin: "0 auto",
			}}
		>
			{shouldShowGreeting && (
				<div
					style={{
						opacity: greetingOpacity,
						transform: greetingTransform,
						transition: greetingTransition,
						width: "100%",
						pointerEvents: greetingPointerEvents,
					}}
				>
					<ChatGreeting />
				</div>
			)}

			{/* Skills list */}
			<div
				ref={containerRef}
				onMouseLeave={handleContainerMouseLeave}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: token("space.050"),
					width: "100%",
					maxWidth: "360px",
					opacity: skillsOpacity,
					transform: skillsTransform,
					transition: skillsTransition,
				}}
			>
				{/* "Suggested skills" label - only show when typing */}
				{searchQuery.trim() && !shouldShowGreeting && (
					<div
						style={{
							paddingLeft: token("space.050"),
							paddingBottom: token("space.050"),
						}}
					>
						<Text size="small" color="color.text.subtlest">
							{suggestionLabel}
						</Text>
					</div>
				)}
				{displayedSkills.map((skill, index) => (
					<SkillListItem
						key={skill.id}
						icon={skill.icon}
						label={skill.label}
						byline={skill.byline}
						isActive={shouldHighlightItem(index)}
						onClick={() => {
							if (onSkillConfirm) {
								// New flow: convert to lozenge
								onSkillConfirm(skill.skill);
							} else {
								// Fallback: legacy flow
								onSkillSelect?.(skill.label);
							}
						}}
						onMouseEnter={() => handleItemMouseEnter(index)}
					/>
				))}
			</div>
		</div>
	);
}
