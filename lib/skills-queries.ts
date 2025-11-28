import type { Skill, SkillCategory } from "./skills";
import { skillsData } from "./skills";

const data = skillsData;

/**
 * Get all available skills
 */
export function getAllSkills(): Skill[] {
	return data.skills;
}

/**
 * Get all skill categories
 */
export function getCategories(): SkillCategory[] {
	return data.categories;
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(categoryId: string): Skill[] {
	return data.skills.filter((skill) => skill.category === categoryId);
}

/**
 * Get skills by type
 */
export function getSkillsByType(type: "atlassian" | "third-party"): Skill[] {
	return data.skills.filter((skill) => skill.type === type);
}

/**
 * Search skills by prefix matching - only skills that start with the query
 * Returns results sorted alphabetically
 */
export function searchSkills(query: string): Skill[] {
	if (!query.trim()) {
		return [];
	}

	const lowerQuery = query.toLowerCase();

	const results = data.skills.filter((skill) => skill.name.toLowerCase().startsWith(lowerQuery)).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

	return results;
}

/**
 * Get a single skill by ID
 */
export function getSkillById(id: string): Skill | undefined {
	return data.skills.find((skill) => skill.id === id);
}

/**
 * Get default suggestions (first 5 skills + Discover more skills)
 */
export function getDefaultSuggestions(limit: number = 5): Skill[] {
	return data.skills.slice(0, limit);
}

/**
 * Get the "Discover skills and more" special skill
 */
export function getDiscoverMoreSkill(): Skill {
	return {
		id: "discover-skills",
		name: "Discover skills and more",
		description: "Explore more capabilities",
		category: "productivity",
		type: "atlassian" as const,
		icon: "smart-link-embed",
		collection: "General",
		fill: "color.icon.subtlest",
		tags: ["discover", "explore", "skills"],
	};
}

/**
 * Find skills that match the suffix of the provided text.
 * Used for "fuzzy" matching where the user might have typed multiple words.
 * Returns the matching skills and the matched suffix (query).
 */
export function findMatchingSkills(text: string): { skills: Skill[]; query: string } | null {
	if (!text) return null;

	const lowerText = text.toLowerCase();
	// Look at the last 50 chars max
	const searchWindow = lowerText.slice(-50);

	// Find all potential start positions (word boundaries)
	// We want to find indices where a new word starts
	const startIndices: number[] = [0]; // Always check the full window

	for (let i = 0; i < searchWindow.length; i++) {
		if (searchWindow[i] === " " && i + 1 < searchWindow.length) {
			startIndices.push(i + 1);
		}
	}

	// Sort indices by length of suffix (descending) - we want longest match first
	// index 0 means length 50. index 49 means length 1.
	// We want smallest index first.
	startIndices.sort((a, b) => a - b);

	for (const startIndex of startIndices) {
		const suffix = searchWindow.slice(startIndex);
		if (!suffix.trim()) continue; // Skip empty or whitespace-only queries

		const matches = data.skills.filter((skill) => skill.name.toLowerCase().startsWith(suffix)).sort((a, b) => a.name.localeCompare(b.name));

		if (matches.length > 0) {
			// Return the original case suffix from the input text
			const originalSuffix = text.slice(-suffix.length);
			return { skills: matches, query: originalSuffix };
		}
	}

	return null;
}
