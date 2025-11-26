# Light/Dark Mode Theming Guide

This guide explains how theming works in this project and how to use it effectively.

## Overview

Your project now includes a comprehensive theming system that:

- ✅ Detects system theme preferences automatically
- ✅ Allows manual theme switching (light, dark, or system)
- ✅ Persists user preferences to localStorage
- ✅ Integrates seamlessly with Atlassian Design System (ADS)
- ✅ Prevents flash of unstyled content on page load

## Architecture

### 1. **ThemeContext** (`app/contexts/ThemeContext.tsx`)

This is the core of the theming system. It provides:

- **`ThemeProvider`** - Wraps your app at the root level
- **`useTheme()`** hook - Access and control the current theme

```tsx
const { theme, resolvedTheme, setTheme } = useTheme();

// theme: 'light' | 'dark' | 'system'
//   - The user's preference (what they set)
//   - If 'system', it follows OS preference
//
// resolvedTheme: 'light' | 'dark'
//   - The actual theme being used right now
//   - Always resolved to a concrete value
//
// setTheme(theme: 'light' | 'dark' | 'system')
//   - Change the current theme
//   - Automatically persists to localStorage
```

### 2. **CSS Architecture** (`app/globals.css` and `app/css/ads-tokens.css`)

Your CSS is already structured for theming:

```css
/* Light mode (default) */
:root {
  --elevation-surface: ...light values...
  --text: ...light values...
  /* etc */
}

/* Dark mode */
.dark {
  --elevation-surface: ...dark values...
  --text: ...dark values...
  /* etc */
}
```

When the user switches to dark mode:

1. The `ThemeProvider` adds the `.dark` class to `<html>`
2. All CSS custom properties update automatically
3. ADS tokens are notified via `setGlobalTheme({ colorMode: 'dark' })`
4. Your components re-render with new colors

### 3. **ThemeToggle Component** (`app/components/ThemeToggle.tsx`)

A ready-to-use button for switching themes. Shows the current theme with an icon.

## Usage

### In your Root Layout

Already set up in `app/layout.tsx`:

```tsx
import { ThemeProvider } from "./contexts/ThemeContext";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<ThemeProvider>
				<TokenProvider>
					<SystemPromptProvider>{children}</SystemPromptProvider>
				</TokenProvider>
			</ThemeProvider>
		</html>
	);
}
```

### Adding a Theme Toggle Button

Use it in your navigation or header:

```tsx
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Header() {
	return (
		<div>
			<h1>My App</h1>
			<ThemeToggle />
		</div>
	);
}
```

Clicking the button cycles through: **Light → Dark → System (auto) → Light**

### Accessing Theme in Components

```tsx
"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

export function MyComponent() {
	const { theme, resolvedTheme, setTheme } = useTheme();

	return (
		<div>
			<p>User preferred theme: {theme}</p>
			<p>Currently showing: {resolvedTheme}</p>
			<button onClick={() => setTheme("dark")}>Go Dark</button>
		</div>
	);
}
```

## How System Detection Works

When theme is set to `'system'`:

1. The component checks `window.matchMedia('(prefers-color-scheme: dark)')`
2. This reads the OS/browser theme preference
3. If it changes (user changes system settings), the app updates automatically
4. Listeners are set up to watch for changes

## Preventing Flash of Unstyled Content (FOUC)

The `ThemeProvider` includes logic to prevent theme flashing:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
	// Load theme from localStorage
	const saved = localStorage.getItem("theme");
	applyTheme(resolveTheme(saved || "system"));
	setMounted(true); // Only render content after theme is applied
}, []);
```

## CSS Custom Properties Structure

### Light Mode (`:root`)

```css
:root {
	--elevation-surface: white;
	--text: #1e1f21;
	--background-neutral: #f8f8f8;
	/* All light mode values */
}
```

### Dark Mode (`.dark`)

```css
.dark {
	--elevation-surface: #18191a;
	--text: #e2e3e4;
	--background-neutral: #1f1f21;
	/* All dark mode values */
}
```

All ADS color tokens are automatically remapped through this system.

## Tokens Integration

The ADS `@atlaskit/tokens` library is notified of theme changes:

```tsx
import { setGlobalTheme } from "@atlaskit/tokens";

// When theme changes:
setGlobalTheme({ colorMode: "dark" }); // or 'light'
```

This ensures all ADS components automatically use the correct colors.

## localStorage Behavior

Theme preference is saved to localStorage with key `'theme'`:

```ts
// When user changes theme
localStorage.setItem("theme", "dark"); // Persisted across sessions

// On page load
const saved = localStorage.getItem("theme"); // 'dark' | 'light' | 'system' | null
```

## Dark Mode CSS Class

The `.dark` class is applied directly to the `<html>` element:

```tsx
// In ThemeProvider:
if (resolved === "dark") {
	document.documentElement.classList.add("dark");
} else {
	document.documentElement.classList.remove("dark");
}
```

This makes dark mode styles cascade throughout your app automatically.

## Best Practices

### ✅ DO

- Use ADS tokens for all colors (automatically theme-aware)
- Use the `useTheme()` hook to conditionally render theme-specific UI
- Store user theme preference (already done)
- Test both light and dark mode regularly

### ❌ DON'T

- Hardcode colors directly (use tokens instead)
- Add theme-specific inline styles (use CSS classes)
- Forget to wrap components with `'use client'` when using `useTheme()`
- Add multiple `ThemeProvider`s (it should only be at the root)

## Example: Theme-Aware Component

```tsx
"use client";

import { useTheme } from "@/app/contexts/ThemeContext";
import { token } from "@atlaskit/tokens";

export function ThemeAwareComponent() {
	const { resolvedTheme } = useTheme();

	return (
		<div
			style={{
				backgroundColor: token("elevation.surface"),
				color: token("color.text"),
				padding: token("space.300"),
			}}
		>
			{resolvedTheme === "dark" ? <p>🌙 Dark mode is active</p> : <p>☀️ Light mode is active</p>}
		</div>
	);
}
```

## Debugging

### Check Current Theme

```tsx
import { useTheme } from "@/app/contexts/ThemeContext";

// In any component:
const { theme, resolvedTheme } = useTheme();
console.log("User theme:", theme); // 'light' | 'dark' | 'system'
console.log("Resolved theme:", resolvedTheme); // 'light' | 'dark'
```

### Check DOM

```tsx
// In browser console:
document.documentElement.classList.contains("dark"); // true/false
```

### Check localStorage

```tsx
// In browser console:
localStorage.getItem("theme"); // 'light' | 'dark' | 'system' | null
```

## Troubleshooting

### Theme Not Persisting

- Check browser localStorage is enabled
- Verify `localStorage.setItem('theme', ...)` is being called
- Check browser dev tools → Application tab → localStorage

### FOUC on Page Load

- This is handled automatically by the `mounted` state
- If still occurring, ensure `ThemeProvider` wraps all content
- Check that styles load before content renders

### ADS Components Not Updating Colors

- Ensure `setGlobalTheme()` is called when theme changes (already done)
- Verify `@atlaskit/tokens` is imported and used
- Check that CSS is loaded after tokens CSS

### System Theme Not Detecting

- Test with `window.matchMedia('(prefers-color-scheme: dark)').matches`
- Ensure browser supports `prefers-color-scheme`
- Check OS/browser theme settings

## Future Enhancements

Consider adding:

- Theme preview (show sample before saving)
- Theme transition animations
- Per-page theme overrides
- Custom color themes
- Theme sync across tabs
- Scheduled theme changes (light during day, dark at night)

## Files Modified/Created

```
app/
  ├── contexts/
  │   └── ThemeContext.tsx (NEW)
  ├── components/
  │   └── ThemeToggle.tsx (NEW)
  ├── layout.tsx (UPDATED)
  ├── globals.css (using existing dark mode)
  └── css/
      └── ads-tokens.css (already configured)
guides/
  └── THEMING_GUIDE.md (this file)
```
