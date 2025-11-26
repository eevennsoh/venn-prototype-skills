# 🏗️ Theming Architecture

Deep dive into how the theming system works.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Environment                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Next.js App                           │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │  app/layout.tsx (Root)                             │ │ │
│  │  │  ┌──────────────────────────────────────────────┐  │ │ │
│  │  │  │ <ThemeProvider>                              │  │ │ │
│  │  │  │  - Manages theme state                       │  │ │ │
│  │  │  │  - Applies .dark class to <html>            │  │ │ │
│  │  │  │  - Calls setGlobalTheme()                    │  │ │ │
│  │  │  │  - Listens to system preference changes      │  │ │ │
│  │  │  │  ┌──────────────────────────────────────────┐  │ │ │
│  │  │  │  │ <TokenProvider>                          │  │ │ │
│  │  │  │  │ - ADS token initialization               │  │ │ │
│  │  │  │  │ ┌────────────────────────────────────┐   │  │ │ │
│  │  │  │  │ │ <SystemPromptProvider>             │   │  │ │ │
│  │  │  │  │ │ - Your app components              │   │  │ │ │
│  │  │  │  │ └────────────────────────────────────┘   │  │ │ │
│  │  │  │  └──────────────────────────────────────────┘  │ │ │
│  │  │  └──────────────────────────────────────────────┘  │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Data Flow Layer                                        │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ localStorage  CSS Variables  DOM Classes            │ │ │
│  │  │ (persistence) (styling)      (theme signal)         │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  OS/Browser Layer                                       │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ window.matchMedia('(prefers-color-scheme: dark)')   │ │ │
│  │  │ (system preference detection)                       │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
Root Layout (app/layout.tsx)
└── ThemeProvider (app/contexts/ThemeContext.tsx)
    ├── TokenProvider (app/components/TokenProvider.tsx)
    │   └── SystemPromptProvider
    │       └── [Your App Components]
    │           ├── Header
    │           │   └── ThemeToggle (app/components/ThemeToggle.tsx)
    │           ├── Dashboard
    │           ├── Cards
    │           └── ... other components
    └── (Listeners for system theme changes)
```

## State Management

### ThemeContext State

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';      // User's preference
  resolvedTheme: 'light' | 'dark';          // Actual theme shown
  setTheme: (theme: Theme) => void;         // Update preference
}
```

### Internal State in Provider

```typescript
const [theme, setThemeState] = useState<Theme>('system');
// Defaults to system, loads from localStorage on mount

const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
// The actual theme being shown

const [mounted, setMounted] = useState(false);
// Prevents FOUC by waiting for hydration
```

## Data Flow

### User Changes Theme

```
┌─────────────────────────────────────┐
│  User clicks ThemeToggle button     │
└────────────────┬────────────────────┘
                 │
                 ▼
       ┌─────────────────────┐
       │ handleClick()       │
       │ getNextTheme()      │
       │ setTheme(newTheme)  │
       └────────────┬────────┘
                    │
      ┌─────────────┴─────────────┐
      │                           │
      ▼                           ▼
┌──────────────────┐     ┌──────────────────────┐
│ setThemeState()  │     │ localStorage.setItem │
│                  │     │ ('theme', newTheme)  │
└────────┬─────────┘     └──────────┬───────────┘
         │                          │
         └──────────────┬───────────┘
                        ▼
           ┌────────────────────────┐
           │ applyTheme()           │
           │ - Toggle .dark class   │
           │ - Call setGlobalTheme()│
           │ - Update resolvedTheme │
           └────────────┬───────────┘
                        ▼
              ┌──────────────────────┐
              │  Components Re-render │
              │  with new colors     │
              └──────────────────────┘
```

### Page Load / Initialization

```
┌─────────────────────────────────┐
│  Component Mounts                │
│  (useEffect with empty deps)     │
└──────────────┬──────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ localStorage.getItem()   │
    │ (read saved preference)  │
    └────────────┬─────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ resolveTheme()       │
      │ (if 'system', detect)│
      └────────────┬─────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ applyTheme()         │
        │ (apply to DOM)       │
        └────────────┬─────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ setMounted(true)      │
          │ (render allowed)      │
          └──────────────────────┘
```

### System Theme Changes (when theme='system')

```
┌───────────────────────────────────┐
│ OS/Browser Theme Changes          │
│ e.g., User switches to dark mode  │
└────────────┬──────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│ matchMedia listener fires            │
│ (only if theme === 'system')         │
└────────────┬─────────────────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ handleChange()         │
    │ - resolveTheme()       │
    │ - applyTheme()         │
    └────────────┬───────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │  App Re-renders       │
      │  with new theme      │
      └──────────────────────┘
```

## CSS Layer

### Light Mode (Default)

```css
:root {
  /* All light mode tokens */
  --elevation-surface: white;
  --text: #1e1f21;
  --background-neutral: #f8f8f8;
  --color-border: #dddee1;
  /* ... hundreds of tokens ... */
}

/* When no .dark class */
html {
  /* Uses :root tokens */
}
```

### Dark Mode

```css
.dark {
  /* Dark mode tokens override :root */
  --elevation-surface: #18191a;
  --text: #e2e3e4;
  --background-neutral: #1f1f21;
  --color-border: #303134;
  /* ... hundreds of tokens ... */
}

/* When .dark class present */
html.dark {
  /* Uses .dark tokens */
}
```

### Component Access

```css
/* Components use tokens via CSS variables */
.my-component {
  background-color: var(--elevation-surface);
  color: var(--text);
  border-color: var(--color-border);
}

/* Automatically switches when .dark class applied */
```

## Event Listeners

### System Preference Listener

```typescript
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

mediaQuery.addEventListener('change', () => {
  // Only responds if theme === 'system'
  if (theme === 'system') {
    const resolved = resolveTheme('system');
    applyTheme(resolved);
  }
});

// Cleanup on unmount
mediaQuery.removeEventListener('change', handleChange);
```

## Storage

### localStorage Structure

```typescript
// Key: 'theme'
// Values: 'light' | 'dark' | 'system' | null

localStorage.setItem('theme', 'dark');
// Now persisted across page reloads

localStorage.getItem('theme'); // 'dark'

// Automatically cleared when component unmounts
// (no manual cleanup needed)
```

### Initialization Sequence

```
1. App loads
2. localStorage.getItem('theme')
   - If null → use 'system' (default)
   - If 'light' → force light mode
   - If 'dark' → force dark mode
   - If 'system' → detect OS preference

3. Apply detected theme

4. Set mounted = true (allows render)

5. Install listeners for future changes

6. Component fully interactive
```

## DOM Manipulation

### Class Application

```typescript
// Light mode
document.documentElement.classList.remove('dark');
// Result: <html> (no class)

// Dark mode
document.documentElement.classList.add('dark');
// Result: <html class="dark">
```

### CSS Cascade

```
With .dark class added:

.dark {
  --elevation-surface: #18191a;
  /* ... overrides :root ... */
}

html.dark {
  /* All descendants inherit updated --custom-properties */
}

.my-component {
  background: var(--elevation-surface);
  /* ↓ Now uses dark value */
}
```

## ADS Integration

### Token Update

```typescript
import { setGlobalTheme } from '@atlaskit/tokens';

// Called when theme changes
setGlobalTheme({ colorMode: 'light' });  // or 'dark'

// ADS components notify about new tokens
// All @atlaskit components re-evaluate tokens
```

### Token Resolution

```
1. User changes theme → resolvedTheme updates
2. applyTheme() calls setGlobalTheme()
3. ADS tokens update internal state
4. ADS components check for new token values
5. All components using token('...') get new colors
6. Re-renders happen automatically
```

## Hydration Safety

### Flash Prevention

```typescript
// Problem: Component renders before theme applied
<html>
  <head>...</head>
  <body>
    {/* Renders with wrong theme first */}
  </body>
</html>

// Solution: Wait for mount
const [mounted, setMounted] = useState(false);

if (!mounted) {
  return <>{children}</>; // Minimal render
}

// After theme applied and mounted = true
// Full component tree renders with correct theme
```

## Performance Characteristics

### CSS Variable Update
- ⚡ **O(1)** - single operation on `<html>`
- No CSS recompile needed
- Cascades to all descendants

### Component Re-renders
- 🔄 Only components using `useTheme()` or ADS tokens
- Not triggered by CSS variable change
- Controlled via React context

### DOM Operations
- 📍 One class toggle: `classList.add/remove('dark')`
- Optional: `setGlobalTheme()` call to ADS
- Very efficient

### Memory
- 💾 One listener for system preference
- Cleaned up on unmount
- localStorage read once on mount
- ~1-2KB overhead

## Browser APIs Used

```typescript
// System preference detection
window.matchMedia('(prefers-color-scheme: dark)')
  .matches  // true/false
  .addEventListener('change', handler)  // watch for changes

// DOM manipulation
document.documentElement  // <html> element
  .classList.add('dark')
  .remove('dark')

// Storage
localStorage
  .getItem('theme')
  .setItem('theme', value)
  .clear()

// React
useState()      // theme, resolvedTheme, mounted
useContext()    // access ThemeContext
useEffect()     // setup/cleanup
```

## Error Handling

### Safe Fallbacks

```typescript
// If localStorage not available
try {
  const saved = localStorage.getItem('theme');
} catch (e) {
  // Falls back to 'system'
}

// If matchMedia not supported
if (window.matchMedia) {
  mediaQuery.addEventListener('change', handler);
}

// If document.documentElement unavailable
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}
```

## Optimization Strategies

### 1. Lazy Theme Detection
```typescript
// Don't detect system theme until needed
const getSystemTheme = () => {
  // Only called when theme === 'system'
  return window.matchMedia(...).matches ? 'dark' : 'light';
};
```

### 2. Memoized Theme Context
```typescript
const value: ThemeContextType = {
  theme, resolvedTheme, setTheme
};
// Stable reference unless values change
```

### 3. Cleanup Functions
```typescript
return () => mediaQuery.removeEventListener('change', handleChange);
// Prevents memory leaks
```

## Future Enhancements

### Possible Extensions

1. **Transition Animations**
   ```tsx
   html {
     transition: background-color 0.3s ease;
   }
   ```

2. **Per-Component Overrides**
   ```tsx
   <div data-theme="light">
     Force light mode in this subtree
   </div>
   ```

3. **Theme Sync Across Tabs**
   ```tsx
   window.addEventListener('storage', ({ key, newValue }) => {
     if (key === 'theme') setTheme(newValue);
   });
   ```

4. **Scheduled Theme Changes**
   ```tsx
   // Sunrise: light, Sunset: dark
   const hour = new Date().getHours();
   setTheme(hour > 6 && hour < 18 ? 'light' : 'dark');
   ```

5. **Custom Color Themes**
   ```tsx
   const themes = {
     'light': { ... },
     'dark': { ... },
     'custom': { ... }
   };
   ```

---

**Questions?** Check the implementation in `app/contexts/ThemeContext.tsx`

