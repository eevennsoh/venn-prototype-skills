"use client";

import React from "react";
import { token } from "@atlaskit/tokens";

export interface SkillListItemProps {
	icon: React.ReactNode;
	label: string;
	byline?: string;
	onClick?: () => void;
	isActive?: boolean;
	onMouseEnter?: () => void;
}

export default function SkillListItem({ icon, label, byline, onClick, isActive = false, onMouseEnter }: SkillListItemProps) {
	const [isHovered, setIsHovered] = React.useState(false);
	const isHighlighted = isActive || isHovered;

	return (
		<div
			onClick={onClick}
			style={{
				display: "flex",
				gap: token("space.150"),
				alignItems: "center",
				padding: token("space.075"),
				borderRadius: token("space.100"),
				cursor: onClick ? "pointer" : "default",
				transition: "background-color 0.15s ease",
				backgroundColor: isHighlighted && onClick ? token("elevation.surface.hovered") : "transparent",
				height: "44px",
				boxSizing: "border-box",
			}}
			onMouseEnter={() => {
				setIsHovered(true);
				onMouseEnter?.();
			}}
			onMouseLeave={() => {
				setIsHovered(false);
			}}
		>
			{/* Skill icon */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "30px",
					height: "30px",
					border: `1px solid ${token("color.border")}`,
					borderRadius: token("space.075"),
					flexShrink: 0,
					boxSizing: "border-box",
					backgroundColor: token("elevation.surface"),
				}}
			>
				{icon}
			</div>

			{/* Content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					flex: 1,
					minWidth: 0,
				}}
			>
				<div
					style={{
						margin: 0,
						fontSize: "14px",
						fontWeight: 500,
						color: token("color.text"),
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{label}
				</div>
				{isHighlighted && byline && (
					<div
						style={{
							margin: 0,
							fontSize: "12px",
							fontWeight: 400,
							color: token("color.text.subtlest"),
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						{byline}
					</div>
				)}
			</div>
		</div>
	);
}
