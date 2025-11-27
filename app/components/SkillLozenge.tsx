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
	fillColor?: string; // Optional color token for the icon and slash stroke
	isInsideBlueBackground?: boolean; // Whether the skill is rendered inside a blue background
	focusRingColor?: string;
}

const colorMap: Record<string, string> = {
	blue: token("color.border.brand"),
	green: token("color.border.success"),
	red: token("color.border.danger"),
	yellow: token("color.border.warning"),
	purple: token("color.border.discovery"),
	teal: token("color.border.information"),
};

export default function SkillLozenge({ icon, label, color = "blue", onClick, isSelected = false, fillColor, isInsideBlueBackground = false, focusRingColor }: SkillLozengeProps) {
	// When inside blue background, use inverse tokens for better contrast
	// For blue icons, use the subtle blue token instead
	const borderColor = React.useMemo(() => {
		if (isInsideBlueBackground && fillColor === "color.icon.accent.blue") {
			return token("color.background.accent.blue.subtle");
		}
		return fillColor ? token(fillColor as any) : colorMap[color] || colorMap.blue;
	}, [isInsideBlueBackground, fillColor, color]);

	const backgroundColor = React.useMemo(() => (isInsideBlueBackground ? token("color.background.inverse.subtle") : token("color.background.neutral")), [isInsideBlueBackground]);

	const textColorToken = React.useMemo(() => (isInsideBlueBackground ? "color.text.inverse" : "color.text"), [isInsideBlueBackground]);

	return (
		<span
			onClick={onClick}
			style={{
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				gap: token("space.050"),
				padding: `${token("space.050")} ${token("space.075")} ${token("space.050")} ${token("space.100")}`,
				backgroundColor: backgroundColor,
				borderRadius: token("radius.small"),
				cursor: onClick ? "pointer" : "default",
				transition: "all 0.15s ease",
				transform: "skewX(-12deg)",
				overflow: "visible",
				height: "20px",
				boxSizing: "border-box",
				marginRight: token("space.025"),
				verticalAlign: "middle",
				...(focusRingColor && {
					outline: `2px solid ${focusRingColor}`,
					outlineOffset: "2px",
				}),
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
					color: token(textColorToken),
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
				<Text size="medium" color={textColorToken}>
					{label}
				</Text>
			</div>
		</span>
	);
}
