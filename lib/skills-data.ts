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
 * Calculate weighted match score for a skill based on query
 * Higher scores = better matches
 */
function calculateMatchScore(skill: Skill, query: string): number {
	const lowerQuery = query.toLowerCase();
	const lowerName = skill.name.toLowerCase();
	const lowerDescription = skill.description.toLowerCase();
	
	let score = 0;
	
	// Name matches (highest weight)
	if (lowerName === lowerQuery) {
		score += 100; // Exact match
	} else if (lowerName.startsWith(lowerQuery)) {
		score += 80; // Starts with query
	} else if (lowerName.includes(lowerQuery)) {
		score += 60; // Contains query
	}
	
	// Description matches (medium weight)
	if (lowerDescription.includes(lowerQuery)) {
		score += 40;
	}
	
	// Tag matches (lower weight)
	if (skill.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
		score += 20;
	}
	
	// Bonus for shorter names (more relevant)
	if (score > 0 && lowerName.length < 25) {
		score += 5;
	}
	
	return score;
}

/**
 * Search skills by name or description with weighted scoring
 * Returns results sorted by relevance
 */
export function searchSkills(query: string): Skill[] {
	if (!query.trim()) {
		return [];
	}
	
	const results = data.skills
		.map((skill) => ({
			skill,
			score: calculateMatchScore(skill, query),
		}))
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.map(({ skill }) => skill);
	
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
