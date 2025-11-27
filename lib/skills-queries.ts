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

	const results = data.skills
		.filter((skill) => skill.name.toLowerCase().startsWith(lowerQuery))
		.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

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
