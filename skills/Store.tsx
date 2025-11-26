import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0";

export interface Skill {
	icon: string;
	title: string;
	description: string;
	iconColor: string;
}

export interface TagProps {
	id: string;
	text: string;
	icon: string;
	iconColor: string;
}

export const useSearchStore = createStore<{ query: string; tags: TagProps[] }>({ query: "", tags: [] });

export const EMPTY_STATE_SUGGESTIONS: Skill[] = [
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 9.08984H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.6947 13.7002H15.7037" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.6947 16.7002H15.7037" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9955 13.7002H12.0045" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9955 16.7002H12.0045" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.29431 13.7002H8.30329" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.29431 16.7002H8.30329" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
		title: "Summarize page",
		description: "",
		iconColor: "#ff0000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
		title: "Summarize changes",
		description: "",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.14 19.14L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
		title: "Change tone",
		description: "",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 20C10.9853 20 13 17.9853 13 15.5C13 13.0147 10.9853 11 8.5 11C6.01472 11 4 13.0147 4 15.5C4 17.9853 6.01472 20 8.5 20Z" fill="#E01E5A"/><path d="M4 15.5C4 13.0147 6.01472 11 8.5 11V8.5C8.5 6.01472 6.48528 4 4 4C1.51472 4 0.5 6.01472 0.5 8.5C0.5 10.9853 2.51472 13.0147 5 13.0147H4V15.5Z" fill="#36C5F0"/><path d="M15.5 20C17.9853 20 20 17.9853 20 15.5C20 13.0147 17.9853 11 15.5 11C13.0147 11 11 13.0147 11 15.5C11 17.9853 13.0147 20 15.5 20Z" fill="#2EB67D"/><path d="M20 15.5C20 17.9853 17.9853 20 15.5 20V22.5C15.5 24.9853 17.5147 27 20 27C22.4853 27 24.5 24.9853 24.5 22.5C24.5 20.0147 22.4853 17.9853 20 17.9853H21.035V15.5H20Z" fill="#ECB22E"/></svg>`,
		title: "Send message",
		description: "",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#625DF5"/><path d="M15 12L10 15V9L15 12Z" fill="white"/></svg>`,
		title: "Turn into Loom video",
		description: "",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 17V5H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
		title: "Discover skills and more",
		description: "",
		iconColor: "#000000",
	},
];

// Hardcoded Atlassian-focused skills (A-Z)
export const ATLASSIAN_SKILLS: Skill[] = [
	// A
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="m5.22 8.47 4.5-4.5 1.06 1.06-4.5 4.5a.664.664 0 0 0 .94.94l4.5-4.5a2.079 2.079 0 0 0-2.94-2.94l-4.5 4.5a3.492 3.492 0 0 0 4.94 4.94l2.5-2.5 1.06 1.06-2.5 2.5a4.993 4.993 0 0 1-7.06-7.06l4.5-4.5a3.578 3.578 0 0 1 5.06 5.06l-4.5 4.5a2.165 2.165 0 0 1-3.06-3.06"/></svg>`,
		title: "Add attachment to issue",
		description: "Attach files or documents to a Jira issue.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M19 3H4.85A2 2 0 0 0 3 5v4h1v10.45A1.67 1.67 0 0 0 5.77 21h12.46A1.67 1.67 0 0 0 20 19.45V9h1V5a2 2 0 0 0-2-2m-1 16H6V9h12zm1-12H5V5h14zm-4 7H9v-2h6z" clip-rule="evenodd"/></svg>`,
		title: "Archive project space",
		description: "Archive an old Confluence space to clean up.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0m-2 9a3.75 3.75 0 0 1 3.75-3.75h4.5A3.75 3.75 0 0 1 14 13v2h-1.5v-2a2.25 2.25 0 0 0-2.25-2.25h-4.5A2.25 2.25 0 0 0 3.5 13v2H2z" clip-rule="evenodd"/></svg>`,
		title: "Assign task to team member",
		description: "Assign a Jira issue to a specific person.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0m-2.174-2.52-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Approve pull request",
		description: "Approve code changes in a Bitbucket pull request.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M10.377.102a.75.75 0 0 1 .346.847L8.985 7.25h4.265a.75.75 0 0 1 .53 1.28l-7.25 7.25a.75.75 0 0 1-1.253-.73l1.738-6.3H2.75a.75.75 0 0 1-.53-1.28L9.47.22a.75.75 0 0 1 .907-.118M7.43 7.25l1.093-3.96L4.56 7.25zm1.142 1.5-1.093 3.96 3.961-3.96z" clip-rule="evenodd"/></svg>`,
		title: "Automate workflow rule",
		description: "Create an automation rule for Jira workflows.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"/><path d="M11.978 13.984c-1.104 0-2-.897-2-2s.896-2 2-2c1.103 0 2 .897 2 2s-.897 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.793 4 4 4 4-1.794 4-4-1.794-4-4-4"/></g></svg>`,
		title: "Add watcher to ticket",
		description: "Add yourself or others as watchers on a ticket.",
		iconColor: "#000000",
	},
	// B
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2.167h11V3a.5.5 0 0 0-.5-.5zm10.5 4.167h-11v2.666h11zm0 4.166h-11V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5z" clip-rule="evenodd"/></svg>`,
		title: "Backlog refinement",
		description: "Review and prioritize items in the Jira backlog.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 8.00026C14.5 6.61955 13.3807 5.50026 12 5.50026C11.2373 5.50026 10.6663 5.79804 10.1484 6.303C9.6025 6.83533 9.1503 7.56242 8.63867 8.39382C8.1504 9.18726 7.60233 10.0854 6.89844 10.7717C6.16636 11.4855 5.23722 12.0003 4 12.0003C1.79086 12.0003 0 10.2094 0 8.00026C0 5.81853 1.7467 4.04492 3.91797 4.00124L3.54785 3.01393C3.42933 2.69788 3.53631 2.341 3.80957 2.14284C4.08283 1.9447 4.45518 1.95347 4.71875 2.16432L7.21875 4.16432C7.39666 4.30665 7.5 4.52242 7.5 4.75026C7.5 4.9781 7.39666 5.19387 7.21875 5.3362L4.71875 7.3362C4.45518 7.54705 4.08283 7.55582 3.80957 7.35768C3.53631 7.15952 3.42933 6.80264 3.54785 6.48659L3.91602 5.50417C2.57422 5.5485 1.5 6.64768 1.5 8.00026C1.5 9.38097 2.61929 10.5003 4 10.5003C4.76271 10.5003 5.33366 10.2025 5.85156 9.69753C6.3975 9.1652 6.8497 8.43811 7.36133 7.60671C7.8496 6.81326 8.39767 5.91508 9.10156 5.22878C9.83364 4.51504 10.7628 4.00026 12 4.00026C14.2091 4.00026 16 5.79112 16 8.00026C16 10.2094 14.2091 12.0003 12 12.0003C10.6871 12.0003 9.72485 11.4207 8.97656 10.6458L10.0557 9.60475C10.6005 10.169 11.1956 10.5003 12 10.5003C13.3807 10.5003 14.5 9.38097 14.5 8.00026Z" fill="#292A2E"/>
</svg>
`,
		title: "Build pipeline status",
		description: "Check the status of your Bitbucket build pipeline.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M8 10V8.002A4.004 4.004 0 0 1 12 4a4 4 0 0 1 4 4.002V10a2 2 0 0 1 2 2v6c0 1.105-.902 2-2.009 2H8.01A2 2 0 0 1 6 18v-6c0-1.102.897-1.995 2-2m2 0h4V8.002A2 2 0 0 0 12 6c-1.102 0-2 .898-2 2.002zm2 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>`,
		title: "Branch permissions setup",
		description: "Configure write access for Git branches.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 3.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h2.833v-9zm4.333 0v9h3.334v-9zm4.834 0v9H14a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" clip-rule="evenodd"/></svg>`,
		title: "Board configuration",
		description: "Customize columns and filters on a Jira board.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 2.5A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 8 2.5m3 1.52V4a3 3 0 0 0-6 0v.02c-.29.05-.553.182-.761.372l-.887-.633-.917-2.064-1.37.61.944 2.125c.09.204.234.38.416.51l1.325.946V7H.5v1.5h3.25v1.149l-1.15.958a1.25 1.25 0 0 0-.318.401L1.08 13.415l1.342.67 1.18-2.36.46-.383A4.25 4.25 0 0 0 8.001 14h.249A4 4 0 0 0 12 11.393l.4.333 1.18 2.36 1.34-.671-1.202-2.407a1.25 1.25 0 0 0-.318-.401l-1.15-.958V8.5h3.25V7h-3.25V5.886l1.325-.946a1.25 1.25 0 0 0 .416-.51l.944-2.125-1.37-.61-.917 2.064-.887.633A1.5 1.5 0 0 0 11 4.02M10.75 10V5.5h-5.5v4.443l.035.226A2.75 2.75 0 0 0 8 12.5h.249a2.5 2.5 0 0 0 2.5-2.5" clip-rule="evenodd"/></svg>`,
		title: "Bug report creation",
		description: "Log a new bug found in the system.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM12 6H4V4.5h8zm-2 3.5H4V8h6z" clip-rule="evenodd"/></svg>`,
		title: "Blog post publication",
		description: "Write and publish a blog post on Confluence.",
		iconColor: "#000000",
	},
	// C
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5A4.75 4.75 0 0 0 8 11h5.44l-2.22-2.22 1.06-1.06 3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5-1.06-1.06 2.22-2.22H0V11h3.938A6.25 6.25 0 1 1 14.25 6.25h-1.5A4.75 4.75 0 0 0 8 1.5" clip-rule="evenodd"/></svg>`,
		title: "Create new sprint",
		description: "Start a new sprint iteration for the team.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8.75 1v7.44l2.72-2.72 1.06 1.06-4 4a.75.75 0 0 1-1.06 0l-4-4 1.06-1.06 2.72 2.72V1zM1 13V9h1.5v4a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9H15v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2" clip-rule="evenodd"/></svg>`,
		title: "Clone git repository",
		description: "Clone a Bitbucket repository to local machine.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 3.125A2.625 2.625 0 0 1 2.625.5h10.75A2.625 2.625 0 0 1 16 3.125v8.25A2.625 2.625 0 0 1 13.375 14H4.449l-3.327 1.901A.75.75 0 0 1 0 15.25zM2.625 2C2.004 2 1.5 2.504 1.5 3.125v10.833L4.05 12.5h9.325c.621 0 1.125-.504 1.125-1.125v-8.25C14.5 2.504 13.996 2 13.375 2zM12 6.5H4V5h8zm-3 3H4V8h5z" clip-rule="evenodd"/></svg>`,
		title: "Comment on pull request",
		description: "Add feedback to code in a pull request.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M6.058.462A.75.75 0 0 1 6.75 0h2.5a.75.75 0 0 1 .692.462l1.026 2.462 2.578-.374a.75.75 0 0 1 .757.367l1.25 2.166a.75.75 0 0 1-.049.824L13.937 8l1.567 2.093c.18.24.2.565.05.825l-1.25 2.165a.75.75 0 0 1-.758.367l-2.578-.374-1.026 2.463A.75.75 0 0 1 9.25 16h-2.5a.75.75 0 0 1-.692-.461l-1.026-2.463-2.578.374a.75.75 0 0 1-.757-.367l-1.25-2.165a.75.75 0 0 1 .049-.825L2.063 8 .496 5.907a.75.75 0 0 1-.05-.824l1.25-2.166a.75.75 0 0 1 .758-.367l2.578.374zM7.25 1.5l-.871 2.09c-.242.58-.845.923-1.467.833l-2.17-.315-.749 1.296L3.32 7.176c.366.488.366 1.16 0 1.648l-1.327 1.772.749 1.296 2.17-.315a1.375 1.375 0 0 1 1.467.832L7.25 14.5h1.5l.871-2.09c.242-.58.845-.923 1.467-.833l2.17.315.749-1.296-1.327-1.772a1.375 1.375 0 0 1 0-1.648l1.327-1.772-.749-1.296-2.17.315A1.375 1.375 0 0 1 9.62 3.59L8.75 1.5zm.75 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0" clip-rule="evenodd"/></svg>`,
		title: "Configure project settings",
		description: "Update details and settings for a Jira project.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0m-2.174-2.52-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Close resolved issue",
		description: "Mark a finished Jira issue as Closed.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM12 6H4V4.5h8zm-2 3.5H4V8h6z" clip-rule="evenodd"/></svg>`,
		title: "Confluence page template",
		description: "Create a page using a standard template.",
		iconColor: "#000000",
	},
	// D
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M6 12h8v-2H6zM4 8.99C4 8.445 4.456 8 5.002 8h9.996C15.55 8 16 8.451 16 8.99V14H4z"/><path d="M6 7.005C6 5.898 6.898 5 7.998 5h2.004C11.106 5 12 5.894 12 7.005V10H6zm4 0V7H7.999c.005 0 .002.003.002.005V8h2z"/><path fill-rule="nonzero" d="M4.5 17h13.994l1.002-3H4.14zm-2.495-4.012A.862.862 0 0 1 2.883 12h18.393c.55 0 .857.417.681.944l-1.707 5.112c-.174.521-.758.944-1.315.944H3.725a1.15 1.15 0 0 1-1.118-.988z"/></g></svg>`,
		title: "Deploy to production",
		description: "Trigger a deployment to the production environment.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M5 5a1 1 0 0 0-1 1v1h16V6a1 1 0 0 0-1-1zm11.15 15h-8.3a1 1 0 0 1-.99-.83L5 8h14l-1.86 11.17a1 1 0 0 1-.99.83M9 4.5a.5.5 0 0 1 .49-.5h5.02a.5.5 0 0 1 .49.5V5H9z"/></svg>`,
		title: "Delete old branch",
		description: "Remove a feature branch after merging.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h4.25v-11zm5.75 0v4.75h4.75V3a.5.5 0 0 0-.5-.5zm4.75 6.25H8.75v4.75H13a.5.5 0 0 0 .5-.5zM1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" clip-rule="evenodd"/></svg>`,
		title: "Dashboard customization",
		description: "Add gadgets to your personal Jira dashboard.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM12 6H4V4.5h8zm-2 3.5H4V8h6z" clip-rule="evenodd"/></svg>`,
		title: "Document requirements",
		description: "Write product requirements in Confluence.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8.75 1v7.44l2.72-2.72 1.06 1.06-4 4a.75.75 0 0 1-1.06 0l-4-4 1.06-1.06 2.72 2.72V1zM1 13V9h1.5v4a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9H15v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2" clip-rule="evenodd"/></svg>`,
		title: "Download build artifacts",
		description: "Get the compiled binaries from a build.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><circle cx="16" cy="9" r="3"/><circle cx="8" cy="6" r="3"/><path d="M11 15c0-1.105.887-2 2-2h6c1.105 0 2 .885 2 2v3.73c0 3.027-10 3.027-10 0z"/><path d="M13 12a1.997 1.997 0 0 0-2-2H5c-1.113 0-2 .897-2 2.003v3.826c0 1.921 4.054 2.518 7 1.984v-2.807A3 3 0 0 1 12.997 12z"/></g></svg>`,
		title: "Daily standup update",
		description: "Post your daily update to the team page.",
		iconColor: "#000000",
	},
	// E
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M11.586.854a2 2 0 0 1 2.828 0l.732.732a2 2 0 0 1 0 2.828L10.01 9.551a2 2 0 0 1-.864.51l-3.189.91a.75.75 0 0 1-.927-.927l.91-3.189a2 2 0 0 1 .51-.864zm1.768 1.06a.5.5 0 0 0-.708 0l-.585.586L13.5 3.94l.586-.586a.5.5 0 0 0 0-.708zM12.439 5 11 3.56 7.51 7.052a.5.5 0 0 0-.128.216l-.54 1.891 1.89-.54a.5.5 0 0 0 .217-.127zM3 2.501a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V10H15v3.001a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h3v1.5z" clip-rule="evenodd"/></svg>`,
		title: "Edit issue description",
		description: "Update the main description of a Jira task.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M13 6.491V16a1 1 0 0 1-2 0V6.491L9.784 7.697a1.05 1.05 0 0 1-1.478 0 1.03 1.03 0 0 1 0-1.465l2.955-2.929a1.05 1.05 0 0 1 1.478 0l2.955 2.93c.408.404.408 1.06 0 1.464a1.05 1.05 0 0 1-1.478 0zM9 9v2H7c-.002 0 0 7.991 0 7.991 0 .004 9.994.009 9.994.009.003 0 .006-7.991.006-7.991 0-.006-2-.009-2-.009V9h2c1.105 0 2 .902 2 2.009v7.982c0 1.11-.897 2.009-2.006 2.009H7.006A2.01 2.01 0 0 1 5 18.991V11.01A2 2 0 0 1 7 9z"/></svg>`,
		title: "Export page to PDF",
		description: "Save a Confluence page as a PDF file.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M19 5h.006C20.107 5 21 5.895 21 6.994v12.012A1.995 1.995 0 0 1 19.006 21H6.994A1.995 1.995 0 0 1 5 19.006V19h13c.555 0 1-.448 1-1zM3 5.006C3 3.898 3.897 3 5.006 3h9.988C16.102 3 17 3.897 17 5.006v9.988A2.005 2.005 0 0 1 14.994 17H5.006A2.005 2.005 0 0 1 3 14.994zM5 5v10h10V5zm1 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 8m0 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 11"/></svg>`,
		title: "Enable service desk",
		description: "Turn on JSM features for a project.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M11.518 3a.5.5 0 0 0-.5-.5H4.983a.5.5 0 0 0-.5.5v9.806L8 10.333l.431.304 3.087 2.169zm1.5 11.202a.776.776 0 0 1-1.122.694l-.099-.06L8 12.166l-3.796 2.67a.775.775 0 0 1-1.22-.634V3a2 2 0 0 1 2-2h6.035a2 2 0 0 1 2 2z"/></svg>`,
		title: "Estimate story points",
		description: "Assign story points to a user story.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M10.271.05a.75.75 0 0 1 .479.7v4.635l3.147.63a.75.75 0 0 1 .407 1.24l-7.75 8.5a.75.75 0 0 1-1.304-.505v-4.635l-3.147-.63a.75.75 0 0 1-.407-1.24l7.75-8.5A.75.75 0 0 1 10.27.05M3.698 8.776l3.052.61v3.93l5.552-6.09-3.052-.61v-3.93z" clip-rule="evenodd"/></svg>`,
		title: "Epic creation",
		description: "Create a large body of work (Epic).",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v.529L8 8.128l6.5-3.6V4a.5.5 0 0 0-.5-.5zm12.5 2.743L8.363 9.641a.75.75 0 0 1-.726 0L1.5 6.243V12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5z" clip-rule="evenodd"/></svg>`,
		title: "Email notification settings",
		description: "Configure which emails you receive from Jira.",
		iconColor: "#000000",
	},
	// F
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z" clip-rule="evenodd"/></svg>`,
		title: "Filter issues by assignee",
		description: "Find all issues assigned to a specific user.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 2.5C3.83579 2.5 3.5 2.83579 3.5 3.25C3.5 3.66421 3.83579 4 4.25 4C4.66422 4 5 3.66421 5 3.25C5 2.83579 4.66422 2.5 4.25 2.5ZM2 3.25C2 2.00736 3.00736 1 4.25 1C5.49264 1 6.5 2.00736 6.5 3.25C6.5 4.22966 5.8739 5.06309 5 5.37197L5 10.628C5.87389 10.9369 6.5 11.7703 6.5 12.75C6.5 13.9926 5.49264 15 4.25 15C3.00736 15 2 13.9926 2 12.75C2 11.7703 2.62611 10.9369 3.5 10.628L3.5 5.37197C2.62611 5.06309 2 4.22966 2 3.25ZM8 2.5H9.75C11.2688 2.5 12.5 3.73122 12.5 5.25L12.5 10.628C13.3739 10.9369 14 11.7703 14 12.75C14 13.9926 12.9926 15 11.75 15C10.5074 15 9.5 13.9926 9.5 12.75C9.5 11.7703 10.1261 10.9369 11 10.628L11 5.25C11 4.55964 10.4404 4 9.75 4H8V2.5ZM4.25 12C3.83579 12 3.5 12.3358 3.5 12.75C3.5 13.1642 3.83579 13.5 4.25 13.5C4.66421 13.5 5 13.1642 5 12.75C5 12.3358 4.66421 12 4.25 12ZM11.75 12C11.3358 12 11 12.3358 11 12.75C11 13.1642 11.3358 13.5 11.75 13.5C12.1642 13.5 12.5 13.1642 12.5 12.75C12.5 12.3358 12.1642 12 11.75 12Z" fill="#292A2E"/>
</svg>
`,
		title: "Fork repository",
		description: "Create a fork of a Bitbucket repository.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M6 12h8v-2H6zM4 8.99C4 8.445 4.456 8 5.002 8h9.996C15.55 8 16 8.451 16 8.99V14H4z"/><path d="M6 7.005C6 5.898 6.898 5 7.998 5h2.004C11.106 5 12 5.894 12 7.005V10H6zm4 0V7H7.999c.005 0 .002.003.002.005V8h2z"/><path fill-rule="nonzero" d="M4.5 17h13.994l1.002-3H4.14zm-2.495-4.012A.862.862 0 0 1 2.883 12h18.393c.55 0 .857.417.681.944l-1.707 5.112c-.174.521-.758.944-1.315.944H3.725a1.15 1.15 0 0 1-1.118-.988z"/></g></svg>`,
		title: "Fix version release",
		description: "Assign a fix version to a set of issues.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2.22 1.22A.75.75 0 0 1 2.75 1H14a.75.75 0 0 1 .6 1.2l-2.662 3.55L14.6 9.3a.75.75 0 0 1-.6 1.2H3.5V15H2V1.75a.75.75 0 0 1 .22-.53M3.5 9h9l-2.1-2.8a.75.75 0 0 1 0-.9l2.1-2.8h-9z" clip-rule="evenodd"/></svg>`,
		title: "Flag impediment",
		description: "Mark an issue as blocked on the board.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 2.5A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 8 2.5m3 1.52V4a3 3 0 0 0-6 0v.02c-.29.05-.553.182-.761.372l-.887-.633-.917-2.064-1.37.61.944 2.125c.09.204.234.38.416.51l1.325.946V7H.5v1.5h3.25v1.149l-1.15.958a1.25 1.25 0 0 0-.318.401L1.08 13.415l1.342.67 1.18-2.36.46-.383A4.25 4.25 0 0 0 8.001 14h.249A4 4 0 0 0 12 11.393l.4.333 1.18 2.36 1.34-.671-1.202-2.407a1.25 1.25 0 0 0-.318-.401l-1.15-.958V8.5h3.25V7h-3.25V5.886l1.325-.946a1.25 1.25 0 0 0 .416-.51l.944-2.125-1.37-.61-.917 2.064-.887.633A1.5 1.5 0 0 0 11 4.02M10.75 10V5.5h-5.5v4.443l.035.226A2.75 2.75 0 0 0 8 12.5h.249a2.5 2.5 0 0 0 2.5-2.5" clip-rule="evenodd"/></svg>`,
		title: "File bug report",
		description: "Submit a detailed bug report to the backlog.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M8 6h4.832C13.908 6 16 6.5 16 9q0 2-1 2.5 2 .5 2 3c0 .5 0 3.5-4 3.5H8a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1m1 10h3.5c1 0 2-.25 2-1.5s-1.104-1.5-2-1.5H9zm0-4.975h3c.504 0 2 0 2-1.525S12 8 12 8H9z"/></svg>`,
		title: "Format page content",
		description: "Apply styles and layout to a Confluence page.",
		iconColor: "#000000",
	},
	// G
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM12 6H4V4.5h8zm-2 3.5H4V8h6z" clip-rule="evenodd"/></svg>`,
		title: "Generate release notes",
		description: "Create release notes from Jira issues.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path d="M5 11.009C5 9.899 5.897 9 7.006 9h9.988A2.01 2.01 0 0 1 19 11.009v7.982c0 1.11-.897 2.009-2.006 2.009H7.006A2.01 2.01 0 0 1 5 18.991zM12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path fill-rule="nonzero" d="M8 6.251v-.249A4.004 4.004 0 0 1 12 2a4 4 0 0 1 4 4.002V6.5h-2v-.498A2 2 0 0 0 12 4c-1.102 0-2 .898-2 2.002V11H8zm6 .249h2a1 1 0 0 1-2 0"/></g></svg>`,
		title: "Grant user access",
		description: "Give a new user access to the project.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M9 4.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0M11 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M3 5.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0M4 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M2.625 9A2.625 2.625 0 0 0 0 11.625V13h1.5v-1.375c0-.621.504-1.125 1.125-1.125H5V9zM6 12.5A3.5 3.5 0 0 1 9.5 9h3a3.5 3.5 0 0 1 3.5 3.5V14h-1.5v-1.5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2V14H6z" clip-rule="evenodd"/></svg>`,
		title: "Group users by team",
		description: "Organize users into functional teams.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M7.25 5.354a2.751 2.751 0 0 0 0 5.292V16h1.5v-5.353a2.751 2.751 0 0 0 0-5.293V0h-1.5zM8 6.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5" clip-rule="evenodd"/></svg>`,
		title: "Git commit push",
		description: "Push local commits to the server.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2.167h11V3a.5.5 0 0 0-.5-.5zm10.5 4.167h-11v2.666h11zm0 4.166h-11V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5z" clip-rule="evenodd"/></svg>`,
		title: "Groom backlog items",
		description: "Clean up and order the backlog.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 3.125A2.625 2.625 0 0 1 2.625.5h10.75A2.625 2.625 0 0 1 16 3.125v8.25A2.625 2.625 0 0 1 13.375 14H4.449l-3.327 1.901A.75.75 0 0 1 0 15.25zM2.625 2C2.004 2 1.5 2.504 1.5 3.125v10.833L4.05 12.5h9.325c.621 0 1.125-.504 1.125-1.125v-8.25C14.5 2.504 13.996 2 13.375 2zM12 6.5H4V5h8zm-3 3H4V8h5z" clip-rule="evenodd"/></svg>`,
		title: "Get feedback on page",
		description: "Request comments on a Confluence draft.",
		iconColor: "#000000",
	},
	// H
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 3.125A2.625 2.625 0 0 1 2.625.5h10.75A2.625 2.625 0 0 1 16 3.125v8.25A2.625 2.625 0 0 1 13.375 14H4.449l-3.327 1.901A.75.75 0 0 1 0 15.25zM2.625 2C2.004 2 1.5 2.504 1.5 3.125v10.833L4.05 12.5h9.325c.621 0 1.125-.504 1.125-1.125v-8.25C14.5 2.504 13.996 2 13.375 2zM12 6.5H4V5h8zm-3 3H4V8h5z" clip-rule="evenodd"/></svg>`,
		title: "Hide comments",
		description: "Collapse comments on a busy page.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M19 5h.006C20.107 5 21 5.895 21 6.994v12.012A1.995 1.995 0 0 1 19.006 21H6.994A1.995 1.995 0 0 1 5 19.006V19h13c.555 0 1-.448 1-1zM3 5.006C3 3.898 3.897 3 5.006 3h9.988C16.102 3 17 3.897 17 5.006v9.988A2.005 2.005 0 0 1 14.994 17H5.006A2.005 2.005 0 0 1 3 14.994zM5 5v10h10V5zm1 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 8m0 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 11"/></svg>`,
		title: "Handle service request",
		description: "Respond to a ticket in the service queue.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M14.16 4.06a1 1 0 0 0-1.27.62L8.06 18.73a1 1 0 0 0 1.89.65l4.83-14.04a1 1 0 0 0-.62-1.27m-6.14 8.2-2.58-2.5 2.8-2.72a1 1 0 1 0-1.39-1.44L3.31 9.04a1 1 0 0 0 0 1.44l3.32 3.22a1 1 0 1 0 1.39-1.44m12.22 1.57-3.32-3.22a1 1 0 1 0-1.39 1.44l2.58 2.5-2.8 2.72a1 1 0 1 0 1.39 1.44l3.54-3.43a1 1 0 0 0 0-1.44"/></svg>`,
		title: "Highlight code block",
		description: "Format code snippets in documentation.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.70844V0.999922H0.5V5.28546H4.78553V3.78546H3.05127C4.24432 2.38587 6.01884 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 7.77241 1.51167 7.54779 1.53439 7.32668L0.0422526 7.17332C0.0143002 7.4453 0 7.7211 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C5.60999 0 3.46512 1.04851 2 2.70844ZM8.75 8.13953V3.75H7.25V8.86047L10.0315 11.0857L10.9685 9.91435L8.75 8.13953Z" fill="#292A2E"/>
</svg>
`,
		title: "History of changes",
		description: "View the audit log for an issue.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-3c-.586 0-1 .414-1 1H5.5c0-1.414 1.086-2.5 2.5-2.5s2.5 1.086 2.5 2.5c0 1.133-.713 1.706-1.162 2.058-.511.402-.588.494-.588.692v.75h-1.5v-.75c0-.977.689-1.507 1.078-1.806l.084-.065C8.838 6.544 9 6.367 9 6c0-.586-.414-1-1-1" clip-rule="evenodd"/><path fill="currentcolor" d="M9 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>`,
		title: "Help center configuration",
		description: "Set up the customer-facing help portal.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M20 19V8h-9.154l-.503-1.258-.455-1.136C9.778 5.33 9.291 5 9.003 5H3.997C4.002 5 4 19 4 19zM12.2 6h7.809C21.109 6 22 6.893 22 7.992v11.016c0 1.1-.898 1.992-1.991 1.992H3.991C2.891 21 2 20.107 2 19.008V5.006C2 3.898 2.896 3 3.997 3h5.006c1.103 0 2.327.826 2.742 1.862z"/></svg>`,
		title: "Host repository",
		description: "Create a new repo on Bitbucket Cloud.",
		iconColor: "#000000",
	},
	// I
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M7.47 1.22a.75.75 0 0 1 1.06 0l4 4-1.06 1.06-2.72-2.72V11h-1.5V3.56L4.53 6.28 3.47 5.22zM1 13V9h1.5v4a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9H15v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2" clip-rule="evenodd"/></svg>`,
		title: "Import issues from CSV",
		description: "Bulk create issues from a spreadsheet.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M5 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M1 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0m11.25 4.75V11h1.5V8.75H16v-1.5h-2.25V5h-1.5v2.25H10v1.5zm-8.5 1.75a2.25 2.25 0 0 0-2.25 2.25V15H0v-2.25A3.75 3.75 0 0 1 3.75 9h2.5A3.75 3.75 0 0 1 10 12.75V15H8.5v-2.25a2.25 2.25 0 0 0-2.25-2.25z" clip-rule="evenodd"/></svg>`,
		title: "Invite team members",
		description: "Send email invitations to join the site.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1a.75.75 0 0 1 .696.471l2.2 5.5 2.612 6.529H15V15H1v-1.5h1.492L7.304 1.471A.75.75 0 0 1 8 1M4.108 13.5h7.784l-.8-2H4.908zm1.4-3.5h4.984l-.8-2H6.308zm1.4-3.5h2.184L8 3.77z" clip-rule="evenodd"/></svg>`,
		title: "Incident report",
		description: "Log a major incident in Opsgenie.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 3.125A2.625 2.625 0 0 1 2.625.5h10.75A2.625 2.625 0 0 1 16 3.125v8.25A2.625 2.625 0 0 1 13.375 14H4.449l-3.327 1.901A.75.75 0 0 1 0 15.25zM2.625 2C2.004 2 1.5 2.504 1.5 3.125v10.833L4.05 12.5h9.325c.621 0 1.125-.504 1.125-1.125v-8.25C14.5 2.504 13.996 2 13.375 2zM12 6.5H4V5h8zm-3 3H4V8h5z" clip-rule="evenodd"/></svg>`,
		title: "Integrate with Slack",
		description: "Connect project notifications to Slack.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M5 15.991c0 .007 14.005.009 14.005.009C18.999 16 19 8.009 19 8.009 19 8.002 4.995 8 4.995 8 5.001 8 5 15.991 5 15.991M3 8.01C3 6.899 3.893 6 4.995 6h14.01C20.107 6 21 6.902 21 8.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 0 1 3 15.991z"/><path d="M10.674 14.331c.36.36.941.36 1.3 0l2.758-2.763a.92.92 0 0 0-1.301-1.298l-2.108 2.11-.755-.754a.92.92 0 0 0-1.3 1.3z"/></g></svg>`,
		title: "Issue transition",
		description: "Move an issue to the next status.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 3.125A2.625 2.625 0 0 1 2.625.5h10.75A2.625 2.625 0 0 1 16 3.125v8.25A2.625 2.625 0 0 1 13.375 14H4.449l-3.327 1.901A.75.75 0 0 1 0 15.25zM2.625 2C2.004 2 1.5 2.504 1.5 3.125v10.833L4.05 12.5h9.325c.621 0 1.125-.504 1.125-1.125v-8.25C14.5 2.504 13.996 2 13.375 2zM12 6.5H4V5h8zm-3 3H4V8h5z" clip-rule="evenodd"/></svg>`,
		title: "Inline comment add",
		description: "Add a comment on specific text in Confluence.",
		iconColor: "#000000",
	},
	// J
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><circle cx="16" cy="9" r="3"/><circle cx="8" cy="6" r="3"/><path d="M11 15c0-1.105.887-2 2-2h6c1.105 0 2 .885 2 2v3.73c0 3.027-10 3.027-10 0z"/><path d="M13 12a1.997 1.997 0 0 0-2-2H5c-1.113 0-2 .897-2 2.003v3.826c0 1.921 4.054 2.518 7 1.984v-2.807A3 3 0 0 1 12.997 12z"/></g></svg>`,
		title: "Join team workspace",
		description: "Accept an invite to a Trello workspace.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M1 7a6 6 0 1 1 10.74 3.68l3.29 3.29-1.06 1.06-3.29-3.29A6 6 0 0 1 1 7" clip-rule="evenodd"/></svg>`,
		title: "Jira Query Language search",
		description: "Advanced search using JQL syntax.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 3.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h2.833v-9zm4.333 0v9h3.334v-9zm4.834 0v9H14a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" clip-rule="evenodd"/></svg>`,
		title: "Jump to recent board",
		description: "Quickly navigate to your last viewed board.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M14.16 4.06a1 1 0 0 0-1.27.62L8.06 18.73a1 1 0 0 0 1.89.65l4.83-14.04a1 1 0 0 0-.62-1.27m-6.14 8.2-2.58-2.5 2.8-2.72a1 1 0 1 0-1.39-1.44L3.31 9.04a1 1 0 0 0 0 1.44l3.32 3.22a1 1 0 1 0 1.39-1.44m12.22 1.57-3.32-3.22a1 1 0 1 0-1.39 1.44l2.58 2.5-2.8 2.72a1 1 0 1 0 1.39 1.44l3.54-3.43a1 1 0 0 0 0-1.44"/></svg>`,
		title: "JSON data export",
		description: "Export issue data in JSON format.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M4 5h16c1.105 0 2 1.045 2 2.333v9.334C22 17.955 21.105 19 20 19H4c-1.105 0-2-1.045-2-2.333V7.333C2 6.045 2.895 5 4 5m3.465 9.887h1.278L6.786 9.251H5.399l-1.957 5.636h1.183l.434-1.343h1.98zM6.02 10.423h.07l.7 2.21H5.313zm6.215 4.464c1.203 0 1.95-.625 1.95-1.613 0-.726-.544-1.289-1.29-1.344v-.07a1.22 1.22 0 0 0 1.02-1.203c0-.871-.653-1.406-1.747-1.406H9.704v5.636zm-1.352-4.734h.985c.562 0 .886.27.886.719 0 .453-.347.715-.984.715h-.887zm0 3.832v-1.601h1.024c.695 0 1.074.273 1.074.789 0 .527-.367.812-1.047.812zm6.762 1.047c1.36 0 2.352-.84 2.45-2.059h-1.15c-.112.621-.62 1.02-1.296 1.02-.89 0-1.441-.738-1.441-1.926s.55-1.922 1.437-1.922c.672 0 1.184.426 1.297 1.074h1.148c-.086-1.226-1.109-2.113-2.445-2.113-1.637 0-2.645 1.13-2.645 2.961 0 1.836 1.012 2.965 2.645 2.965"/></svg>`,
		title: "Job status check",
		description: "Monitor a CI/CD job in progress.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M4.25 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M2 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 2 3.25m6-.75h1.75a2.75 2.75 0 0 1 2.75 2.75v5.378a2.251 2.251 0 1 1-1.5 0V5.25C11 4.56 10.44 4 9.75 4H8zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m7.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5" clip-rule="evenodd"/></svg>`,
		title: "Join pull request review",
		description: "Add yourself as a reviewer on a PR.",
		iconColor: "#000000",
	},
	// K
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 3.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h2.833v-9zm4.333 0v9h3.334v-9zm4.834 0v9H14a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" clip-rule="evenodd"/></svg>`,
		title: "Kanban board view",
		description: "Switch to the Kanban view for flow.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M7 6.002v9.996c0 .546.446 1.002.995 1.002h8.01c.54 0 .995-.449.995-1.002V6.002C17 5.456 16.554 5 16.005 5h-8.01C7.455 5 7 5.449 7 6.002m-2 0A3.005 3.005 0 0 1 7.995 3h8.01A3.003 3.003 0 0 1 19 6.002v9.996A3.005 3.005 0 0 1 16.005 19h-8.01A3.003 3.003 0 0 1 5 15.998z"/><path d="M9 7h6v4H9zm0 6h6v2H9zm1 7.86V20H7v.86L8.5 20zM7 18h3v2H7z"/></g></svg>`,
		title: "Knowledge base article",
		description: "Write a how-to article for the KB.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "Key result tracking",
		description: "Update progress on OKRs in Jira Align.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.25 2.25L12.25 0H13.75L13.75 2.25H16V3.75H13.75L13.75 6H12.25L12.25 3.75H10V2.25H12.25ZM3 2.5C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V8.49977H15V13C15 14.1046 14.1046 15 13 15H3C1.89543 15 1 14.1046 1 13V3C1 1.89543 1.89543 1 3 1H7.5V2.5H3Z" fill="#292A2E"/>
</svg>
`,
		title: "Keyboard shortcuts list",
		description: "View available shortcuts for power users.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2.5 3.67V1H1v5c0 .414.336.75.75.75H6.5v-1.5H3.236a5.5 5.5 0 1 1-.666 3.63l-1.48.24A7.002 7.002 0 0 0 15 8 7 7 0 0 0 2.5 3.67" clip-rule="evenodd"/></svg>`,
		title: "Keep page updated",
		description: "Review and update an old page.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m4.03 5.03L9.06 8l2.97 2.97-1.06 1.06L8 9.06l-2.97 2.97-1.06-1.06L6.94 8 3.97 5.03l1.06-1.06L8 6.94l2.97-2.97z" clip-rule="evenodd"/></svg>`,
		title: "Kill stuck build",
		description: "Stop a frozen pipeline build.",
		iconColor: "#000000",
	},
	// L
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8ZM8.75 3.25V7.63867L10.9688 9.41406L10.0312 10.5859L7.53125 8.58594L7.25 8.36035V3.25H8.75ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="#292A2E"/>
</svg>
`,
		title: "Log work time",
		description: "Record hours spent on a task.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8.22 2.22a3.932 3.932 0 1 1 5.56 5.56l-2.25 2.25-1.06-1.06 2.25-2.25a2.432 2.432 0 0 0-3.44-3.44L7.03 5.53 5.97 4.47zm3.06 3.56-5.5 5.5-1.06-1.06 5.5-5.5zM2.22 8.22l2.25-2.25 1.06 1.06-2.25 2.25a2.432 2.432 0 0 0 3.44 3.44l2.25-2.25 1.06 1.06-2.25 2.25a3.932 3.932 0 1 1-5.56-5.56" clip-rule="evenodd"/></svg>`,
		title: "Link related issues",
		description: "Create a dependency link between issues.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M11 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/><path fill="currentcolor" fill-rule="evenodd" d="M9.286 1a3.25 3.25 0 0 0-2.299.952L1.604 7.336a2 2 0 0 0 0 2.828l4.232 4.232a2 2 0 0 0 2.828 0l5.384-5.383A3.25 3.25 0 0 0 15 6.714V3a2 2 0 0 0-2-2zM8.048 3.013A1.75 1.75 0 0 1 9.286 2.5H13a.5.5 0 0 1 .5.5v3.714c0 .465-.184.91-.513 1.238l-5.383 5.384a.5.5 0 0 1-.708 0L2.664 9.104a.5.5 0 0 1 0-.708z" clip-rule="evenodd"/></svg>`,
		title: "Label creation",
		description: "Create a new label for categorizing issues.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M8 10V8.002A4.004 4.004 0 0 1 12 4a4 4 0 0 1 4 4.002V10a2 2 0 0 1 2 2v6c0 1.105-.902 2-2.009 2H8.01A2 2 0 0 1 6 18v-6c0-1.102.897-1.995 2-2m2 0h4V8.002A2 2 0 0 0 12 6c-1.102 0-2 .898-2 2.002zm2 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>`,
		title: "Lock page editing",
		description: "Restrict editing on a finalized page.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M3 18a1 1 0 0 0 .99 1H20a.99.99 0 0 0 1-1v-1H3zm0-7h18V9H3zm0-4h18V6c0-.55-.44-1-.99-1H3.99A.99.99 0 0 0 3 6zm0 8h18v-2H3z"/></svg>`,
		title: "List active sprints",
		description: "Show all currently running sprints.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3.00001C13.5 2.72386 13.2761 2.50001 13 2.50001L10.5178 2.5C10.3852 2.5 10.258 2.55268 10.1642 2.64645L7.78033 5.03034C7.63968 5.17099 7.44891 5.25001 7.25 5.25001L3.01777 5.25001C2.88516 5.25001 2.75798 5.30269 2.66421 5.39646L2.31066 5.75001L4.03033 7.46968C4.32322 7.76257 4.32322 8.23745 4.03033 8.53034L1.78033 10.7803L0.719669 9.71968L2.43934 8.00001L0.71967 6.28034C0.426777 5.98745 0.426777 5.51257 0.71967 5.21968L1.60355 4.3358C1.97863 3.96072 2.48733 3.75001 3.01777 3.75001L6.93934 3.75001L9.10355 1.58579C9.47863 1.21071 9.98734 0.999999 10.5178 1L13 1.00001C14.1046 1.00001 15 1.89544 15 3L15 5.48225C15 6.01268 14.7893 6.52139 14.4142 6.89646L12.25 9.06068L12.25 12.9823C12.25 13.5127 12.0393 14.0214 11.6642 14.3965L10.7803 15.2803C10.6397 15.421 10.4489 15.5 10.25 15.5C10.0511 15.5 9.86032 15.421 9.71967 15.2803L8 13.5607L6.28033 15.2803L5.21967 14.2197L7.46967 11.9697C7.61032 11.829 7.80109 11.75 8 11.75C8.19891 11.75 8.38968 11.829 8.53033 11.9697L10.25 13.6894L10.6036 13.3358C10.6973 13.242 10.75 13.1149 10.75 12.9823L10.75 8.75002C10.75 8.5511 10.829 8.36034 10.9697 8.21969L13.3536 5.8358C13.4473 5.74204 13.5 5.61486 13.5 5.48225L13.5 3.00001ZM6.78033 10.2803L1.78033 15.2803L0.71967 14.2197L5.71967 9.21968L6.78033 10.2803Z" fill="#292A2E"/>
<path d="M12.5 4.62501C12.5 5.24633 11.9963 5.75001 11.375 5.75001C10.7537 5.75001 10.25 5.24633 10.25 4.62501C10.25 4.00369 10.7537 3.50001 11.375 3.50001C11.9963 3.50001 12.5 4.00369 12.5 4.62501Z" fill="#292A2E"/>
</svg>
`,
		title: "Launch deployment",
		description: "Manually trigger a deployment step.",
		iconColor: "#000000",
	},
	// M
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0m-2.174-2.52-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Move issue to Done",
		description: "Complete a task by moving it to Done.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.17384 0.77002L7.32617 1.7303L3.99283 5.7303C3.85034 5.90129 3.63925 6.00016 3.41667 6.00016C3.19408 6.00016 2.983 5.90129 2.8405 5.7303L1.17384 3.7303L2.32617 2.77002L3.41667 4.07862L6.17384 0.77002ZM8.5 2.50016H9.75C11.2688 2.50016 12.5 3.73138 12.5 5.25016L12.5 10.6282C13.3739 10.9371 14 11.7705 14 12.7502C14 13.9928 12.9926 15.0002 11.75 15.0002C10.5074 15.0002 9.5 13.9928 9.5 12.7502C9.5 11.7705 10.1261 10.9371 11 10.6282L11 5.25016C11 4.5598 10.4404 4.00016 9.75 4.00016H8.5V2.50016ZM3.5 10.6282L3.5 7.50016L5 7.50016L5 10.6282C5.8739 10.9371 6.5 11.7705 6.5 12.7502C6.5 13.9928 5.49264 15.0002 4.25 15.0002C3.00736 15.0002 2 13.9928 2 12.7502C2 11.7705 2.62611 10.9371 3.5 10.6282ZM4.25 12.0002C3.83579 12.0002 3.5 12.3359 3.5 12.7502C3.5 13.1644 3.83579 13.5002 4.25 13.5002C4.66422 13.5002 5 13.1644 5 12.7502C5 12.3359 4.66422 12.0002 4.25 12.0002ZM11.75 12.0002C11.3358 12.0002 11 12.3359 11 12.7502C11 13.1644 11.3358 13.5002 11.75 13.5002C12.1642 13.5002 12.5 13.1644 12.5 12.7502C12.5 12.3359 12.1642 12.0002 11.75 12.0002Z" fill="#292A2E"/>
</svg>
`,
		title: "Merge pull request",
		description: "Merge approved code into the main branch.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><circle cx="16" cy="9" r="3"/><circle cx="8" cy="6" r="3"/><path d="M11 15c0-1.105.887-2 2-2h6c1.105 0 2 .885 2 2v3.73c0 3.027-10 3.027-10 0z"/><path d="M13 12a1.997 1.997 0 0 0-2-2H5c-1.113 0-2 .897-2 2.003v3.826c0 1.921 4.054 2.518 7 1.984v-2.807A3 3 0 0 1 12.997 12z"/></g></svg>`,
		title: "Manage project roles",
		description: "Assign roles like Admin or Developer.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM12 6H4V4.5h8zm-2 3.5H4V8h6z" clip-rule="evenodd"/></svg>`,
		title: "Meeting notes page",
		description: "Record minutes from a team meeting.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 3.25 12.13l.75 1.3A8 8 0 1 1 16 8c0 .842-.28 1.775-.817 2.513-.547.751-1.401 1.344-2.522 1.344-.577 0-1.07-.177-1.462-.507a2.5 2.5 0 0 1-.66-.908C9.387 11.776 7.529 12.346 6 11.464 4.229 10.441 3.926 8.057 4.969 6.25S8.229 3.513 10 4.536c1.12.647 1.66 1.87 1.633 3.105l-.005.13c0 .687.038 1.397.226 1.923.091.255.201.415.313.51.098.083.242.153.494.153.536 0 .976-.27 1.31-.727.342-.47.529-1.091.529-1.63A6.5 6.5 0 0 0 8 1.5m2.133 6.102c.015-.798-.328-1.447-.883-1.767C8.39 5.339 7.02 5.698 6.268 7s-.377 2.67.482 3.165c.86.496 2.23.137 2.982-1.165.244-.422.37-.866.397-1.287z" clip-rule="evenodd"/></svg>`,
		title: "Mention user in comment",
		description: "Tag a user to notify them.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M19.004 17C19 17 19 7.006 19 7.006 19 7 4.996 7 4.996 7 5 7 5 16.994 5 16.994 5 17 19.004 17 19.004 17M3 7.006A2 2 0 0 1 4.995 5h14.01A2 2 0 0 1 21 7.006v9.988A2 2 0 0 1 19.005 19H4.995A2 2 0 0 1 3 16.994z"/><path d="M4 6h16v5H4zm5 2c0 .556.446 1 .995 1h8.01c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1h-8.01C9.455 7 9 7.448 9 8M5 8c0 .556.448 1 1 1 .556 0 1-.448 1-1 0-.556-.448-1-1-1-.556 0-1 .448-1 1"/></g></svg>`,
		title: "Monitor service health",
		description: "Check system status on Statuspage.",
		iconColor: "#000000",
	},
	// N
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M10 12.5H6V14a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-2-11c-3.022 0-4.935 3.243-3.473 5.888L5.535 9.21c.303.548.463 1.164.465 1.79h4a3.7 3.7 0 0 1 .465-1.79l1.008-1.822C12.935 4.743 11.022 1.5 8 1.5M11.5 14a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2.988a2.2 2.2 0 0 0-.277-1.075L3.215 8.114C1.2 4.47 3.835 0 8 0c4.164 0 6.8 4.47 4.785 8.114l-1.008 1.823a2.2 2.2 0 0 0-.277 1.075z"/></svg>`,
		title: "New feature request",
		description: "Submit an idea for a new product feature.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M6.42 13.5a1.748 1.748 0 0 0 3.16 0zM4.5 8.636c0 .215-.06.426-.175.608L2.603 12h10.795l-1.723-2.756a1.15 1.15 0 0 1-.175-.608V5a3.5 3.5 0 0 0-7 0zm8.5-.1 1.788 2.86a1.375 1.375 0 0 1-1.166 2.104h-2.46a3.25 3.25 0 0 1-6.324 0h-2.46a1.375 1.375 0 0 1-1.166-2.104L3 8.537V5a5 5 0 0 1 10 0z"/></svg>`,
		title: "Notification setup",
		description: "Adjust your personal notification preferences.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M20 19V8h-9.154l-.503-1.258-.455-1.136C9.778 5.33 9.291 5 9.003 5H3.997C4.002 5 4 19 4 19zM12.2 6h7.809C21.109 6 22 6.893 22 7.992v11.016c0 1.1-.898 1.992-1.991 1.992H3.991C2.891 21 2 20.107 2 19.008V5.006C2 3.898 2.896 3 3.997 3h5.006c1.103 0 2.327.826 2.742 1.862z"/></svg>`,
		title: "Navigate hierarchy",
		description: "View the parent-child issue structure.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.25c0-.52-.206-1.017-.573-1.384L10.134.573A1.96 1.96 0 0 0 8.75 0H4a2 2 0 0 0-2 2zm2 .5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5h4v3.75c0 .414.336.75.75.75h3.75v8a.5.5 0 0 1-.5.5zm7.94-10H9.5V2.06z" clip-rule="evenodd"/></svg>`,
		title: "Note addition",
		description: "Add a quick personal note.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M13.5 3a.5.5 0 0 0-.5-.5h-2.482a.5.5 0 0 0-.354.146L7.78 5.03a.75.75 0 0 1-.53.22H3.018a.5.5 0 0 0-.354.146l-.353.354 1.72 1.72a.75.75 0 0 1 0 1.06l-2.25 2.25L.72 9.72 2.44 8 .72 6.28a.75.75 0 0 1 0-1.06l.884-.884a2 2 0 0 1 1.414-.586h3.921l2.165-2.164A2 2 0 0 1 10.518 1H13a2 2 0 0 1 2 2v2.482a2 2 0 0 1-.586 1.414L12.25 9.061v3.921a2 2 0 0 1-.586 1.415l-.884.883a.75.75 0 0 1-1.06 0L8 13.56l-1.72 1.72-1.06-1.06 2.25-2.25a.75.75 0 0 1 1.06 0l1.72 1.72.354-.354a.5.5 0 0 0 .146-.354V8.75a.75.75 0 0 1 .22-.53l2.384-2.384a.5.5 0 0 0 .146-.354zm-6.72 7.28-5 5-1.06-1.06 5-5z" clip-rule="evenodd"/><path fill="currentcolor" d="M12.5 4.625a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0"/></svg>`,
		title: "Next gen project",
		description: "Create a team-managed project.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18m-.9-1.863A7.19 7.19 0 0 1 4.8 12c0-.558.072-1.089.189-1.611L9.3 14.7v.9c0 .99.81 1.8 1.8 1.8zm6.21-2.286A1.79 1.79 0 0 0 15.6 15.6h-.9v-2.7c0-.495-.405-.9-.9-.9H8.4v-1.8h1.8c.495 0 .9-.405.9-.9V7.5h1.8c.99 0 1.8-.81 1.8-1.8v-.369c2.637 1.071 4.5 3.654 4.5 6.669 0 1.872-.72 3.573-1.89 4.851"/></svg>`,
		title: "Network policy setup",
		description: "Configure IP allowlisting.",
		iconColor: "#000000",
	},
	// O
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M4.25 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M2 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 2 3.25m6-.75h1.75a2.75 2.75 0 0 1 2.75 2.75v5.378a2.251 2.251 0 1 1-1.5 0V5.25C11 4.56 10.44 4 9.75 4H8zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m7.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5" clip-rule="evenodd"/></svg>`,
		title: "Open pull request",
		description: "Initiate a code review process.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M20 19V8h-9.154l-.503-1.258-.455-1.136C9.778 5.33 9.291 5 9.003 5H3.997C4.002 5 4 19 4 19zM12.2 6h7.809C21.109 6 22 6.893 22 7.992v11.016c0 1.1-.898 1.992-1.991 1.992H3.991C2.891 21 2 20.107 2 19.008V5.006C2 3.898 2.896 3 3.997 3h5.006c1.103 0 2.327.826 2.742 1.862z"/></svg>`,
		title: "Organize page tree",
		description: "Reorder pages in the Confluence sidebar.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M4.5 2.5v2H6v-2h4v2h1.5v-2H13a.5.5 0 0 1 .5.5v3h-11V3a.5.5 0 0 1 .5-.5zm-2 5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7.5zm9-6.5H13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1.5V0H6v1h4V0h1.5z" clip-rule="evenodd"/></svg>`,
		title: "On-call schedule",
		description: "View who is on call in Opsgenie.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M3 18a1 1 0 0 0 .99 1H20a.99.99 0 0 0 1-1v-1H3zm0-7h18V9H3zm0-4h18V6c0-.55-.44-1-.99-1H3.99A.99.99 0 0 0 3 6zm0 8h18v-2H3z"/></svg>`,
		title: "Order backlog items",
		description: "Drag and drop issues to rank them.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M8.01 18c.546 0 .99-.444.99-1a1 1 0 0 0-.99-1H3.99A.993.993 0 0 0 3 17a1 1 0 0 0 .99 1zM3 7c0 .552.445 1 .993 1h16.014A.994.994 0 0 0 21 7c0-.552-.445-1-.993-1H3.993A.994.994 0 0 0 3 7m10.998 6A1 1 0 0 0 15 12c0-.552-.456-1-1.002-1H4.002A1 1 0 0 0 3 12c0 .552.456 1 1.002 1z"/></svg>`,
		title: "Overview of project",
		description: "View the project summary page.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0m-2 9a3.75 3.75 0 0 1 3.75-3.75h4.5A3.75 3.75 0 0 1 14 13v2h-1.5v-2a2.25 2.25 0 0 0-2.25-2.25h-4.5A2.25 2.25 0 0 0 3.5 13v2H2z" clip-rule="evenodd"/></svg>`,
		title: "Owner assignment",
		description: "Assign an owner to a component.",
		iconColor: "#000000",
	},
	// P
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM12 6H4V4.5h8zm-2 3.5H4V8h6z" clip-rule="evenodd"/></svg>`,
		title: "Publish page",
		description: "Make a Confluence draft visible to others.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8.75 15V3.56l3.72 3.72 1.06-1.06-5-5a.75.75 0 0 0-1.06 0l-5 5 1.06 1.06 3.72-3.72V15z" clip-rule="evenodd"/></svg>`,
		title: "Prioritize backlog",
		description: "Move important items to the top.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M4.25 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M2 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 2 3.25m6-.75h1.75a2.75 2.75 0 0 1 2.75 2.75v5.378a2.251 2.251 0 1 1-1.5 0V5.25C11 4.56 10.44 4 9.75 4H8zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m7.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5" clip-rule="evenodd"/></svg>`,
		title: "Pull request review",
		description: "Inspect code changes in Bitbucket.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M6.058.462A.75.75 0 0 1 6.75 0h2.5a.75.75 0 0 1 .692.462l1.026 2.462 2.578-.374a.75.75 0 0 1 .757.367l1.25 2.166a.75.75 0 0 1-.049.824L13.937 8l1.567 2.093c.18.24.2.565.05.825l-1.25 2.165a.75.75 0 0 1-.758.367l-2.578-.374-1.026 2.463A.75.75 0 0 1 9.25 16h-2.5a.75.75 0 0 1-.692-.461l-1.026-2.463-2.578.374a.75.75 0 0 1-.757-.367l-1.25-2.165a.75.75 0 0 1 .049-.825L2.063 8 .496 5.907a.75.75 0 0 1-.05-.824l1.25-2.166a.75.75 0 0 1 .758-.367l2.578.374zM7.25 1.5l-.871 2.09c-.242.58-.845.923-1.467.833l-2.17-.315-.749 1.296L3.32 7.176c.366.488.366 1.16 0 1.648l-1.327 1.772.749 1.296 2.17-.315a1.375 1.375 0 0 1 1.467.832L7.25 14.5h1.5l.871-2.09c.242-.58.845-.923 1.467-.833l2.17.315.749-1.296-1.327-1.772a1.375 1.375 0 0 1 0-1.648l1.327-1.772-.749-1.296-2.17.315A1.375 1.375 0 0 1 9.62 3.59L8.75 1.5zm.75 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0" clip-rule="evenodd"/></svg>`,
		title: "Project settings",
		description: "Access the administration menu.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor"><path d="M16 11V9h-2V7.002A2 2 0 0 0 12 5c-1.102 0-2 .898-2 2.002V9H8v2H7v8h10v-8zm-2 0h-4V9h4zM8 9V7.002A4.004 4.004 0 0 1 12 3a4 4 0 0 1 4 4.002V9h.994A2.01 2.01 0 0 1 19 11.009v7.982c0 1.11-.897 2.009-2.006 2.009H7.006A2.01 2.01 0 0 1 5 18.991V11.01C5 9.899 5.897 9 7.006 9zm0 0h2v2H8zm6 0h2v2h-2z"/><circle cx="12" cy="15" r="2"/></g></svg>`,
		title: "Permission scheme",
		description: "Edit who can do what in the project.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM3 11a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" clip-rule="evenodd"/></svg>`,
		title: "Plan roadmap",
		description: "Visualize the timeline of work.",
		iconColor: "#000000",
	},
	// Q
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M1 7a6 6 0 1 1 10.74 3.68l3.29 3.29-1.06 1.06-3.29-3.29A6 6 0 0 1 1 7" clip-rule="evenodd"/></svg>`,
		title: "Query issues with JQL",
		description: "Run a custom search for specific tickets.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z" clip-rule="evenodd"/></svg>`,
		title: "Quick filter setup",
		description: "Create a button to filter the board.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M19 5h.006C20.107 5 21 5.895 21 6.994v12.012A1.995 1.995 0 0 1 19.006 21H6.994A1.995 1.995 0 0 1 5 19.006V19h13c.555 0 1-.448 1-1zM3 5.006C3 3.898 3.897 3 5.006 3h9.988C16.102 3 17 3.897 17 5.006v9.988A2.005 2.005 0 0 1 14.994 17H5.006A2.005 2.005 0 0 1 3 14.994zM5 5v10h10V5zm1 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 8m0 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 11"/></svg>`,
		title: "Queue management",
		description: "Organize service desk ticket queues.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M16.051 6c-1.571 0-2.847 1.312-2.847 2.93 0 1.617 1.276 2.93 2.847 2.93 2.699 0 1.135 5.088-2.269 5.618a.68.68 0 0 0-.578.671c0 .416.372.745.784.682 6.187-.938 8.387-12.83 2.063-12.83M7.848 6C6.275 6 5 7.311 5 8.93c0 1.616 1.275 2.928 2.848 2.928 2.698 0 1.134 5.09-2.27 5.62a.68.68 0 0 0-.578.67c0 .416.372.745.783.682C11.972 17.892 14.172 6 7.848 6"/></svg>`,
		title: "Quote text in comment",
		description: "Reply to a specific part of a message.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0m-2.174-2.52-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Quality assurance check",
		description: "Verify that a feature meets requirements.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path d="M12 18a1 1 0 0 1 0-2 1 1 0 0 1 0 2m-2-9a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/><path d="M15.89 8.048a3.97 3.97 0 0 0-2.951-2.94A4.005 4.005 0 0 0 8 9.087l.009.008 1.878.022.112-.116A2 2 0 0 1 12 7c1.103 0 2 .897 2 2s-.897 2-2 2h.008a1 1 0 0 0-.998.987v2.014a1 1 0 1 0 2 0v-.782c0-.217.145-.399.349-.472a3.99 3.99 0 0 0 2.53-4.699"/></g></svg>`,
		title: "Question for team",
		description: "Post a question page in Confluence.",
		iconColor: "#000000",
	},
	// R
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M6 12h8v-2H6zM4 8.99C4 8.445 4.456 8 5.002 8h9.996C15.55 8 16 8.451 16 8.99V14H4z"/><path d="M6 7.005C6 5.898 6.898 5 7.998 5h2.004C11.106 5 12 5.894 12 7.005V10H6zm4 0V7H7.999c.005 0 .002.003.002.005V8h2z"/><path fill-rule="nonzero" d="M4.5 17h13.994l1.002-3H4.14zm-2.495-4.012A.862.862 0 0 1 2.883 12h18.393c.55 0 .857.417.681.944l-1.707 5.112c-.174.521-.758.944-1.315.944H3.725a1.15 1.15 0 0 1-1.118-.988z"/></g></svg>`,
		title: "Release version",
		description: "Deploy a completed version to customers.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M14.16 4.06a1 1 0 0 0-1.27.62L8.06 18.73a1 1 0 0 0 1.89.65l4.83-14.04a1 1 0 0 0-.62-1.27m-6.14 8.2-2.58-2.5 2.8-2.72a1 1 0 1 0-1.39-1.44L3.31 9.04a1 1 0 0 0 0 1.44l3.32 3.22a1 1 0 1 0 1.39-1.44m12.22 1.57-3.32-3.22a1 1 0 1 0-1.39 1.44l2.58 2.5-2.8 2.72a1 1 0 1 0 1.39 1.44l3.54-3.43a1 1 0 0 0 0-1.44"/></svg>`,
		title: "Review code changes",
		description: "Examine the diffs in a pull request.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path fill-rule="nonzero" d="M5 15.991c0 .007 14.005.009 14.005.009C18.999 16 19 8.009 19 8.009 19 8.002 4.995 8 4.995 8 5.001 8 5 15.991 5 15.991M3 8.01C3 6.899 3.893 6 4.995 6h14.01C20.107 6 21 6.902 21 8.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 0 1 3 15.991z"/><path d="M10.674 14.331c.36.36.941.36 1.3 0l2.758-2.763a.92.92 0 0 0-1.301-1.298l-2.108 2.11-.755-.754a.92.92 0 0 0-1.3 1.3z"/></g></svg>`,
		title: "Reopen closed issue",
		description: "Re-activate an issue that needs work.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM3 11a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" clip-rule="evenodd"/></svg>`,
		title: "Roadmap planning",
		description: "Adjust dates on the project roadmap.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0m-2.174-2.52-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Resolve incident",
		description: "Mark an outage as resolved.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "Report generation",
		description: "Create a velocity or burndown chart.",
		iconColor: "#000000",
	},
	// S
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5A4.75 4.75 0 0 0 8 11h5.44l-2.22-2.22 1.06-1.06 3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5-1.06-1.06 2.22-2.22H0V11h3.938A6.25 6.25 0 1 1 14.25 6.25h-1.5A4.75 4.75 0 0 0 8 1.5" clip-rule="evenodd"/></svg>`,
		title: "Start sprint",
		description: "Begin the work cycle for the team.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M12 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2.5 1a2.5 2.5 0 1 1 .73 1.765L6.212 7.567a2.5 2.5 0 0 1 0 .866l4.016 2.302a2.5 2.5 0 1 1-.692 1.332L5.521 9.766a2.5 2.5 0 1 1 0-3.53l4.016-2.302A2.5 2.5 0 0 1 9.5 3.5M3.75 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2M12 11.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2" clip-rule="evenodd"/></svg>`,
		title: "Share page link",
		description: "Send a page URL to a colleague.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M19 5h.006C20.107 5 21 5.895 21 6.994v12.012A1.995 1.995 0 0 1 19.006 21H6.994A1.995 1.995 0 0 1 5 19.006V19h13c.555 0 1-.448 1-1zM3 5.006C3 3.898 3.897 3 5.006 3h9.988C16.102 3 17 3.897 17 5.006v9.988A2.005 2.005 0 0 1 14.994 17H5.006A2.005 2.005 0 0 1 3 14.994zM5 5v10h10V5zm1 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 8m0 3c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H6.997A.996.996 0 0 1 6 11"/></svg>`,
		title: "Submit service request",
		description: "Ask for help from IT or HR.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M1 7a6 6 0 1 1 10.74 3.68l3.29 3.29-1.06 1.06-3.29-3.29A6 6 0 0 1 1 7" clip-rule="evenodd"/></svg>`,
		title: "Search knowledge base",
		description: "Find answers in the documentation.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M4.5 2.5v2H6v-2h4v2h1.5v-2H13a.5.5 0 0 1 .5.5v3h-11V3a.5.5 0 0 1 .5-.5zm-2 5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7.5zm9-6.5H13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1.5V0H6v1h4V0h1.5z" clip-rule="evenodd"/></svg>`,
		title: "Set due date",
		description: "Add a deadline to a task.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M4 5h16c1.105 0 2 1.045 2 2.333v9.334C22 17.955 21.105 19 20 19H4c-1.105 0-2-1.045-2-2.333V7.333C2 6.045 2.895 5 4 5m3.465 9.887h1.278L6.786 9.251H5.399l-1.957 5.636h1.183l.434-1.343h1.98zM6.02 10.423h.07l.7 2.21H5.313zm6.215 4.464c1.203 0 1.95-.625 1.95-1.613 0-.726-.544-1.289-1.29-1.344v-.07a1.22 1.22 0 0 0 1.02-1.203c0-.871-.653-1.406-1.747-1.406H9.704v5.636zm-1.352-4.734h.985c.562 0 .886.27.886.719 0 .453-.347.715-.984.715h-.887zm0 3.832v-1.601h1.024c.695 0 1.074.273 1.074.789 0 .527-.367.812-1.047.812zm6.762 1.047c1.36 0 2.352-.84 2.45-2.059h-1.15c-.112.621-.62 1.02-1.296 1.02-.89 0-1.441-.738-1.441-1.926s.55-1.922 1.437-1.922c.672 0 1.184.426 1.297 1.074h1.148c-.086-1.226-1.109-2.113-2.445-2.113-1.637 0-2.645 1.13-2.645 2.961 0 1.836 1.012 2.965 2.645 2.965"/></svg>`,
		title: "Status update",
		description: "Share progress on a project.",
		iconColor: "#000000",
	},
	// T
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0M8.75 3.25v4.389l2.219 1.775-.938 1.172-2.5-2-.281-.226V3.25zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Track time spent",
		description: "Log hours against a Jira issue.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M12.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m-2.122 0a2.251 2.251 0 1 1 0 1.5h-.816c-.586 0-1.062.476-1.062 1.063v5.875A2.563 2.563 0 0 1 6.188 13.5h-.816a2.25 2.25 0 1 1 0-1.5h.816c.586 0 1.062-.476 1.062-1.062V5.062A2.56 2.56 0 0 1 9.813 2.5zM3.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5" clip-rule="evenodd"/></svg>`,
		title: "Transition workflow",
		description: "Move a ticket to the next stage.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 3.25 12.13l.75 1.3A8 8 0 1 1 16 8c0 .842-.28 1.775-.817 2.513-.547.751-1.401 1.344-2.522 1.344-.577 0-1.07-.177-1.462-.507a2.5 2.5 0 0 1-.66-.908C9.387 11.776 7.529 12.346 6 11.464 4.229 10.441 3.926 8.057 4.969 6.25S8.229 3.513 10 4.536c1.12.647 1.66 1.87 1.633 3.105l-.005.13c0 .687.038 1.397.226 1.923.091.255.201.415.313.51.098.083.242.153.494.153.536 0 .976-.27 1.31-.727.342-.47.529-1.091.529-1.63A6.5 6.5 0 0 0 8 1.5m2.133 6.102c.015-.798-.328-1.447-.883-1.767C8.39 5.339 7.02 5.698 6.268 7s-.377 2.67.482 3.165c.86.496 2.23.137 2.982-1.165.244-.422.37-.866.397-1.287z" clip-rule="evenodd"/></svg>`,
		title: "Tag team member",
		description: "Mention someone to get their attention.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><circle cx="16" cy="9" r="3"/><circle cx="8" cy="6" r="3"/><path d="M11 15c0-1.105.887-2 2-2h6c1.105 0 2 .885 2 2v3.73c0 3.027-10 3.027-10 0z"/><path d="M13 12a1.997 1.997 0 0 0-2-2H5c-1.113 0-2 .897-2 2.003v3.826c0 1.921 4.054 2.518 7 1.984v-2.807A3 3 0 0 1 12.997 12z"/></g></svg>`,
		title: "Team capacity planning",
		description: "Check availability for the sprint.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M11.25 1v1.5h-.75v1.36l3.283 8.413A2 2 0 0 1 11.92 15H4.08a2 2 0 0 1-1.863-2.727L5.5 3.859V2.5h-.75V1zM3.614 12.818a.5.5 0 0 0 .466.682h7.84a.5.5 0 0 0 .466-.682L10.896 9H5.103zM7 4a.8.8 0 0 1-.052.272L5.69 7.5h4.621L9.052 4.272A.8.8 0 0 1 9 4V2.5H7z"/></svg>`,
		title: "Test execution",
		description: "Run a manual test case.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 3.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h2.833v-9zm4.333 0v9h3.334v-9zm4.834 0v9H14a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" clip-rule="evenodd"/></svg>`,
		title: "Trello card move",
		description: "Drag a card to a new list.",
		iconColor: "#000000",
	},
	// U
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2.5 3.67V1H1v5c0 .414.336.75.75.75H6.5v-1.5H3.236a5.5 5.5 0 1 1-.666 3.63l-1.48.24A7.002 7.002 0 0 0 15 8 7 7 0 0 0 2.5 3.67" clip-rule="evenodd"/></svg>`,
		title: "Update issue status",
		description: "Change the state of a work item.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="m5.22 8.47 4.5-4.5 1.06 1.06-4.5 4.5a.664.664 0 0 0 .94.94l4.5-4.5a2.079 2.079 0 0 0-2.94-2.94l-4.5 4.5a3.492 3.492 0 0 0 4.94 4.94l2.5-2.5 1.06 1.06-2.5 2.5a4.993 4.993 0 0 1-7.06-7.06l4.5-4.5a3.578 3.578 0 0 1 5.06 5.06l-4.5 4.5a2.165 2.165 0 0 1-3.06-3.06"/></svg>`,
		title: "Upload attachment",
		description: "Add a file to a Jira ticket.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><circle cx="16" cy="9" r="3"/><circle cx="8" cy="6" r="3"/><path d="M11 15c0-1.105.887-2 2-2h6c1.105 0 2 .885 2 2v3.73c0 3.027-10 3.027-10 0z"/><path d="M13 12a1.997 1.997 0 0 0-2-2H5c-1.113 0-2 .897-2 2.003v3.826c0 1.921 4.054 2.518 7 1.984v-2.807A3 3 0 0 1 12.997 12z"/></g></svg>`,
		title: "User management",
		description: "Add or remove users from groups.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path d="M5 11.009C5 9.899 5.897 9 7.006 9h9.988A2.01 2.01 0 0 1 19 11.009v7.982c0 1.11-.897 2.009-2.006 2.009H7.006A2.01 2.01 0 0 1 5 18.991zM12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path fill-rule="nonzero" d="M8 6.251v-.249A4.004 4.004 0 0 1 12 2a4 4 0 0 1 4 4.002V6.5h-2v-.498A2 2 0 0 0 12 4c-1.102 0-2 .898-2 2.002V11H8zm6 .249h2a1 1 0 0 1-2 0"/></g></svg>`,
		title: "Unlock user account",
		description: "Restore access for a locked user.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"/><path d="M11.978 13.984c-1.104 0-2-.897-2-2s.896-2 2-2c1.103 0 2 .897 2 2s-.897 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.793 4 4 4 4-1.794 4-4-1.794-4-4-4"/></g></svg>`,
		title: "Unwatch issue",
		description: "Stop receiving notifications for an issue.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="m13.913 6.75-5.5-3.625a.75.75 0 0 0-.826 0l-5.5 3.625L2.913 8 8 4.65 13.087 8zm0 4.5-5.5-3.625a.75.75 0 0 0-.826 0l-5.5 3.624.826 1.252L8 9.15l5.087 3.353z"/></svg>`,
		title: "Urgent priority set",
		description: "Mark an issue as High or Highest priority.",
		iconColor: "#000000",
	},
	// V
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.70844V0.999922H0.5V5.28546H4.78553V3.78546H3.05127C4.24432 2.38587 6.01884 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 7.77241 1.51167 7.54779 1.53439 7.32668L0.0422526 7.17332C0.0143002 7.4453 0 7.7211 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C5.60999 0 3.46512 1.04851 2 2.70844ZM8.75 8.13953V3.75H7.25V8.86047L10.0315 11.0857L10.9685 9.91435L8.75 8.13953Z" fill="#292A2E"/>
</svg>
`,
		title: "View git history",
		description: "Look at past commits in the repo.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M4 12v7a.97.97 0 0 0 .278.704 1 1 0 0 0 .701.296H6v-9H4.98a1 1 0 0 0-.701.296A.97.97 0 0 0 4 12m15.281-.96a3.05 3.05 0 0 0-2.321-1.061h-2.634c.04-.181.08-.36.11-.532.515-2.934 0-4-.504-4.594A2.43 2.43 0 0 0 12.075 4a3.08 3.08 0 0 0-2.968 2.751c-.393 1.839-.454 2-.968 2.725l-.768 1.089a2 2 0 0 0-.363 1.141v6.273c.001.532.216 1.041.596 1.416s.896.585 1.433.584h7.247a3.014 3.014 0 0 0 2.997-2.507l.677-4a2.96 2.96 0 0 0-.677-2.432m-1.998 6.1a1.01 1.01 0 0 1-1 .835H9.038v-6.269l.767-1.089a7.6 7.6 0 0 0 1.302-3.509c.036-.543.255-1.209.969-1.108s.575 1.916.363 3.1a20 20 0 0 1-.868 2.882l5.39-.008c.297-.001.58.128.773.352a1 1 0 0 1 .226.813z"/></svg>`,
		title: "Vote for issue",
		description: "Show support for a feature request.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0m-2.174-2.52-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Verify bug fix",
		description: "Confirm that a bug is resolved.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.25c0-.52-.206-1.017-.573-1.384L10.134.573A1.96 1.96 0 0 0 8.75 0H4a2 2 0 0 0-2 2zm2 .5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5h4v3.75c0 .414.336.75.75.75h3.75v8a.5.5 0 0 1-.5.5zm7.94-10H9.5V2.06z" clip-rule="evenodd"/></svg>`,
		title: "Version control log",
		description: "Check the commit log.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "Visualize workflow",
		description: "See the diagram of the issue lifecycle.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0m-2.174-2.52-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/></svg>`,
		title: "Validate release",
		description: "Ensure the release meets quality standards.",
		iconColor: "#000000",
	},
	// W
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"/><path d="M11.978 13.984c-1.104 0-2-.897-2-2s.896-2 2-2c1.103 0 2 .897 2 2s-.897 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.793 4 4 4 4-1.794 4-4-1.794-4-4-4"/></g></svg>`,
		title: "Watch issue updates",
		description: "Subscribe to changes on a ticket.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M12.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m-2.122 0a2.251 2.251 0 1 1 0 1.5h-.816c-.586 0-1.062.476-1.062 1.063v5.875A2.563 2.563 0 0 1 6.188 13.5h-.816a2.25 2.25 0 1 1 0-1.5h.816c.586 0 1.062-.476 1.062-1.062V5.062A2.56 2.56 0 0 1 9.813 2.5zM3.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5" clip-rule="evenodd"/></svg>`,
		title: "Workflow transition",
		description: "Advance the issue status.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M11.586.854a2 2 0 0 1 2.828 0l.732.732a2 2 0 0 1 0 2.828L10.01 9.551a2 2 0 0 1-.864.51l-3.189.91a.75.75 0 0 1-.927-.927l.91-3.189a2 2 0 0 1 .51-.864zm1.768 1.06a.5.5 0 0 0-.708 0l-.585.586L13.5 3.94l.586-.586a.5.5 0 0 0 0-.708zM12.439 5 11 3.56 7.51 7.052a.5.5 0 0 0-.128.216l-.54 1.891 1.89-.54a.5.5 0 0 0 .217-.127zM3 2.501a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V10H15v3.001a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h3v1.5z" clip-rule="evenodd"/></svg>`,
		title: "Write release notes",
		description: "Draft the documentation for a new version.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.25c0-.52-.206-1.017-.573-1.384L10.134.573A1.96 1.96 0 0 0 8.75 0H4a2 2 0 0 0-2 2zm2 .5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5h4v3.75c0 .414.336.75.75.75h3.75v8a.5.5 0 0 1-.5.5zm7.94-10H9.5V2.06z" clip-rule="evenodd"/></svg>`,
		title: "Worklog entry",
		description: "Enter time spent working.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "Weekly report",
		description: "Prepare a status report for the week.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8.22 2.22a3.932 3.932 0 1 1 5.56 5.56l-2.25 2.25-1.06-1.06 2.25-2.25a2.432 2.432 0 0 0-3.44-3.44L7.03 5.53 5.97 4.47zm3.06 3.56-5.5 5.5-1.06-1.06 5.5-5.5zM2.22 8.22l2.25-2.25 1.06 1.06-2.25 2.25a2.432 2.432 0 0 0 3.44 3.44l2.25-2.25 1.06 1.06-2.25 2.25a3.932 3.932 0 1 1-5.56-5.56" clip-rule="evenodd"/></svg>`,
		title: "Webhook configuration",
		description: "Set up webhooks for external integrations.",
		iconColor: "#000000",
	},
	// X
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" d="M11.25 1v1.5h-.75v1.36l3.283 8.413A2 2 0 0 1 11.92 15H4.08a2 2 0 0 1-1.863-2.727L5.5 3.859V2.5h-.75V1zM3.614 12.818a.5.5 0 0 0 .466.682h7.84a.5.5 0 0 0 .466-.682L10.896 9H5.103zM7 4a.8.8 0 0 1-.052.272L5.69 7.5h4.621L9.052 4.272A.8.8 0 0 1 9 4V2.5H7z"/></svg>`,
		title: "X-Ray test execution",
		description: "Execute a test run in Xray for Jira.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M14.16 4.06a1 1 0 0 0-1.27.62L8.06 18.73a1 1 0 0 0 1.89.65l4.83-14.04a1 1 0 0 0-.62-1.27m-6.14 8.2-2.58-2.5 2.8-2.72a1 1 0 1 0-1.39-1.44L3.31 9.04a1 1 0 0 0 0 1.44l3.32 3.22a1 1 0 1 0 1.39-1.44m12.22 1.57-3.32-3.22a1 1 0 1 0-1.39 1.44l2.58 2.5-2.8 2.72a1 1 0 1 0 1.39 1.44l3.54-3.43a1 1 0 0 0 0-1.44"/></svg>`,
		title: "XML data import",
		description: "Restore project data from an XML file.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "X-axis configuration",
		description: "Adjust the time scale on a report.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><circle cx="16" cy="9" r="3"/><circle cx="8" cy="6" r="3"/><path d="M11 15c0-1.105.887-2 2-2h6c1.105 0 2 .885 2 2v3.73c0 3.027-10 3.027-10 0z"/><path d="M13 12a1.997 1.997 0 0 0-2-2H5c-1.113 0-2 .897-2 2.003v3.826c0 1.921 4.054 2.518 7 1.984v-2.807A3 3 0 0 1 12.997 12z"/></g></svg>`,
		title: "X-functional team board",
		description: "View a board spanning multiple projects.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor"><path d="M16 11V9h-2V7.002A2 2 0 0 0 12 5c-1.102 0-2 .898-2 2.002V9H8v2H7v8h10v-8zm-2 0h-4V9h4zM8 9V7.002A4.004 4.004 0 0 1 12 3a4 4 0 0 1 4 4.002V9h.994A2.01 2.01 0 0 1 19 11.009v7.982c0 1.11-.897 2.009-2.006 2.009H7.006A2.01 2.01 0 0 1 5 18.991V11.01C5 9.899 5.897 9 7.006 9zm0 0h2v2H8zm6 0h2v2h-2z"/><circle cx="12" cy="15" r="2"/></g></svg>`,
		title: "XSRF token reset",
		description: "Reset security tokens for a user.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.25c0-.52-.206-1.017-.573-1.384L10.134.573A1.96 1.96 0 0 0 8.75 0H4a2 2 0 0 0-2 2zm2 .5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5h4v3.75c0 .414.336.75.75.75h3.75v8a.5.5 0 0 1-.5.5zm7.94-10H9.5V2.06z" clip-rule="evenodd"/></svg>`,
		title: "XLS export of issues",
		description: "Download search results as Excel.",
		iconColor: "#000000",
	},
	// Y
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M4.5 2.5v2H6v-2h4v2h1.5v-2H13a.5.5 0 0 1 .5.5v3h-11V3a.5.5 0 0 1 .5-.5zm-2 5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7.5zm9-6.5H13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1.5V0H6v1h4V0h1.5z" clip-rule="evenodd"/></svg>`,
		title: "Year-end review page",
		description: "Create a retrospective page for the year.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "Yield resources",
		description: "Reallocate capacity in Advanced Roadmaps.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" fill-rule="evenodd" d="M14.16 4.06a1 1 0 0 0-1.27.62L8.06 18.73a1 1 0 0 0 1.89.65l4.83-14.04a1 1 0 0 0-.62-1.27m-6.14 8.2-2.58-2.5 2.8-2.72a1 1 0 1 0-1.39-1.44L3.31 9.04a1 1 0 0 0 0 1.44l3.32 3.22a1 1 0 1 0 1.39-1.44m12.22 1.57-3.32-3.22a1 1 0 1 0-1.39 1.44l2.58 2.5-2.8 2.72a1 1 0 1 0 1.39 1.44l3.54-3.43a1 1 0 0 0 0-1.44"/></svg>`,
		title: "YAML pipeline edit",
		description: "Modify the bitbucket-pipelines.yml file.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2.22 1.22A.75.75 0 0 1 2.75 1H14a.75.75 0 0 1 .6 1.2l-2.662 3.55L14.6 9.3a.75.75 0 0 1-.6 1.2H3.5V15H2V1.75a.75.75 0 0 1 .22-.53M3.5 9h9l-2.1-2.8a.75.75 0 0 1 0-.9l2.1-2.8h-9z" clip-rule="evenodd"/></svg>`,
		title: "Yellow status flag",
		description: "Mark a project status as 'At Risk'.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "Yearly goal tracking",
		description: "Monitor progress towards annual goals.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h4.25v-11zm5.75 0v4.75h4.75V3a.5.5 0 0 0-.5-.5zm4.75 6.25H8.75v4.75H13a.5.5 0 0 0 .5-.5zM1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" clip-rule="evenodd"/></svg>`,
		title: "Your work dashboard",
		description: "Check your personal work queue.",
		iconColor: "#000000",
	},
	// Z
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 10 4zm-2 .5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.218l2.137-1.203A1.25 1.25 0 0 1 16 4.605v6.79a1.25 1.25 0 0 1-1.863 1.09L12 11.282v.218a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm12 5.061 2.5 1.407V5.032L12 6.44z" clip-rule="evenodd"/></svg>`,
		title: "Zoom integration setup",
		description: "Connect Zoom for meeting notifications.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8ZM8.75 3.25V7.63867L10.9688 9.41406L10.0312 10.5859L7.53125 8.58594L7.25 8.36035V3.25H8.75ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="#292A2E"/>
</svg>
`,
		title: "Zero downtime deploy",
		description: "Perform a rolling deployment.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M2 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.25c0-.52-.206-1.017-.573-1.384L10.134.573A1.96 1.96 0 0 0 8.75 0H4a2 2 0 0 0-2 2zm2 .5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5h4v3.75c0 .414.336.75.75.75h3.75v8a.5.5 0 0 1-.5.5zm7.94-10H9.5V2.06z" clip-rule="evenodd"/></svg>`,
		title: "Zip file attachment",
		description: "Upload a compressed archive to an issue.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M8.22 2.22a3.932 3.932 0 1 1 5.56 5.56l-2.25 2.25-1.06-1.06 2.25-2.25a2.432 2.432 0 0 0-3.44-3.44L7.03 5.53 5.97 4.47zm3.06 3.56-5.5 5.5-1.06-1.06 5.5-5.5zM2.22 8.22l2.25-2.25 1.06 1.06-2.25 2.25a2.432 2.432 0 0 0 3.44 3.44l2.25-2.25 1.06 1.06-2.25 2.25a3.932 3.932 0 1 1-5.56-5.56" clip-rule="evenodd"/></svg>`,
		title: "Zendesk ticket link",
		description: "Link a support ticket to a Jira issue.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentcolor" fill-rule="evenodd"><rect width="4" height="11" x="17" y="5" rx="2"/><rect width="4" height="8" x="11" y="8" rx="2"/><rect width="4" height="5" x="5" y="11" rx="2"/><path fill-rule="nonzero" d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 1 0-2 0v9.991A3.004 3.004 0 0 0 4.995 19H21a1 1 0 0 0 0-2"/></g></svg>`,
		title: "Zone chart view",
		description: "Analyze team performance by time zone.",
		iconColor: "#000000",
	},
	{
		icon: `<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentcolor" fill-rule="evenodd" d="M10.377.102a.75.75 0 0 1 .346.847L8.985 7.25h4.265a.75.75 0 0 1 .53 1.28l-7.25 7.25a.75.75 0 0 1-1.253-.73l1.738-6.3H2.75a.75.75 0 0 1-.53-1.28L9.47.22a.75.75 0 0 1 .907-.118M7.43 7.25l1.093-3.96L4.56 7.25zm1.142 1.5-1.093 3.96 3.961-3.96z" clip-rule="evenodd"/></svg>`,
		title: "Zapier automation",
		description: "Create a Zap to connect Jira to other apps.",
		iconColor: "#000000",
	},
];
