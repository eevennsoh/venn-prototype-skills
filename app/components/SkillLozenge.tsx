"use client";

import React from "react";
import { token } from "@atlaskit/tokens";

export interface SkillLozengeProps {
	icon: React.ReactNode;
	label: string;
	color?: "blue" | "green" | "red" | "yellow" | "purple" | "teal";
	onClick?: () => void;
	isSelected?: boolean;
}

const colorMap: Record<string, string> = {
	blue: "#357de8",
	green: "#22a06b",
	red: "#e2483d",
	yellow: "#ddb30e",
	purple: "#7c3aed",
	teal: "#0d7377",
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
				gap: "4px",
				padding: `${token("space.050")} ${token("space.075")} ${token("space.050")} ${token("space.100")}`,
				backgroundColor: token("color.background.neutral"),
				borderRadius: "4px",
				cursor: onClick ? "pointer" : "default",
				transition: "all 0.15s ease",
				transform: "skewX(-12deg)",
				overflow: "hidden",
				height: "20px",
				boxSizing: "border-box",
			}}
		>
			{/* Colored left border slash */}
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					bottom: 0,
					width: "2px",
					backgroundColor: borderColor,
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
			<span
				style={{
					fontSize: "14px",
					fontWeight: 600,
					color: token("color.text"),
					whiteSpace: "nowrap",
					transform: "skewX(12deg)",
					display: "inline-block",
					lineHeight: "20px",
				}}
			>
				{label}
			</span>
		</div>
	);
}
