# Theming Implementation Examples

Real-world examples of how to use the theming system in your components.

## Example 1: Simple Theme Toggle in Header

```tsx
// app/components/Header.tsx
'use client';

import { ThemeToggle } from './ThemeToggle';
import { token } from '@atlaskit/tokens';

export function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: token('space.300'),
        backgroundColor: token('elevation.surface'),
        borderBottom: `1px solid ${token('color.border')}`,
      }}
    >
      <h1 style={{ margin: 0, color: token('color.text') }}>
        My App
      </h1>
      <ThemeToggle />
    </header>
  );
}
```

## Example 2: Card Component with Theme Awareness

```tsx
// app/components/Card.tsx
'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { token } from '@atlaskit/tokens';
import { css } from '@emotion/react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div
      css={css({
        backgroundColor: token('elevation.surface'),
        border: `1px solid ${token('color.border')}`,
        borderRadius: token('border.radius.300'),
        padding: token('space.300'),
        boxShadow: token('elevation.shadow.raised'),
        // Subtle shadow difference in dark mode
        opacity: resolvedTheme === 'dark' ? 0.95 : 1,
      })}
    >
      <h2
        style={{
          margin: `0 0 ${token('space.200')} 0`,
          color: token('color.text'),
          fontSize: token('font.size.16'),
          fontWeight: 'bold',
        }}
      >
        {title}
      </h2>
      <div style={{ color: token('color.text.subtlest') }}>
        {children}
      </div>
    </div>
  );
}
```

## Example 3: Theme Switcher with Icons

```tsx
// app/components/AdvancedThemeSwitcher.tsx
'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import Button from '@atlaskit/button/new';
import SunIcon from '@atlaskit/icon/core/sun';
import MoonIcon from '@atlaskit/icon/core/moon';
import MonitorIcon from '@atlaskit/icon/core/monitor';
import { token } from '@atlaskit/tokens';
import { css } from '@emotion/react';

export function AdvancedThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light' as const, icon: SunIcon, label: 'Light' },
    { value: 'dark' as const, icon: MoonIcon, label: 'Dark' },
    { value: 'system' as const, icon: MonitorIcon, label: 'System' },
  ];

  return (
    <div
      css={css({
        display: 'flex',
        gap: token('space.100'),
        padding: token('space.200'),
        backgroundColor: token('elevation.surface.overlay'),
        borderRadius: token('border.radius.200'),
      })}
    >
      {options.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          appearance={theme === value ? 'primary' : 'subtle'}
          onClick={() => setTheme(value)}
          iconBefore={<Icon label={label} />}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
```

## Example 4: Conditional Rendering Based on Theme

```tsx
// app/components/Dashboard.tsx
'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { token } from '@atlaskit/tokens';

export function Dashboard() {
  const { resolvedTheme, theme } = useTheme();

  return (
    <div style={{ padding: token('space.300') }}>
      <h1 style={{ color: token('color.text') }}>Dashboard</h1>

      {/* Show different content based on theme */}
      {resolvedTheme === 'dark' && (
        <div
          style={{
            backgroundColor: token('background.success'),
            padding: token('space.200'),
            borderRadius: token('border.radius.200'),
          }}
        >
          🌙 Dark mode optimized for night viewing
        </div>
      )}

      {resolvedTheme === 'light' && (
        <div
          style={{
            backgroundColor: token('background.information'),
            padding: token('space.200'),
            borderRadius: token('border.radius.200'),
          }}
        >
          ☀️ Light mode optimized for day viewing
        </div>
      )}

      {/* Show user's preference */}
      <p style={{ color: token('color.text.subtle'), marginTop: token('space.200') }}>
        User preference: {theme}
        {theme === 'system' && ` (currently ${resolvedTheme})`}
      </p>
    </div>
  );
}
```

## Example 5: Using CSS Classes Directly

```tsx
// styles/components.css
/* Light mode (default) */
.theme-aware-box {
  background-color: white;
  border-color: #dddee1;
  color: #1e1f21;
  transition: all 0.2s ease-in-out;
}

.theme-aware-box:hover {
  background-color: #f8f8f8;
  border-color: #b7b9be;
}

/* Dark mode */
.dark .theme-aware-box {
  background-color: #18191a;
  border-color: #303134;
  color: #e2e3e4;
}

.dark .theme-aware-box:hover {
  background-color: #1f1f21;
  border-color: #4b4d51;
}
```

```tsx
// app/components/Box.tsx
export function Box({ children }: { children: React.ReactNode }) {
  return <div className="theme-aware-box">{children}</div>;
}
```

## Example 6: Custom Hook for Theme-Aware Styling

```tsx
// app/hooks/useThemeColor.ts
'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { token } from '@atlaskit/tokens';

export function useThemeColor(lightColor: string, darkColor: string) {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'dark' ? darkColor : lightColor;
}

// Usage in component:
export function StyledComponent() {
  const accentColor = useThemeColor('#4688ec', '#669df1');
  
  return (
    <div style={{ color: accentColor }}>
      Dynamically themed!
    </div>
  );
}
```

## Example 7: Theme Preference Display Component

```tsx
// app/components/ThemeInfo.tsx
'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { token } from '@atlaskit/tokens';
import Text from '@atlaskit/primitives/text';

export function ThemeInfo() {
  const { theme, resolvedTheme } = useTheme();

  const themeInfo = {
    light: '☀️ Light mode - optimized for bright environments',
    dark: '🌙 Dark mode - reduces eye strain in low light',
    system: `🖥️ System preference - currently ${resolvedTheme}`,
  };

  return (
    <div
      style={{
        padding: token('space.200'),
        backgroundColor: token('background.neutral.subtle'),
        borderRadius: token('border.radius.200'),
      }}
    >
      <Text as="p" color="text.subtle">
        {themeInfo[theme]}
      </Text>
    </div>
  );
}
```

## Example 8: Theme Toggle with Description

```tsx
// app/components/SettingsPanel.tsx
'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import Button from '@atlaskit/button/new';
import { token } from '@atlaskit/tokens';

export function SettingsPanel() {
  const { theme, setTheme } = useTheme();

  const settings = [
    {
      value: 'light' as const,
      label: 'Light Mode',
      description: 'Use light colors for daytime viewing',
    },
    {
      value: 'dark' as const,
      label: 'Dark Mode',
      description: 'Use dark colors for night viewing',
    },
    {
      value: 'system' as const,
      label: 'System',
      description: 'Follow your device preferences',
    },
  ];

  return (
    <div style={{ padding: token('space.300') }}>
      <h2 style={{ color: token('color.text') }}>Theme Settings</h2>

      {settings.map((setting) => (
        <div
          key={setting.value}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: token('space.200'),
            marginBottom: token('space.200'),
            backgroundColor: token('elevation.surface.overlay'),
            borderRadius: token('border.radius.200'),
          }}
        >
          <div>
            <p style={{ margin: 0, color: token('color.text') }}>
              {setting.label}
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              color: token('color.text.subtle'),
            }}>
              {setting.description}
            </p>
          </div>
          <Button
            appearance={theme === setting.value ? 'primary' : 'default'}
            onClick={() => setTheme(setting.value)}
          >
            {theme === setting.value ? 'Selected' : 'Select'}
          </Button>
        </div>
      ))}
    </div>
  );
}
```

## Example 9: Animated Theme Transition

```tsx
// app/components/AnimatedThemeToggle.tsx
'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import Button from '@atlaskit/button/new';
import SunIcon from '@atlaskit/icon/core/sun';
import MoonIcon from '@atlaskit/icon/core/moon';
import { css } from '@emotion/react';

export function AnimatedThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      appearance="subtle"
      onClick={handleToggle}
      iconBefore={
        <div
          css={css({
            animation:
              resolvedTheme === 'dark'
                ? 'spin 0.3s ease-in'
                : 'spin-reverse 0.3s ease-in',
            '@keyframes spin': {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' },
            },
            '@keyframes spin-reverse': {
              from: { transform: 'rotate(360deg)' },
              to: { transform: 'rotate(0deg)' },
            },
          })}
        >
          {resolvedTheme === 'dark' ? (
            <MoonIcon label="Dark" />
          ) : (
            <SunIcon label="Light" />
          )}
        </div>
      }
    >
      {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
    </Button>
  );
}
```

## Example 10: Complete Page with Theming

```tsx
// app/page.tsx
'use client';

import { Header } from '@/app/components/Header';
import { Card } from '@/app/components/Card';
import { Dashboard } from '@/app/components/Dashboard';
import { ThemeInfo } from '@/app/components/ThemeInfo';
import { token } from '@atlaskit/tokens';

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: token('elevation.surface'),
        color: token('color.text'),
        minHeight: '100vh',
        transition: 'background-color 0.2s ease-in-out',
      }}
    >
      <Header />

      <main style={{ padding: token('space.400'), maxWidth: '1200px', margin: '0 auto' }}>
        <Dashboard />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: token('space.300'), marginTop: token('space.400') }}>
          <Card title="Feature 1">
            This card automatically adapts to the current theme.
          </Card>
          <Card title="Feature 2">
            Try switching between light and dark modes.
          </Card>
          <Card title="Feature 3">
            All colors update instantly!
          </Card>
        </div>

        <div style={{ marginTop: token('space.400') }}>
          <ThemeInfo />
        </div>
      </main>
    </div>
  );
}
```

## Tips & Tricks

### 🎨 Using Emotion CSS with Tokens

```tsx
import { css } from '@emotion/react';
import { token } from '@atlaskit/tokens';

const styles = css({
  background: token('elevation.surface'),
  color: token('color.text'),
  padding: token('space.300'),
  '&:hover': {
    background: token('elevation.surface.hovered'),
  },
});
```

### 🔄 Combining useTheme with Other Hooks

```tsx
import { useTheme } from '@/app/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export function MyComponent() {
  const { resolvedTheme } = useTheme();
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Adjust component based on theme
    setIsOptimized(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return <div>{isOptimized && '✓'} Optimized</div>;
}
```

### 🎯 Scoped Theme Styles

```tsx
export function LocalComponent() {
  return (
    <div className="local-wrapper">
      {/* Styles only apply within .local-wrapper */}
    </div>
  );
}
```

```css
.local-wrapper {
  color: var(--text);
}

.dark .local-wrapper {
  /* Specific dark mode styles for this component */
}
```

---

**Need more help?** Check [THEMING_GUIDE.md](./THEMING_GUIDE.md) for the complete reference.

