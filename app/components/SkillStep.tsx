import React from "react";
import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";
import Button, { IconButton } from "@atlaskit/button/new";
import { IconTile } from "@atlaskit/icon";
import PageIcon from "@atlaskit/icon/core/page";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import { SkillStepData } from "../../lib/mockSkillPlan";

interface SkillStepProps {
	step: SkillStepData;
	isActive: boolean;
	isCompleted: boolean;
	onApprove: () => void;
	onSkip: () => void;
}

export const SkillStep = ({ step, isActive, isCompleted, onApprove, onSkip }: SkillStepProps) => {
	const stepNumber = step.id.split("-")[1];

	return (
		<div
			style={{
				border: `1px solid ${isActive ? token("color.border.focused") : token("color.border")}`,
				borderRadius: token("radius.large"),
				backgroundColor: isActive ? token("elevation.surface") : token("color.background.neutral.subtle"),
				marginBottom: token("space.100"),
				overflow: "hidden",
				transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
			}}
		>
			{/* Header */}
			<div
				style={{
					padding: `${token("space.200")} ${token("space.200")} 0`,
					display: "flex",
					alignItems: "center",
					gap: token("space.150"),
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
					<DropdownMenu
						trigger={({ triggerRef, ...props }) => (
							<IconButton {...props} ref={triggerRef} icon={() => <ShowMoreHorizontalIcon label="" size="small" />} label="More actions" appearance="subtle" spacing="compact" />
						)}
					>
						<DropdownItemGroup>
							<DropdownItem>Edit</DropdownItem>
							<DropdownItem>Delete</DropdownItem>
						</DropdownItemGroup>
					</DropdownMenu>
				</div>
			</div>

			{/* Content */}
			<div style={{ padding: `0 ${token("space.200")}` }}>
				{/* Expanded Content */}
				<div
					style={{
						maxHeight: isActive ? "500px" : "0px",
						opacity: isActive ? 1 : 0,
						transition: `all var(--ds-duration-200) var(--ds-ease-40-in-out)`,
						overflow: "hidden",
					}}
				>
					<div style={{ paddingTop: token("space.200"), paddingBottom: token("space.200") }}>
						<Text as="p" size="small">
							{step.description}
						</Text>
					</div>

					{/* Footer Actions */}
					<div style={{ display: "flex", gap: token("space.100"), justifyContent: "flex-end" }}>
						<Button appearance="subtle" onClick={onSkip}>
							Skip
						</Button>
						<Button appearance="primary" onClick={onApprove}>
							Approve
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
