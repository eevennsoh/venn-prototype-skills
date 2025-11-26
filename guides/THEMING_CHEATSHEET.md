# 🎨 Theming Cheatsheet

Quick reference for using the theme system.

## Basic Setup

✅ Already done! Your app is ready to use.

## One-Liner Usage

### Add Theme Toggle to Header
```tsx
import { ThemeToggle } from "@/app/components/ThemeToggle";
export function Header() {
  return <header><ThemeToggle /></header>;
}
```

### Access Theme in Component
```tsx
'use client';
import { useTheme } from "@/app/contexts/ThemeContext";
const { theme, resolvedTheme, setTheme } = useTheme();
```

### Style with Tokens
```tsx
import { token } from '@atlaskit/tokens';
<div style={{ color: token('color.text') }} />
```

## API Reference

### useTheme() Hook

```tsx
const { theme, resolvedTheme, setTheme } = useTheme();
```

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | User's preference |
| `resolvedTheme` | `'light' \| 'dark'` | Actual theme shown |
| `setTheme` | `(theme) => void` | Change theme |

### setTheme() Options

```tsx
setTheme('light');      // Force light mode
setTheme('dark');       // Force dark mode
setTheme('system');     // Follow OS preference
```

## Common Tokens

### Colors
```tsx
token('color.text')                    // Main text
token('color.text.subtle')             // Secondary text
token('color.text.subtlest')           // Tertiary text
token('color.text.inverse')            // Inverse text

token('background.neutral')            // Neutral background
token('background.selected')           // Selected state
token('background.danger')             // Error/danger

token('border')                        // Border color
token('border.focused')                // Focus state
```

### Surfaces
```tsx
token('elevation.surface')             // Base surface
token('elevation.surface.raised')      // Raised/card
token('elevation.surface.overlay')     // Modal/overlay
```

### Semantic
```tsx
token('background.success')            // Success state
token('background.warning')            // Warning state
token('background.danger')             // Danger state
token('background.information')        // Info state
```

### Spacing (from tokens)
```tsx
token('space.100')     // 8px
token('space.200')     // 16px
token('space.300')     // 24px
token('space.400')     // 32px
token('space.500')     // 40px
```

## CSS Class Application

When theme is active:

```tsx
// Light mode (default)
<html>  {/* no class */}
// CSS: :root { --text: #1e1f21; }

// Dark mode
<html class="dark">
// CSS: .dark { --text: #e2e3e4; }
```

## Component Patterns

### Theme-Aware Component
```tsx
'use client';
import { useTheme } from "@/app/contexts/ThemeContext";
import { token } from '@atlaskit/tokens';

export function MyComponent() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: token('elevation.surface'),
      color: token('color.text'),
    }}>
      {resolvedTheme === 'dark' ? '🌙' : '☀️'}
    </div>
  );
}
```

### CSS Class-Based
```tsx
// CSS
.my-component {
  background: white;
  color: black;
}
.dark .my-component {
  background: #18191a;
  color: white;
}

// TSX
export function MyComponent() {
  return <div className="my-component">Content</div>;
}
```

### Emotion CSS
```tsx
import { css } from '@emotion/react';
import { token } from '@atlaskit/tokens';

const styles = css({
  backgroundColor: token('elevation.surface'),
  color: token('color.text'),
});

export function MyComponent() {
  return <div css={styles}>Content</div>;
}
```

## localStorage

Theme is saved with key `'theme'`:

```ts
localStorage.getItem('theme');      // 'light' | 'dark' | 'system' | null
localStorage.setItem('theme', 'dark');
localStorage.removeItem('theme');
localStorage.clear();               // Clear all (careful!)
```

## Browser Console Debugging

```js
// Check current theme preference
localStorage.getItem('theme');

// Check active CSS class
document.documentElement.classList.contains('dark');

// Check specific token value
getComputedStyle(document.documentElement)
  .getPropertyValue('--text')
  .trim();

// Get all theme vars
Array.from(document.styleSheets)
  .find(s => s.href?.includes('ads-tokens'))
  ?.cssRules
```

## System Detection

Automatically uses OS preference when theme is `'system'`:

```tsx
// Check system preference
window.matchMedia('(prefers-color-scheme: dark)').matches
// → true if system is dark

// Listen for system changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    console.log('System theme changed:', e.matches ? 'dark' : 'light');
  });
```

## Styling Patterns

### Pattern 1: Token-Based (Recommended)
```tsx
import { token } from '@atlaskit/tokens';

<div style={{ color: token('color.text') }} />
```
✅ Automatic light/dark switching  
✅ Maintainable  
✅ Type-safe  

### Pattern 2: CSS Class
```css
.component { color: #1e1f21; }
.dark .component { color: #e2e3e4; }
```
✅ Simple  
✅ No JS needed  
✅ Good performance  

### Pattern 3: Inline Conditional
```tsx
const { resolvedTheme } = useTheme();
const color = resolvedTheme === 'dark' ? '#e2e3e4' : '#1e1f21';
<div style={{ color }} />
```
❌ Avoid - manual switching is error-prone

## Emotion CSS with Tokens

```tsx
import { css } from '@emotion/react';
import { token } from '@atlaskit/tokens';

const containerStyles = css({
  padding: token('space.300'),
  backgroundColor: token('elevation.surface'),
  borderRadius: token('border.radius.200'),
  '&:hover': {
    backgroundColor: token('elevation.surface.hovered'),
  },
});

<div css={containerStyles}>Content</div>
```

## Conditional Rendering

### Show/Hide by Theme
```tsx
const { resolvedTheme } = useTheme();

{resolvedTheme === 'dark' && <DarkModeContent />}
{resolvedTheme === 'light' && <LightModeContent />}
```

### Show/Hide by Preference
```tsx
const { theme } = useTheme();

{theme === 'system' && <SystemInfo />}
{theme !== 'system' && <OverrideInfo />}
```

## Testing

### Test Light Mode
```bash
# 1. Run app
npm run dev

# 2. Click toggle to "Light"

# 3. Verify light colors
```

### Test Dark Mode
```bash
# 1. Run app
npm run dev

# 2. Click toggle to "Dark"

# 3. Verify dark colors
```

### Test System
```bash
# 1. Run app
npm run dev

# 2. Click toggle to "System"

# 3. Change OS theme
# → App should update automatically
```

### Test Persistence
```bash
# 1. Set theme in app
# 2. Reload page
# → Theme should be restored

# In console:
localStorage.getItem('theme') // Should show your choice
```

## Troubleshooting Checklist

- [ ] Is `<ThemeProvider>` at root of layout.tsx?
- [ ] Are you using `token('...')` from `@atlaskit/tokens`?
- [ ] Is component marked with `'use client'` when using `useTheme()`?
- [ ] Did you check browser localStorage?
- [ ] Did you check `.dark` class on `<html>`?
- [ ] Did you clear browser cache?
- [ ] Is CSS file imported after tokens CSS?

## Examples

### 📌 Simple Card
```tsx
import { token } from '@atlaskit/tokens';

export function Card() {
  return (
    <div style={{
      padding: token('space.300'),
      backgroundColor: token('elevation.surface'),
      color: token('color.text'),
      border: `1px solid ${token('color.border')}`,
    }}>
      Content
    </div>
  );
}
```

### 📌 Theme Toggle Button
```tsx
import { ThemeToggle } from '@/app/components/ThemeToggle';

export function Header() {
  return <header><ThemeToggle /></header>;
}
```

### 📌 Conditional Content
```tsx
'use client';
import { useTheme } from '@/app/contexts/ThemeContext';

export function Status() {
  const { resolvedTheme } = useTheme();
  return <p>{resolvedTheme === 'dark' ? '🌙' : '☀️'}</p>;
}
```

### 📌 Settings Page
```tsx
'use client';
import { useTheme } from '@/app/contexts/ThemeContext';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      <p>Current: {theme}</p>
    </div>
  );
}
```

## Links

- 📖 **Quick Start**: `guides/THEMING_QUICK_START.md`
- 📚 **Full Guide**: `guides/THEMING_GUIDE.md`
- 💡 **Examples**: `guides/THEMING_EXAMPLES.md`
- 📋 **Setup Summary**: `THEMING_SETUP_SUMMARY.md`

## Quick Facts

- 🎨 All ADS tokens automatically support light/dark
- 💾 Theme preference saved to localStorage
- 🔄 Watches OS theme changes (when set to 'system')
- ⚡ Uses CSS variables (very fast)
- 📱 Works on all modern browsers
- 🚀 Production-ready
- 0️⃣ Zero configuration needed

---

**TL;DR**: Add `<ThemeToggle />` somewhere, use `token('...')` for colors, done! 🎉

