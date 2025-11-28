"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";

interface SkillHoverCardProps {
	children: React.ReactNode;
	skillName: string;
	description?: string;
	appName?: string;
	appLogo?: string;
}

export default function SkillHoverCard({
	children,
	skillName,
	description,
	appName,
	appLogo,
}: SkillHoverCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const triggerRef = useRef<HTMLSpanElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		if (triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			setPosition({
				top: rect.top + window.scrollY - 8, // Position above with 8px gap
				left: rect.left + window.scrollX,
			});
			setIsOpen(true);
		}
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 100); // Small delay to allow moving to the card if needed
	};

	// Close on scroll to avoid detached popup
	useEffect(() => {
		if (!isOpen) return;

		const handleScroll = () => setIsOpen(false);
		window.addEventListener("scroll", handleScroll, true);
		return () => window.removeEventListener("scroll", handleScroll, true);
	}, [isOpen]);

	return (
		<>
			<span ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: "inline-flex" }}>
				{children}
			</span>
			{isOpen &&
				createPortal(
					<div
						ref={cardRef}
						style={{
							position: "absolute",
							top: position.top,
							left: position.left,
							transform: "translateY(-100%)",
							zIndex: 9999, // Ensure it's on top
							width: "320px",
							padding: token("space.200"),
							backgroundColor: token("elevation.surface.overlay"),
							borderRadius: token("radius.medium"),
							boxShadow: token("elevation.shadow.overlay"),
							display: "flex",
							flexDirection: "column",
							gap: token("space.200"),
							// Prevent interaction with the card from closing it immediately (optional)
							pointerEvents: "auto",
						}}
						onMouseEnter={() => {
							if (timeoutRef.current) {
								clearTimeout(timeoutRef.current);
								timeoutRef.current = null;
							}
						}}
						onMouseLeave={handleMouseLeave}
					>
						{/* Header + Description Section */}
						<div style={{ display: "flex", flexDirection: "column", gap: token("space.100") }}>
							{/* Heading */}
							<h3
								style={{
									margin: 0,
									fontSize: token("font.heading.xsmall"),
									fontWeight: "bold",
									color: token("color.text"),
									lineHeight: token("line-height.heading.xsmall"),
								}}
							>
								{skillName}
							</h3>

							{/* Description */}
							<Text size="small" color="color.text">
								{description || "Create a document, name it appropriately, and save it to your Google Drive under the correct folder for easy access later."}
							</Text>
						</div>

						{/* Footer - Logo Attribution */}
						<div style={{ display: "flex", alignItems: "center", gap: token("space.050") }}>
							{appLogo ? (
								<img
									src={appLogo}
									alt={`${appName ?? "Unknown"} logo`}
									style={{
										width: 16,
										height: 16,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								/>
							) : (
								<div
									style={{
										width: 16,
										height: 16,
										background: token("color.background.neutral"),
										borderRadius: token("radius.full"),
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								/>
							)}
							<Text size="small" color="color.text.subtlest">
								{appName || "Unknown"}
							</Text>
						</div>
					</div>,
					document.body
				)}
		</>
	);
}
