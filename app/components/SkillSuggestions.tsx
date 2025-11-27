"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { token } from "@atlaskit/tokens";
import SkillListItem from "./SkillListItem";
import ChatGreeting from "./ChatGreeting";
import { getDefaultSuggestions, searchSkills } from "@/lib/skills-data";
import { getIcon } from "@/lib/icon-mapper";
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

interface SkillDisplay {
	id: string;
	label: string;
	byline?: string;
	icon: React.ReactNode;
	skill: Skill;
}

export default function SkillSuggestions({ onSkillSelect, onSkillHighlight, onSkillConfirm, arrowKeyPress, onArrowKeyProcessed, searchQuery = "", shouldShowGreeting = true }: SkillSuggestionsProps) {
	const [greetingOpacity, setGreetingOpacity] = useState(0);
	const [greetingTransform, setGreetingTransform] = useState("translateY(16px)");
	const [skillsOpacity, setSkillsOpacity] = useState(0);
	const [skillsTransform, setSkillsTransform] = useState("translateY(8px)");
	const [hasAnimated, setHasAnimated] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const isKeyboardNavigationRef = useRef(false);

	// Memoize skills calculation based on search query
	const displayedSkills = useMemo(() => {
		const skillsToDisplay = searchQuery.trim() ? searchSkills(searchQuery).slice(0, 6) : getDefaultSuggestions(6);

		return skillsToDisplay.map((skill) => ({
			id: skill.id,
			label: skill.name,
			byline: skill.description,
			icon: getIcon(skill.icon || "add", "small", skill.fill),
			skill: skill,
		}));
	}, [searchQuery]);

	// Reset highlighted index when displayed skills change
	useEffect(() => {
		if (!searchQuery.trim()) {
			// No highlighting when not typing
			setHighlightedIndex(-1);
		} else if (displayedSkills.length > 0) {
			// Auto-highlight first item when typing starts and there are results
			setHighlightedIndex(0);
		} else {
			// No results, no highlight
			setHighlightedIndex(-1);
		}
	}, [searchQuery, displayedSkills.length]);

	// Handle external arrow key presses from composer
	useEffect(() => {
		// Only allow navigation if user has started typing (searchQuery is not empty)
		if (!arrowKeyPress || displayedSkills.length === 0 || !searchQuery.trim()) return;

		isKeyboardNavigationRef.current = true;

		let currentIndex = highlightedIndex;
		// If nothing is highlighted yet, start from the first item
		if (currentIndex === -1) {
			currentIndex = 0;
		}

		if (arrowKeyPress.direction === "down") {
			const newIndex = (currentIndex + 1) % displayedSkills.length;
			setHighlightedIndex(newIndex);
			if (newIndex >= 0 && newIndex < displayedSkills.length) {
				onSkillHighlight?.(displayedSkills[newIndex].skill);
			}
		} else if (arrowKeyPress.direction === "up") {
			const newIndex = currentIndex === 0 ? displayedSkills.length - 1 : currentIndex - 1;
			setHighlightedIndex(newIndex);
			if (newIndex >= 0 && newIndex < displayedSkills.length) {
				onSkillHighlight?.(displayedSkills[newIndex].skill);
			}
		}

		// Clear the arrow key press to prevent re-triggering
		onArrowKeyProcessed?.();
	}, [arrowKeyPress, onSkillHighlight, onArrowKeyProcessed, searchQuery]);

	// This effect is now handled by the previous useEffect that resets highlighted index

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

	const handleItemMouseEnter = (index: number) => {
		// Allow mouse hover highlighting if user has started typing OR we're showing the greeting (initial state)
		if (searchQuery.trim() || shouldShowGreeting) {
			isKeyboardNavigationRef.current = false;
			setHighlightedIndex(index);
			onSkillHighlight?.(displayedSkills[index].skill);
		}
	};

	const handleContainerMouseLeave = () => {
		// Reset highlight when mouse leaves the suggestions container
		setHighlightedIndex(-1);
		onSkillHighlight?.(null);
	};

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
						transition: shouldShowGreeting ? "opacity 0.3s ease-in-out, transform 0.3s ease-in-out" : "opacity 0.15s ease-out, transform 0.15s ease-out",
						width: "100%",
						pointerEvents: greetingOpacity === 0 ? "none" : "auto",
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
					transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
				}}
			>
				{displayedSkills.map((skill, index) => (
					<SkillListItem
						key={skill.id}
						icon={skill.icon}
						label={skill.label}
						byline={skill.byline}
						isActive={highlightedIndex === index && (!!searchQuery.trim() || shouldShowGreeting)}
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
