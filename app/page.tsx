"use client";

import React, { useState, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import { RovoChatProvider } from "./contexts/RovoChatContext";
import RovoChatPanel from "./components/RovoChatPanel";

export default function Home() {
	const [apiUrl, setApiUrl] = useState<string>("");

	useEffect(() => {
		// Get the current origin and construct the API URL
		const origin = window.location.origin;
		setApiUrl(`${origin}/api/ai-gateway/stream`);
	}, []);

	return (
		<RovoChatProvider>
			<div
				style={{
					minHeight: "100vh",
					backgroundColor: token("color.background.neutral.subtle"),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "0 16px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<RovoChatPanel 
						onClose={() => {}} 
						apiUrl={apiUrl}
					/>
				</div>
			</div>
		</RovoChatProvider>
	);
}
