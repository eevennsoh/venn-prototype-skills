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
	arrowKeyPress?: { direction: "up" | "down"; timestamp: number } | null;
	onArrowKeyProcessed?: () => void;
	searchQuery?: string;
	shouldShowGreeting?: boolean;
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
export function useSkillSuggestions({
	onSkillHighlight,
	arrowKeyPress,
	onArrowKeyProcessed,
	searchQuery = "",
	shouldShowGreeting = true,
}: UseSkillSuggestionsProps): UseSkillSuggestionsReturn {
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
		let skillsToDisplay: Skill[] = [];

		if (searchQuery.trim()) {
			// When typing/searching: show up to 5 search results + "Discover more skills"
			skillsToDisplay = searchSkills(searchQuery).slice(0, 5);
		} else {
			// Default state: show 5 default suggestions + "Discover more skills"
			skillsToDisplay = getDefaultSuggestions(5);
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
	}, [searchQuery]);

	// Reset highlighted index when displayed skills change
	useEffect(() => {
		if (!searchQuery.trim()) {
			// No highlighting when not typing
			setHighlightedIndex(-1);
		} else if (displayedSkills.length > 0) {
			// Check if there are any real skills (not just "Discover more skills")
			const discoverMore = getDiscoverMoreSkill();
			const hasRealSkills = displayedSkills.some((skill) => skill.skill.id !== discoverMore.id);

			if (hasRealSkills) {
				// Auto-highlight first item when typing starts and there are results
				setHighlightedIndex(0);
			} else {
				// Only "Discover more skills" exists, don't highlight
				setHighlightedIndex(-1);
			}
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

		// Find the index of the "Discover more skills" item (it's always the last one if it exists)
		const discoverMore = getDiscoverMoreSkill();
		const lastItemIsDiscoverMore = displayedSkills.length > 0 && displayedSkills[displayedSkills.length - 1].skill.id === discoverMore.id;

		// Maximum navigable index (exclude "Discover more skills" from keyboard navigation)
		const maxNavigableIndex = lastItemIsDiscoverMore ? displayedSkills.length - 2 : displayedSkills.length - 1;

		// If there are no real skills (only "Discover more skills"), don't allow navigation
		if (maxNavigableIndex < 0) {
			onArrowKeyProcessed?.();
			return;
		}

		let currentIndex = highlightedIndex;
		// If nothing is highlighted yet, start from the first item
		if (currentIndex === -1) {
			currentIndex = 0;
		}

		if (arrowKeyPress.direction === "down") {
			const newIndex = currentIndex >= maxNavigableIndex ? 0 : currentIndex + 1;
			setHighlightedIndex(newIndex);
			if (newIndex >= 0 && newIndex <= maxNavigableIndex) {
				onSkillHighlight?.(displayedSkills[newIndex].skill);
			}
		} else if (arrowKeyPress.direction === "up") {
			const newIndex = currentIndex === 0 ? maxNavigableIndex : currentIndex - 1;
			setHighlightedIndex(newIndex);
			if (newIndex >= 0 && newIndex <= maxNavigableIndex) {
				onSkillHighlight?.(displayedSkills[newIndex].skill);
			}
		}

		// Clear the arrow key press to prevent re-triggering
		onArrowKeyProcessed?.();
	}, [arrowKeyPress, onSkillHighlight, onArrowKeyProcessed, searchQuery, displayedSkills, highlightedIndex]);

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
				return;
			}

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

