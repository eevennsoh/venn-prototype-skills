"use client";

import React, { useEffect, useState } from "react";
import * as ReactJSXRuntime from "react/jsx-runtime";

interface ListItemProps {
	label: string;
	onClick?: () => void;
}

// Declare the Framer component type on window
declare global {
	interface Window {
		FramerListItem?: React.ComponentType<ListItemProps>;
		React?: typeof React;
		ReactJSXRuntime?: typeof ReactJSXRuntime;
	}
}

export default function ListItem({ label, onClick }: ListItemProps) {
	const [FramerComponent, setFramerComponent] = useState<React.ComponentType<ListItemProps> | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		let pollCount = 0;
		const maxPolls = 50; // 5 seconds max

		// Expose React to window for Framer component
		if (typeof window !== "undefined") {
			window.React = React;
			window.ReactJSXRuntime = ReactJSXRuntime;
		}

		const loadComponent = () => {
			// Check if already loaded
			if (window.FramerListItem) {
				if (isMounted) {
					console.log("✅ Framer component loaded successfully!");
					setFramerComponent(() => window.FramerListItem!);
					setIsLoading(false);
				}
				return true;
			}
			return false;
		};

		// Try immediate load
		if (loadComponent()) return;

		console.log("🔄 Loading Framer component from URL...");

		// Create script element to load Framer component
		const script = document.createElement("script");
		script.src = "https://framer.com/m/ListItem-1tYw.js@afBAtj217ot49kaWH0Jh";
		script.type = "module";
		script.async = true;

		script.onload = () => {
			console.log("📦 Script loaded, polling for component...");
			// Poll for component after script loads
			const pollInterval = setInterval(() => {
				pollCount++;
				if (loadComponent() || pollCount >= maxPolls) {
					clearInterval(pollInterval);
					if (pollCount >= maxPolls && !window.FramerListItem) {
						console.error("❌ Timeout: Framer component not found after 5 seconds");
						if (isMounted) {
							setError("Component load timeout");
							setIsLoading(false);
						}
					}
				}
			}, 100);
		};

		script.onerror = (e) => {
			console.error("❌ Failed to load Framer script:", e);
			if (isMounted) {
				setError("Script load failed");
				setIsLoading(false);
			}
		};

		document.head.appendChild(script);

		return () => {
			isMounted = false;
		};
	}, []);

	// Show loading state
	if (isLoading) {
		return <div style={{ padding: "12px 16px", color: "#8993a4", fontSize: "14px" }}>Loading {label}...</div>;
	}

	// Show error state
	if (error) {
		return <div style={{ padding: "12px 16px", color: "#de350b", fontSize: "14px" }}>Failed to load: {error}</div>;
	}

	// Transparent wrapper - just render the Framer component when loaded
	// All styling, interactions, and behavior come from Framer
	if (!FramerComponent) return null;

	return <FramerComponent label={label} onClick={onClick} />;
}
