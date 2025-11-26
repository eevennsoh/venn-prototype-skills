"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { setGlobalTheme } from "@atlaskit/tokens";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	resolvedTheme: "light" | "dark";
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");
	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

	// Detect system theme preference
	const getSystemTheme = (): "light" | "dark" => {
		if (typeof window === "undefined") return "light";
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	};

	// Resolve the actual theme to use
	const resolveTheme = (t: Theme): "light" | "dark" => {
		if (t === "system") {
			return getSystemTheme();
		}
		return t;
	};

	// Update the DOM and ADS tokens
	const applyTheme = (resolved: "light" | "dark") => {
		if (typeof window === "undefined") return;
		
		const htmlElement = document.documentElement;

		if (resolved === "dark") {
			htmlElement.classList.add("dark");
		} else {
			htmlElement.classList.remove("dark");
		}

		// Update ADS tokens
		setGlobalTheme({ colorMode: resolved });
		setResolvedTheme(resolved);
	};

	// Initialize theme from localStorage
	useEffect(() => {
		try {
			const savedTheme = localStorage.getItem("theme") as Theme | null;
			const initialTheme = savedTheme || "system";
			setThemeState(initialTheme);

			const resolved = resolveTheme(initialTheme);
			applyTheme(resolved);
		} catch (e) {
			// localStorage might not be available
			console.warn("Theme initialization failed:", e);
		}
	}, []);

	// Listen for system theme changes
	useEffect(() => {
		if (typeof window === "undefined") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			if (theme === "system") {
				const resolved = resolveTheme("system");
				applyTheme(resolved);
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		try {
			localStorage.setItem("theme", newTheme);
		} catch (e) {
			console.warn("Failed to save theme:", e);
		}

		const resolved = resolveTheme(newTheme);
		applyTheme(resolved);
	};

	const value: ThemeContextType = {
		theme,
		resolvedTheme,
		setTheme,
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
