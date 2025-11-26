"use client";

import React from "react";
import { token } from "@atlaskit/tokens";

export interface SkillListItemProps {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
}

export default function SkillListItem({ icon, label, onClick }: SkillListItemProps) {
	return (
		<div
			onClick={onClick}
			style={{
				display: "flex",
				gap: token("space.150"),
				alignItems: "center",
				padding: "8px 12px",
				borderRadius: "6px",
				cursor: onClick ? "pointer" : "default",
				transition: "background-color 0.15s ease",
				backgroundColor: "transparent",
			}}
			onMouseEnter={(e) => {
				if (onClick) {
					(e.currentTarget as HTMLDivElement).style.backgroundColor = token("elevation.surface.hovered");
				}
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
			}}
		>
			{/* Skill icon */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: token("space.050"),
					border: `1px solid ${token("color.border")}`,
					borderRadius: "4px",
					flexShrink: 0,
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
			</div>
		</div>
	);
}

