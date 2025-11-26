"use client";

import { useTheme } from "@/app/contexts/ThemeContext";
import { IconButton } from "@atlaskit/button/new";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import ThemeIcon from "@atlaskit/icon/core/theme";
import { token } from "@atlaskit/tokens";

interface ThemeToggleProps {
	/**
	 * Position the toggle as a fixed overlay.
	 * When true, displays in top-right corner.
	 * Can combine with positioning props to customize placement.
	 */
	isOverlay?: boolean;
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
	zIndex?: number;
}

export function ThemeToggle({ isOverlay = false, top, right, bottom, left, zIndex = 9999 }: ThemeToggleProps) {
	const { theme, setTheme } = useTheme();

	const getLabel = () => {
		if (theme === "system") {
			return "System";
		}
		return theme.charAt(0).toUpperCase() + theme.slice(1);
	};

	const dropdown = (
		<DropdownMenu shouldRenderToParent trigger={({ triggerRef, ...props }: any) => <IconButton ref={triggerRef} {...props} icon={ThemeIcon} label={`Theme: ${getLabel()}`} />}>
			<DropdownItemGroup>
				<DropdownItem onClick={() => setTheme("light")}>Light</DropdownItem>
				<DropdownItem onClick={() => setTheme("dark")}>Dark</DropdownItem>
				<DropdownItem onClick={() => setTheme("system")}>System</DropdownItem>
			</DropdownItemGroup>
		</DropdownMenu>
	);

	// If overlay mode, wrap with fixed positioning
	if (isOverlay) {
		return (
			<div
				style={{
					position: "fixed",
					top: top || token("space.200"),
					right: right || token("space.200"),
					bottom,
					left,
					zIndex,
					pointerEvents: "auto",
				}}
			>
				{dropdown}
			</div>
		);
	}

	// Otherwise, return just the dropdown
	return dropdown;
}
