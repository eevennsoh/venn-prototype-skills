"use client";

import React from "react";
import { token } from "@atlaskit/tokens";

export default function ChatGreeting() {
	return (
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
			<h1
				style={{
					margin: 0,
					color: token("color.text"),
					textAlign: "center",
					whiteSpace: "nowrap",
				}}
			>
				Let's do this together
			</h1>
		</div>
	);
}

