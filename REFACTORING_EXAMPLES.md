# Component Refactoring Examples

## Pattern 1: Hardcoded Colors → ADS Tokens

### Before
```tsx
const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'High':
      return '#AE2A19';  // ❌ Hardcoded hex
    case 'Medium':
      return '#974F0C';  // ❌ Hardcoded hex
    case 'Low':
      return '#626F86';  // ❌ Hardcoded hex
    default:
      return token('color.text.subtle');
  }
};
```

### After
```tsx
const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'High':
      return token('color.text.danger');  // ✅ Semantic token
    case 'Medium':
      return token('color.text.warning');  // ✅ Semantic token
    case 'Low':
      return token('color.text.subtle');  // ✅ Semantic token
    default:
      return token('color.text.subtle');
  }
};
```

## Pattern 2: Pixel Padding → Token Spacing

### Before
```tsx
<div
  style={{
    padding: '12px',  // ❌ Hardcoded pixels
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${token('color.border')}`,
  }}
>
```

### After
```tsx
<div
  style={{
    padding: token('space.100'),  // ✅ Token (8px)
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${token('color.border')}`,
  }}
>
```

## Pattern 3: Complex Padding Values → Composite Tokens

### Before
```tsx
<div
  style={{
    padding: '8px 12px',  // ❌ Hardcoded pixels
    display: 'flex',
    flexDirection: 'column',
  }}
>
```

### After
```tsx
<div
  style={{
    padding: `${token('space.075')} ${token('space.100')}`,  // ✅ Vertical then horizontal
    display: 'flex',
    flexDirection: 'column',
  }}
>
```

## Pattern 4: Hardcoded Brand Colors → Semantic Tokens

### Before
```tsx
<div
  style={{
    backgroundColor: '#1868DB',  // ❌ Hardcoded brand blue
    padding: '12px 16px',  // ❌ Hardcoded pixels
    color: token('elevation.surface'),
  }}
>
```

### After
```tsx
<div
  style={{
    backgroundColor: token('color.text.brand'),  // ✅ Semantic token (adapts to theme)
    padding: `${token('space.100')} ${token('space.150')}`,  // ✅ Spacing tokens
    color: token('elevation.surface'),
  }}
>
```

## Pattern 5: Invalid Font Weights → Valid Values

### Before
```tsx
<h2
  style={{
    fontSize: '16px',
    fontWeight: 653,  // ❌ Invalid CSS value
    color: token('color.text'),
  }}
>
  Let's do this together
</h2>
```

### After
```tsx
<h2
  style={{
    fontSize: '16px',
    fontWeight: 600,  // ✅ Valid CSS weight (semibold)
    color: token('color.text'),
  }}
>
  Let's do this together
</h2>
```

## Pattern 6: Hardcoded Gap Values → Spacing Tokens

### Before
```tsx
<div
  style={{
    display: 'flex',
    gap: '4px',  // ❌ Hardcoded pixels
    alignItems: 'center',
  }}
>
```

### After
```tsx
<div
  style={{
    display: 'flex',
    gap: token('space.050'),  // ✅ Token (4px)
    alignItems: 'center',
  }}
>
```

## Spacing Token Map

| Token | Value | Use Case |
|-------|-------|----------|
| `space.050` | 4px | Minimal gaps, tight spacing |
| `space.075` | 6px | Small paddings, borders |
| `space.100` | 8px | Standard padding, default gaps |
| `space.150` | 12px | Medium spacing, list items |
| `space.200` | 16px | Larger sections, main gaps |
| `space.400` | 32px | Major section spacing |

## Color Token Categories

### Text Colors
- `color.text` - Primary text
- `color.text.subtle` - Secondary text
- `color.text.subtlest` - Tertiary text
- `color.text.danger` - Error state text
- `color.text.warning` - Warning state text
- `color.text.brand` - Brand colored text

### Surface Colors
- `elevation.surface` - Base surface
- `elevation.surface.hovered` - Hover state
- `color.border` - Borders

## Benefits of This Refactoring

✅ **Theme Consistency**: All components automatically respect theme changes
✅ **Accessibility**: ADS tokens include proper contrast ratios
✅ **Maintenance**: Change tokens once, update everywhere
✅ **Scalability**: Easy to extend with new tokens
✅ **Type Safety**: Token values validated at runtime
✅ **Documentation**: Self-documenting through token names

## Next Steps

1. Monitor component rendering to ensure visual consistency
2. Test in both light and dark themes if applicable
3. Update any new components to follow this pattern immediately
4. Consider migrating inline styles to Tailwind classes for pure layout (flex, grid, positioning)

