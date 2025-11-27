import type { Skill, SkillCategory } from "./types/skills";
import skillsData from "./data/skills.json";

interface SkillsData {
	categories: SkillCategory[];
	skills: Skill[];
}

const data: SkillsData = skillsData as SkillsData;

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
 * Get default suggestions (first 6 skills)
 */
export function getDefaultSuggestions(limit: number = 6): Skill[] {
	return data.skills.slice(0, limit);
}
