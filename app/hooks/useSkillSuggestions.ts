"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { getDefaultSuggestions, searchSkills, getDiscoverMoreSkill } from "@/lib/skills-queries";
import { getIcon } from "@/lib/icon-mapper";
import type { Skill } from "@/lib/skills";

export interface SkillDisplay {
	id: string;
	label: string;
	byline?: string;
	icon: React.ReactNode;
	skill: Skill;
}

interface UseSkillSuggestionsProps {
	onSkillHighlight?: (skill: Skill | null) => void;
	searchQuery?: string;
	shouldShowGreeting?: boolean;
	selectedSkills?: Skill[];
}

interface UseSkillSuggestionsReturn {
	// Refs
	containerRef: React.RefObject<HTMLDivElement>;

	// State
	greetingOpacity: number;
	greetingTransform: string;
	skillsOpacity: number;
	skillsTransform: string;
	highlightedIndex: number;

	// Computed
	displayedSkills: SkillDisplay[];
	suggestionLabel: string;
	greetingTransition: string;
	skillsTransition: string;
	greetingPointerEvents: "none" | "auto";

	// Handlers
	handleItemMouseEnter: (index: number) => void;
	handleContainerMouseLeave: () => void;
	shouldHighlightItem: (index: number) => boolean;
}

/**
 * Custom hook for managing skill suggestions state and logic
 * Extracts animation management, highlighting, arrow key navigation, and skill display logic
 */
export function useSkillSuggestions({ onSkillHighlight, searchQuery = "", shouldShowGreeting = true, selectedSkills = [] }: UseSkillSuggestionsProps): UseSkillSuggestionsReturn {
	const [greetingOpacity, setGreetingOpacity] = useState(0);
	const [greetingTransform, setGreetingTransform] = useState("translateY(16px)");
	const [skillsOpacity, setSkillsOpacity] = useState(0);
	const [skillsTransform, setSkillsTransform] = useState("translateY(8px)");
	const [hasAnimated, setHasAnimated] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const isKeyboardNavigationRef = useRef(false);

	// Get IDs of already-selected skills for filtering
	const selectedSkillIds = useMemo(() => selectedSkills.map((s) => s.id), [selectedSkills]);

	// Memoize skills calculation based on search query
	const displayedSkills = useMemo(() => {
		let skillsToDisplay: Skill[] = [];

		if (searchQuery.trim()) {
			// When typing/searching: show up to 5 search results + "Discover more skills"
			// Filter out already-selected skills
			skillsToDisplay = searchSkills(searchQuery)
				.filter((skill) => !selectedSkillIds.includes(skill.id))
				.slice(0, 5);
		} else {
			// Default state: show 5 default suggestions + "Discover more skills"
			// Filter out already-selected skills
			skillsToDisplay = getDefaultSuggestions(5).filter((skill) => !selectedSkillIds.includes(skill.id));
		}

		// Always append "Discover more skills" as the last item
		const discoverMore = getDiscoverMoreSkill();
		skillsToDisplay = [...skillsToDisplay, discoverMore];

		// If no actual skills found (only in search with no results), show just "Discover more skills"
		if (searchQuery.trim() && skillsToDisplay.length === 1) {
			return [
				{
					id: discoverMore.id,
					label: discoverMore.name,
					byline: discoverMore.description,
					icon: getIcon(discoverMore.icon || "add", "small", discoverMore.fill),
					skill: discoverMore,
				},
			];
		}

		return skillsToDisplay.map((skill) => ({
			id: skill.id,
			label: skill.name,
			byline: skill.description,
			icon: getIcon(skill.icon || "add", "small", skill.fill),
			skill: skill,
		}));
	}, [searchQuery, selectedSkillIds]);

	// Use a ref for the callback to avoid infinite loops
	const onSkillHighlightRef = useRef(onSkillHighlight);
	onSkillHighlightRef.current = onSkillHighlight;

	// Reset highlighted index when displayed skills change, but still provide first skill for ghost text
	useEffect(() => {
		// No auto-highlighting when typing - only highlight on mouse hover or keyboard navigation
		setHighlightedIndex(-1);

		// But still provide first skill for ghost text purposes when typing
		if (searchQuery.trim()) {
			const discoverMore = getDiscoverMoreSkill();
			const realSkills = displayedSkills.filter((s) => s.skill.id !== discoverMore.id);
			if (realSkills.length > 0) {
				onSkillHighlightRef.current?.(realSkills[0].skill);
			} else {
				onSkillHighlightRef.current?.(null);
			}
		} else {
			onSkillHighlightRef.current?.(null);
		}
	}, [searchQuery, displayedSkills]);

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
			// Don't highlight "Discover more skills" when typing (searching) unless it's the only item
			const discoverMore = getDiscoverMoreSkill();
			const isDiscoverMore = displayedSkills[index].skill.id === discoverMore.id;
			const hasRealSkills = displayedSkills.some((skill) => skill.skill.id !== discoverMore.id);

			if (isDiscoverMore && searchQuery.trim() && hasRealSkills) {
				// Don't highlight discover more when typing and there are real skills
				// Clear visual highlight but keep first skill for ghost text
				setHighlightedIndex(-1);
				const realSkills = displayedSkills.filter((s) => s.skill.id !== discoverMore.id);
				onSkillHighlight?.(realSkills[0]?.skill ?? null);
				return;
			}

			isKeyboardNavigationRef.current = false;
			setHighlightedIndex(index);
			onSkillHighlight?.(displayedSkills[index].skill);
		}
	};

	const handleContainerMouseLeave = () => {
		// Reset visual highlight when mouse leaves the suggestions container
		setHighlightedIndex(-1);

		// But restore first skill for ghost text purposes when typing
		if (searchQuery.trim()) {
			const discoverMore = getDiscoverMoreSkill();
			const realSkills = displayedSkills.filter((s) => s.skill.id !== discoverMore.id);
			if (realSkills.length > 0) {
				onSkillHighlight?.(realSkills[0].skill);
			} else {
				onSkillHighlight?.(null);
			}
		} else {
			onSkillHighlight?.(null);
		}
	};

	const shouldHighlightItem = (index: number): boolean => {
		const discoverMore = getDiscoverMoreSkill();
		const isDiscoverMore = displayedSkills[index].skill.id === discoverMore.id;
		const hasRealSkills = displayedSkills.some((s) => s.skill.id !== discoverMore.id);
		return highlightedIndex === index && (!!searchQuery.trim() || shouldShowGreeting) && !(isDiscoverMore && searchQuery.trim() && hasRealSkills);
	};

	// Computed values
	const discoverMore = getDiscoverMoreSkill();
	const hasRealSkills = displayedSkills.some((s) => s.skill.id !== discoverMore.id);
	const suggestionLabel = hasRealSkills ? "Suggested skills" : "Can't find what you're looking for?";
	const greetingTransition = shouldShowGreeting ? "opacity 0.3s ease-in-out, transform 0.3s ease-in-out" : "opacity 0.15s ease-out, transform 0.15s ease-out";
	const skillsTransition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
	const greetingPointerEvents = greetingOpacity === 0 ? "none" : "auto";

	return {
		// Refs
		containerRef,

		// State
		greetingOpacity,
		greetingTransform,
		skillsOpacity,
		skillsTransform,
		highlightedIndex,

		// Computed
		displayedSkills,
		suggestionLabel,
		greetingTransition,
		skillsTransition,
		greetingPointerEvents,

		// Handlers
		handleItemMouseEnter,
		handleContainerMouseLeave,
		shouldHighlightItem,
	};
}
