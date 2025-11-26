# Theming Quick Start

## What's Been Set Up

✅ **ThemeContext** - Manages light/dark mode state and system detection  
✅ **ThemeToggle** - Button component to switch themes  
✅ **CSS Architecture** - Light and dark mode tokens already configured  
✅ **Integration** - Wrapped in your root layout

## Getting Started in 2 Minutes

### 1. Add Theme Toggle to Your Navigation

```tsx
// In your header or navigation component
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Header() {
	return (
		<header>
			<h1>My App</h1>
			<ThemeToggle /> {/* That's it! */}
		</header>
	);
}
```

### 2. Use Tokens in Components

```tsx
// Already works with both light & dark mode automatically
import { token } from "@atlaskit/tokens";

export function Card() {
	return (
		<div
			style={{
				backgroundColor: token("elevation.surface"),
				color: token("color.text"),
				padding: token("space.300"),
			}}
		>
			Content
		</div>
	);
}
```

## How It Works

| Action                   | Result                                          |
| ------------------------ | ----------------------------------------------- |
| User clicks theme toggle | Cycles: Light → Dark → System                   |
| Theme is set to "System" | Follows OS preference automatically             |
| OS theme changes         | App updates instantly (if set to System)        |
| Page reloads             | User's preference is restored from localStorage |

## Access Theme in Any Component

```tsx
"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

export function MyComponent() {
	const { theme, resolvedTheme, setTheme } = useTheme();

	return (
		<div>
			{/* Manually change theme */}
			<button onClick={() => setTheme("dark")}>Dark</button>
			<button onClick={() => setTheme("light")}>Light</button>
			<button onClick={() => setTheme("system")}>Auto</button>

			{/* Show current state */}
			<p>Preference: {theme}</p>
			<p>Active: {resolvedTheme}</p>
		</div>
	);
}
```

## Test It Out

### Test Light Mode

```bash
npm run dev
# Click theme toggle to "Light"
# Check browser: light colors appear
```

### Test Dark Mode

```bash
npm run dev
# Click theme toggle to "Dark"
# Check browser: dark colors appear
```

### Test System Detection

```bash
npm run dev
# Click theme toggle to "System"
# Change your OS theme settings
# Watch the app update automatically
```

### Check localStorage

```javascript
// In browser console:
localStorage.getItem("theme"); // Shows: 'light', 'dark', or 'system'
```

### Check Active Theme

```javascript
// In browser console:
document.documentElement.classList.contains("dark"); // true/dark mode
```

## Common Tasks

### Style Something Different in Dark Mode

Use CSS:

```css
/* Light mode (default) */
.my-component {
	background: white;
	color: black;
}

/* Dark mode */
.dark .my-component {
	background: #18191a;
	color: white;
}
```

Or use tokens in React:

```tsx
import { token } from "@atlaskit/tokens";

<div
	style={{
		background: token("elevation.surface"),
		color: token("color.text"),
	}}
>
	Automatically light or dark!
</div>;
```

### Conditionally Render Based on Theme

```tsx
"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

export function MyComponent() {
	const { resolvedTheme } = useTheme();

	return (
		<>
			{resolvedTheme === "dark" && <DarkModeIcon />}
			{resolvedTheme === "light" && <LightModeIcon />}
		</>
	);
}
```

### Get Just the Token Value

```tsx
import { token } from "@atlaskit/tokens";

const surfaceColor = token("elevation.surface");
// Returns the actual hex value, updates with theme
```

## Files You Should Know About

| File                             | Purpose                             |
| -------------------------------- | ----------------------------------- |
| `app/contexts/ThemeContext.tsx`  | Theme management & system detection |
| `app/components/ThemeToggle.tsx` | Theme switching button              |
| `app/layout.tsx`                 | Root layout with `<ThemeProvider>`  |
| `app/css/ads-tokens.css`         | Light & dark mode token values      |

## Troubleshooting

**Q: Theme doesn't persist after refresh?**  
A: Check browser localStorage is enabled in settings

**Q: Components not switching colors?**  
A: Make sure you're using `token('...')` from `@atlaskit/tokens`

**Q: System theme not detecting?**  
A: Check your OS/browser theme settings - try manually switching theme first

**Q: Flash of wrong colors on load?**  
A: This is prevented by the `mounted` state - if still happening, clear localStorage

## Next Steps

1. ✅ Add `<ThemeToggle />` to your header
2. ✅ Start using `token('...')` in your components
3. ✅ Test light and dark modes
4. ✅ Check the [THEMING_GUIDE.md](./THEMING_GUIDE.md) for advanced topics

## Architecture Diagram

```
┌─────────────────────────────────────┐
│      Browser localStorage           │
│      (saves user preference)         │
└────────────────┬────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │   ThemeContext     │
        │  - reads storage   │
        │  - detects system  │
        │  - applies .dark   │
        └────────────────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌────────┐  ┌──────────┐  ┌───────┐
│ CSS    │  │ ADS      │  │ React │
│ .dark  │  │ Tokens   │  │ State │
│ class  │  │ updated  │  │       │
└────────┘  └──────────┘  └───────┘
    │            │            │
    └────────────┼────────────┘
                 ▼
       Your components update!
```

## Key Concepts

### Theme vs Resolved Theme

```
theme = what user selected
  ├─ 'light' → always use light mode
  ├─ 'dark' → always use dark mode
  └─ 'system' → follow OS setting

resolvedTheme = what's actually being used
  ├─ 'light' (if theme='light' or system preference is light)
  └─ 'dark' (if theme='dark' or system preference is dark)
```

### CSS Class Application

```
When resolvedTheme is 'light':
  <html> (no .dark class)
  → CSS custom properties use light values

When resolvedTheme is 'dark':
  <html class="dark"> (added by theme provider)
  → CSS custom properties use dark values
```

---

**More info?** See [THEMING_GUIDE.md](./THEMING_GUIDE.md) for the full guide.
