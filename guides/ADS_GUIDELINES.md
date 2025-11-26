## avatar-guidelines

# Avatar Component Guidelines

## Overview
The Avatar component represents users or entities with support for images, initials, presence indicators, and status.

## Package
```tsx
import Avatar from '@atlaskit/avatar';
```

## Use Cases
- **User representation** - Display user identity in lists, comments, etc.
- **Status communication** - Show online/offline presence
- **Permission indicators** - Display approval/decline status
- **Brand representation** - Show company logos or project avatars

## Prop Guidance
- **name** - Always provide for accessibility (use full names when possible)
- **size** - xsmall (inline), small (compact), medium (standard), large (prominent), xlarge (hero), xxlarge (marketing)
- **presence** - Use sparingly for real-time status (online, busy, focus, offline)
- **status** - For approval states (approved, declined, locked)
- **appearance** - Use "square" for non-circular avatars

## Content Guidelines
- Use full names when possible (e.g., "John Doe" not "JD")
- For companies/projects, use descriptive names
- Avoid generic terms like "User" or "Admin"
- Use consistent naming conventions across your app

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic avatar
<img 
  src="/avatar.jpg" 
  alt="User" 
  className="w-10 h-10 rounded-full"
/>

// Avatar with initials
<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
  JD
</div>

// Avatar with status dot
<div className="relative">
  <img src="/avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
</div>
```

### ✅ After (ADS)
```tsx
import Avatar from '@atlaskit/avatar';

// Basic avatar
<Avatar src="/avatar.jpg" name="John Doe" />

// Avatar with initials (automatically generated)
<Avatar name="John Doe" />

// Avatar with presence
<Avatar 
  src="/avatar.jpg" 
  name="John Doe" 
  presence="online"
/>
```

## Common Mistakes

### ❌ Don't Skip the Name Prop
```tsx
// ❌ Wrong - Missing accessibility
<Avatar src="/avatar.jpg" />

// ✅ Correct - Always include name
<Avatar src="/avatar.jpg" name="John Doe" />
```

### ❌ Don't Use Generic Names
```tsx
// ❌ Wrong - Too generic
<Avatar name="User" />

// ✅ Correct - Specific and descriptive
<Avatar name="John Doe" />
```

### ❌ Don't Overuse Presence
```tsx
// ❌ Wrong - Too many presence indicators
<div>
  <Avatar name="User 1" presence="online" />
  <Avatar name="User 2" presence="busy" />
  <Avatar name="User 3" presence="focus" />
  <Avatar name="User 4" presence="offline" />
</div>

// ✅ Correct - Use presence sparingly
<div>
  <Avatar name="User 1" presence="online" />
  <Avatar name="User 2" />
  <Avatar name="User 3" />
  <Avatar name="User 4" />
</div>
```

---

## button-guidelines

# Button Component Guidelines

## Overview
The Button component is the primary interactive element for triggering actions in the Atlassian Design System.

## Package
```tsx
import Button from '@atlaskit/button/new';
```

## Use Cases
- **Primary actions** - Main actions on pages/sections
- **Secondary actions** - Supporting or alternative actions
- **Form submissions** - Submit, cancel, save actions
- **Navigation** - Moving between sections or pages

## Prop Guidance
- **appearance** - primary (main), default (secondary), subtle (tertiary), danger (destructive), warning (caution), discovery (new features)
- **spacing** - compact (tight spaces), default (standard), comfortable (generous)
- **isDisabled** - Use instead of removing the button
- **isLoading** - Show loading state during async operations

## Content Guidelines
- Use action verbs that describe the interaction
- Keep text concise (1-3 words ideal)
- Avoid generic terms like "Submit" or "Click here"
- Use sentence case
- Start with the verb and specify what's being acted on

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Primary button
<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
  Create
</button>

// Secondary button
<button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded">
  Cancel
</button>

// Danger button
<button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
  Delete
</button>
```

### ✅ After (ADS)
```tsx
import Button from '@atlaskit/button/new';

// Primary button
<Button appearance="primary">Create</Button>

// Secondary button (default appearance)
<Button appearance="default">Cancel</Button>

// Danger button
<Button appearance="danger">Delete</Button>
```

## Common Mistakes

### ❌ Don't Use Native Button Elements
```tsx
// ❌ Wrong - Native button with Tailwind
<button className="bg-blue-600 text-white px-4 py-2 rounded">
  Create
</button>

// ✅ Correct - ADS Button component
<Button appearance="primary">Create</Button>
```

### ❌ Don't Overuse Primary Buttons
```tsx
// ❌ Wrong - Too many primary buttons
<div>
  <Button appearance="primary">Save</Button>
  <Button appearance="primary">Cancel</Button>
  <Button appearance="primary">Delete</Button>
</div>

// ✅ Correct - One primary action
<div>
  <Button appearance="primary">Save</Button>
  <Button appearance="default">Cancel</Button>
  <Button appearance="danger">Delete</Button>
</div>
```

### ❌ Don't Use Generic Button Text
```tsx
// ❌ Wrong - Generic text
<Button appearance="primary">Submit</Button>
<Button appearance="default">Click here</Button>

// ✅ Correct - Specific actions
<Button appearance="primary">Create Project</Button>
<Button appearance="default">Cancel</Button>
```


---

## icon-button-guidelines

# IconButton Component Guidelines

## Overview
IconButton is a specialized button component that displays only an icon with an accessible label.

## Package
```tsx
import { IconButton } from '@atlaskit/button/new';
```

## Use Cases
- **Toolbar actions** - Compact button for toolbars
- **Compact navigation** - Space-constrained navigation
- **Secondary actions** - Less prominent actions
- **Icon-only interfaces** - Clean, minimal interfaces
- **Space-constrained layouts** - When space is limited

## Prop Guidance
- **icon** - The icon component to display
- **label** - Required descriptive label for accessibility
- **appearance** - Button style (default, primary, subtle, danger)
- **spacing** - Button size (compact, default, comfortable)
- **shape** - Button shape (default, circle)

## Content Guidelines
- Choose icons that clearly represent the action
- Use consistent icon styles across similar actions
- Be specific about what the button does in the label
- Use action verbs (e.g., "Edit item", "Delete comment")

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Icon button
<button className="p-2 rounded hover:bg-gray-100" title="Edit">
  <EditIcon className="w-5 h-5" />
</button>

// Primary icon button
<button className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white" title="Add">
  <PlusIcon className="w-5 h-5" />
</button>
```

### ✅ After (ADS)
```tsx
import { IconButton } from '@atlaskit/button/new';
import EditIcon from '@atlaskit/icon/core/edit';
import AddIcon from '@atlaskit/icon/core/add';

// Icon button
<IconButton icon={EditIcon} label="Edit item" />

// Primary icon button
<IconButton appearance="primary" icon={AddIcon} label="Add new item" />
```

## Common Mistakes

### ❌ Don't Include Text Content
```tsx
// ❌ Wrong - IconButton should not contain text
<IconButton icon={EditIcon} label="Edit item">
  Edit
</IconButton>

// ✅ Correct - IconButton is for icons only
<IconButton icon={EditIcon} label="Edit item" />
```

### ❌ Don't Skip the Label Prop
```tsx
// ❌ Wrong - Missing accessibility
<IconButton icon={EditIcon} />

// ✅ Correct - Always include label
<IconButton icon={EditIcon} label="Edit item" />
```

### ❌ Don't Use Generic Labels
```tsx
// ❌ Wrong - Too generic
<IconButton icon={EditIcon} label="Button" />

// ✅ Correct - Specific and descriptive
<IconButton icon={EditIcon} label="Edit item" />
```

---

## link-button-guidelines

## LinkButton

A button that renders as an anchor tag for navigation.

### Package
```tsx
import { LinkButton } from '@atlaskit/button/new';
```

### Migrating from Tailwind

**Before (Tailwind):**
```tsx
// Link styled as button
<a href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded inline-block">
  Go to Dashboard
</a>

// External link
<a href="https://atlassian.com" target="_blank" className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded inline-block">
  Learn More
</a>

// Link with icon
<a href="/create" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded inline-flex items-center gap-2">
  <PlusIcon className="w-4 h-4" />
  Create New
</a>
```

**After (ADS):**
```tsx
import { LinkButton } from '@atlaskit/button/new';
import AddIcon from '@atlaskit/icon/core/add';

// Link styled as button
<LinkButton appearance="primary" href="/dashboard">
  Go to Dashboard
</LinkButton>

// External link
<LinkButton appearance="default" href="https://atlassian.com" target="_blank">
  Learn More
</LinkButton>

// Link with icon
<LinkButton appearance="primary" href="/create" iconBefore={AddIcon}>
  Create New
</LinkButton>
```

---

## split-button-guidelines

# SplitButton

A button that splits into a primary action and a dropdown menu. The SplitButton component requires exactly two children: a Button component and a DropdownMenu component.

### Package
```tsx
import Button, { IconButton, SplitButton } from '@atlaskit/button/new';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/core/chevron-down';
```

### ⚠️ Important: Correct Structure

**SplitButton requires exactly two children:**
1. A `Button` component (the primary action)
2. A `DropdownMenu` component (the secondary actions)

**❌ Common Mistakes:**
```tsx
// WRONG - Missing Button and DropdownMenu children
<SplitButton text="Add Item" appearance="primary" />

// WRONG - Using text prop instead of Button component
<SplitButton appearance="primary">
  <span>Add Item</span>
</SplitButton>

// WRONG - Missing DropdownMenu
<SplitButton appearance="primary">
  <Button>Add Item</Button>
</SplitButton>
```

**✅ Correct Implementation:**
```tsx
<SplitButton appearance="primary">
  <Button>Add Item</Button>
  <DropdownMenu<HTMLButtonElement>
    shouldRenderToParent
    trigger={({ triggerRef, ...triggerProps }) => (
      <IconButton
        ref={triggerRef}
        {...triggerProps}
        icon={ChevronDownIcon}
        label="More add item options"
      />
    )}
  >
    <DropdownItemGroup>
      <DropdownItem>Add from template</DropdownItem>
      <DropdownItem>Add from existing</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
</SplitButton>
```

**✅ Other Correct Implementation:**
```tsx
<SplitButton appearance="primary">
  <Button>Add Item</Button>
 <IconButton
    icon={LinkIcon}
    label="Share link"
    />
</SplitButton>
```

### Migrating from Tailwind

**Before (Tailwind):**
```tsx
// Custom split button implementation
<div className="inline-flex rounded-md shadow-sm">
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-l-md">
    Save
  </button>
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 text-sm font-medium rounded-r-md border-l border-blue-500">
    <ChevronDownIcon className="w-4 h-4" />
  </button>
</div>
```

**After (ADS):**
```tsx
<SplitButton appearance="primary">
  <Button>Save</Button>
  <DropdownMenu<HTMLButtonElement>
    shouldRenderToParent
    trigger={({ triggerRef, ...triggerProps }) => (
      <IconButton
        ref={triggerRef}
        {...triggerProps}
        icon={ChevronDownIcon}
        label="More save options"
      />
    )}
  >
    <DropdownItemGroup>
      <DropdownItem>Save and continue</DropdownItem>
      <DropdownItem>Save as draft</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
</SplitButton>
```

**Required Children Structure:**
```tsx
<SplitButton>
  <Button>Primary Action</Button>           {/* Required */}
  <DropdownMenu>                           {/* Required */}
    <DropdownItemGroup>
      <DropdownItem>Secondary Action 1</DropdownItem>
      <DropdownItem>Secondary Action 2</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
</SplitButton>
```

**Usage Guidelines:**
- Always include exactly two children: Button and DropdownMenu
- Use `shouldRenderToParent` on DropdownMenu for proper positioning
- Provide descriptive labels for the IconButton trigger
- Use the same appearance for both primary and secondary actions
- Keep dropdown items concise and action-oriented
- Use sentence case for all text content

---

## banner-guidelines

# Banner Component Guidelines

## Overview
The Banner component displays important system-level messages and announcements that require user attention in the Atlassian Design System.

## Package
```tsx
import Banner from '@atlaskit/banner';
```

## Use Cases
- **System announcements** - Important updates or maintenance notices
- **Critical warnings** - Data loss or security alerts
- **Error notifications** - System-wide error messages
- **Feature announcements** - New functionality or changes
- **Maintenance notices** - Scheduled downtime or updates

## Prop Guidance
- **appearance** - Visual style: announcement, error, warning
- **isOpen** - Control visibility of the banner
- **icon** - Optional icon to accompany the message
- **children** - Banner content (text or JSX)

## Content Guidelines
- Use for critical system-level messaging only
- Keep messages concise and actionable
- Use sentence case
- Include clear calls to action when needed
- Reserve for information that affects all users
- Use appropriate appearance for message severity

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic banner
<div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
  <div className="flex">
    <div className="ml-3">
      <p className="text-sm text-blue-700">
        Important system announcement
      </p>
    </div>
  </div>
</div>

// Error banner
<div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
  <div className="flex">
    <div className="ml-3">
      <p className="text-sm text-red-700">
        System error occurred
      </p>
    </div>
  </div>
</div>
```

### ✅ After (ADS)
```tsx
import Banner from '@atlaskit/banner';

// Announcement banner
<Banner appearance="announcement" isOpen={true}>
  Important system announcement
</Banner>

// Error banner
<Banner appearance="error" isOpen={true}>
  System error occurred
</Banner>
```

## Common Mistakes

### ❌ Don't Use Banners for Non-Critical Information
```tsx
// ❌ Wrong - Not critical enough for banner
<Banner appearance="announcement" isOpen={true}>
  Welcome to our new feature!
</Banner>

// ✅ Correct - Use section message or inline message
<SectionMessage appearance="information">
  Welcome to our new feature!
</SectionMessage>
```

### ❌ Don't Leave Banners Open Indefinitely
```tsx
// ❌ Wrong - Banner always visible
<Banner appearance="announcement" isOpen={true}>
  System maintenance scheduled
</Banner>

// ✅ Correct - Control visibility
<Banner 
  appearance="announcement" 
  isOpen={showMaintenanceBanner}
>
  System maintenance scheduled
</Banner>
```

### ❌ Don't Use Wrong Appearance
```tsx
// ❌ Wrong - Error appearance for non-error
<Banner appearance="error" isOpen={true}>
  New feature available
</Banner>

// ✅ Correct - Use appropriate appearance
<Banner appearance="announcement" isOpen={true}>
  New feature available
</Banner>
```


---

## badge-guidelines

# Badge Component Guidelines

## Overview
Badges are compact elements used to display status indicators, counts, or labels.

## Package
```tsx
import Badge from '@atlaskit/badge';
```

## Use Cases
- **Status indicators** - Show current state or condition
- **Counts** - Display numeric values with overflow handling
- **Labels** - Provide quick categorization or identification

## Prop Guidance
- **appearance** - added (positive), removed (negative), important (warning), primary (neutral), default (standard)
- **value** - For numeric badges (use max prop for overflow handling)
- **max** - Maximum value before showing overflow (e.g., "99+")

## Content Guidelines
- Use clear, descriptive text for status badges
- Keep text concise (1-2 words maximum)
- Use consistent terminology across your application
- Avoid technical jargon in user-facing badges

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Status badge
<span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
  New
</span>

// Count badge
<span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
  {count > 99 ? '99+' : count}
</span>

// Warning badge
<span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
  Warning
</span>
```

### ✅ After (ADS)
```tsx
import Badge from '@atlaskit/badge';

// Status badge
<Badge appearance="added">New</Badge>

// Count badge
<Badge max={99} value={100} />

// Warning badge
<Badge appearance="important">Warning</Badge>
```

## Common Mistakes

### ❌ Don't Use for Interactive Elements
```tsx
// ❌ Wrong - Badge is not a button
<Badge onClick={handleClick}>Click me</Badge>

// ✅ Correct - Use Button with badge styling
<Button appearance="subtle">
  <Badge appearance="primary">Status</Badge>
</Button>
```

### ❌ Don't Overuse Badges
```tsx
// ❌ Wrong - Too many badges
<div>
  <Badge appearance="added">New</Badge>
  <Badge appearance="primary">Beta</Badge>
  <Badge appearance="important">Important</Badge>
  <Badge appearance="discovery">Featured</Badge>
</div>

// ✅ Correct - Use badges sparingly
<div>
  <Badge appearance="added">New</Badge>
  <Badge appearance="primary">Beta</Badge>
</div>
```

### ❌ Don't Use Generic Text
```tsx
// ❌ Wrong - Too generic
<Badge appearance="primary">Info</Badge>

// ✅ Correct - Specific and descriptive
<Badge appearance="primary">Draft</Badge>
```

---

## checkbox-guidelines

# Checkbox Component Guidelines

## Overview
The Checkbox component allows users to select one or more options from a set of choices in the Atlassian Design System.

## Package
```tsx
import { Checkbox } from '@atlaskit/checkbox';
```

## Use Cases
- **Form inputs** - Allow multiple selections in forms
- **Settings toggles** - Enable/disable features or options
- **List selections** - Select multiple items from a list
- **Agreement acceptance** - Terms and conditions, privacy policy
- **Filter options** - Enable/disable filter criteria

## Prop Guidance
- **label** - Text label for the checkbox
- **value** - Value when checked
- **name** - Name attribute for form submission
- **isChecked** - Controlled checked state
- **defaultChecked** - Initial checked state (uncontrolled)
- **isDisabled** - Disable the checkbox
- **isInvalid** - Show error state
- **isIndeterminate** - Show indeterminate state
- **onChange** - Change handler function

## Content Guidelines
- Use clear, descriptive labels
- Use sentence case for labels
- Group related checkboxes together
- Provide clear visual hierarchy
- Use indeterminate state for "select all" functionality
- Always provide labels for accessibility

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic checkbox
<label className="flex items-center">
  <input 
    type="checkbox" 
    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
  />
  <span className="ml-2 text-sm text-gray-900">Option 1</span>
</label>

// Disabled checkbox
<label className="flex items-center">
  <input 
    type="checkbox" 
    disabled
    className="h-4 w-4 text-gray-400 border-gray-300 rounded"
  />
  <span className="ml-2 text-sm text-gray-500">Disabled option</span>
</label>
```

### ✅ After (ADS)
```tsx
import { Checkbox } from '@atlaskit/checkbox';

// Basic checkbox
<Checkbox
  label="Option 1"
  value="option1"
  name="options"
  onChange={handleChange}
/>

// Disabled checkbox
<Checkbox
  label="Disabled option"
  value="disabled"
  name="options"
  isDisabled
  onChange={handleChange}
/>
```

## Common Mistakes

### ❌ Don't Use Checkboxes for Single Selection
```tsx
// ❌ Wrong - Use radio buttons for single selection
<div>
  <Checkbox label="Option A" name="single" />
  <Checkbox label="Option B" name="single" />
  <Checkbox label="Option C" name="single" />
</div>

// ✅ Correct - Use radio buttons
<RadioGroup
  options={[
    { name: 'single', value: 'a', label: 'Option A' },
    { name: 'single', value: 'b', label: 'Option B' },
    { name: 'single', value: 'c', label: 'Option C' }
  ]}
/>
```

### ❌ Don't Forget Labels
```tsx
// ❌ Wrong - No label for accessibility
<Checkbox value="option1" onChange={handleChange} />

// ✅ Correct - Always provide labels
<Checkbox 
  label="Option 1" 
  value="option1" 
  onChange={handleChange} 
/>
```

### ❌ Don't Use Checkboxes for Actions
```tsx
// ❌ Wrong - Checkbox used for action
<Checkbox 
  label="Delete item" 
  onChange={handleDelete} 
/>

// ✅ Correct - Use button for actions
<Button appearance="danger" onClick={handleDelete}>
  Delete item
</Button>
```


---

## progress-bar-guidelines

# Progress Bar Component Guidelines

## Overview
The Progress Bar component provides visual feedback for ongoing processes and task completion status in the Atlassian Design System.

## Package
```tsx
import ProgressBar from '@atlaskit/progress-bar';
```

## Use Cases
- **Loading states** - Show progress during data fetching or processing
- **Task completion** - Display completion percentage of multi-step processes
- **File uploads** - Indicate upload progress
- **Form submission** - Show processing status
- **Installation/Setup** - Guide users through setup processes

## Prop Guidance
- **value** - Progress value between 0 and 1 (0 = 0%, 1 = 100%)
- **isIndeterminate** - Show indeterminate loading state when true
- **appearance** - Visual style: default, success, inverse
- **ariaLabel** - Accessibility label for screen readers
- **testId** - Testing identifier

## Content Guidelines
- Always provide meaningful ariaLabel for accessibility
- Use determinate progress when you know the total progress
- Use indeterminate progress when progress is unknown
- Show success appearance when task is complete
- Use inverse appearance on dark backgrounds

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic progress bar
<div className="w-full bg-gray-200 rounded-full h-2.5">
  <div 
    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
    style={{ width: '45%' }}
  ></div>
</div>

// Indeterminate progress
<div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
  <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
</div>
```

### ✅ After (ADS)
```tsx
import ProgressBar from '@atlaskit/progress-bar';

// Determinate progress
<ProgressBar 
  value={0.45} 
  ariaLabel="Upload progress: 45% complete" 
/>

// Indeterminate progress
<ProgressBar 
  isIndeterminate 
  ariaLabel="Loading content" 
/>
```

## Common Mistakes

### ❌ Don't Use Progress Bars for Static Information
```tsx
// ❌ Wrong - Static information
<ProgressBar value={1} ariaLabel="User profile complete" />

// ✅ Correct - Use badges or status indicators
<Badge appearance="success">Profile Complete</Badge>
```

### ❌ Don't Forget Accessibility Labels
```tsx
// ❌ Wrong - No accessibility information
<ProgressBar value={0.75} />

// ✅ Correct - Descriptive aria label
<ProgressBar 
  value={0.75} 
  ariaLabel="File upload progress: 75% complete" 
/>
```

### ❌ Don't Use Indeterminate for Known Progress
```tsx
// ❌ Wrong - Known progress shown as indeterminate
<ProgressBar isIndeterminate ariaLabel="Processing 3 of 10 items" />

// ✅ Correct - Show actual progress
<ProgressBar 
  value={0.3} 
  ariaLabel="Processing 3 of 10 items: 30% complete" 
/>
```


---

## radio-guidelines

# Radio Component Guidelines

## Overview
The Radio component allows users to select a single option from a set of mutually exclusive choices in the Atlassian Design System.

## Package
```tsx
import { Radio, RadioGroup } from '@atlaskit/radio';
```

## Use Cases
- **Form inputs** - Single selection from multiple options
- **Settings choices** - Choose one option from available settings
- **Filter selection** - Select one filter criteria
- **Preference selection** - Choose user preferences
- **Category selection** - Select one category from a list

## Prop Guidance
- **value** - Value of the radio input
- **label** - Label text for the radio input
- **name** - Name attribute for grouping radio buttons
- **isChecked** - Whether the radio is checked
- **isDisabled** - Whether the radio is disabled
- **isInvalid** - Whether the radio shows an error state
- **isRequired** - Whether the radio is required in a form
- **onChange** - Handler called when selection changes

## Content Guidelines
- Use clear, descriptive labels
- Use sentence case for labels
- Group related radio buttons with the same name
- Provide clear visual hierarchy
- Always provide labels for accessibility
- Use radio groups for better organization

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic radio button
<label className="flex items-center">
  <input 
    type="radio" 
    name="color" 
    value="red"
    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
  />
  <span className="ml-2 text-sm text-gray-900">Red</span>
</label>

// Radio group
<div>
  <label className="flex items-center">
    <input type="radio" name="size" value="small" className="h-4 w-4" />
    <span className="ml-2">Small</span>
  </label>
  <label className="flex items-center">
    <input type="radio" name="size" value="medium" className="h-4 w-4" />
    <span className="ml-2">Medium</span>
  </label>
  <label className="flex items-center">
    <input type="radio" name="size" value="large" className="h-4 w-4" />
    <span className="ml-2">Large</span>
  </label>
</div>
```

### ✅ After (ADS)
```tsx
import { Radio, RadioGroup } from '@atlaskit/radio';

// Single radio button
<Radio
  value="red"
  label="Red"
  name="color"
  onChange={handleChange}
/>

// Radio group
<RadioGroup
  options={[
    { name: 'size', value: 'small', label: 'Small' },
    { name: 'size', value: 'medium', label: 'Medium' },
    { name: 'size', value: 'large', label: 'Large' }
  ]}
  onChange={handleChange}
/>
```

## Common Mistakes

### ❌ Don't Use Radio Buttons for Multiple Selection
```tsx
// ❌ Wrong - Use checkboxes for multiple selection
<RadioGroup
  options={[
    { name: 'features', value: 'email', label: 'Email' },
    { name: 'features', value: 'sms', label: 'SMS' },
    { name: 'features', value: 'push', label: 'Push' }
  ]}
/>

// ✅ Correct - Use checkboxes for multiple selection
<div>
  <Checkbox label="Email" value="email" name="features" />
  <Checkbox label="SMS" value="sms" name="features" />
  <Checkbox label="Push" value="push" name="features" />
</div>
```

### ❌ Don't Forget to Group Radio Buttons
```tsx
// ❌ Wrong - Different names prevent grouping
<Radio value="a" label="Option A" name="group1" />
<Radio value="b" label="Option B" name="group2" />

// ✅ Correct - Same name for grouping
<Radio value="a" label="Option A" name="group" />
<Radio value="b" label="Option B" name="group" />
```

### ❌ Don't Use Radio Buttons for Actions
```tsx
// ❌ Wrong - Radio button used for action
<Radio 
  value="delete" 
  label="Delete item" 
  onChange={handleDelete} 
/>

// ✅ Correct - Use button for actions
<Button appearance="danger" onClick={handleDelete}>
  Delete item
</Button>
```


---

## tabs-guidelines

# Tabs Component Guidelines

## Overview
The Tabs component provides a way to organize content into multiple panels that can be switched between in the Atlassian Design System.

## Package
```tsx
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
```

## Use Cases
- **Content organization** - Group related content into sections
- **Settings panels** - Organize different setting categories
- **Data views** - Switch between different data representations
- **Form sections** - Break long forms into manageable sections
- **Feature navigation** - Navigate between different features

## Prop Guidance
- **selected** - Index of the currently selected tab
- **onChange** - Handler called when tab selection changes
- **children** - Tab content (TabList and TabPanel components)

## Content Guidelines
- Use clear, descriptive tab labels
- Keep tab labels short (1-3 words)
- Use sentence case for tab labels
- Group related content under each tab
- Provide clear visual hierarchy
- Consider the number of tabs (avoid too many)

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic tabs with custom styling
<div>
  <div className="border-b border-gray-200">
    <nav className="-mb-px flex space-x-8">
      <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
        Tab 1
      </button>
      <button className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
        Tab 2
      </button>
    </nav>
  </div>
  <div className="mt-4">
    <div>Tab 1 content</div>
  </div>
</div>
```

### ✅ After (ADS)
```tsx
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanel>Tab 1 content</TabPanel>
  <TabPanel>Tab 2 content</TabPanel>
</Tabs>
```

## Common Mistakes

### ❌ Don't Use Tabs for Navigation
```tsx
// ❌ Wrong - Use navigation components for navigation
<Tabs>
  <TabList>
    <Tab>Home</Tab>
    <Tab>About</Tab>
    <Tab>Contact</Tab>
  </TabList>
</Tabs>

// ✅ Correct - Use navigation components
<NavigationSystem>
  <NavigationContent>
    <PrimaryButton>Home</PrimaryButton>
    <PrimaryButton>About</PrimaryButton>
    <PrimaryButton>Contact</PrimaryButton>
  </NavigationContent>
</NavigationSystem>
```

### ❌ Don't Use Too Many Tabs
```tsx
// ❌ Wrong - Too many tabs
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
    <Tab>Tab 4</Tab>
    <Tab>Tab 5</Tab>
    <Tab>Tab 6</Tab>
    <Tab>Tab 7</Tab>
  </TabList>
</Tabs>

// ✅ Correct - Use fewer tabs or consider other patterns
<Tabs>
  <TabList>
    <Tab>Overview</Tab>
    <Tab>Details</Tab>
    <Tab>Settings</Tab>
  </TabList>
</Tabs>
```

### ❌ Don't Use Tabs for Actions
```tsx
// ❌ Wrong - Tabs used for actions
<Tabs>
  <TabList>
    <Tab>Save</Tab>
    <Tab>Delete</Tab>
    <Tab>Edit</Tab>
  </TabList>
</Tabs>

// ✅ Correct - Use buttons for actions
<div>
  <Button>Save</Button>
  <Button appearance="danger">Delete</Button>
  <Button>Edit</Button>
</div>
```


---

## tooltip-guidelines

# Tooltip Component Guidelines

## Overview
Tooltips provide additional context or information when users hover over or focus on an element.

## Package
```tsx
import Tooltip from '@atlaskit/tooltip';
```

## Use Cases
- **Helpful hints** - Explain functionality or provide context
- **Additional information** - Show details without permanent display
- **Accessibility enhancement** - Provide context for screen readers
- **User guidance** - Help users understand complex interfaces

## Prop Guidance
- **content** - Tooltip text or JSX content
- **position** - Tooltip position (top, bottom, left, right)
- **delay** - Delay before showing tooltip (default 300ms)
- **testId** - Testing identifier

## Content Guidelines
- Keep content brief (ideally 1-3 words, max 8 words)
- Use sentence case
- No punctuation at the end
- Use clear, direct language
- Avoid technical jargon

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic tooltip (requires custom JavaScript)
<div className="relative group">
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Hover me
  </button>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
    Tooltip content
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
  </div>
</div>
```

### ✅ After (ADS)
```tsx
import Tooltip from '@atlaskit/tooltip';

// Basic tooltip
<Tooltip content="Tooltip content">
  <button>Hover me</button>
</Tooltip>
```

## Common Mistakes

### ❌ Don't Use Tooltips for Critical Information
```tsx
// ❌ Wrong - Critical info hidden in tooltip
<Tooltip content="This button will delete your entire account permanently">
  <Button appearance="danger">Delete</Button>
</Tooltip>

// ✅ Correct - Critical info visible
<Button appearance="danger">
  Delete Account
</Button>
<p style={{ fontSize: '12px', color: token('color.text.warning') }}>
  This action cannot be undone
</p>
```

### ❌ Don't Make Tooltips Too Long
```tsx
// ❌ Wrong - Too verbose
<Tooltip content="This button will save all the changes you have made to the current document and store them in the database for future reference">
  <Button>Save</Button>
</Tooltip>

// ✅ Correct - Concise and clear
<Tooltip content="Save changes">
  <Button>Save</Button>
</Tooltip>
```

### ❌ Don't Use Tooltips for Everything
```tsx
// ❌ Wrong - Overuse of tooltips
<div>
  <Tooltip content="Click to submit"><Button>Submit</Button></Tooltip>
  <Tooltip content="Click to cancel"><Button>Cancel</Button></Tooltip>
  <Tooltip content="Click to reset"><Button>Reset</Button></Tooltip>
</div>

// ✅ Correct - Use tooltips sparingly
<div>
  <Button>Submit</Button>
  <Button>Cancel</Button>
  <Button>Reset</Button>
</div>
```


---

## icon-guidelines

# Icon Component Guidelines

## Overview
The Icon component provides a consistent, accessible way to display visual symbols throughout your application.

### Import Pattern
```tsx
// ✅ CORRECT
import AddIcon from '@atlaskit/icon/core/add';
<AddIcon label="Add item" />

// ❌ WRONG
import { AddIcon } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/glyph/add';
```

### ❌ Don't use these imports
❌ `@atlaskit/icon/core/folder` → ✅ Use `folder-closed` or `folder-open`
❌ `@atlaskit/icon/core/user` → ✅ Use `person`
❌ `@atlaskit/icon/core/play` → ✅ Use `video-play`
❌ `@atlaskit/icon/core/arrow` → ✅ Use specific direction: `arrow-right`, `arrow-left`, etc.
❌ `@atlaskit/icon/core/chevron` → ✅ Use specific direction: `chevron-down`, `chevron-up`, 
❌ `@atlaskit/icon/core/star-filled` → ✅ Use specific direction: `star-starred`, 
❌ `@atlaskit/icon/core/sort` → ✅ Use specific direction: `arrow-down`, `arrow-up`

## Use Cases
- **Actions** - Represent user actions (add, edit, delete)
- **Navigation** - Show direction and movement (arrows, chevrons)
- **Status** - Display states and conditions (success, error, warning)
- **Objects** - Represent items and concepts (user, file, folder)

## Prop Guidance
- **label** - Always provide descriptive text for accessibility
- **size** - Use default 16px unless design requires different
- **color** - Use design tokens for consistent theming

## Icon Sizes
- Icons are 16px by default
- No need to specify size unless required by design
- Use design tokens for color when needed
- Use `small` icon size very sparingly

## Finding Icons
1. **Search by category** - Look in the relevant category above
2. **Search by function** - Think about what the icon represents
3. **Check alternatives** - Some concepts have multiple icon options
4. **Verify existence** - Only use icons listed in this guide

## When You Can't Find an Icon
1. **Search the full list** - Look through all categories below
2. **Consider alternatives** - Use a similar concept
3. **Ask for clarification** - Don't guess or invent names

**⚠️ EVERY icon you suggest must be findable in the table below with its exact component name ⚠️**

| Component Name | Package | Usage | Keywords |
|---|---|---|---|
| AccessibilityIcon | @atlaskit/icon/core/accessibility | Reserved for representing accessibility and accessibility-related features and settings | accessibility, icon, core, a11y, accessibility, WCAG |
| AddIcon | @atlaskit/icon/core/add | Single purpose - Reserved for creating and adding an object. | add, plus, create, new, icon, core, create, plus, jira status |
| AiAgentIcon | @atlaskit/icon/core/ai-agent | Single purpose - Reserved for Rovo Agent. | ai-agent, aiagent, icon, core, Rovo, AI, chat agent, ai |
| AiChatIcon | @atlaskit/icon/core/ai-chat | Single purpose - Reserved for Rovo Chat. | ai-chat, aichat, icon, core, Rovo, AI, chat agent, ai |
| AiGenerativeTextSummaryIcon | @atlaskit/icon/core/ai-generative-text-summary | Reserved for summarizing content with Atlassian Intelligence & Loom | ai-generative-text-summary, aigenerativetextsummary, icon, core, summarize, summarise, summary, automation, AI |
| AlertIcon | @atlaskit/icon/core/alert | Single purpose - Reserved for alerts in JSM and Compass. | alert, icon, core, alert, event, operations |
| AlignImageCenterIcon | @atlaskit/icon/core/align-image-center | Single purpose - Reserved for center aligning media and content. | align-image-center, alignimagecenter, icon, core, content, media, image, alignment, centre |
| AlignImageLeftIcon | @atlaskit/icon/core/align-image-left | Single purpose - Reserved for left aligning media and content. | align-image-left, alignimageleft, icon, core, content, media, image, alignment, left |
| AlignImageRightIcon | @atlaskit/icon/core/align-image-right | Single purpose - Reserved for right aligning media and content. | align-image-right, alignimageright, icon, core, content, media, image, alignment, right |
| AlignTextCenterIcon | @atlaskit/icon/core/align-text-center | Multi purpose - Known uses: align text center, align center. | align-text-center, aligntextcenter, icon, core, alignment, text, content |
| AlignTextLeftIcon | @atlaskit/icon/core/align-text-left | Multi purpose - Known uses: align text left, align content left, summary. | align-text-left, aligntextleft, icon, core, alignment, text, content, summary |
| AlignTextRightIcon | @atlaskit/icon/core/align-text-right | Multi purpose - Known uses: align text right, align content right. | align-text-right, aligntextright, icon, core, alignment, text, content |
| AngleBracketsIcon | @atlaskit/icon/core/angle-brackets | Multi purpose - Known uses: code or source code in Bitbucket and Jira. | angle-brackets, anglebrackets, icon, core, code, <>, </>, syntax, jira status |
| ApiIcon | @atlaskit/icon/core/api | Reserved for representing Application Programming Interfaces (APIs). | api, icon, core, application programming interface, api, operations |
| AppIcon | @atlaskit/icon/core/app | Single purpose - Reserved for marketplace apps and integrations across products. | app, icon, core, add-on, add on, plugin, external app, third-party app |
| AppSwitcherIcon | @atlaskit/icon/core/app-switcher | Single purpose - Reserved for app switcher in global product navigation. | app-switcher, appswitcher, icon, core, application switcher, change product, switch product, product switcher |
| AppSwitcherLegacyIcon | @atlaskit/icon/core/app-switcher-legacy | Single purpose - Reserved for the legacy app switcher in global product navigation. | app-switcher-legacy, appswitcherlegacy, icon, core, application switcher, change product, switch product, product switcher |
| AppsIcon | @atlaskit/icon/core/apps | Single purpose - Reserved for adding or viewing apps. | apps, icon, core, third-party, applications |
| ArchiveBoxIcon | @atlaskit/icon/core/archive-box | Multi purpose - Known uses: archiving pages, storage. | archive-box, archivebox, icon, core, file box |
| ArrowDownIcon | @atlaskit/icon/core/arrow-down | Multi purpose - Know uses: sorting table headers or Bitbucket code difference. | arrow-down, arrowdown, icon, core, down, bottom, sorting |
| ArrowDownLeftIcon | @atlaskit/icon/core/arrow-down-left | Known uses: Adding content from Rovo Chat into Editor. | arrow-down-left, arrowdownleft, icon, core, diagonal arrow, down, left, south west |
| ArrowDownRightIcon | @atlaskit/icon/core/arrow-down-right | Known uses: TBC | arrow-down-right, arrowdownright, icon, core, diagonal arrow, down, right, south east |
| ArrowLeftIcon | @atlaskit/icon/core/arrow-left | Multi purpose - Known uses: back to previous screen, previous slide. | arrow-left, arrowleft, back, previous, icon, core, back, previous |
| ArrowRightIcon | @atlaskit/icon/core/arrow-right | Multi purpose - Known uses: link to nested menu item, a linked menu item, next slide. | arrow-right, arrowright, forward, next, icon, core, forward, next, link |
| ArrowUpIcon | @atlaskit/icon/core/arrow-up | Multi purpose - Known uses: back to top. | arrow-up, arrowup, icon, core, improvement, jira status |
| ArrowUpLeftIcon | @atlaskit/icon/core/arrow-up-left | Known uses: TBC | arrow-up-left, arrowupleft, icon, core, diagonal arrow, up, right, north east |
| ArrowUpRightIcon | @atlaskit/icon/core/arrow-up-right | Multi purpose | arrow-up-right, arrowupright, icon, core, open, diagonal arrow |
| AssetsIcon | @atlaskit/icon/core/assets | Reserved for JSM Assets. | assets, icon, core, assets, CMDB, configuration management database |
| AtlassianIntelligenceIcon | @atlaskit/icon/core/atlassian-intelligence | Single purpose - Reserved for Atlassian Intelligence products or experiences. | atlassian-intelligence, atlassianintelligence, icon, core, AI |
| AttachmentIcon | @atlaskit/icon/core/attachment | Reserved for attaching files to work types or other objects. | attachment, paperclip, icon, core, paperclip, attach, attachment |
| AudioIcon | @atlaskit/icon/core/audio | 📦 @atlaskit/icon/core/audio | audio, music, note, sound, icon, core, music, musical note |
| AutomationIcon | @atlaskit/icon/core/automation | Single purpose - Reserved to represent an Automation. | automation, icon, core, lightningbolt, automation rule |
| BacklogIcon | @atlaskit/icon/core/backlog | Single purpose - Reserved for backlogs in Jira. | backlog, icon, core, rows |
| BasketballIcon | @atlaskit/icon/core/basketball | Multi purpose - Known usages: Sport emoji category. | basketball, icon, core, ball, sports, basketball |
| BoardIcon | @atlaskit/icon/core/board | Single purpose - Reserved for boards in Jira. | board, icon, core, columns, active sprint |
| BoardsIcon | @atlaskit/icon/core/boards | Single purpose - Reserved as the icon to represent multiple boards. | boards, icon, core |
| BookWithBookmarkIcon | @atlaskit/icon/core/book-with-bookmark | Multi purpose - Known uses: knowledge bases, articles, and other representations of books or info. | book-with-bookmark, bookwithbookmark, icon, core, knowledge base, article |
| BorderIcon | @atlaskit/icon/core/border | Reserved for toggling the visibility of a border on an object. | border, icon, core, border, image border, content border, editor, confluence |
| BranchIcon | @atlaskit/icon/core/branch | Single purpose - Reserved for branches in Bitbucket and Jira. | branch, icon, core, git branch, bitbucket branch, branches, jira status |
| BriefcaseIcon | @atlaskit/icon/core/briefcase | Multi purpose - Known uses: Job title in Atlas, Operations in JSM. | briefcase, icon, core, suitcase, toolbox, operations, business |
| BugIcon | @atlaskit/icon/core/bug | Multi purpose - Known uses: Request types in JSM, bugs in Jira. | bug, icon, core, bug report, test |
| CalendarIcon | @atlaskit/icon/core/calendar | Multi purpose - Known uses: date metadata, date input field, calendar view, jira status. | calendar, date, icon, core, date, month, day, year, jira status |
| CalendarPlusIcon | @atlaskit/icon/core/calendar-plus | Known uses: Auto-scheduling in Jira Plans. Scheduled dates. | calendar-plus, calendarplus, icon, core, calendar, add, plus, schedule |
| CameraIcon | @atlaskit/icon/core/camera | Multi purpose - Known uses: upload photo in Trello, photos. | camera, photo, icon, core |
| CaptureIcon | @atlaskit/icon/core/capture | Reserved for representing Focus Areas. | capture, icon, core, focus, focus area, capture |
| CardIcon | @atlaskit/icon/core/card | Known uses: Representing cards in Trello. Toggling card detail in Jira. | card, icon, core, card |
| CashIcon | @atlaskit/icon/core/cash | Known usages: 'Sales' work type. | cash, icon, core, currency, money, cash, dollar, bill, work type |
| ChangesIcon | @atlaskit/icon/core/changes | Single purpose - Reserved for changes in Jira. | changes, icon, core, jira status, horizontal arrows |
| ChartBarIcon | @atlaskit/icon/core/chart-bar | Multi purpose - Known uses: Reports in JSM, Space Analytics in Confluence, and other graph charts. | chart-bar, chartbar, icon, core, graph, bar, analytics, report |
| ChartMatrixIcon | @atlaskit/icon/core/chart-matrix | Multi purpose - Known uses: Matrix view in in JPD, and other matrix charts. | chart-matrix, chartmatrix, icon, core, dot chart, graph, matrix,  |
| ChartPieIcon | @atlaskit/icon/core/chart-pie | Multi purpose - Known uses: pie charts. | chart-pie, chartpie, icon, core, segment, chart, graph, pie |
| ChartTrendIcon | @atlaskit/icon/core/chart-trend | Multi purpose - Known uses: charts, reports in Jira, and sprint insights. | chart-trend, charttrend, icon, core, reports, graph, impact effort,  |
| ChatWidgetIcon | @atlaskit/icon/core/chat-widget | Reserved for representing a chat widget triggered by a floating action button. | chat-widget, chatwidget, icon, core, chat, widget, virtual service agent, vsa |
| CheckCircleIcon | @atlaskit/icon/core/check-circle | Known uses: completed items, productivity emoji category. Completed task work type in JSM Calendar view. | check-circle, checkcircle, tick, icon, core, tick, yes, completed, filled |
| CheckMarkIcon | @atlaskit/icon/core/check-mark | Multi purpose - Known uses: table cells, checkboxes. | check-mark, checkmark, icon, core, tick |
| CheckboxCheckedIcon | @atlaskit/icon/core/checkbox-checked | Multi purpose - Reserved for interactive checkbox experiences. Consider using the checkbox component. | checkbox-checked, checkboxchecked, icon, core, filled, checked, select all |
| CheckboxIndeterminateIcon | @atlaskit/icon/core/checkbox-indeterminate | Multi purpose - Reserved for interactive checkbox experiences. Consider using the checkbox component. | checkbox-indeterminate, checkboxindeterminate, icon, core, filled, mixed |
| CheckboxUncheckedIcon | @atlaskit/icon/core/checkbox-unchecked | Multi purpose - Reserved for interactive checkbox experiences. Consider using the checkbox component. | checkbox-unchecked, checkboxunchecked, icon, core, unchecked |
| ChevronDoubleLeftIcon | @atlaskit/icon/core/chevron-double-left | Known uses: Navigate to previous year in calendar/date picker | chevron-double-left, chevrondoubleleft, icon, core, double chevron, previous year, left |
| ChevronDoubleRightIcon | @atlaskit/icon/core/chevron-double-right | Known uses: Navigate to next year in calendar/date picker | chevron-double-right, chevrondoubleright, icon, core, double chevron, right, next year |
| ChevronDownIcon | @atlaskit/icon/core/chevron-down | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Open dropdown menu, expanded tree item, collapse tree item | chevron-down, chevrondown, expand, collapse, icon, core, chevron down, expand, open |
| ChevronLeftIcon | @atlaskit/icon/core/chevron-left | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Navigate back, show previous page of pagination results | chevron-left, chevronleft, back, previous, icon, core, chevron left, back, previous |
| ChevronRightIcon | @atlaskit/icon/core/chevron-right | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Next page of pagination results, collapsed tree item, expand tree item | chevron-right, chevronright, forward, next, icon, core, chevron right, next, collapsed, expand, show children |
| ChevronUpIcon | @atlaskit/icon/core/chevron-up | Do not use 16px chevrons within buttons, icon buttons, or dropdowns to maintain visual cohesion with ADS which uses 12px chevrons. Known uses: Close dropdown menu | chevron-up, chevronup, expand, collapse, icon, core, chevron up, close dropdown menu, collapse |
| ChildWorkItemsIcon | @atlaskit/icon/core/child-work-items | Reserved for child work items. | child-work-items, childworkitems, icon, core, children, child, related, work items |
| ClipboardIcon | @atlaskit/icon/core/clipboard | Known uses: Pasting content from clipboard. | clipboard, icon, core, clipboard, paste |
| ClockIcon | @atlaskit/icon/core/clock | Known uses: recent, time input, sprint time remaining, overdue task work type status. | clock, icon, core, time, recent, history |
| CloseIcon | @atlaskit/icon/core/close | Known uses: closing modals, panels, and transient views; removing tags | close, icon, core, cross, x, close, remove |
| CloudArrowUpIcon | @atlaskit/icon/core/cloud-arrow-up | Multi purpose - Known uses: deployments in Jira. | cloud-arrow-up, cloudarrowup, icon, core, deployments, up arrow |
| CollapseHorizontalIcon | @atlaskit/icon/core/collapse-horizontal | Single purpose - Reserved for contracting or reducing the width of an element to its smallest size. | collapse-horizontal, collapsehorizontal, icon, core, collapse, width, horizontal arrows |
| CollapseVerticalIcon | @atlaskit/icon/core/collapse-vertical | Single purpose - Reserved for contracting or reducing the height of an element to its smallest size. | collapse-vertical, collapsevertical, icon, core, collapse, height, vertical arrows |
| CommentIcon | @atlaskit/icon/core/comment | Single purpose - Reserved for comments on objects. | comment, chat, speech, icon, core, speech bubble |
| CommentAddIcon | @atlaskit/icon/core/comment-add | Single purpose - Reserved for adding a comment to an object. | comment-add, commentadd, icon, core, speech bubble, plus |
| CommitIcon | @atlaskit/icon/core/commit | Single purpose - Reserved for commits in Jira or Bitbucket. | commit, icon, core, git commit, bitbucket commit |
| CompassIcon | @atlaskit/icon/core/compass | Multi purpose - Known uses: templates. | compass, icon, core, template |
| ComponentIcon | @atlaskit/icon/core/component | Single purpose - Reserved for components in Jira and Compass. | component, block, lego, icon, core, lego, brick, block |
| ContentWidthNarrowIcon | @atlaskit/icon/core/content-width-narrow | Single purpose - Reserved for setting media and content to a narrow width. | content-width-narrow, contentwidthnarrow, icon, core, content, media, image, width, fixed, narrow |
| ContentWidthWideIcon | @atlaskit/icon/core/content-width-wide | Single purpose - Reserved for setting media and content to a wide width. | content-width-wide, contentwidthwide, icon, core, content, media, image, width, fixed, wide |
| ContentWrapLeftIcon | @atlaskit/icon/core/content-wrap-left | Single purpose - Reserved for left aligning media and content with wrapping enabled. | content-wrap-left, contentwrapleft, icon, core, content, media, image, alignment, left, inline, wrap |
| ContentWrapRightIcon | @atlaskit/icon/core/content-wrap-right | Single purpose - Reserved for right aligning media and content with wrapping enabled. | content-wrap-right, contentwrapright, icon, core, content, media, image, alignment, right, inline, wrap |
| CopyIcon | @atlaskit/icon/core/copy | Single purpose - Reserved for copying data such as text, code or other objects. | copy, duplicate, icon, core, copy, object |
| CreditCardIcon | @atlaskit/icon/core/credit-card | Multi purpose - Known uses: billing in Admin, invoices in PPC, payments. | credit-card, creditcard, icon, core, payment, invoice |
| CrossIcon | @atlaskit/icon/core/cross | Known uses: closing modals, panels, and transient views; removing tags | cross, close, x, cancel, icon, core, cross, x, close, remove |
| CrossCircleIcon | @atlaskit/icon/core/cross-circle | Multi purpose - Known uses: clear text field, error status. | cross-circle, crosscircle, close, x, cancel, icon, core, x, exit, clear, no, filled |
| CurlyBracketsIcon | @atlaskit/icon/core/curly-brackets | Known uses: Represents Smart values in Proforma. | curly-brackets, curlybrackets, icon, core, curly brackets, braces, smart value |
| CustomizeIcon | @atlaskit/icon/core/customize | Multi purpose - Known uses: customize sidebar, customize view, settings. | customize, icon, core, customise, configure, modify, preferences, settings, sliders |
| DashboardIcon | @atlaskit/icon/core/dashboard | Single purpose - Reserved for dashboards in Jira. | dashboard, window, grid, icon, core, activity, view |
| DataFlowIcon | @atlaskit/icon/core/data-flow | Multi purpose - Known usages: Database schema in Jira. | data-flow, dataflow, icon, core, relationship, data, flow chart |
| DataNumberIcon | @atlaskit/icon/core/data-number | Known uses: Representing number datatype fields in Proforma and databases. | data-number, datanumber, icon, core, numbers, 123, proforma, datatype |
| DataStringIcon | @atlaskit/icon/core/data-string | Known uses: Representing string datatype fields in Proforma and databases. | data-string, datastring, icon, core, string, letters, abc, proforma, datatype |
| DatabaseIcon | @atlaskit/icon/core/database | Single purpose - Reserved for databases in Confluence. | database, icon, core, spreadsheet, table, data, cells |
| DecisionIcon | @atlaskit/icon/core/decision | Single purpose - Reserved for decisions. | decision, icon, core, fork, diagonal arrow |
| DefectIcon | @atlaskit/icon/core/defect | Reserved for defect work type. | defect, icon, core, defect, fragile, cracked, work type |
| DeleteIcon | @atlaskit/icon/core/delete | Single purpose - Reserved for removing or deleting an object. | delete, icon, core, trash, bin, remove |
| DepartmentIcon | @atlaskit/icon/core/department | Single purpose - Reserved for departments, reporting lines, or other tree chart representations. | department, icon, core, organization, organisation, org chart, hierarchy |
| DeviceMobileIcon | @atlaskit/icon/core/device-mobile | Multi purpose - Known uses: call, contact us. | device-mobile, devicemobile, icon, core, iphone, mobile phone, cell phone |
| DevicesIcon | @atlaskit/icon/core/devices | Known usages: 'Asset' work type. | devices, icon, core, devices, assets, laptop, phone, hardware, work type |
| DiscoveryIcon | @atlaskit/icon/core/discovery | Reserved for discovery statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | discovery, icon, core, discovery, note, filled, onboarding, status |
| DownloadIcon | @atlaskit/icon/core/download | Single purpose - Reserved for file downloads. | download, cloud, icon, core, down arrow, file download |
| DragHandleHorizontalIcon | @atlaskit/icon/core/drag-handle-horizontal | Reserved for dragging elements along a horizontal axis. | drag-handle-horizontal, draghandlehorizontal, icon, core, drag handler, reorder, move, reorder horizontal |
| DragHandleVerticalIcon | @atlaskit/icon/core/drag-handle-vertical | Reserved for dragging elements along a vertical axis. | drag-handle-vertical, draghandlevertical, icon, core, drag handler, reorder, move, reorder vertical |
| EditIcon | @atlaskit/icon/core/edit | Single purpose - Reserved for editing objects. | edit, pencil, write, icon, core, pencil, pencil on page |
| EditBulkIcon | @atlaskit/icon/core/edit-bulk | Single purpose - Reserved for editing multiple objects in bulk. | edit-bulk, editbulk, icon, core, edit, pencil, multiple, bulk, change |
| EmailIcon | @atlaskit/icon/core/email | Single purpose - Reserved for when an email-related things. | email, icon, core, envelope, message |
| EmojiIcon | @atlaskit/icon/core/emoji | Single purpose - Reserved for Editor as a category for Emoji's. | emoji, emoticon, smiley, icon, core, smiley face, emoticon |
| EmojiAddIcon | @atlaskit/icon/core/emoji-add | Single purpose - Reserved for adding an emoji reaction. | emoji-add, emojiadd, icon, core, smiley face, emoticon, plus |
| EmojiCasualIcon | @atlaskit/icon/core/emoji-casual | Reserved for representing a casual or relaxed tone or sentiment. | emoji-casual, emojicasual, icon, core, emoij, casual, sunglasses, chill, relaxed |
| EmojiNeutralIcon | @atlaskit/icon/core/emoji-neutral | Reserved for representing a neutral tone or sentiment. | emoji-neutral, emojineutral, icon, core, emoji, neutral, ambivalent |
| EmojiRemoveIcon | @atlaskit/icon/core/emoji-remove | Reserved for removing emoji. | emoji-remove, emojiremove, icon, core, emoji, remove, strikethrough |
| EpicIcon | @atlaskit/icon/core/epic | Single purpose - Reserved for epics in Jira. | epic, icon, core, lightning bolt, jira status, filled |
| ErrorIcon | @atlaskit/icon/core/error | Reserved for error statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | error, warning, alert, icon, core, filled, status, danger, exclamation, !, error |
| ExclamationSquareIcon | @atlaskit/icon/core/exclamation-square | Known uses: Exclamation work type. | exclamation-square, exclamationsquare, icon, core, !, exclaim, square, work type |
| ExpandHorizontalIcon | @atlaskit/icon/core/expand-horizontal | Single purpose - Reserved for expanding an element to its maximum width. | expand-horizontal, expandhorizontal, icon, core, expand, width, horizontal arrows, maximum width, stretch, fit |
| ExpandVerticalIcon | @atlaskit/icon/core/expand-vertical | Single purpose - Reserved for expanding an element to its maximum height. | expand-vertical, expandvertical, icon, core, expand, height, vertical arrows, maximum height, stretch, fit |
| EyeOpenIcon | @atlaskit/icon/core/eye-open | Multi purpose - Known uses: watch page in Confluence, show password in text field, and following in Atlas. | eye-open, eyeopen, icon, core, watch, visible, visbility, permissions |
| EyeOpenFilledIcon | @atlaskit/icon/core/eye-open-filled | Multi purpose - Known uses: watched pages in Confluence. | eye-open-filled, eyeopenfilled, icon, core, watching, visible, visbility, permissions, filled |
| EyeOpenStrikethroughIcon | @atlaskit/icon/core/eye-open-strikethrough | Multi purpose - Intended uses: unwatch page in Confluence, hide password in text field, and unfollow in Atlas. | eye-open-strikethrough, eyeopenstrikethrough, icon, core, unwatch, invisible, visibility, permissions |
| FeedIcon | @atlaskit/icon/core/feed | Single purpose - Reserved for update feeds in Atlassian Home. | feed, icon, core, feed, updates, release notes, what's new |
| FeedbackIcon | @atlaskit/icon/core/feedback | Single purpose - Known uses: customer feedback. | feedback, announce, speaker, megaphone, icon, core, diagonal arrow, chat bubble, survey, critique |
| FieldIcon | @atlaskit/icon/core/field | Multi purpose - Known usages: Field suggestions provided by Atlassian Intelligence. | field, icon, core, field, form, input, label |
| FieldAlertIcon | @atlaskit/icon/core/field-alert | Known uses: Changed field values in Automation. | field-alert, fieldalert, icon, core, field, alert, warning, change |
| FieldCheckboxGroupIcon | @atlaskit/icon/core/field-checkbox-group | Known uses: Checkbox group field type in Proforma. | field-checkbox-group, fieldcheckboxgroup, icon, core, form, field, input type, checkbox, multi-select, options |
| FieldDropdownIcon | @atlaskit/icon/core/field-dropdown | Known uses: Dropdown field type in Proforma. | field-dropdown, fielddropdown, icon, core, form, field, select, dropdown |
| FieldRadioGroupIcon | @atlaskit/icon/core/field-radio-group | Known uses: Radio group field type in Proforma. | field-radio-group, fieldradiogroup, icon, core, form, field, input type, radio, single-select, options |
| FileIcon | @atlaskit/icon/core/file | Multi purpose - Known uses: document, file. Do not use to represent a page — use the dedicated 'Page' icon instead. | file, document, paper, page, sheet, icon, core, document, file, paper |
| FilesIcon | @atlaskit/icon/core/files | Multi purpose - Known uses: documents, files. Do not use to represent pages — use the dedicated 'Pages' icon instead. | files, icon, core, documents, files, papers |
| FilterIcon | @atlaskit/icon/core/filter | Single purpose - Reserved for filterting data or objects. | filter, icon, core, funnel, refine |
| FlagIcon | @atlaskit/icon/core/flag | Multi purpose - Known uses: flags in Editor, feature flags. | flag, icon, core, important, emoji category |
| FlagFilledIcon | @atlaskit/icon/core/flag-filled | Multi purpose - Known uses: active feature flags. | flag-filled, flagfilled, icon, core, flag, important, filled |
| FlaskIcon | @atlaskit/icon/core/flask | Multi purpose - Known uses: labs in Jira. | flask, icon, core, labs, test, erlenmeyer flask, beaker |
| FocusAreaIcon | @atlaskit/icon/core/focus-area | Reserved for representing Focus Areas. | focus-area, focusarea, icon, core, focus, focus area, capture |
| FolderClosedIcon | @atlaskit/icon/core/folder-closed | Single purpose - Reserved for folders in Confluence. | folder-closed, folderclosed, icon, core, directory |
| FolderOpenIcon | @atlaskit/icon/core/folder-open | Single purpose - Reserved for open folders in Confluence. | folder-open, folderopen, icon, core, directory |
| FormIcon | @atlaskit/icon/core/form | Known uses: Represents forms across Atlassian products, including Proforma. | form, icon, core, form, fields |
| FullscreenEnterIcon | @atlaskit/icon/core/fullscreen-enter | Single purpose - Reserved for full screen videos or objects. | fullscreen-enter, fullscreenenter, icon, core, full screen |
| FullscreenExitIcon | @atlaskit/icon/core/fullscreen-exit | Single purpose - Reserved for return screen videos or objects. | fullscreen-exit, fullscreenexit, icon, core, un-full screen, un-fullscreen |
| GlassesIcon | @atlaskit/icon/core/glasses | Known uses: Changing tone of written content to Educational with Atlassian Intelligence. | glasses, icon, core, glasses, knowledge, learning, spectacles, education |
| GlobeIcon | @atlaskit/icon/core/globe | Multi purpose - Known uses: public link in Confluence share dialog, global rules in Automation. | globe, icon, core, world |
| GoalIcon | @atlaskit/icon/core/goal | Single purpose - Reserved for goals in Atlas. | goal, icon, core, target |
| GridIcon | @atlaskit/icon/core/grid | Multi purpose - Known uses: spaces in Confluence, and grid view, all content in Confluence. | grid, icon, core, view all content, tile view, layout, grid, tiles |
| GrowDiagonalIcon | @atlaskit/icon/core/grow-diagonal | Single purpose - Reserved for increasing the size of an element when height and width are changed concurrently. | grow-diagonal, growdiagonal, icon, core, grow, width and height, diagonal arrows |
| GrowHorizontalIcon | @atlaskit/icon/core/grow-horizontal | Single purpose - Reserved for increasing the width of an element. | grow-horizontal, growhorizontal, icon, core, grow, width, horizontal arrows |
| GrowVerticalIcon | @atlaskit/icon/core/grow-vertical | Single purpose - Reserved for increasing the height of an element. | grow-vertical, growvertical, icon, core, grow, height, vertical arrows |
| HashtagIcon | @atlaskit/icon/core/hashtag | Multi purpose - Known uses: topics in Atlas, tags. | hashtag, icon, core, tag, topic, pound |
| HeadphonesIcon | @atlaskit/icon/core/headphones | Known uses: music, audio. | headphones, icon, core, audio, music, headphones |
| HeartIcon | @atlaskit/icon/core/heart | Multi purpose - Known uses: emoji symbols in Editor. | heart, icon, core, like, love, emoji category |
| HighlightIcon | @atlaskit/icon/core/highlight | Single purpose - Reserved for highlight text tool in Confluence Editor. | highlight, icon, core, highlight, highlighter, stabilo, pen |
| HomeIcon | @atlaskit/icon/core/home | Single purpose - Reserved for home in navigation. When a user clicks on this, they should return to the homepage. | home, icon, core, house, building |
| ImageIcon | @atlaskit/icon/core/image | Multi purpose - Known uses: images, image upload. | image, picture, photo, icon, core, picture, asset |
| ImageFullscreenIcon | @atlaskit/icon/core/image-fullscreen | Reserved for viewing an image in a fullscreen view or modal. | image-fullscreen, imagefullscreen, icon, core, image, fullscreen, enlarge |
| ImageInlineIcon | @atlaskit/icon/core/image-inline | Reserved for representing inline images in Editor. | image-inline, imageinline, icon, core, image, layout, inline |
| ImageScaledIcon | @atlaskit/icon/core/image-scaled | Reserved for representing scaled images in layouts akin to display block. | image-scaled, imagescaled, icon, core, image, layout, scaled |
| InboxIcon | @atlaskit/icon/core/inbox | Multi purpose - Known uses: 'Your work' in Confluence, inbox, mail. | inbox, icon, core, document tray, work, letter, post |
| IncidentIcon | @atlaskit/icon/core/incident | Single purpose - Reserved for incidents in Jira. | incident, icon, core, witches hat, traffic cone, jira status |
| InformationIcon | @atlaskit/icon/core/information | Reserved for information statuses and messaging.  Filled status icons provide higher visual contrast to draw attention to important information. For information tooltips, use the unfilled 'information circle' icon. | information, icon, core, info, filled, status, information |
| InformationCircleIcon | @atlaskit/icon/core/information-circle | Known uses: For highlighting information when less visual emphasis is needed within the UI compared to the filled information status icon. | information-circle, informationcircle, icon, core, information, circle, info |
| KeyResultIcon | @atlaskit/icon/core/key-result | Reserved for representing key results. | key-result, keyresult, icon, core, target, bullseye, key result, arrow, bow, archery, OKR |
| LayoutOneColumnIcon | @atlaskit/icon/core/layout-one-column | Reserved for single column layout option in Confluence Editor | layout-one-column, layoutonecolumn, icon, core, layout, column, 1 col |
| LayoutThreeColumnsIcon | @atlaskit/icon/core/layout-three-columns | Single purpose - Reserved for 3 column layout option in Confluence Editor. | layout-three-columns, layoutthreecolumns, icon, core, layout, columns, 3 col, 3 cols |
| LayoutThreeColumnsSidebarsIcon | @atlaskit/icon/core/layout-three-columns-sidebars | Single purpose - Reserved for 3 column layout with left and right sidebars option in Confluence Editor. | layout-three-columns-sidebars, layoutthreecolumnssidebars, icon, core, layout, columns, 3 col, 3 cols, sidebars, asides |
| LayoutTwoColumnsIcon | @atlaskit/icon/core/layout-two-columns | Single purpose - Reserved for 2 column layout option in Confluence Editor. | layout-two-columns, layouttwocolumns, icon, core, layout, columns, 2 col, 2 cols |
| LayoutTwoColumnsSidebarLeftIcon | @atlaskit/icon/core/layout-two-columns-sidebar-left | Single purpose - Reserved for 2 column layout with left sidebar option in Confluence Editor. | layout-two-columns-sidebar-left, layouttwocolumnssidebarleft, icon, core, layout, columns, 2 col, 2 cols, sidebar, aside |
| LayoutTwoColumnsSidebarRightIcon | @atlaskit/icon/core/layout-two-columns-sidebar-right | Single purpose - Reserved for 2 column layout with right sidebar option in Confluence Editor. | layout-two-columns-sidebar-right, layouttwocolumnssidebarright, icon, core, layout, columns, 2 col, 2 cols, sidebar, aside |
| LibraryIcon | @atlaskit/icon/core/library | Single purpose - Reserved for library view in Atlassian Home. | library, icon, core, library, drawer, drawers, filing cabinet |
| LightbulbIcon | @atlaskit/icon/core/lightbulb | Known uses: learnings in Atlas. | lightbulb, idea, hint, icon, core, idea, initiative, tip, learnings |
| LinkIcon | @atlaskit/icon/core/link | Single purpose - Reserved for links, urls, or copy link. | link, icon, core, url, hyperlink, website, www, http,  |
| LinkBrokenIcon | @atlaskit/icon/core/link-broken | Single purpose - Reserved for removing a link. | link-broken, linkbroken, icon, core, unlink, remove link, break link, url, hyperlink, website, www, https |
| LinkExternalIcon | @atlaskit/icon/core/link-external | Single purpose - Reserved for links that open up a new tab. | link-external, linkexternal, icon, core, new tab, new window, open in, url, hyperlink, www, http, https, website, external, shortcut, diagonal arrow, offsite |
| ListBulletedIcon | @atlaskit/icon/core/list-bulleted | Multi purpose - Known uses: bulleted lists, view all. | list-bulleted, listbulleted, icon, core, bullets, unordered list |
| ListChecklistIcon | @atlaskit/icon/core/list-checklist | Known usages: Checklist, 'Requirement' work type. | list-checklist, listchecklist, icon, core, list, check mark, to-do, requirements, checklist, work type |
| ListNumberedIcon | @atlaskit/icon/core/list-numbered | Multi purpose - Known usages: Numbered list in Confluence Editor. | list-numbered, listnumbered, icon, core, list, numbers |
| LobbyBellIcon | @atlaskit/icon/core/lobby-bell | Multi purpose - Known uses: risks in Atlas. | lobby-bell, lobbybell, icon, core, ding, risks |
| LocationIcon | @atlaskit/icon/core/location | Multi purpose - Known uses: location in Atlas. | location, pin, gps, map, icon, core, map, pin, address |
| LockLockedIcon | @atlaskit/icon/core/lock-locked | Multi purpose - Known uses: secure password in textfields, locked page in Confluence. | lock-locked, locklocked, icon, core, permissions, no access, restricted, security, secure, forbidden, authentication |
| LockUnlockedIcon | @atlaskit/icon/core/lock-unlocked | Multi purpose - Known uses: unlocked page in Confluence. | lock-unlocked, lockunlocked, icon, core, open permissions, unrestricted access, security, insecure, authentication |
| LogInIcon | @atlaskit/icon/core/log-in | Single purpose - Reserved for log in. | log-in, login, icon, core, sign in, enter, account |
| LogOutIcon | @atlaskit/icon/core/log-out | Single purpose - Reserved for log out. | log-out, logout, icon, core, sign out, exit, account |
| MagicWandIcon | @atlaskit/icon/core/magic-wand | Multi purpose | magic-wand, magicwand, icon, core, magic, wand, suggestion |
| MarkdownIcon | @atlaskit/icon/core/markdown | Reserved for representing the Markdown markup language. | markdown, icon, core, markdown, md, markup |
| MarketplaceIcon | @atlaskit/icon/core/marketplace | Single purpose - Reserved for Atlassian Marketplace. | marketplace, store, shop, icon, core, app store, storefront, stand, third-party developer |
| MaximizeIcon | @atlaskit/icon/core/maximize | Single purpose - Reserved for resizing screens, panels, modals, or media to its maximum size. | maximize, icon, core, diagonal, resize, enlarge |
| MegaphoneIcon | @atlaskit/icon/core/megaphone | Multi purpose - Known uses: feedback in products. | megaphone, icon, core, announcement, bullhorn, feedback, news |
| MentionIcon | @atlaskit/icon/core/mention | Single purpose - Reserved for user mentions. | mention, user, person, @, icon, core, at symbol, @, tag, username |
| MenuIcon | @atlaskit/icon/core/menu | Single purpose - Reserved for accessing the menu in global product navigation. | menu, hamburger, navigation, switcher, app switcher, icon, core, menu, top navigation, 3 lines, hamburger |
| MergeFailureIcon | @atlaskit/icon/core/merge-failure | Single purpose - Reserved for branches in Bitbucket and Jira that have failed to merge. | merge-failure, mergefailure, icon, core, git merge, bitbucket merge, merge fail, cross, x |
| MergeSuccessIcon | @atlaskit/icon/core/merge-success | Single purpose - Reserved for branches in Bitbucket and Jira that have successfully merged. | merge-success, mergesuccess, icon, core, git merge, bitbucket merge, merge success, check mark |
| MicrophoneIcon | @atlaskit/icon/core/microphone | Multi purpose - Known uses: record sounds in Trello. | microphone, icon, core, mic, mic on, voice, speak |
| MinimizeIcon | @atlaskit/icon/core/minimize | Single purpose - Reserved for minimizing or docking modals to the bottom of the viewport. | minimize, icon, core, minimize, dock |
| MinusIcon | @atlaskit/icon/core/minus | Multi purpose - Known uses: horizontal rule in Editor. | minus, icon, core, rule, horizontal line, divider, minus, subtract |
| MinusSquareIcon | @atlaskit/icon/core/minus-square | Known usages: 'Remove feature' work type. | minus-square, minussquare, icon, core, square, minus, subtract, work type |
| NodeIcon | @atlaskit/icon/core/node | Single purpose - Reserved for a non-expandable item in a page tree. | node, icon, core, page, dot, page tree, navigation |
| NoteIcon | @atlaskit/icon/core/note | Single purpose - Reserved for notes. | note, icon, core, note, post-it, sticky |
| NotificationIcon | @atlaskit/icon/core/notification | Single purpose - Reserved for notifications within global product navigation and within product screens. | notification, bell, alarm, icon, core, bell, alert |
| NotificationMutedIcon | @atlaskit/icon/core/notification-muted | Single purpose - Reserved for muting or disabling notifications. | notification-muted, notificationmuted, icon, core, bell, alert, notification, mute |
| ObjectiveIcon | @atlaskit/icon/core/objective | Single purpose - Reserved for objectives. | objective, icon, core, target, bullseye, objective |
| OfficeBuildingIcon | @atlaskit/icon/core/office-building | Multi purpose - Known uses: office in Atlas, company. | office-building, officebuilding, icon, core, organization, organisation, business |
| OnCallIcon | @atlaskit/icon/core/on-call | Single purpose - Reserved for representing on-call across Atlassian products. | on-call, oncall, icon, core, phone, on-call, support |
| OperationsIcon | @atlaskit/icon/core/operations | Single purpose - Reserved for IT Operations. | operations, icon, core, incident management, alerting, opsgenie, it operations, it ops, radar |
| PageIcon | @atlaskit/icon/core/page | Single purpose - Reserved for pages in Confluence. | page, file, document, icon, core, single page, feed, document, jira status |
| PagesIcon | @atlaskit/icon/core/pages | Single purpose - Reserved for multipe pages in Confluence. | pages, icon, core, multiple pages, feeds, documents |
| PaintBucketIcon | @atlaskit/icon/core/paint-bucket | Multi purpose - Known usages: Customize fill color. | paint-bucket, paintbucket, icon, core, paint, bucket, fill, background, customize |
| PaintPaletteIcon | @atlaskit/icon/core/paint-palette | Multi purpose - Known usages: Customize. | paint-palette, paintpalette, icon, core, background, customize |
| PanelLeftIcon | @atlaskit/icon/core/panel-left | Reserved for opening a preview panel to the left of the viewport edge. Use for right-to-left languages which invert the navigational chrome. | panel-left, panelleft, icon, core, detail view, left rail, drawer, preview panel, sidebar |
| PanelRightIcon | @atlaskit/icon/core/panel-right | Reserved for opening a preview panel to the right of the viewport edge. Use only for left-to-right languages. | panel-right, panelright, icon, core, detail view, right rail, drawer, preview panel, sidebar |
| PenIcon | @atlaskit/icon/core/pen | Known usages: 'Design task' work type. | pen, icon, core, pen tool, nib, fountain pen, design, work type |
| PeopleGroupIcon | @atlaskit/icon/core/people-group | Single purpose - Known uses: representing a group or collection of people or users. | people-group, peoplegroup, person, user, group, icon, core, users, customers, people |
| PersonIcon | @atlaskit/icon/core/person | Single purpose - Known uses: representing a person or user, owner, contributor. | person, person, user, avatar, icon, core, user, customer |
| PersonAddIcon | @atlaskit/icon/core/person-add | Single purpose - Reserved for adding a user to an object. | person-add, personadd, icon, core, user, customer, plus |
| PersonAddedIcon | @atlaskit/icon/core/person-added | Single purpose - Reserved for a user added to an object. | person-added, personadded, icon, core, user, customer, check, tick |
| PersonAvatarIcon | @atlaskit/icon/core/person-avatar | Single purpose - Reserved for user avatar. | person-avatar, personavatar, icon, core, user, customer |
| PersonOffboardIcon | @atlaskit/icon/core/person-offboard | 📦 @atlaskit/icon/core/person-offboard | person-offboard, personoffboard, icon, core, user, customer, right arrow |
| PersonRemoveIcon | @atlaskit/icon/core/person-remove | Reserved for removing and unfollowing people and teammates. | person-remove, personremove, icon, core, person, remove, delete, unfollow |
| PersonWarningIcon | @atlaskit/icon/core/person-warning | Reserved for showing a warning related to a person or teammate. | person-warning, personwarning, icon, core, person, warning, alert |
| PhoneIcon | @atlaskit/icon/core/phone | Multi purpose - Known uses: call us, phone number input. | phone, icon, core, call, dial out |
| PinIcon | @atlaskit/icon/core/pin | Known uses: unpinned fields. | pin, icon, core, push pin, thumbtack, tack |
| PinFilledIcon | @atlaskit/icon/core/pin-filled | Known uses: pinned fields. | pin-filled, pinfilled, icon, core, push pin, thumbtack, tack, filled |
| PlusSquareIcon | @atlaskit/icon/core/plus-square | Known usages: 'New feature' work type. | plus-square, plussquare, icon, core, square, plus, add, work type |
| PowerPlugIcon | @atlaskit/icon/core/power-plug | Multi purpose - Known uses: plugins, add ons. | power-plug, powerplug, icon, core, plug-in, add-on, socket |
| PremiumIcon | @atlaskit/icon/core/premium | Single purpose - Reserved for premium features. | premium, icon, core, AI, sparkles, stars, new, feature |
| PresenterModeIcon | @atlaskit/icon/core/presenter-mode | Single purpose - Reserved for presenter mode in Confluence. | presenter-mode, presentermode, icon, core, pointer, cursor, presentation, present |
| PrinterIcon | @atlaskit/icon/core/printer | Multi purpose - Known uses: print page, print-friendly view. | printer, icon, core, print |
| PriorityBlockerIcon | @atlaskit/icon/core/priority-blocker | Reserved for blocker work type priority. | priority-blocker, priorityblocker, icon, core, blocked, showstopper, work type status |
| PriorityCriticalIcon | @atlaskit/icon/core/priority-critical | Reserved for critical work type priority. | priority-critical, prioritycritical, icon, core, priority, work type status |
| PriorityHighIcon | @atlaskit/icon/core/priority-high | Reserved for high work type priority. | priority-high, priorityhigh, icon, core, priority, work type status |
| PriorityHighestIcon | @atlaskit/icon/core/priority-highest | Reserved for highest work type priority. | priority-highest, priorityhighest, icon, core, priority, work type status |
| PriorityLowIcon | @atlaskit/icon/core/priority-low | Reserved for low work type priority. | priority-low, prioritylow, icon, core, priority, work type status |
| PriorityLowestIcon | @atlaskit/icon/core/priority-lowest | Reserved for lowest work type priority. | priority-lowest, prioritylowest, icon, core, priority, work type status |
| PriorityMajorIcon | @atlaskit/icon/core/priority-major | Reserved for major work type priority. | priority-major, prioritymajor, icon, core, priority, work type status |
| PriorityMediumIcon | @atlaskit/icon/core/priority-medium | Reserved for medium work type priority. | priority-medium, prioritymedium, icon, core, priority, work type status |
| PriorityMinorIcon | @atlaskit/icon/core/priority-minor | Reserved for minor work type priority. | priority-minor, priorityminor, icon, core, priority, work type status |
| PriorityTrivialIcon | @atlaskit/icon/core/priority-trivial | Reserved for trivial work type priority. | priority-trivial, prioritytrivial, icon, core, priority, work type status |
| ProblemIcon | @atlaskit/icon/core/problem | Reserved for problem work type priority. | problem, icon, core, stop, priority, work type status |
| ProjectIcon | @atlaskit/icon/core/project | Single purpose - Reserved for projects in Jira. | project, icon, core, rocket, rocketship, spaceship |
| ProjectStatusIcon | @atlaskit/icon/core/project-status | Reserved for representing project status in Atlassian Home. | project-status, projectstatus, icon, core, status, traffic lights |
| ProjectionScreenIcon | @atlaskit/icon/core/projection-screen | Multi purpose - Intended usages: Presentation mode. | projection-screen, projectionscreen, icon, core, present, presentation, projector screen, keynote |
| PullRequestIcon | @atlaskit/icon/core/pull-request | Single purpose - Reserved for pull requests. | pull-request, pullrequest, icon, core, git pull request, bitbucket pull request, jira status |
| PulseIcon | @atlaskit/icon/core/pulse | Single purpose - Known uses: work health in Atlassian Home. | pulse, icon, core, pulse, wave, heartbeat, health |
| QuestionCircleIcon | @atlaskit/icon/core/question-circle | Multi purpose - Known uses: help, tip. | question-circle, questioncircle, help, icon, core, help, answers, faq, jira status |
| QuotationMarkIcon | @atlaskit/icon/core/quotation-mark | Multi purpose - Known uses: blockquote, comment, testimonial, blogs in Confluence. | quotation-mark, quotationmark, icon, core, quote, testimonial, blockquote, jira status |
| RadioCheckedIcon | @atlaskit/icon/core/radio-checked | Reserved for the selected state of radio controls. | radio-checked, radiochecked, icon, core, radio, input type, selected |
| RadioUncheckedIcon | @atlaskit/icon/core/radio-unchecked | Reserved for the unselected state of radio controls. | radio-unchecked, radiounchecked, icon, core, radio, input type, unselected |
| RedoIcon | @atlaskit/icon/core/redo | Single purpose - Reserved for redo in Editor. | redo, icon, core, editor, redo, backwards |
| RefreshIcon | @atlaskit/icon/core/refresh | Reserved for reloading or replaying content | refresh, cycle, icon, core, refresh, reload, update, circular arrows, replay |
| ReleaseIcon | @atlaskit/icon/core/release | Single purpose - Reserved for releases in Jira. | release, icon, core, ship, boat |
| RetryIcon | @atlaskit/icon/core/retry | Single purpose - Reserved for retry. | retry, icon, core, try again,  |
| RoadmapIcon | @atlaskit/icon/core/roadmap | Single purpose - Reserved for roadmaps in Jira or Trello. | roadmap, icon, core |
| ScalesIcon | @atlaskit/icon/core/scales | Multi purpose - Known usages: Customer rating in Jira. | scales, icon, core, scales, rule, law |
| ScorecardIcon | @atlaskit/icon/core/scorecard | Single purpose - Reserved for Scorecard in Analytics. | scorecard, icon, core, tick, check, circle, unfinished |
| ScreenIcon | @atlaskit/icon/core/screen | Multi purpose - Known uses: assets in Jira. | screen, desktop, computer, monitor, icon, core, display, monitor, desktop |
| ScreenPlusIcon | @atlaskit/icon/core/screen-plus | Known uses: TBC | screen-plus, screenplus, icon, core, screen, display, monitor, plus, add |
| SearchIcon | @atlaskit/icon/core/search | Single purpose - Reserved for searching objects. | search, find, magnify, icon, core, magnifying glass |
| SendIcon | @atlaskit/icon/core/send | Single purpose - Reserved for sending messages in Rovo Chat. | send, mail, icon, core, submit, paper airplane, paper aeroplane |
| SettingsIcon | @atlaskit/icon/core/settings | Single purpose - Reserved for any object or user settings. | settings, cog, options, configuration, icon, core, system preferences, gear, cog |
| ShapesIcon | @atlaskit/icon/core/shapes | Single purpose - Reserved for shapes in Whiteboards. | shapes, icon, core, objects, whiteboard, asset, graphic |
| ShareIcon | @atlaskit/icon/core/share | Single purpose - Reserved for sharing an object. | share, icon, core, share, access |
| ShieldIcon | @atlaskit/icon/core/shield | Multi purpose - Known uses: classifications in Enterprise Trust, security in Jira (Spork) | shield, icon, core, security, secure, safety, defence, protection, guard |
| ShieldStrikethroughIcon | @atlaskit/icon/core/shield-strikethrough | Known uses: No classification in Enterprise Trust | shield-strikethrough, shieldstrikethrough, icon, core, ️security, secure, safety, defence, protection, guard, strikethrough, classification |
| ShortcutIcon | @atlaskit/icon/core/shortcut | Single purpose - Reserved for shortcuts in Jira. | shortcut, export, icon, core, addshortcut, square, plus |
| ShowMoreHorizontalIcon | @atlaskit/icon/core/show-more-horizontal | Single purpose - Reserved for more action menus. | show-more-horizontal, showmorehorizontal, icon, core, ellipses, three dots, meatball, more actions |
| ShowMoreVerticalIcon | @atlaskit/icon/core/show-more-vertical | Single purpose - Reserved for more action menus, traditionally on mobile. | show-more-vertical, showmorevertical, icon, core, three dots, kebab, more actions |
| ShrinkDiagonalIcon | @atlaskit/icon/core/shrink-diagonal | Single purpose - Reserved for shrinking the height and width of modals, panels, media, or objects. | shrink-diagonal, shrinkdiagonal, icon, core, resize, diagonal arrows |
| ShrinkHorizontalIcon | @atlaskit/icon/core/shrink-horizontal | Single purpose - Reserved for contracting or reducing the width of an element. | shrink-horizontal, shrinkhorizontal, icon, core, contract, width, horizontal arrows |
| ShrinkVerticalIcon | @atlaskit/icon/core/shrink-vertical | Single purpose - Reserved for contracting or reducing the height of an element. | shrink-vertical, shrinkvertical, icon, core, contract, height, vertical arrows |
| SidebarCollapseIcon | @atlaskit/icon/core/sidebar-collapse | Single purpose - Reserved for collapsing the navigation sidebar. | sidebar-collapse, sidebarcollapse, icon, core, navigation, close sidebar |
| SidebarExpandIcon | @atlaskit/icon/core/sidebar-expand | Single purpose - Reserved for expanding the navigation sidebar. | sidebarexpand, icon, core, navigation, open sidebar |
| SmartLinkIcon | @atlaskit/icon/core/smart-link | Reserved for representing Smart links. | smart-link, smartlink, icon, core, smart link |
| SmartLinkCardIcon | @atlaskit/icon/core/smart-link-card | Reserved for representing Smart link preview cards. | smart-link-card, smartlinkcard, icon, core, smart link, url, card, link preview |
| SmartLinkEmbedIcon | @atlaskit/icon/core/smart-link-embed | Reserved for representing Smart link embeds. | smart-link-embed, smartlinkembed, icon, core, smart link, url, embed |
| SmartLinkInlineIcon | @atlaskit/icon/core/smart-link-inline | Reserved for representing inline Smart link lozenges. | smart-link-inline, smartlinkinline, icon, core, smart link, url, inline |
| SmartLinkListIcon | @atlaskit/icon/core/smart-link-list | Reserved for representing Smart link embedded link lists. | smart-link-list, smartlinklist, icon, core, smart link, url, embed, list, table, linked search results |
| SnippetIcon | @atlaskit/icon/core/snippet | Single purpose - Reserved for snippets in Bitbucket. | snippet, icon, core, scissors, cut |
| SortAscendingIcon | @atlaskit/icon/core/sort-ascending | Single purpose - Reserved for sorting data. | sort-ascending, sortascending, icon, core, data, sort, up |
| SortDescendingIcon | @atlaskit/icon/core/sort-descending | Single purpose - Reserved for sorting data. | sort-descending, sortdescending, icon, core, data, sort, down |
| SpreadsheetIcon | @atlaskit/icon/core/spreadsheet | Single purpose - Reserved for spreadsheets. | spreadsheet, icon, core, table, cells, data |
| SprintIcon | @atlaskit/icon/core/sprint | Single purpose - Reserved for sprints in Jira. | sprint, icon, core, loop, iterate |
| StarStarredIcon | @atlaskit/icon/core/star-starred | Single purpose - Reserved for starred or favourited objects. | star-starred, starstarred, icon, core, favourite, star, starred, filled |
| StarUnstarredIcon | @atlaskit/icon/core/star-unstarred | Single purpose - Reserved for starring or favoriting objects. | star-unstarred, starunstarred, icon, core, favourite, star |
| StatusDiscoveryIcon | @atlaskit/icon/core/status-discovery | Reserved for discovery statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | status-discovery, statusdiscovery, icon, core, discovery, note, filled, onboarding, status |
| StatusErrorIcon | @atlaskit/icon/core/status-error | Reserved for error statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | status-error, statuserror, icon, core, filled, status, danger, exclamation, !, error |
| StatusInformationIcon | @atlaskit/icon/core/status-information | Reserved for information statuses and messaging.  Filled status icons provide higher visual contrast to draw attention to important information. For information tooltips, use the unfilled 'information circle' icon. | status-information, statusinformation, icon, core, info, filled, status, information |
| StatusSuccessIcon | @atlaskit/icon/core/status-success | Reserved for success statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | status-success, statussuccess, icon, core, tick, completed, success, filled, check mark, status |
| StatusVerifiedIcon | @atlaskit/icon/core/status-verified | Reserved for representing verified content. Filled status icons provide higher visual contrast draw attention to important information. | status-verified, statusverified, icon, core, verified badge, status |
| StatusWarningIcon | @atlaskit/icon/core/status-warning | Reserved for warning statuses. Filled status icons provide higher visual contrast to draw attention to important information. | status-warning, statuswarning, icon, core, alert, filled, exclamation, !, warning, status |
| StopwatchIcon | @atlaskit/icon/core/stopwatch | Multi purpose - Known uses: timer in Confluence Whiteboards. | stopwatch, icon, core, timer |
| StoryIcon | @atlaskit/icon/core/story | Reserved for story work type. | story, icon, core, bookmark, work type |
| StrokeWeightExtraLargeIcon | @atlaskit/icon/core/stroke-weight-extra-large | Reserved for representing the thickest border stroke width. | stroke-weight-extra-large, strokeweightextralarge, icon, core, border, weight, thickness, stroke, confluence, editor, whiteboards, thickest |
| StrokeWeightLargeIcon | @atlaskit/icon/core/stroke-weight-large | Reserved for representing thick border stroke widths. | stroke-weight-large, strokeweightlarge, icon, core, border, weight, thickness, stroke, thick, confluence, editor, whiteboards |
| StrokeWeightMediumIcon | @atlaskit/icon/core/stroke-weight-medium | Reserved for representing medium border stroke widths. | stroke-weight-medium, strokeweightmedium, icon, core, border, weight, stroke, medium, thickness, confluence, editor, whiteboards |
| StrokeWeightSmallIcon | @atlaskit/icon/core/stroke-weight-small | Reserved for representing thin border stroke widths. | stroke-weight-small, strokeweightsmall, icon, core, border, weight, thickness, stroke, confluence, editor, whiteboards, thin |
| SubtasksIcon | @atlaskit/icon/core/subtasks | Reserved for subtask work type. | subtasks, icon, core, todo, checklist, work type |
| SuccessIcon | @atlaskit/icon/core/success | Reserved for success statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | success, icon, core, tick, completed, success, filled, check mark, status |
| SupportIcon | @atlaskit/icon/core/support | Reserved for representing help support. | support, icon, core, support, help, life raft, life ring, lifebuoy, life preserver |
| TableCellClearIcon | @atlaskit/icon/core/table-cell-clear | Reserved for clearing the contents of table cells. | table-cell-clear, tablecellclear, icon, core, table, cell, clear, empty |
| TableCellMergeIcon | @atlaskit/icon/core/table-cell-merge | Reserved for merging table cells. | table-cell-merge, tablecellmerge, icon, core, table, cell, merge, combine, join |
| TableCellSplitIcon | @atlaskit/icon/core/table-cell-split | Reserved for splitting joined table cells. | table-cell-split, tablecellsplit, icon, core, table, cell, split, divide, separate |
| TableColumnAddLeftIcon | @atlaskit/icon/core/table-column-add-left | Reserved for adding a table column to the left of the selected column. | table-column-add-left, tablecolumnaddleft, icon, core, table, column, add, plus, left, before |
| TableColumnAddRightIcon | @atlaskit/icon/core/table-column-add-right | Reserved for adding a table column to the right of the selected column. | table-column-add-right, tablecolumnaddright, icon, core, table, column, add, right, after |
| TableColumnDeleteIcon | @atlaskit/icon/core/table-column-delete | Reserved for deleting a table column. | table-column-delete, tablecolumndelete, icon, core, table, column, delete, remove, x |
| TableColumnMoveLeftIcon | @atlaskit/icon/core/table-column-move-left | Reserved for moving a table column to the left of its current location. | table-column-move-left, tablecolumnmoveleft, icon, core, table, column, move, left, arrow |
| TableColumnMoveRightIcon | @atlaskit/icon/core/table-column-move-right | Reserved for moving a table column to the right of its current location. | table-column-move-right, tablecolumnmoveright, icon, core, table, column, move, right, arrow |
| TableColumnsDistributeIcon | @atlaskit/icon/core/table-columns-distribute | Reserved for distributing the width of table columns evenly. | table-columns-distribute, tablecolumnsdistribute, icon, core, table, columns, distribute, even, equidistant |
| TableRowAddAboveIcon | @atlaskit/icon/core/table-row-add-above | Reserved for adding a table row above the selected row. | table-row-add-above, tablerowaddabove, icon, core, table, row, add, plus, above, up |
| TableRowAddBelowIcon | @atlaskit/icon/core/table-row-add-below | Reserved for adding a table row below the selected row. | table-row-add-below, tablerowaddbelow, icon, core, table, row, add, plus, below, down |
| TableRowDeleteIcon | @atlaskit/icon/core/table-row-delete | Reserved for deleting a table row. | table-row-delete, tablerowdelete, icon, core, table, row, delete, remove, x |
| TableRowMoveDownIcon | @atlaskit/icon/core/table-row-move-down | Reserved for moving a table row below its current location. | table-row-move-down, tablerowmovedown, icon, core, table, row, move, down, arrow, after |
| TableRowMoveUpIcon | @atlaskit/icon/core/table-row-move-up | Reserved for moving a table row above its current location. | table-row-move-up, tablerowmoveup, icon, core, table, row, move, up, arrow, above |
| TagIcon | @atlaskit/icon/core/tag | Single purpose - Reserved for tags in Atlas. | tag, icon, core, label, topic |
| TakeoutFoodIcon | @atlaskit/icon/core/takeout-food | Multi purpose - Known usages: Food emoji category. | takeout-food, takeoutfood, icon, core, takeaway, takeout, food, burger, drink |
| TargetIcon | @atlaskit/icon/core/target | Single purpose - Reserved for targets. | target, icon, core, target, bullseye |
| TaskIcon | @atlaskit/icon/core/task | Single purpose - Reserved for tasks in Jira. | task, check, tick, icon, core, single task, todo, list, check mark, tick |
| TaskInProgressIcon | @atlaskit/icon/core/task-in-progress | Reserved for in progress task status. Used in JSM Calendar view. | task-in-progress, taskinprogress, icon, core, calendar, task, status, in progress |
| TaskToDoIcon | @atlaskit/icon/core/task-to-do | Reserved for to-do task status. Used in JSM Calendar view. | task-to-do, tasktodo, icon, core, calendar, task, to-do, todo, status |
| TasksIcon | @atlaskit/icon/core/tasks | Single purpose - Reserved for multiple tasks in Jira. | tasks, icon, core, multiple tasks, todo, list, check mark, tick |
| TeamsIcon | @atlaskit/icon/core/teams | Single purpose - Reserved for teams in Atlassian. | teams, icon, core, infinite love, people, persons, customers, users |
| TextIcon | @atlaskit/icon/core/text | Single purpose - Reserved for representing text objects. | text, icon, core, character, font, letter, type, typography, text |
| TextBoldIcon | @atlaskit/icon/core/text-bold | Single purpose - Reserved for bolding text. | text-bold, textbold, icon, core, text, type, bold, font |
| TextHeadingIcon | @atlaskit/icon/core/text-heading | Reserved for representing heading styles | text-heading, textheading, icon, core, text, heading, H, editor, text style |
| TextIndentLeftIcon | @atlaskit/icon/core/text-indent-left | Single purpose - Reserved for shifting the indent of text content left. | text-indent-left, textindentleft, icon, core, text, outdent, left, arrow |
| TextIndentRightIcon | @atlaskit/icon/core/text-indent-right | Single purpose - Reserved for shifting the indent of text content right. | text-indent-right, textindentright, icon, core, text, indent, right, arrow |
| TextItalicIcon | @atlaskit/icon/core/text-italic | Single purpose - Reserved for italicizing text. | text-italic, textitalic, icon, core, text, type, italic, font |
| TextShortenIcon | @atlaskit/icon/core/text-shorten | Reserved for shortening text content with Atlassian Intelligence. | text-shorten, textshorten, icon, core, text, shorten, abbreviate, condense, AI |
| TextSpellcheckIcon | @atlaskit/icon/core/text-spellcheck | Single purpose - Reserved for spellchecking. | text-spellcheck, textspellcheck, icon, core, text, spelling, typo, spellcheck |
| TextStrikethroughIcon | @atlaskit/icon/core/text-strikethrough | Reserved for strikethrough text tool | text-strikethrough, textstrikethrough, icon, core, text, strikethrough, editor, cross out |
| TextStyleIcon | @atlaskit/icon/core/text-style | Single purpose - Reserved for text styles in Editor. | text-style, textstyle, icon, core, characters, font, letters, type, typography |
| TextUnderlineIcon | @atlaskit/icon/core/text-underline | Reserved for underlined text tool | text-underline, textunderline, icon, core, text, underline, U, editor |
| TextWrapIcon | @atlaskit/icon/core/text-wrap | Reserved for wrapping text so it spans multiple lines. | text-wrap, textwrap, icon, core, text, wrap, line wrap |
| ThemeIcon | @atlaskit/icon/core/theme | Single purpose - Reserved for representing themes and theme switching. | theme, icon, core, theme, light mode, dark mode, theme switcher |
| ThumbsDownIcon | @atlaskit/icon/core/thumbs-down | Multi purpose - Known uses: voting, feedback in AI. | thumbs-down, thumbsdown, icon, core, vote, downvote, dislike, feedback, hand |
| ThumbsUpIcon | @atlaskit/icon/core/thumbs-up | Multi purpose - Known uses: voting options in Jira, like. | thumbs-up, thumbsup, icon, core, vote, upvote, like, feedback, hand |
| TimelineIcon | @atlaskit/icon/core/timeline | Single purpose - Reserved for timelines in Jira or Trello. | timeline, icon, core, gantt, calendar |
| ToolsIcon | @atlaskit/icon/core/tools | Known usages: 'Service request' Jira work type. | tools, icon, core, tools, wrench, spanner, screwdriver |
| TransitionIcon | @atlaskit/icon/core/transition | Single purpose - Reserved for transitions in Analytics. | transition, icon, core, connector, movement |
| TranslateIcon | @atlaskit/icon/core/translate | Multi purpose - Known uses: language settings, translation. | translate, icon, core, language, translation, globe |
| TreeIcon | @atlaskit/icon/core/tree | Multi purpose - Known uses: hierarchy, organization chart. | tree, icon, core, hierarchy, org chart, structure |
| UndoIcon | @atlaskit/icon/core/undo | Single purpose - Reserved for undo in Editor. | undo, icon, core, editor, undo, backwards |
| UploadIcon | @atlaskit/icon/core/upload | Single purpose - Reserved for file uploads. | upload, cloud, icon, core, up arrow, file upload |
| VehicleCarIcon | @atlaskit/icon/core/vehicle-car | Multi purpose - Known uses: transportation, delivery. | vehicle-car, vehiclecar, icon, core, car, transportation, delivery |
| VideoIcon | @atlaskit/icon/core/video | Multi purpose - Known uses: video files, video content. | video, icon, core, video file, video content |
| VideoNextIcon | @atlaskit/icon/core/video-next | Single purpose - Reserved for next video control. | video-next, videonext, icon, core, next, skip, video control |
| VideoNextOverlayIcon | @atlaskit/icon/core/video-next-overlay | Reserved for next video control overlay. | video-next-overlay, videonextoverlay, icon, core, next, skip, video control, overlay |
| VideoPauseIcon | @atlaskit/icon/core/video-pause | Single purpose - Reserved for pause video control. | video-pause, videopause, icon, core, pause, video control |
| VideoPauseOverlayIcon | @atlaskit/icon/core/video-pause-overlay | Reserved for pause video control overlay. | video-pause-overlay, videopauseoverlay, icon, core, pause, video control, overlay |
| VideoPlayIcon | @atlaskit/icon/core/video-play | Single purpose - Reserved for play video control. | video-play, videoplay, icon, core, play, video control |
| VideoPlayOverlayIcon | @atlaskit/icon/core/video-play-overlay | Reserved for play video control overlay. | video-play-overlay, videoplayoverlay, icon, core, play, video control, overlay |
| VideoPreviousIcon | @atlaskit/icon/core/video-previous | Single purpose - Reserved for previous video control. | video-previous, videoprevious, icon, core, previous, rewind, video control |
| VideoPreviousOverlayIcon | @atlaskit/icon/core/video-previous-overlay | Reserved for previous video control overlay. | video-previous-overlay, videopreviousoverlay, icon, core, previous, rewind, video control, overlay |
| VideoSkipBackwardFifteenIcon | @atlaskit/icon/core/video-skip-backward-fifteen | Reserved for skipping backward 15 seconds in video. | video-skip-backward-fifteen, videoskipbackwardfifteen, icon, core, skip, backward, 15 seconds, video control |
| VideoSkipBackwardTenIcon | @atlaskit/icon/core/video-skip-backward-ten | Reserved for skipping backward 10 seconds in video. | video-skip-backward-ten, videoskipbackwardten, icon, core, skip, backward, 10 seconds, video control |
| VideoSkipForwardFifteenIcon | @atlaskit/icon/core/video-skip-forward-fifteen | Reserved for skipping forward 15 seconds in video. | video-skip-forward-fifteen, videoskipforwardfifteen, icon, core, skip, forward, 15 seconds, video control |
| VideoSkipForwardTenIcon | @atlaskit/icon/core/video-skip-forward-ten | Reserved for skipping forward 10 seconds in video. | video-skip-forward-ten, videoskipforwardten, icon, core, skip, forward, 10 seconds, video control |
| VideoStopIcon | @atlaskit/icon/core/video-stop | Single purpose - Reserved for stop video control. | video-stop, videostop, icon, core, stop, video control |
| VideoStopOverlayIcon | @atlaskit/icon/core/video-stop-overlay | Reserved for stop video control overlay. | video-stop-overlay, videostopoverlay, icon, core, stop, video control, overlay |
| VolumeHighIcon | @atlaskit/icon/core/volume-high | Multi purpose - Known uses: high volume, unmuted audio. | volume-high, volumehigh, icon, core, volume, high, unmuted, audio |
| VolumeLowIcon | @atlaskit/icon/core/volume-low | Multi purpose - Known uses: low volume, quiet audio. | volume-low, volumelow, icon, core, volume, low, quiet, audio |
| VolumeMutedIcon | @atlaskit/icon/core/volume-muted | Multi purpose - Known uses: muted audio, no sound. | volume-muted, volumemuted, icon, core, volume, muted, no sound, audio |
| WarningIcon | @atlaskit/icon/core/warning | Reserved for warning statuses and messaging. Filled status icons provide higher visual contrast to draw attention to important information. | warning, alert, icon, core, filled, status, exclamation, !, warning |
| WhiteboardIcon | @atlaskit/icon/core/whiteboard | Single purpose - Reserved for whiteboards in Confluence. | whiteboard, icon, core, whiteboard, canvas, drawing |
| WorkItemIcon | @atlaskit/icon/core/work-item | Single purpose - Reserved for work items in Jira. | work-item, workitem, icon, core, work item, task, issue |
| WorkItemsIcon | @atlaskit/icon/core/work-items | Single purpose - Reserved for multiple work items in Jira. | work-items, workitems, icon, core, work items, tasks, issues |
| ZoomInIcon | @atlaskit/icon/core/zoom-in | Single purpose - Reserved for zooming in on content. | zoom-in, zoomin, icon, core, zoom, magnify, enlarge |
| ZoomOutIcon | @atlaskit/icon/core/zoom-out | Single purpose - Reserved for zooming out on content. | zoom-out, zoomout, icon, core, zoom, reduce, shrink |

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Custom icon with Tailwind
<div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
  <span className="text-white text-xs">+</span>
</div>

// SVG with custom styling
<svg className="w-4 h-4 text-gray-600" fill="currentColor">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
</svg>
```

### ✅ After (ADS)
```tsx
import AddIcon from '@atlaskit/icon/core/add';
import PersonIcon from '@atlaskit/icon/core/person';

// Use ADS icons with proper labels
<AddIcon label="Add new item" />
<PersonIcon label="User profile" />
```

## Common Mistakes

### ❌ Don't Use Icons in Link Components
```tsx
// ❌ Wrong - Don't put icons in children
<Link href="/dashboard">
  <HomeIcon label="" /> Dashboard
</Link>

// ✅ Correct - Use target="_blank" for external links
<Link href="https://www.atlassian.com" target="_blank">
  Atlassian home
</Link>
```

### ❌ Don't Skip the Label Prop
```tsx
// ❌ Wrong - Missing accessibility
<AddIcon />
<PersonIcon />

// ✅ Correct - Always include label
<AddIcon label="Add new item" />
<PersonIcon label="User profile" />
```

### ❌ Don't Use Deprecated Icon Imports
```tsx
// ❌ Wrong - Deprecated imports
import { AddIcon } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/glyph/add';

// ✅ Correct - Use core icons
import AddIcon from '@atlaskit/icon/core/add';
```


---

## icon-tile-guidelines

# IconTile Component Guidelines

## Overview
IconTile displays only an icon within a colored tile background for visual categorization and status indicators.

## Package
```tsx
import { IconTile } from '@atlaskit/icon';
```

## Use Cases
- **Status indicators** - Show online/offline, success/error states
- **Category indicators** - Visual categorization (bug, feature, automation)
- **Visual elements** - Decorative icon elements
- **Status communication** - Quick visual status representation

## Prop Guidance
- **icon** - The icon component to display
- **label** - Required descriptive label for accessibility
- **appearance** - Color appearance (blue, green, red, etc.)
- **shape** - Circle or square tile shape
- **size** - Tile size in pixels (16, 24, 32, 40, 48)

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Custom icon tile implementation (icon only)
<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
  <AddIcon className="w-4 h-4 text-white" />
</div>

// Square tile (icon only)
<div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
  <CheckIcon className="w-5 h-5 text-white" />
</div>
```

### ✅ After (ADS)
```tsx
import { IconTile } from '@atlaskit/icon';
import AddIcon from '@atlaskit/icon/core/add';
import CheckMarkIcon from '@atlaskit/icon/core/check-mark';

// Circle tile (icon only)
<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="24" />

// Square tile (icon only)
<IconTile icon={CheckMarkIcon} label="Success icon" appearance="green" shape="square" size="32" />
```

## Common Mistakes

### ❌ Don't Include Text Content
```tsx
// ❌ Wrong - IconTile should not contain text
<IconTile icon={AddIcon} label="Add new item" appearance="blue" shape="circle" size="24">
  Add New Item
</IconTile>

// ✅ Correct - IconTile is for icons only
<IconTile icon={AddIcon} label="Add new item" appearance="blue" shape="circle" size="24" />
```

### ❌ Don't Use for Interactive Elements
```tsx
// ❌ Wrong - IconTile is not clickable
<IconTile 
  icon={AddIcon} 
  label="Add item" 
  appearance="blue" 
  shape="circle" 
  size="24"
  onClick={() => handleAdd()} // Don't add click handlers
/>

// ✅ Correct - Use IconButton for interactive icons
<IconButton icon={AddIcon} label="Add new item" onClick={() => handleAdd()} />
```

### ❌ Don't Use for Text Labels
```tsx
// ❌ Wrong - IconTile is not for text labels
<IconTile icon={InfoIcon} label="Information" appearance="blue" shape="circle" size="24">
  Important Information
</IconTile>

// ✅ Correct - Use Badge for text labels
<Badge appearance="primary">Important Information</Badge>
```


---

## skeleton-guidelines

# Skeleton Component Guidelines

## Overview
The Skeleton component provides loading placeholders that mimic the structure of content while it's being loaded in the Atlassian Design System.

## Package
```tsx
import Skeleton from '@atlaskit/skeleton';
```

## Use Cases
- **Content loading** - Show placeholder while data is being fetched
- **Layout preservation** - Maintain page structure during loading
- **User experience** - Provide visual feedback that content is loading
- **Performance perception** - Make loading feel faster and more responsive

## Prop Guidance
- **height** - Height of the skeleton (string or number)
- **width** - Width of the skeleton (string or number)
- **isShimmering** - Enable shimmer animation effect (default: true)

## Content Guidelines
- Match the dimensions of the actual content being loaded
- Use shimmer animation for better visual feedback
- Group related skeleton elements together
- Don't overuse - only show when content is actually loading
- Consider the layout structure when placing skeletons

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic skeleton with custom CSS
<div className="animate-pulse">
  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
</div>

// Card skeleton
<div className="animate-pulse">
  <div className="h-48 bg-gray-300 rounded mb-4"></div>
  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
</div>
```

### ✅ After (ADS)
```tsx
import Skeleton from '@atlaskit/skeleton';

// Basic skeleton
<Skeleton height="16px" width="200px" />

// Card skeleton
<div>
  <Skeleton height="192px" width="100%" />
  <Skeleton height="16px" width="75%" />
  <Skeleton height="16px" width="50%" />
</div>
```

## Common Mistakes

### ❌ Don't Use Skeletons for Static Content
```tsx
// ❌ Wrong - Static content doesn't need skeleton
<Skeleton height="20px" width="100px" />
<span>This text is always visible</span>

// ✅ Correct - Only for loading content
{isLoading ? (
  <Skeleton height="20px" width="100px" />
) : (
  <span>Dynamic content here</span>
)}
```

### ❌ Don't Make Skeletons Too Small or Too Large
```tsx
// ❌ Wrong - Skeleton doesn't match content size
<Skeleton height="5px" width="50px" />
<div style={{ height: '100px', width: '300px' }}>Large content</div>

// ✅ Correct - Match actual content dimensions
<Skeleton height="100px" width="300px" />
<div style={{ height: '100px', width: '300px' }}>Large content</div>
```

### ❌ Don't Forget to Remove Skeletons
```tsx
// ❌ Wrong - Skeleton never gets replaced
<Skeleton height="20px" width="100px" />

// ✅ Correct - Replace with actual content
{isLoading ? (
  <Skeleton height="20px" width="100px" />
) : (
  <div>Loaded content</div>
)}
```


---

## tag-guidelines

# Tag Component Guidelines

## Overview
The Tag component displays labels or categories to help users identify and organize content in the Atlassian Design System.

## Package
```tsx
import Tag from '@atlaskit/tag';
```

## Use Cases
- **Content categorization** - Label content with categories or types
- **Status indicators** - Show current state or status
- **Filtering** - Allow users to filter by tags
- **Metadata display** - Show additional information about items
- **User-generated labels** - Allow users to create custom tags

## Prop Guidance
- **text** - Text content of the tag
- **appearance** - Visual style: default, rounded
- **color** - Custom color for the tag
- **isRemovable** - Allow tag to be removed (if supported)

## Content Guidelines
- Keep tag text short and descriptive (1-3 words)
- Use sentence case
- Be consistent with tag naming conventions
- Use colors meaningfully (not just for decoration)
- Group related tags together
- Consider accessibility when choosing colors

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic tag
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  React
</span>

// Colored tag
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Completed
</span>

// Rounded tag
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
  Design
</span>
```

### ✅ After (ADS)
```tsx
import Tag from '@atlaskit/tag';

// Basic tag
<Tag text="React" />

// Rounded appearance
<Tag text="Design" appearance="rounded" />

// Colored tag
<Tag text="Completed" color="green" />
```

## Common Mistakes

### ❌ Don't Use Tags for Actions
```tsx
// ❌ Wrong - Tag used as button
<Tag text="Click to edit" onClick={handleEdit} />

// ✅ Correct - Use button for actions
<Button appearance="subtle" onClick={handleEdit}>
  Edit
</Button>
```

### ❌ Don't Make Tags Too Long
```tsx
// ❌ Wrong - Too verbose
<Tag text="This is a very long tag that contains too much information" />

// ✅ Correct - Concise and clear
<Tag text="Important" />
```

### ❌ Don't Use Too Many Colors
```tsx
// ❌ Wrong - Inconsistent color usage
<div>
  <Tag text="Bug" color="red" />
  <Tag text="Feature" color="blue" />
  <Tag text="Enhancement" color="green" />
  <Tag text="Documentation" color="purple" />
</div>

// ✅ Correct - Use colors meaningfully
<div>
  <Tag text="Bug" color="red" />
  <Tag text="Feature" color="blue" />
  <Tag text="Enhancement" />
  <Tag text="Documentation" />
</div>
```


---

## textarea-guidelines

# TextArea Component Guidelines

## Overview
The TextArea component allows users to input and edit multi-line text content with proper validation and error handling in the Atlassian Design System.

## Package
```tsx
import TextArea from '@atlaskit/textarea';
```

## Use Cases
- **Long-form input** - Comments, descriptions, notes
- **Form submissions** - Feedback, reviews, messages
- **Content editing** - Rich text input areas
- **Data entry** - Multi-line text fields
- **User feedback** - Support tickets, bug reports

## Prop Guidance
- **placeholder** - Placeholder text when empty
- **resize** - Resize behavior: auto, vertical, horizontal, none
- **maxHeight** - Maximum height before scrolling
- **name** - Name attribute for form submission
- **defaultValue** - Initial value for uncontrolled component
- **isDisabled** - Disable the textarea
- **isRequired** - Mark field as required

## Content Guidelines
- Use clear, descriptive placeholder text
- Provide helpful hints about expected content
- Use sentence case for labels and placeholders
- Consider character limits for long content
- Provide clear validation messages

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic textarea
<textarea
  placeholder="Enter your message"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
  rows={4}
/>

// Resizable textarea
<textarea
  placeholder="Enter your message"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
  rows={4}
/>

// Disabled textarea
<textarea
  placeholder="Enter your message"
  disabled
  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 resize-none"
  rows={4}
/>
```

### ✅ After (ADS)
```tsx
import TextArea from '@atlaskit/textarea';

// Basic textarea
<TextArea
  placeholder="Enter your message"
  resize="none"
  rows={4}
/>

// Resizable textarea
<TextArea
  placeholder="Enter your message"
  resize="auto"
  rows={4}
/>

// Disabled textarea
<TextArea
  placeholder="Enter your message"
  isDisabled
  rows={4}
/>
```

## Common Mistakes

### ❌ Don't Use TextArea for Single Line Input
```tsx
// ❌ Wrong - Use TextField for single line
<TextArea placeholder="Enter your name" rows={1} />

// ✅ Correct - Use TextField for single line
<TextField placeholder="Enter your name" />
```

### ❌ Don't Forget to Handle Resize
```tsx
// ❌ Wrong - No resize control
<TextArea placeholder="Enter message" />

// ✅ Correct - Specify resize behavior
<TextArea 
  placeholder="Enter message" 
  resize="auto" 
  maxHeight="200px" 
/>
```

### ❌ Don't Use Generic Placeholders
```tsx
// ❌ Wrong - Too generic
<TextArea placeholder="Enter text" />

// ✅ Correct - Specific and helpful
<TextArea placeholder="Describe the issue you're experiencing" />
```


---

## toggle-guidelines

# Toggle Component Guidelines

## Overview
The Toggle component provides an on/off switch for enabling or disabling features, settings, or options in the Atlassian Design System.

## Package
```tsx
import Toggle from '@atlaskit/toggle';
```

## Use Cases
- **Settings toggles** - Enable/disable features or preferences
- **Form controls** - Toggle form options on/off
- **Feature flags** - Control feature availability
- **Notification settings** - Turn notifications on/off
- **Mode switching** - Toggle between different modes

## Prop Guidance
- **id** - Unique identifier for the toggle
- **label** - Descriptive label for the toggle
- **isChecked** - Current checked state
- **onChange** - Handler called when toggle state changes
- **isDisabled** - Disable the toggle

## Content Guidelines
- Use clear, descriptive labels
- Use sentence case for labels
- Be specific about what the toggle controls
- Use positive language (e.g., "Enable notifications" not "Disable notifications")
- Group related toggles together

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic toggle switch
<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900">Enable notifications</span>
</label>

// Disabled toggle
<label className="relative inline-flex items-center cursor-not-allowed opacity-50">
  <input type="checkbox" disabled className="sr-only peer" />
  <div className="w-11 h-6 bg-gray-200 rounded-full peer"></div>
  <span className="ml-3 text-sm font-medium text-gray-500">Disabled option</span>
</label>
```

### ✅ After (ADS)
```tsx
import Toggle from '@atlaskit/toggle';

// Basic toggle
<Toggle
  id="notifications"
  label="Enable notifications"
  isChecked={isEnabled}
  onChange={handleToggle}
/>

// Disabled toggle
<Toggle
  id="disabled"
  label="Disabled option"
  isDisabled
  onChange={handleToggle}
/>
```

## Common Mistakes

### ❌ Don't Use Toggles for Multiple Choice
```tsx
// ❌ Wrong - Use radio buttons for multiple choice
<div>
  <Toggle label="Option A" />
  <Toggle label="Option B" />
  <Toggle label="Option C" />
</div>

// ✅ Correct - Use radio buttons for multiple choice
<RadioGroup
  options={[
    { name: 'choice', value: 'a', label: 'Option A' },
    { name: 'choice', value: 'b', label: 'Option B' },
    { name: 'choice', value: 'c', label: 'Option C' }
  ]}
/>
```

### ❌ Don't Use Negative Labels
```tsx
// ❌ Wrong - Negative language
<Toggle label="Disable notifications" />

// ✅ Correct - Positive language
<Toggle label="Enable notifications" />
```

### ❌ Don't Use Toggles for Actions
```tsx
// ❌ Wrong - Toggle used for action
<Toggle label="Delete item" onChange={handleDelete} />

// ✅ Correct - Use button for actions
<Button appearance="danger" onClick={handleDelete}>
  Delete item
</Button>
```


---

## navigation-guidelines

# Navigation Component Guidelines

## Overview
Navigation components provide consistent navigation structure across the application.

## Package
```tsx
import { ButtonMenuItem, LinkMenuItem, MenuList } from '@atlaskit/navigation-system';
```

## Use Cases
- **Top navigation** - Main application navigation
- **Side navigation** - Section and page navigation
- **Menu navigation** - Dropdown and context menus
- **Breadcrumb navigation** - Page hierarchy navigation

## Critical Rules
- **NEVER** use `@atlaskit/atlassian-navigation` or `@atlaskit/menu` packages
- **ALWAYS** use `@atlaskit/navigation-system` package instead
- **ALWAYS** use inline styles with `token()` function for styling
- **ALWAYS** place icons in `elemBefore` prop, never inside children
- **ALWAYS** add `isSelected` prop to highlight the current page/section

## Component Mapping
- ❌ `@atlaskit/menu` → `ButtonItem` ✅ `ButtonMenuItem`
- ❌ `@atlaskit/menu` → `LinkItem` ✅ `LinkMenuItem` 
- ❌ `@atlaskit/menu` → `MenuGroup` ✅ `MenuList`

## Template Structure
The navigation-system comes pre-loaded with a complete template that includes:
- **Top Navigation Bar** - Already exists and configured
- **Side Navigation Panel** - Already exists and configured
- **Navigation Container** - Already exists and configured

## Content Guidelines
- Update content inside existing navigation components
- Don't create new navigation structures
- Don't replace existing navigation components
- Use consistent navigation patterns

## Common Mistakes

### ❌ Don't Use Wrong Packages
```tsx
// ❌ Wrong - Using deprecated packages
import { ButtonItem } from '@atlaskit/menu';
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';

// ✅ Correct - Use navigation-system
import { ButtonMenuItem } from '@atlaskit/navigation-system';
```

### ❌ Don't Place Icons in Children
```tsx
// ❌ Wrong - Icon in children
<ButtonMenuItem>
  <Icon /> Menu Item
</ButtonMenuItem>

// ✅ Correct - Icon in elemBefore
<ButtonMenuItem elemBefore={<Icon />}>
  Menu Item
</ButtonMenuItem>
```

### ❌ Don't Skip Selection State
```tsx
// ❌ Wrong - Missing selection state
<LinkMenuItem href="/dashboard">Dashboard</LinkMenuItem>

// ✅ Correct - Include selection state
<LinkMenuItem href="/dashboard" isSelected={currentPage === 'dashboard'}>
  Dashboard
</LinkMenuItem>
```


---

## lozenge-guidelines

# Lozenge Component Guidelines

## Overview
Lozenges are used to display status information in a compact, pill-shaped format.

## Package
```tsx
import Lozenge from '@atlaskit/lozenge';
```

## Use Cases
- **Process status** - Show current state of workflows
- **System status** - Display operational states
- **Categorization** - Group items by type or status
- **Status indicators** - Show approval, completion, or error states

## Prop Guidance
- **appearance** - success (positive), removed (negative), inprogress (ongoing), primary (neutral)
- **isBold** - Use for emphasis when needed
- **textColor** - Override default text color if required

## Content Guidelines
- Use clear, action-oriented language
- Keep text concise (1-2 words maximum)
- Use consistent terminology across similar states
- Avoid abbreviations unless they're universally understood

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Status indicators
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Success
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  Error
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
  In Progress
</span>
```

### ✅ After (ADS)
```tsx
import Lozenge from '@atlaskit/lozenge';

// Status indicators
<Lozenge appearance="success">Success</Lozenge>
<Lozenge appearance="removed">Error</Lozenge>
<Lozenge appearance="inprogress">In Progress</Lozenge>
```

## Common Mistakes

### ❌ Don't Use for Interactive Elements
```tsx
// ❌ Wrong - Lozenge is not a button
<Lozenge onClick={handleClick}>Click me</Lozenge>

// ✅ Correct - Use Button with lozenge styling
<Button appearance="subtle">
  <Lozenge appearance="success">Status</Lozenge>
</Button>
```

### ❌ Don't Overuse Lozenges
```tsx
// ❌ Wrong - Too many lozenges
<div>
  <Lozenge appearance="success">New</Lozenge>
  <Lozenge appearance="primary">Beta</Lozenge>
  <Lozenge appearance="important">Important</Lozenge>
  <Lozenge appearance="discovery">Featured</Lozenge>
</div>

// ✅ Correct - Use lozenges sparingly
<div>
  <Lozenge appearance="success">New</Lozenge>
  <Lozenge appearance="primary">Beta</Lozenge>
</div>
```

### ❌ Don't Use Generic Text
```tsx
// ❌ Wrong - Too generic
<Lozenge appearance="success">Info</Lozenge>

// ✅ Correct - Specific and descriptive
<Lozenge appearance="success">Complete</Lozenge>
```


---

## tooltip-guidelines

# Tooltip Component Guidelines

## Overview
Tooltips provide additional context or information when users hover over or focus on an element.

## Package
```tsx
import Tooltip from '@atlaskit/tooltip';
```

## Use Cases
- **Helpful hints** - Explain functionality or provide context
- **Additional information** - Show details without permanent display
- **Accessibility enhancement** - Provide context for screen readers
- **User guidance** - Help users understand complex interfaces

## Prop Guidance
- **content** - Tooltip text or JSX content
- **position** - Tooltip position (top, bottom, left, right)
- **delay** - Delay before showing tooltip (default 300ms)
- **testId** - Testing identifier

## Content Guidelines
- Keep content brief (ideally 1-3 words, max 8 words)
- Use sentence case
- No punctuation at the end
- Use clear, direct language
- Avoid technical jargon

## Migration from Tailwind

### ❌ Before (Tailwind)
```tsx
// Basic tooltip (requires custom JavaScript)
<div className="relative group">
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    Hover me
  </button>
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
    Tooltip content
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
  </div>
</div>
```

### ✅ After (ADS)
```tsx
import Tooltip from '@atlaskit/tooltip';

// Basic tooltip
<Tooltip content="Tooltip content">
  <button>Hover me</button>
</Tooltip>
```

## Common Mistakes

### ❌ Don't Use Tooltips for Critical Information
```tsx
// ❌ Wrong - Critical info hidden in tooltip
<Tooltip content="This button will delete your entire account permanently">
  <Button appearance="danger">Delete</Button>
</Tooltip>

// ✅ Correct - Critical info visible
<Button appearance="danger">
  Delete Account
</Button>
<p style={{ fontSize: '12px', color: token('color.text.warning') }}>
  This action cannot be undone
</p>
```

### ❌ Don't Make Tooltips Too Long
```tsx
// ❌ Wrong - Too verbose
<Tooltip content="This button will save all the changes you have made to the current document and store them in the database for future reference">
  <Button>Save</Button>
</Tooltip>

// ✅ Correct - Concise and clear
<Tooltip content="Save changes">
  <Button>Save</Button>
</Tooltip>
```

### ❌ Don't Use Tooltips for Everything
```tsx
// ❌ Wrong - Overuse of tooltips
<div>
  <Tooltip content="Click to submit"><Button>Submit</Button></Tooltip>
  <Tooltip content="Click to cancel"><Button>Cancel</Button></Tooltip>
  <Tooltip content="Click to reset"><Button>Reset</Button></Tooltip>
</div>

// ✅ Correct - Use tooltips sparingly
<div>
  <Button>Submit</Button>
  <Button>Cancel</Button>
  <Button>Reset</Button>
</div>
```


---

## text-guidelines

# Text Component Guidelines

## Overview
The Text component provides consistent typography with semantic meaning and accessibility features.

## Package
```tsx
import Text from '@atlaskit/primitives/text';
```

**⚠️ IMPORTANT:** Text components cannot accept `className` props. Use wrapper elements for styles that cannot be converted to component props.


## Use Cases
- **Body text** - Standard content and descriptions
- **Headings** - Use Heading component for titles
- **Labels** - Form labels and UI text
- **Metadata** - Secondary information and captions

## Prop Guidance
- **size** - small (12px), medium (14px), large (16px), xlarge (18px)
- **weight** - light, regular, medium, semibold, bold
- **color** - Use design tokens (color.text, color.text.subtle, etc.)
- **align** - start, center, end, justify

## Content Guidelines
- Use sentence case for most text
- Keep content concise and clear
- Use consistent terminology across your application
- Avoid technical jargon in user-facing text

## Migration from Tailwind

**CRITICAL INSTRUCTIONS FOR TAILWIND CONVERSION:**

- ONLY use the tables below for converting existing Tailwind classes
- Do NOT make assumptions or guess component props
- Do NOT convert Tailwind names to component props (e.g., text-xl ≠ size="xl")
- If a Tailwind class is not listed below, leave it unchanged
- Remove the Tailwind class from className and replace with appropriate component

**COMMON MISTAKES TO AVOID:**

- ❌ WRONG: `text-xl` → `size="xl"` (assuming xl = xl)
- ✅ CORRECT: `text-xl` → `size="large"` (as shown in table below)
- ❌ WRONG: `font-semibold` → `weight="600"` (assuming semibold = 600)
- ✅ CORRECT: `font-semibold` → `weight="semibold"` (as shown in table below)
- ❌ WRONG: `text-2xl` → `size="2xl"` (assuming 2xl = 2xl)
- ✅ CORRECT: `text-2xl` → `size="xlarge"` (as shown in table below)
- `text-base font-normal` → `<Text>` (preferred) or keep Tailwind class  

## Tailwind Font Size to Text Component

| Component Name | Tailwind Classes | ADS Component | React Component | Usage Notes |
|---|---|---|---|---|
| Text size large | `text-lg font-normal` | `Text` | `<Text size="large">` | Large body text, normal weight |
| Text size large weight medium | `text-lg font-medium` | `Text` | `<Text size="large" weight="medium">` | Large text with medium weight, clearly heavier than normal |
| Text size large weight bold | `text-lg font-bold` | `Text` | `<Text size="large" weight="bold">` | Large text with bold weight, clearly boldest text variant |
| Text | `text-base font-normal` | `Text` | `<Text>` | Standard body text size and weight |
| Text weight medium | `text-base font-medium` | `Text` | `<Text weight="medium">` | Base size with medium weight |
| Text weight bold | `text-base font-bold` | `Text` | `<Text weight="bold">` | Base size with bold weight, very noticeable |
| Text size small | `text-sm font-normal` | `Text` | `<Text size="small">` | Small body text, normal weight |
| Text size small weight medium | `text-sm font-medium` | `Text` | `<Text size="small" weight="medium">` | Small text with medium weight |
| Text size small weight bold | `text-sm font-bold` | `Text` | `<Text size="small" weight="bold">` | Small text with bold weight |
| MetricText size large | `text-2xl font-bold` | `Text` | `<MetricText size="large">` | Large metric text, appears bold/heavy for emphasis |
| MetricText | `text-xl font-bold` | `Text` | `<MetricText>` | Standard metric text, bold weight for data emphasis |
| MetricText size small | `text-lg font-bold` | `Text` | `<MetricText size="small">` | Small metric text, maintains bold weight |
| Code | `font-mono text-sm px-2 py-1 rounded` | `Code` | `<Code>` | Monospace font, smaller size, background treatment typical for code |

## Tailwind Text Alignment to Text Align Prop

| Tailwind Class | Text Component | Align Prop | Usage |
| -------------- | -------------- | ---------- | ----- |
| text-left      | Text           | start      | Left align text |
| text-center    | Text           | center     | Center align text |
| text-right     | Text           | end        | Right align text |
| text-justify   | Text           | justify    | Justify text |

## Tailwind Classes to Leave Unchanged

**The following Tailwind classes should NOT be converted and should remain in className:**

- `uppercase`, `lowercase`, `capitalize` (text transform)
- `truncate`, `text-ellipsis` (text overflow)
- `whitespace-nowrap`, `whitespace-pre`, `whitespace-pre-line` (whitespace handling)
- `break-words`, `break-all` (word breaking)
- `leading-*` (line height - use component defaults)
- `tracking-*` (letter spacing - use component defaults)


### ❌ Before (Tailwind)
```tsx
// Text with Tailwind classes
<p className="text-lg font-medium text-gray-700">Hello world</p>
<p className="text-sm text-center text-blue-600">Alert message</p>
```

### ✅ After (ADS)
```tsx
import Text from '@atlaskit/primitives/text';

// Use Text component with proper props
<Text size="large" weight="medium" color="color.text.subtle">Hello world</Text>
<Text size="medium" align="center" color="color.text.selected">Alert message</Text>
```

## Common Mistakes

### ❌ Don't Use Native HTML Elements
```tsx
// ❌ Wrong - Native elements with Tailwind
<p className="text-lg font-medium">Content</p>
<span className="text-sm text-gray-600">Label</span>

// ✅ Correct - Use Text component
<Text size="large" weight="medium">Content</Text>
<Text size="medium" color="color.text.subtle">Label</Text>
```

### ❌ Don't Assume Tailwind Names Match Component Props
```tsx
// ❌ Wrong - text-xl ≠ size="xl"
<Text size="xl">Content</Text>

// ✅ Correct - text-xl = size="large"
<Text size="large">Content</Text>
```

### ❌ Don't Skip Design Tokens
```tsx
// ❌ Wrong - Hardcoded colors
<Text color="#6B7280">Content</Text>
```


---

## color-guidelines


# Color Token Guidelines

## Overview
Color tokens provide consistent, semantic color values across the Atlassian Design System.

## Package
```tsx
import { token } from '@atlaskit/tokens';
```

## Use cases:
- **Background colors (bg-)**: Most common background colors have corresponding `color.background.*` tokens
- **Surface colors (bg-)**: Body, cards and modals have corresponding `elevation.surface.*` tokens
- **Text colors (text-)**: Most text colors have corresponding `color.text.*` tokens  
- **Border colors**: Use `color.border.*` tokens when available
- **Icon colors**: Use `color.icon.*` tokens for icon styling

## Content Guidelines
- Always prefer design tokens over hardcoded values
- Use semantic color names (success, warning, danger)
- Maintain consistent color usage across components
- Test color contrast for accessibility

## Migration from Tailwind

### Conversion Process:
1. Find Tailwind classes that have token equivalents in tables below
2. Replace with `token()` using inline styles
3. Keep remaining Tailwind classes for layout/utilities without tokens

### Example Conversion:

```tsx
// ✅ ACCEPTABLE: Inline style when no token exists
<div style={{ backgroundColor: '#F3F4F6' }} />
<div style={{ color: '#374151' }} />

// ❌ AVOID: Tailwind classes when no token exists
<div className="bg-gray-100 text-gray-700" />
```

### ✅ After (ADS)
```tsx
import { token } from '@atlaskit/tokens';

// Use design tokens
<div style={{
  backgroundColor: token('color.background.accent.blue.subtlest'),
  color: token('color.text'),
  borderColor: token('color.border')
}}>
  Content here
</div>
```
## How to Use the Color Table
The table below maps Tailwind CSS color classes to Atlassian Design System tokens. **Always prefer design tokens over Tailwind classes** when available.

## Popular colors

## Background Colors (bg-)

| Tailwind Class | Tailwind Hex | Design Token | Token Hex |
| -------------- | ------------ | ------------ | --------- |
| bg-blue-50     | #EFF6FF      | color.background.accent.blue.subtlest | #E9F2FF |
| bg-blue-100    | #DBEAFE      | color.background.accent.blue.subtlest | #E9F2FF |
| bg-gray-100    | #F3F4F6      | elevation.surface.sunken | #F1F2F4 |
| bg-gray-200    | #E5E7EB      | color.background.accent.gray.subtlest | #F1F2F4 |
| bg-gray-800    | #1F2937      | color.background.brand.boldest | #1C2B41 |
| bg-green-100   | #DCFCE7      | color.background.accent.green.subtlest | #DCFFF1 |
| bg-green-700   | #15803D      | color.background.accent.green.bolder | #1F845A |
| bg-red-50      | #FEF2F2      | color.background.accent.red.subtlest | #FFECEB |
| bg-red-100     | #FEE2E2      | color.background.accent.red.subtlest | #FFECEB |
| bg-yellow-50   | #FEFCE8      | color.background.accent.yellow.subtlest | #FFF7D6 |
| bg-yellow-100  | #FEF9C3      | color.background.accent.yellow.subtlest | #FFF7D6 |
| bg-white       | #FFFFFF      | elevation.surface | #FFFFFF |
| bg-white       | #FFFFFF      | elevation.surface.raised | #FFFFFF |

## Text Colors (text-)

| Tailwind Class | Tailwind Hex | Design Token | Token Hex |
| -------------- | ------------ | ------------ | --------- |
| text-black     | #000000      | color.text | #172B4D |
| text-white     | #FFFFFF      | color.text.inverse | #FFFFFF |
| text-gray-500  | #6B7280      | color.text.subtlest | #626F86 |
| text-gray-600  | #4B5563      | color.text.accent.gray | #44546F |
| text-gray-900  | #111827      | color.text | #172B4D |
| text-gray-950  | #030712      | color.text.accent.gray.bolder | #091E42 |
| text-blue-600  | #2563EB      | color.text.selected | #0C66E4 |
| text-blue-800  | #1E40AF      | color.text.accent.blue | #0055CC |
| text-blue-900  | #0C4A6E      | color.text.accent.blue.bolder | #09326C |
| text-green-800 | #166534      | color.text.accent.green.bolder | #164B35 |
| text-red-600   | #DC2626      | color.text.accent.red | #AE2E24 |
| text-red-900   | #7F1D1D      | color.text.accent.red.bolder | #5D1F1A |
| text-orange-800| #9A3412      | color.text.accent.orange | #A54800 |
| text-orange-900| #702E00      | color.text.accent.orange.bolder | #702E00 |
| text-purple-700| #7E22CE      | color.text.accent.purple | #5E4DB2 |
| text-purple-900| #581C87      | color.text.accent.purple.bolder | #352C63 |

## Icon Colors (fill-)

| Tailwind Class | Tailwind Hex | Design Token | Token Hex |
| -------------- | ------------ | ------------ | --------- |
| fill-blue-500  | #3B82F6      | color.icon.accent.blue | #579DFF |
| fill-green-500 | #22C55E      | color.icon.accent.green | #22A06B |
| fill-red-500   | #EF4444      | color.icon.accent.red | #C9372C |
| fill-orange-500| #F97316      | color.icon.accent.orange | #E56910 |
| fill-yellow-500| #EAB308      | color.icon.accent.yellow | #E2B203 |
| fill-purple-500| #A855F7      | color.icon.accent.purple | #8F7EE7 |
| fill-teal-500  | #14B8A6      | color.icon.accent.teal | #2898BD |
| fill-lime-500  | #84CC16      | color.icon.accent.lime | #6A9A23 |
| fill-pink-600  | #DB2777      | color.icon.accent.magenta | #CD519D |

## Border Colors (border-)

| Tailwind Class | Tailwind Hex | Design Token | Token Hex |
| -------------- | ------------ | ------------ | --------- |
| border-gray-200| #E5E7EB      | color.border | #DFE1E6 |
| border-gray-300| #D1D5DB      | color.border | #DFE1E6 |
| border-gray-400| #9CA3AF      | color.border.input | #8590A2 |
| border-blue-500| #3B82F6      | color.border.focused | #388BFF |
| border-red-600 | #DC2626      | color.border.accent.red | #E2483D |
| border-green-500| #22C55E     | color.border.accent.green | #4BCE97 |
| border-yellow-400| #FACC15    | color.border.accent.yellow | #E2B203 |

## Secondary color values

| Tailwind Class | Pixel Value | Design Token         | Pixel Value |
| -------------- | ----------- | -------------------- | ----------- |
| bg-emerald-50  | #ECFDF5   | color.background.accent.green.subtlest           | #DCFFF1   |
| bg-emerald-600 | #059669   | color.background.accent.green.bolder             | #1F845A   |
| bg-emerald-700 | #047857   | color.background.accent.green.bolder             | #1F845A   |
| bg-fuchsia-100 | #FAE8FF   | color.background.accent.magenta.subtlest         | #FFECF8   |
| bg-fuchsia-50  | #FDF4FF   | color.background.accent.magenta.subtlest         | #FFECF8   |
| bg-gray-100    | #F3F4F6   | color.background.accent.gray.subtlest            | #F1F2F4   |
| bg-gray-200    | #E5E7EB   | color.background.accent.gray.subtlest            | #F1F2F4   |
| bg-gray-50     | #F9FAFB   | color.background.input.hovered                   | #F7F8F9   |
| bg-gray-800    | #1F2937   | color.background.brand.boldest                   | #1C2B41   |
| bg-gray-900    | #111827   | color.background.brand.boldest                   | #1C2B41   |
| bg-green-100   | #DCFCE7   | color.background.accent.green.subtlest           | #DCFFF1   |
| bg-green-200   | #BBF7D0   | color.background.accent.green.subtlest.hovered   | #BAF3DB   |
| bg-green-300   | #86EFAC   | color.background.accent.green.subtlest.pressed   | #7EE2B8   |
| bg-green-400   | #4ADE80   | color.background.accent.green.subtler.pressed    | #4BCE97   |
| bg-green-50    | #F0FDF4   | color.background.accent.green.subtlest.hovered   | #BAF3DB   |
| bg-green-700   | #15803D   | color.background.accent.green.bolder             | #1F845A   |
| bg-green-800   | #166534   | color.background.accent.green.bolder             | #1F845A   |
| bg-indigo-100  | #E0E7FF   | color.background.accent.blue.subtlest            | #E9F2FF   |
| bg-indigo-200  | #C7D2FE   | color.background.accent.blue.subtlest.hovered    | #CCE0FF   |
| bg-indigo-300  | #A5B4FC   | color.background.accent.blue.subtlest.hovered    | #CCE0FF   |
| bg-indigo-400  | #818CF8   | color.background.accent.purple.subtler.pressed   | #9F8FEF   |
| bg-indigo-50   | #EEF2FF   | color.background.accent.blue.subtlest            | #E9F2FF   |
| bg-indigo-700  | #4338CA   | color.background.accent.purple.bolder            | #6E5DC6   |
| bg-lime-100    | #ECFCCB   | color.background.accent.lime.subtlest            | #EFFFD6   |
| bg-lime-200    | #D9F99D   | color.background.accent.lime.subtlest.hovered    | #D3F1A7   |
| bg-lime-300    | #BEF264   | color.background.accent.lime.subtlest.pressed    | #B3DF72   |
| bg-lime-400    | #A3E635   | color.background.accent.lime.subtler.pressed     | #94C748   |
| bg-lime-50     | #F7FEE7   | color.background.accent.lime.subtlest            | #EFFFD6   |
| bg-orange-100  | #FFEDD5   | color.background.accent.orange.subtlest          | #FFF3EB   |
| bg-orange-200  | #FED7AA   | color.background.accent.orange.subtlest.pressed  | #FEC195   |
| bg-orange-300  | #FDBA74   | color.background.accent.orange.subtler.pressed   | #FEA362   |
| bg-orange-400  | #FB923C   | color.background.accent.orange.subtler.pressed   | #FEA362   |
| bg-orange-50   | #FFF7ED   | color.background.accent.orange.subtlest          | #FFF3EB   |
| bg-pink-100    | #FCE7F3   | color.background.accent.magenta.subtlest.hovered | #FDD0EC   |
| bg-pink-200    | #FBCFE8   | color.background.accent.magenta.subtlest.hovered | #FDD0EC   |
| bg-pink-300    | #F9A8D4   | color.background.accent.magenta.subtlest.pressed | #F797D2   |
| bg-pink-400    | #F472B6   | color.background.accent.magenta.subtlest.pressed | #F797D2   |
| bg-pink-50     | #FDF2F8   | color.background.accent.magenta.subtlest.hovered | #FDD0EC   |
| bg-purple-100  | #F3E8FF   | color.background.accent.purple.subtlest          | #F3F0FF   |
| bg-purple-200  | #E9D5FF   | color.background.accent.purple.subtlest          | #F3F0FF   |
| bg-purple-300  | #D8B4FE   | color.background.accent.purple.subtlest.hovered  | #DFD8FD   |
| bg-purple-400  | #C084FC   | color.background.accent.purple.subtler.pressed   | #9F8FEF   |
| bg-purple-50   | #FAF5FF   | color.background.accent.purple.subtlest          | #F3F0FF   |
| bg-red-100     | #FEE2E2   | color.background.accent.red.subtlest             | #FFECEB   |
| bg-red-200     | #FECACA   | color.background.accent.red.subtlest.hovered     | #FFD5D2   |
| bg-red-300     | #FCA5A5   | color.background.accent.red.subtlest.pressed     | #FD9891   |
| bg-red-400     | #F87171   | color.background.accent.red.subtler.pressed      | #F87168   |
| bg-red-50      | #FEF2F2   | color.background.accent.red.subtlest             | #FFECEB   |
| bg-rose-100    | #FFE4E6   | color.background.accent.red.subtlest             | #FFECEB   |
| bg-rose-200    | #FECDD3   | color.background.accent.red.subtlest.hovered     | #FFD5D2   |
| bg-rose-300    | #FDA4AF   | color.background.accent.red.subtlest.pressed     | #FD9891   |
| bg-rose-400    | #FB7185   | color.background.accent.red.subtler.pressed      | #F87168   |
| bg-rose-50     | #FFF1F2   | color.background.accent.red.subtlest             | #FFECEB   |
| bg-sky-100     | #E0F2FE   | color.background.accent.teal.subtlest            | #E7F9FF   |
| bg-sky-200     | #BAE6FD   | color.background.accent.teal.subtlest.hovered    | #C6EDFB   |
| bg-sky-300     | #7DD3FC   | color.background.accent.teal.subtlest.hovered    | #C6EDFB   |
| bg-sky-400     | #38BDF8   | color.background.accent.teal.subtler.pressed     | #6CC3E0   |
| bg-sky-50      | #F0F9FF   | color.background.accent.teal.subtlest            | #E7F9FF   |
| bg-slate-100   | #F1F5F9   | color.background.input.hovered                   | #F7F8F9   |
| bg-slate-200   | #E2E8F0   | color.background.accent.gray.subtlest.hovered    | #DCDFE4   |
| bg-slate-300   | #CBD5E1   | color.background.accent.gray.subtlest.hovered    | #DCDFE4   |
| bg-slate-50    | #F8FAFC   | color.background.input.hovered                   | #F7F8F9   |
| bg-stone-100   | #F5F5F4   | color.background.accent.yellow.subtlest          | #FFF7D6   |
| bg-stone-50    | #FAFAF9   | color.background.accent.yellow.subtlest          | #FFF7D6   |
| bg-teal-100    | #CCFBF1   | color.background.accent.green.subtlest           | #DCFFF1   |
| bg-teal-200    | #99F6E4   | color.background.accent.green.subtlest.hovered   | #BAF3DB   |
| bg-teal-300    | #5EEAD4   | color.background.accent.green.subtlest.pressed   | #7EE2B8   |
| bg-teal-400    | #2DD4BF   | color.background.accent.green.subtler.pressed    | #4BCE97   |
| bg-teal-50     | #F0FDFA   | color.background.accent.green.subtlest.hovered   | #BAF3DB   |
| bg-teal-600    | #0D9488   | color.background.accent.green.bolder             | #1F845A   |
| bg-teal-700    | #0F766E   | color.background.accent.green.bolder             | #1F845A   |
| bg-violet-100  | #EDE9FE   | color.background.accent.purple.subtlest.hovered  | #DFD8FD   |
| bg-violet-200  | #DDD6FE   | color.background.accent.purple.subtlest.hovered  | #DFD8FD   |
| bg-violet-300  | #C4B5FD   | color.background.accent.purple.subtlest.hovered  | #DFD8FD   |
| bg-violet-400  | #A78BFA   | color.background.accent.purple.subtler.pressed   | #9F8FEF   |
| bg-violet-50   | #F5F3FF   | color.background.accent.purple.subtlest          | #F3F0FF   |
| bg-yellow-100  | #FEF9C3   | color.background.accent.yellow.subtlest          | #FFF7D6   |
| bg-yellow-200  | #FEF08A   | color.background.accent.yellow.subtlest.hovered  | #F8E6A0   |
| bg-yellow-300  | #FDE047   | color.background.accent.yellow.subtlest.pressed  | #F5CD47   |
| bg-yellow-400  | #FACC15   | color.background.accent.yellow.subtler.pressed   | #E2B203   |
| bg-yellow-50   | #FEFCE8   | color.background.accent.yellow.subtlest          | #FFF7D6   |
| bg-yellow-500  | #EAB308   | color.background.accent.yellow.subtler.pressed   | #E2B203   |
| bg-yellow-600  | #CA8A04   | color.background.accent.yellow.subtle.pressed    | #CF9F02   |

| bg-zinc-100    | #F4F4F5   | color.background.accent.gray.subtlest            | #F1F2F4   |
| bg-zinc-200    | #E4E4E7   | color.background.accent.gray.subtlest            | #F1F2F4   |
| bg-zinc-300    | #D4D4D8   | color.background.accent.gray.subtlest.hovered    | #DCDFE4   |
| bg-zinc-400    | #A1A1AA   | color.background.accent.gray.subtlest.pressed    | #B3B9C4   |


---

## radius-guidelines

# Radius Token Guidelines

## Overview
Radius tokens provide consistent border radius values across the Atlassian Design System.

## Package
```tsx
import { token } from '@atlaskit/tokens';
```

## Use Cases
- **Small radius** - Subtle rounding for inputs and buttons
- **Medium radius** - Standard rounding for cards and panels
- **Large radius** - Prominent rounding for modals and overlays
- **Circle radius** - Perfect circles for avatars and icons

## Token Values
- **border.radius.050** - 2px (subtle rounding)
- **border.radius.200** - 4px (standard rounding)
- **border.radius.300** - 8px (prominent rounding)
- **border.radius.400** - 12px (large rounding)
- **border.radius.circle** - 9999px (perfect circle)

## Content Guidelines
- Use consistent radius values across similar components
- Match radius to component hierarchy and importance
- Avoid mixing different radius values unnecessarily
- Test radius values for visual consistency


## Migration from Tailwind

 Tailwind Class | Pixel Value | Design Token         | Pixel Value |
| -------------- | ----------- | -------------------- | ----------- |
| rounded-sm     | 2px         | border.radius.050    | 2px         |
| rounded        | 4px         | border.radius.200    | 4px         |
| rounded-lg     | 8px         | border.radius.300    | 8px         |
| rounded-xl     | 12px        | border.radius.400    | 12px        |
| rounded-full   | 9999px      | border.radius.circle | 9999px      |

### ❌ Before (Tailwind)
```tsx
// Tailwind border radius classes
<div className="rounded-lg">Card content</div>
<button className="rounded-full">Button</button>
```

### ✅ After (ADS)
```tsx
import { token } from '@atlaskit/tokens';

// Use design tokens
<div style={{ borderRadius: token('border.radius.300') }}>Card content</div>
<button style={{ borderRadius: token('border.radius.circle') }}>Button</button>
```

## Common Mistakes

### ❌ Don't Use Hardcoded Values
```tsx
// ❌ Wrong - Hardcoded radius
<div style={{ borderRadius: '8px' }} />

// ✅ Correct - Use design tokens
<div style={{ borderRadius: token('border.radius.300') }} />
```

### ❌ Don't Mix Radius Values
```tsx
// ❌ Wrong - Inconsistent radius
<div style={{ borderRadius: token('border.radius.200') }}>Card</div>
<div style={{ borderRadius: token('border.radius.400') }}>Similar card</div>

// ✅ Correct - Consistent radius
<div style={{ borderRadius: token('border.radius.200') }}>Card</div>
<div style={{ borderRadius: token('border.radius.200') }}>Similar card</div>
```

---

## spacing-guidelines

# Spacing Token Guidelines

## Overview
Spacing tokens provide consistent spacing values across the Atlassian Design System.

## Package
```tsx
import { token } from '@atlaskit/tokens';
```

## Use Cases
- **Padding** - Internal spacing within components
- **Margin** - External spacing between components
- **Gap** - Spacing between flex/grid items
- **Width/Height** - Component dimensions

## Token Values
- **space.0** - 0px (no spacing)
- **space.025** - 2px (very tight)
- **space.050** - 4px (tight)
- **space.100** - 8px (small)
- **space.150** - 12px (medium-small)
- **space.200** - 16px (default)
- **space.250** - 20px (medium)
- **space.300** - 24px (large)
- **space.400** - 32px (very large)
- **space.500** - 40px (extra large)
- **space.600** - 48px (huge)
- **space.800** - 64px (massive)
- **space.1000** - 80px (extreme)


## Migration from Tailwind

### Conversion Process:
1. Find Tailwind classes that have token equivalents in tables below
2. Replace with `token()` using inline styles
3. Keep remaining Tailwind classes for layout/utilities without tokens


- **NEVER**: Assume tailwind number equals the token number
- **Instead**:  Use the conversion table below
- **Fallback**: Use tailwind classes if the value doesn't exist

**p-6 = space.300 (NOT space.600)**
**m-4 = space.200 (NOT space.400)**
**gap-8 = space.400 (NOT space.800)**

| Tailwind Class | Pixel Value | Design Token | Pixel Value |
| -------------- | ----------- | ------------ | ----------- |
| m-0            | 0px         | space.0      | 0px         |
| p-0            | 0px         | space.0      | 0px         |
| m-0.5          | 2px         | space.025    | 2px         |
| p-0.5          | 2px         | space.025    | 2px         |
| m-1            | 4px         | space.050    | 4px         |
| p-1            | 4px         | space.050    | 4px         |
| m-1.5          | 6px         | space.075    | 6px         |
| p-1.5          | 6px         | space.075    | 6px         |
| m-2            | 8px         | space.100    | 8px         |
| p-2            | 8px         | space.100    | 8px         |
| m-3            | 12px        | space.150    | 12px        |
| p-3            | 12px        | space.150    | 12px        |
| m-4            | 16px        | space.200    | 16px        |
| p-4            | 16px        | space.200    | 16px        |
| m-5            | 20px        | space.250    | 20px        |
| p-5            | 20px        | space.250    | 20px        |
| m-6            | 24px        | space.300    | 24px        |
| p-6            | 24px        | space.300    | 24px        |
| m-8            | 32px        | space.400    | 32px        |
| p-8            | 32px        | space.400    | 32px        |
| m-10           | 40px        | space.500    | 40px        |
| p-10           | 40px        | space.500    | 40px        |
| m-12           | 48px        | space.600    | 48px        |
| p-12           | 48px        | space.600    | 48px        |
| m-16           | 64px        | space.800    | 64px        |
| p-16           | 64px        | space.800    | 64px        |
| m-20           | 80px        | space.1000   | 80px        |
| p-20           | 80px        | space.1000   | 80px        |

## Tailwind Gap Values

| Tailwind Class | Pixel Value | Design Token | Pixel Value |
| -------------- | ----------- | ------------ | ----------- |
| gap-0          | 0px         | space.0      | 0px         |
| gap-0.5        | 2px         | space.025    | 2px         |
| gap-1          | 4px         | space.050    | 4px         |
| gap-1.5        | 6px         | space.075    | 6px         |
| gap-2          | 8px         | space.100    | 8px         |
| gap-3          | 12px        | space.150    | 12px        |
| gap-4          | 16px        | space.200    | 16px        |
| gap-5          | 20px        | space.250    | 20px        |
| gap-6          | 24px        | space.300    | 24px        |
| gap-8          | 32px        | space.400    | 32px        |
| gap-10         | 40px        | space.500    | 40px        |
| gap-12         | 48px        | space.600    | 48px        |
| gap-16         | 64px        | space.800    | 64px        |
| gap-20         | 80px        | space.1000   | 80px        |

### ❌ Before (Tailwind)
```tsx
// Tailwind spacing classes
<div className="p-4 m-2 gap-3">Content</div>
```

### ✅ After (ADS)
```tsx
import { token } from '@atlaskit/tokens';

// Use design tokens
<div style={{
  padding: token('space.200'),
  margin: token('space.100'),
  gap: token('space.150')
}}>
  Content
</div>
```

## Common Mistakes

### ❌ Don't Mix Units
```tsx
// ❌ Wrong - Mixing pixels and tokens
<div style={{
  padding: '16px',
  margin: token('space.200')
}} />

// ✅ Correct - Consistent token usage
<div style={{
  padding: token('space.200'),
  margin: token('space.200')
}} />
```

### ❌ Don't Use Hardcoded Values
```tsx
// ❌ Wrong - Hardcoded spacing
<div style={{
  padding: '20px',
  margin: '10px'
}} />

// ✅ Correct - Use design tokens
<div style={{
  padding: token('space.250'),
  margin: token('space.100')
}} />
```

### ❌ Don't Use Inconsistent Spacing
```tsx
// ❌ Wrong - Inconsistent spacing values
<div style={{ marginBottom: '8px' }}>
  <h3 style={{ marginBottom: '16px' }}>Title</h3>
  <p style={{ marginBottom: '12px' }}>Content</p>
</div>

// ✅ Correct - Consistent token usage
<div style={{ marginBottom: token('space.100') }}>
  <h3 style={{ marginBottom: token('space.200') }}>Title</h3>
  <p style={{ marginBottom: token('space.150') }}>Content</p>
</div>
```


---

