"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";

export interface SkillLozengeProps {
	icon: React.ReactNode;
	label: string;
	color?: "blue" | "green" | "red" | "yellow" | "purple" | "teal";
	onClick?: () => void;
	isSelected?: boolean;
}

const colorMap: Record<string, string> = {
	blue: token("color.border.brand"),
	green: token("color.border.success"),
	red: token("color.border.danger"),
	yellow: token("color.border.warning"),
	purple: token("color.border.discovery"),
	teal: token("color.border.information"),
};

export default function SkillLozenge({ icon, label, color = "blue", onClick, isSelected = false }: SkillLozengeProps) {
	const [isHovered, setIsHovered] = React.useState(false);

	const borderColor = colorMap[color] || colorMap.blue;

	return (
		<div
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				gap: token("space.050"),
				padding: `${token("space.050")} ${token("space.075")} ${token("space.050")} ${token("space.100")}`,
				backgroundColor: token("color.background.neutral"),
				borderRadius: token("radius.small"),
				cursor: onClick ? "pointer" : "default",
				transition: "all 0.15s ease",
				transform: "skewX(-12deg)",
				overflow: "visible",
				height: "20px",
				boxSizing: "border-box",
				marginRight: token("space.025"),
			}}
		>
			{/* Colored slash stroke */}
			<div
				style={{
					position: "absolute",
					left: "0px",
					top: "0px",
					bottom: "0px",
					width: "2px",
					backgroundColor: borderColor,
					borderRadius: `${token("radius.small")} 0 0 ${token("radius.small")}`,
					zIndex: 1,
				}}
			/>

			{/* Icon container */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "16px",
					height: "16px",
					flexShrink: 0,
					color: token("color.text"),
					transform: "skewX(12deg)",
				}}
			>
				{icon}
			</div>

			{/* Label */}
			<div
				style={{
					transform: "skewX(12deg)",
					whiteSpace: "nowrap",
				}}
			>
				<Text size="medium" color="color.text">
					{label}
				</Text>
			</div>
		</div>
	);
}
