export interface Skill {
	id: string;
	name: string;
	description: string;
	category: string;
	type: "atlassian" | "third-party";
	icon?: string; // SVG string or icon identifier
	appLogo?: string;
	appName?: string;
	tags?: string[];
}

export interface SkillCategory {
	id: string;
	name: string;
	description?: string;
}
