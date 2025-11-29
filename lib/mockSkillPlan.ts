export interface SkillStepData {
	id: string;
	title: string;
	description: string;
	status: "pending" | "active" | "completed" | "skipped";
}

export interface SkillPlan {
	id: string;
	title: string;
	steps: SkillStepData[];
}

export const mockSkillPlan: SkillPlan = {
	id: "plan-1",
	title: "Become a Confluence Pro",
	steps: [
		{
			id: "step-1",
			title: "Create your first page",
			description: "Start by creating a blank page and adding a title. Use the slash command to add a table.",
			status: "active",
		},
		{
			id: "step-2",
			title: "Share with your team",
			description: "Click the Share button and invite at least one teammate to collaborate on your page.",
			status: "pending",
		},
		{
			id: "step-3",
			title: "Add a comment",
			description: "Highlight some text on the page and add an inline comment to ask for feedback.",
			status: "pending",
		},
	],
};
