import { addPropertyControls, ControlType } from "framer";
import { type CSSProperties } from "react";
import { ATLASSIAN_SKILLS, EMPTY_STATE_SUGGESTIONS, useSearchStore } from "./Store.tsx";
import ListItem from "https://framer.com/m/List-item-svg-icon-bbLQ.js";
import MenuHeader from "https://framer.com/m/MenuHeader-Bk9S.js";

interface SuggestionProps {
	heading: string;
	limit: number;
	container: {
		backgroundColor: string;
		itemGap: number;
	};
	style?: CSSProperties;
	suggestions: {
		title: string;
		description: string;
		icon: string;
		iconColor: string;
	}[];
}

/**
 * @framerIntrinsicWidth 360
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 */
export default function Suggestion(props: SuggestionProps) {
	const {
		heading = "Suggested skills",
		limit = 6,
		container = {
			backgroundColor: "transparent",
			itemGap: 8,
		},
		style,
		suggestions = ATLASSIAN_SKILLS.map((s) => ({
			title: s.title,
			description: s.description,
			icon: s.icon,
			iconColor: s.iconColor,
		})),
	} = props;

	const [store] = useSearchStore();
	const query = store.query.toLowerCase().trim();

	// Filter skills based on search query
	const discoverItem = EMPTY_STATE_SUGGESTIONS.find((s) => s.title === "Discover skills and more") || EMPTY_STATE_SUGGESTIONS[EMPTY_STATE_SUGGESTIONS.length - 1];

	let matches: typeof ATLASSIAN_SKILLS = [];

	if (query) {
		try {
			const regex = new RegExp(query, "i");
			matches = suggestions.filter((skill) => regex.test(skill.title));
		} catch (e) {
			matches = suggestions.filter((skill) => skill.title.toLowerCase().includes(query));
		}
	} else {
		matches = EMPTY_STATE_SUGGESTIONS;
	}

	const filteredSkills = matches === EMPTY_STATE_SUGGESTIONS ? (limit >= matches.length ? matches : [...matches.slice(0, limit - 1), discoverItem]) : [...matches.slice(0, limit - 1), discoverItem];

	const isOnlyDiscoverItem = filteredSkills.length === 1 && filteredSkills[0].title === "Discover skills and more";

	return (
		<div
			style={{
				...style,
				width: "100%",
				height: "100%",
				backgroundColor: container.backgroundColor,
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				overflow: "hidden",
				overflowX: "hidden",
			}}
		>
			{query && <MenuHeader variant={isOnlyDiscoverItem ? "noResultsHeader" : "suggestHeader"} title={heading} style={{ width: "100%", flexShrink: 0 }} />}

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: `${container.itemGap}px`,
					overflowY: "auto",
					overflowX: "hidden",
					flex: 1,
					minHeight: 0,
					paddingRight: "4px", // Space for scrollbar
				}}
			>
				{filteredSkills.map((skill, index) => (
					<ListItem key={index} title={skill.title} description={skill.description} svgCode={skill.icon} iconColor={skill.iconColor} />
				))}
			</div>
		</div>
	);
}

addPropertyControls(Suggestion, {
	heading: {
		type: ControlType.String,
		title: "Heading",
		defaultValue: "Suggested skills",
	},
	limit: {
		type: ControlType.Number,
		title: "Limit",
		min: 1,
		max: 20,
		step: 1,
		displayStepper: true,
		defaultValue: 6,
	},
	container: {
		type: ControlType.Object,
		title: "Container",
		controls: {
			backgroundColor: {
				type: ControlType.Color,
				title: "Background",
				defaultValue: "transparent",
			},
			itemGap: {
				type: ControlType.Number,
				title: "Gap",
				min: 0,
				max: 32,
				unit: "px",
				defaultValue: 8,
			},
		},
	},
	suggestions: {
		type: ControlType.Array,
		title: "Suggestions",
		control: {
			type: ControlType.Object,
			controls: {
				title: {
					type: ControlType.String,
					title: "Title",
					defaultValue: "Skill Title",
				},
				description: {
					type: ControlType.String,
					title: "Description",
					defaultValue: "Skill description",
				},
				icon: {
					type: ControlType.String,
					title: "Icon SVG",
					defaultValue: "",
					displayTextArea: true,
				},
				iconColor: {
					type: ControlType.Color,
					title: "Icon Color",
					defaultValue: "#000000",
				},
			},
		},
		defaultValue: ATLASSIAN_SKILLS.map((s) => ({
			title: s.title,
			description: s.description,
			icon: s.icon,
			iconColor: s.iconColor,
		})),
		description: "List of suggested skills to display",
	},
});
