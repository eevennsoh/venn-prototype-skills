"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import MenuIcon from "@atlaskit/icon/core/menu";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import EditIcon from "@atlaskit/icon/core/edit";
import SmartLinkEmbedIcon from "@atlaskit/icon/core/smart-link-embed";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import CrossIcon from "@atlaskit/icon/core/cross";
import { Inline } from "@atlaskit/primitives/compiled";

interface ChatHeaderProps {
	onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
	return (
		<div
			style={{
				padding: token("space.150"),
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			{/* Left side: Menu icon and Title */}
			<Inline space="space.050" alignBlock="center">
				<IconButton icon={MenuIcon} label="New chat" appearance="subtle" spacing="default" />
				<Inline space="space.100" alignBlock="center">
					<img src="/Rovo.svg" alt="Rovo" style={{ width: 20, height: 20, objectFit: "contain" }} />
					<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
						<span
							style={{
								fontSize: "14px",
								fontWeight: 600,
								color: token("color.text"),
								whiteSpace: "nowrap",
							}}
						>
							Rovo
						</span>
						<ChevronDownIcon label="Expand menu" size="small" />
					</div>
				</Inline>
			</Inline>

			{/* Right side: Chat actions */}
			<Inline space="space.050" alignBlock="center">
				<IconButton icon={EditIcon} label="Edit" appearance="subtle" spacing="default" />
				<IconButton icon={SmartLinkEmbedIcon} label="Switch view" appearance="subtle" spacing="default" />
				<IconButton icon={ShowMoreHorizontalIcon} label="More" appearance="subtle" spacing="default" />
				<IconButton icon={CrossIcon} label="Close" appearance="subtle" spacing="default" onClick={onClose} />
			</Inline>
		</div>
	);
}

