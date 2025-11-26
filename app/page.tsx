"use client";

import React, { useState, useEffect } from "react";
import { token } from "@atlaskit/tokens";
import { RovoChatProvider } from "./contexts/RovoChatContext";
import RovoChatPanel from "./components/RovoChatPanel";

export default function Home() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Only construct API URL on client side, avoid hydration mismatch
	const apiUrl = isMounted ? `${window.location.origin}/api/ai-gateway/stream` : "";

	// Don't render the panel until mounted to avoid hydration issues
	if (!isMounted) {
		return (
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
			/>
		);
	}

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
