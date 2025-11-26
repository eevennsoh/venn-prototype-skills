"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import AlignTextLeftIcon from "@atlaskit/icon/core/align-text-left";
import ClockIcon from "@atlaskit/icon/core/clock";
import MicrophoneIcon from "@atlaskit/icon/core/microphone";
import VideoIcon from "@atlaskit/icon/core/video";
import SendIcon from "@atlaskit/icon/core/send";
import StatusDiscoveryIcon from "@atlaskit/icon/core/status-discovery";
import SkillListItem from "./SkillListItem";

export interface SkillSuggestionsProps {
	onSkillSelect?: (skill: string) => void;
}

interface Skill {
	id: string;
	label: string;
	icon: React.ReactNode;
}

const SKILLS: Skill[] = [
	{
		id: "summarize-page",
		label: "Summarize page",
		icon: <AlignTextLeftIcon label="" size="small" />,
	},
	{
		id: "summarize-changes",
		label: "Summarize changes",
		icon: <ClockIcon label="" size="small" />,
	},
	{
		id: "change-tone",
		label: "Change tone",
		icon: <MicrophoneIcon label="" size="small" />,
	},
	{
		id: "send-message",
		label: "Send message",
		icon: <SendIcon label="" size="small" />,
	},
	{
		id: "turn-into-loom",
		label: "Turn into Loom video",
		icon: <VideoIcon label="" size="small" />,
	},
	{
		id: "discover-skills",
		label: "Discover skills and more",
		icon: <StatusDiscoveryIcon label="" size="small" />,
	},
];

export default function SkillSuggestions({ onSkillSelect }: SkillSuggestionsProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: token("space.200"),
				alignItems: "center",
				justifyContent: "center",
				padding: `${token("space.200")} ${token("space.200")} ${token("space.400")}`,
			}}
		>
			{/* Greetings */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: token("space.100"),
					alignItems: "center",
					justifyContent: "center",
					padding: `${token("space.100")} ${token("space.100")}`,
				}}
			>
				<img
					src="/Chat.svg"
					alt="Chat"
					style={{
						width: 80,
						height: 80,
						objectFit: "contain",
					}}
				/>
				<h2
					style={{
						margin: 0,
						fontSize: "16px",
						fontWeight: 653,
						color: token("color.text"),
						textAlign: "center",
						whiteSpace: "nowrap",
					}}
				>
					Let's do this together
				</h2>
			</div>

			{/* Skills list */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "4px",
					width: "100%",
				}}
			>
				{SKILLS.map((skill) => (
					<SkillListItem
						key={skill.id}
						icon={skill.icon}
						label={skill.label}
						onClick={() => onSkillSelect?.(skill.label)}
					/>
				))}
			</div>
		</div>
	);
}

