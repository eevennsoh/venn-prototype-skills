"use client";

import React from "react";
import { token } from "@atlaskit/tokens";

export interface SkillListItemProps {
	icon: React.ReactNode;
	label: string;
	byline?: string;
	onClick?: () => void;
}

export default function SkillListItem({ icon, label, byline, onClick }: SkillListItemProps) {
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<div
			onClick={onClick}
			style={{
				display: "flex",
				gap: token("space.150"),
				alignItems: "center",
				padding: token("space.050"),
				borderRadius: token("space.050"),
				cursor: onClick ? "pointer" : "default",
				transition: "background-color 0.15s ease",
				backgroundColor: isHovered && onClick ? token("elevation.surface.hovered") : "transparent",
				height: "44px",
				boxSizing: "border-box",
			}}
			onMouseEnter={() => {
				setIsHovered(true);
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
				<p
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
				</p>
				{isHovered && byline && (
					<p
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
					</p>
				)}
			</div>
		</div>
	);
}

