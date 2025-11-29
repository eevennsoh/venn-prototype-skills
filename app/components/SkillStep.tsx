import React, { useState } from "react";
import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import { IconTile } from "@atlaskit/icon";
import PageIcon from "@atlaskit/icon/core/page";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import { SkillStepData } from "../../lib/mockSkillPlan";

interface SkillStepProps {
	step: SkillStepData;
	isActive: boolean;
	isCompleted: boolean;
	isExpanded: boolean;
	isFirst?: boolean;
	isLast?: boolean;
	onToggleExpand: () => void;
	onApprove: () => void;
	onSkip: () => void;
}

export const SkillStep = ({ step, isActive, isCompleted, isExpanded, isFirst = true, isLast = true, onToggleExpand, onApprove, onSkip }: SkillStepProps) => {
	const stepNumber = step.id.split("-")[1];

	// Calculate border radius based on position
	const borderRadius =
		isFirst && isLast ? token("radius.large") : isFirst ? `${token("radius.large")} ${token("radius.large")} 0 0` : isLast ? `0 0 ${token("radius.large")} ${token("radius.large")}` : "0";

	return (
		<div
			style={{
				border: `${token("border.width")} solid ${token("color.border")}`,
				borderTop: !isFirst ? "none" : `${token("border.width")} solid ${token("color.border")}`,
				borderRadius: borderRadius,
				backgroundColor: token("elevation.surface"),
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
			}}
		>
			{/* Header */}
			<div
				style={{
					padding: token("space.200"),
					display: "flex",
					alignItems: "center",
					gap: token("space.150"),
					flexShrink: 0,
				}}
			>
				{/* Title Section */}
				<div style={{ display: "flex", alignItems: "center", gap: token("space.150"), flex: 1 }}>
					{/* Icon Tile */}
					<IconTile icon={PageIcon} label="" appearance="gray" size="32" />
					{/* Title */}
					<h4
						style={{
							fontWeight: 653,
							margin: 0,
							fontSize: "14px",
							lineHeight: "20px",
							color: token("color.text"),
						}}
					>
						{step.title}
					</h4>
				</div>

				{/* Action Buttons */}
				<div style={{ display: "flex", alignItems: "center", gap: token("space.100") }}>
					<div
						style={{
							transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
							transition: `transform var(--ds-duration-200) var(--ds-ease-40-in-out)`,
						}}
					>
						<IconButton
							icon={() => <ChevronDownIcon label="" size="small" />}
							label={isExpanded ? "Collapse" : "Expand"}
							appearance="subtle"
							spacing="compact"
							onClick={onToggleExpand}
							shape="circle"
						/>
					</div>
				</div>
			</div>

		{/* Body Content - Scrollable */}
		<div
			style={{
				maxHeight: isExpanded ? "300px" : "0px",
				opacity: isExpanded ? 1 : 0,
				transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
				overflow: "hidden",
				paddingLeft: token("space.200"),
				paddingRight: token("space.200"),
				paddingBottom: isExpanded ? token("space.150") : "0px",
				flexGrow: 1,
			}}
		>
			<Text as="p" size="small">
				{step.description}
			</Text>
		</div>
			{/* Sticky Footer */}
			<div
				style={{
					borderTop: `${token("border.width")} solid ${token("color.border")}`,
					flexShrink: 0,
					maxHeight: isActive && isExpanded ? "100px" : "0px",
					opacity: isActive && isExpanded ? 1 : 0,
					overflow: "hidden",
					transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
				}}
			>
				<div
					style={{
						padding: token("space.200"),
						display: "flex",
						gap: token("space.100"),
						justifyContent: "flex-end",
					}}
				>
					<Button appearance="subtle" onClick={onSkip}>
						Skip
					</Button>
					<Button appearance="primary" onClick={onApprove}>
						Approve
					</Button>
				</div>
			</div>
		</div>
	);
};
