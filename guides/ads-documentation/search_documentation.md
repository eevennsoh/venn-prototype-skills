# Atlassian Design System Search Guide

## Overview
Since Atlassian's Design System is open source with comprehensive documentation, you can find components and patterns through:

1. **TypeScript Intellisense** - The installed packages provide full type definitions
2. **Official Documentation** - https://atlassian.design/
3. **Package Documentation** - Each npm package has detailed README files

## How to Find Components

### 1. Using TypeScript Intellisense
```typescript
// Start typing to see available components
import Button from '@atlaskit/button';
import { Stack, Box, Inline } from '@atlaskit/primitives';

// TypeScript will show all available props
<Button 
  appearance="" // IntelliSense shows: "default" | "primary" | "subtle" | "link" | "subtle-link" | "warning" | "danger"
/>
```

### 2. Component Categories

**Forms & Input**
- `@atlaskit/form` - Form wrapper and field components
- `@atlaskit/textfield` - Text input fields
- `@atlaskit/textarea` - Multi-line text input
- `@atlaskit/select` - Dropdown selections
- `@atlaskit/checkbox` - Checkbox inputs
- `@atlaskit/radio` - Radio button groups
- `@atlaskit/toggle` - Toggle switches
- `@atlaskit/datetime-picker` - Date and time selection

**Navigation**
- `@atlaskit/atlassian-navigation` - Top navigation bar
- `@atlaskit/side-navigation` - Side navigation menu
- `@atlaskit/breadcrumbs` - Breadcrumb navigation
- `@atlaskit/tabs` - Tab navigation
- `@atlaskit/menu` - Menu components
- `@atlaskit/dropdown-menu` - Dropdown menus

**Feedback & Messaging**
- `@atlaskit/banner` - Page-level announcements
- `@atlaskit/flag` - Notification flags
- `@atlaskit/section-message` - Section-level messages
- `@atlaskit/inline-message` - Inline contextual messages
- `@atlaskit/modal-dialog` - Modal dialogs
- `@atlaskit/tooltip` - Tooltips

**Data Display**
- `@atlaskit/dynamic-table` - Sortable, filterable tables
- `@atlaskit/avatar` - User avatars
- `@atlaskit/avatar-group` - Groups of avatars
- `@atlaskit/badge` - Numeric badges
- `@atlaskit/lozenge` - Status indicators
- `@atlaskit/tag` - Tags/labels
- `@atlaskit/code` - Code display

**Layout & Primitives**
- `@atlaskit/primitives` - Box, Stack, Inline, Grid
- `@atlaskit/page` - Page layout components

**Utilities**
- `@atlaskit/spinner` - Loading spinners
- `@atlaskit/progress-bar` - Progress indicators
- `@atlaskit/skeleton` - Skeleton loaders
- `@atlaskit/empty-state` - Empty state displays

### 3. Finding Icons
Icons are in `@atlaskit/icon/glyph/*`:
```typescript
// Import specific icons
import AddIcon from '@atlaskit/icon/glyph/add';
import EditIcon from '@atlaskit/icon/glyph/edit';
import TrashIcon from '@atlaskit/icon/glyph/trash';

// Common icon categories:
// - Navigation: arrow-*, chevron-*, menu, more
// - Actions: add, edit, trash, copy, share, download
// - Objects: document, folder, calendar, person
// - Status: check-circle, cross-circle, warning, info
```

### 4. Using Design Tokens
```typescript
import { token } from '@atlaskit/tokens';

// Color tokens
token('color.text')
token('color.text.subtle')
token('color.background.neutral')
token('color.border')

// Spacing tokens (use in styles)
token('space.100') // 8px
token('space.200') // 16px
token('space.300') // 24px

// Typography tokens
token('font.size.100') // 14px default
token('font.size.200') // 16px
token('font.size.400') // 24px

// Elevation tokens
token('elevation.shadow.raised')
token('elevation.shadow.overflow')
```

## Quick Discovery Patterns

### Finding the Right Component
1. **Think semantically** - What is the purpose?
   - Need user input? Check form components
   - Need to show status? Check lozenges/badges
   - Need navigation? Check navigation components

2. **Check component props** - TypeScript will guide you
   ```typescript
   // Type the component and let IntelliSense show available props
   <Select
     // IntelliSense will show: options, placeholder, isMulti, etc.
   />
   ```

3. **Common patterns**:
   - Forms: Form > Field > Input component
   - Tables: DynamicTable with head and rows config
   - Modals: Modal with Header, Body, Footer
   - Navigation: TopNav + SideNav pattern

### Best Practices for Discovery
1. **Start with primitives** for layout (Stack, Inline, Box)
2. **Use semantic components** over generic ones
3. **Check TypeScript hints** for prop requirements
4. **Follow naming patterns** - most icons end with Icon
5. **Use design tokens** for all styling values

## Example: Building a Feature
```typescript
// 1. Layout with primitives
import { Stack, Inline, Box } from '@atlaskit/primitives';

// 2. Add semantic components
import Button from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import SectionMessage from '@atlaskit/section-message';

// 3. Add icons as needed
import AddIcon from '@atlaskit/icon/glyph/add';

// 4. Apply tokens for styling
import { token } from '@atlaskit/tokens';

// Build your feature!
```

Remember: The TypeScript definitions are your best friend. Start typing and let IntelliSense guide you to the right components and props!