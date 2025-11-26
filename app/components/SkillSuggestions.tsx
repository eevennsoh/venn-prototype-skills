"use client";

import React, { useMemo } from "react";
import { token } from "@atlaskit/tokens";
import SkillListItem from "./SkillListItem";
import { getDefaultSuggestions, searchSkills } from "@/lib/skills-data";
import { getIcon } from "@/lib/icon-mapper";

export interface SkillSuggestionsProps {
	onSkillSelect?: (skill: string) => void;
	searchQuery?: string;
}

interface SkillDisplay {
	id: string;
	label: string;
	byline?: string;
	icon: React.ReactNode;
}

export default function SkillSuggestions({ onSkillSelect, searchQuery = "" }: SkillSuggestionsProps) {
	// Memoize skills calculation based on search query
	const displayedSkills = useMemo(() => {
		const skillsToDisplay = searchQuery.trim() ? searchSkills(searchQuery).slice(0, 6) : getDefaultSuggestions(6);
		
		return skillsToDisplay.map((skill) => ({
			id: skill.id,
			label: skill.name,
			byline: skill.description,
			icon: getIcon(skill.icon || "add"),
		}));
	}, [searchQuery]);

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
				padding: `${token("space.200")} ${token("space.200")} ${token("space.400")}`,
				maxWidth: "360px",
				margin: "0 auto",
			}}
		>
			{/* Greetings */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: token("space.100"),
					alignItems: "center",
					justifyContent: "center",
					padding: `${token("space.100")} ${token("space.100")}`,
				}}
			>
				<img
					src="/Chat.svg"
					alt="Chat"
					style={{
						width: 80,
						height: 80,
						objectFit: "contain",
					}}
				/>
				<h2
					style={{
						margin: 0,
						fontSize: "16px",
						fontWeight: 600,
						color: token("color.text"),
						textAlign: "center",
						whiteSpace: "nowrap",
					}}
				>
					Let's do this together
				</h2>
			</div>

		{/* Skills list */}
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: token("space.050"),
				width: "100%",
				maxWidth: "360px",
			}}
		>
			{displayedSkills.map((skill) => (
				<SkillListItem key={skill.id} icon={skill.icon} label={skill.label} byline={skill.byline} onClick={() => onSkillSelect?.(skill.label)} />
			))}
		</div>
		</div>
	);
}
