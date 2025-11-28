"use client";

import React, { useMemo, useState, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import SkillListItem from "./SkillListItem";
import ChatGreeting from "./ChatGreeting";
import { getDefaultSuggestions, searchSkills } from "@/lib/skills-data";
import { getIcon } from "@/lib/icon-mapper";

export interface SkillSuggestionsProps {
	onSkillSelect?: (skill: string) => void;
	searchQuery?: string;
	shouldShowGreeting?: boolean;
}

interface SkillDisplay {
	id: string;
	label: string;
	byline?: string;
	icon: React.ReactNode;
}

export default function SkillSuggestions({ onSkillSelect, searchQuery = "", shouldShowGreeting = true }: SkillSuggestionsProps) {
	const [greetingOpacity, setGreetingOpacity] = useState(0);
	const [greetingTransform, setGreetingTransform] = useState("translateY(16px)");
	const [skillsOpacity, setSkillsOpacity] = useState(0);
	const [skillsTransform, setSkillsTransform] = useState("translateY(8px)");
	const [hasAnimated, setHasAnimated] = useState(false);

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

	// Initial stagger animation on mount
	useEffect(() => {
		if (!hasAnimated) {
			// Stagger: greeting first, then skills
			setGreetingOpacity(1);
			setGreetingTransform("translateY(0)");
			setTimeout(() => {
				setSkillsOpacity(1);
				setSkillsTransform("translateY(0)");
				setHasAnimated(true);
			}, 100); // 100ms delay for stagger
		}
	}, [hasAnimated]);

	// Handle greeting fade in/out based on shouldShowGreeting
	useEffect(() => {
		if (shouldShowGreeting) {
			// Fade in greeting with transform
			setGreetingOpacity(1);
			setGreetingTransform("translateY(0)");
			// Ensure skills are visible
			if (hasAnimated) {
				setSkillsOpacity(1);
				setSkillsTransform("translateY(0)");
			}
		} else {
			// Fade out greeting quickly when typing starts
			setGreetingOpacity(0);
			// Keep skills visible
			setSkillsOpacity(1);
			setSkillsTransform("translateY(0)");
		}
	}, [shouldShowGreeting, hasAnimated]);

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
			<div
				style={{
					opacity: greetingOpacity,
					transform: greetingTransform,
					transition: shouldShowGreeting ? "opacity 0.3s ease-in-out, transform 0.3s ease-in-out" : "opacity 0.15s ease-out, transform 0.15s ease-out",
					width: "100%",
					pointerEvents: greetingOpacity === 0 ? "none" : "auto",
					visibility: greetingOpacity === 0 ? "hidden" : "visible",
				}}
			>
				<ChatGreeting />
			</div>

			{/* Skills list */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: token("space.050"),
					width: "100%",
					maxWidth: "360px",
					opacity: skillsOpacity,
					transform: skillsTransform,
					transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
				}}
			>
				{displayedSkills.map((skill) => (
					<SkillListItem key={skill.id} icon={skill.icon} label={skill.label} byline={skill.byline} onClick={() => onSkillSelect?.(skill.label)} />
				))}
			</div>
		</div>
	);
}
