"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import TokenProvider from "@/app/components/TokenProvider";
import { SystemPromptProvider } from "@/app/contexts/SystemPromptContext";
import { ThemeToggle } from "@/app/components/ThemeToggle";

interface ClientLayoutProps {
	children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
	return (
		<ThemeProvider>
			<TokenProvider>
				<SystemPromptProvider>{children}</SystemPromptProvider>
			</TokenProvider>
			<ThemeToggle isOverlay />
		</ThemeProvider>
	);
}
