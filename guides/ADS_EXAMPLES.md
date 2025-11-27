## avatar-examples

# Avatar Component Examples

## Basic example

```tsx
import Avatar from "@atlaskit/avatar";

<Avatar src="/avatar.jpg" name="John Doe" />;
```

## Key Props

| Prop         | Type                                                     | Description                           |
| ------------ | -------------------------------------------------------- | ------------------------------------- |
| `src`        | `string`                                                 | URL of the avatar image               |
| `name`       | `string`                                                 | Name for fallback initials            |
| `appearance` | `'circle' \| 'square'`                                   | Shape of the avatar                   |
| `size`       | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | Size of the avatar                    |
| `onClick`    | `() => void`                                             | Click handler for interactive avatars |

## Other examples

```tsx
// Square appearance
<Avatar src="/avatar.jpg" name="John Doe" appearance="square" />

// Different sizes
<Avatar name="John Doe" size="xsmall" />
<Avatar name="John Doe" size="medium" />
<Avatar name="John Doe" size="large" />

// Clickable avatar
<Avatar
  name="John Doe"
  onClick={() => console.log('Avatar clicked')}
/>
```

---

## button-examples

# Button Component Examples

## Basic example

```tsx
import Button from "@atlaskit/button/new";

<Button>Create Project</Button>;
```

## Other examples

```tsx
// Secondary options
<Button appearance="subtle">Learn More</Button>

// Delete confirmation
<Button appearance="danger">Delete Item</Button>

// Remove from list
<Button appearance="danger" iconBefore={TrashIcon}>
  Remove
</Button>

// Button with Icon
import AddIcon from "@atlaskit/icon/core/add-icon";
<Button appearance="primary" iconBefore={AddIcon}>
  New Item
</Button>

// Button loading
import AddIcon from "@atlaskit/icon/core/add-icon";

<Button appearance="primary" isLoading={true}>
  Submit
</Button>
```

---

## icon-button-examples

# IconButton Component Examples

## Basic example

```tsx
import { IconButton } from "@atlaskit/button/new";
import MoreIcon from "@atlaskit/icon/core/more";

<IconButton icon={MoreIcon} label="Show more options" onClick={() => setShowMenu(true)} />;
```

## Key Props

| Prop         | Type                                             | Description                         |
| ------------ | ------------------------------------------------ | ----------------------------------- |
| `icon`       | `ReactNode`                                      | Icon component to display           |
| `label`      | `string`                                         | Accessible label for screen readers |
| `appearance` | `'default' \| 'primary' \| 'subtle' \| 'danger'` | Visual style of the button          |
| `spacing`    | `'default' \| 'compact'`                         | Spacing around the button           |
| `shape`      | `'square' \| 'circle'`                           | Shape of the button                 |

## Other examples

```tsx
// Different appearances
<IconButton icon={AddIcon} label="Add new item" appearance="primary" />
<IconButton icon={InfoIcon} label="Show information" appearance="subtle" />
<IconButton icon={TrashIcon} label="Delete permanently" appearance="danger" />

// Different sizes
<IconButton icon={InfoIcon} label="Show information" appearance="subtle" spacing="compact" />

// Different shapes
<IconButton icon={InfoIcon} label="Show information" appearance="subtle" shape="circle" />

// Menu trigger
<IconButton
  icon={MoreIcon}
  label="Show more options"
  onClick={() => setShowMenu(true)}
/>
```

---

## link-button-examples

# LinkButton Component Examples

## Basic example

```tsx
import LinkButton from "@atlaskit/button/new";

<LinkButton href="/about" appearance="subtle">
	About Page
</LinkButton>;
```

## Key Props

| Prop         | Type                                                          | Description                               |
| ------------ | ------------------------------------------------------------- | ----------------------------------------- |
| `href`       | `string \| object`                                            | URL string or router configuration object |
| `appearance` | `'default' \| 'primary' \| 'subtle' \| 'warning' \| 'danger'` | Visual style of the button                |
| `target`     | `string`                                                      | Link target attribute                     |
| `isDisabled` | `boolean`                                                     | Removes href and adds aria-disabled       |

## Other examples

```tsx
// External link
<LinkButton
  href="https://atlassian.com"
  target="_blank"
  appearance="subtle"
>
  External Link
</LinkButton>

// Router integration
<LinkButton
  href={{
    to: '/about',
    replace: true,
  }}
>
  About Page
</LinkButton>

// Disabled link
<LinkButton isDisabled href="/unavailable">
  Unavailable Page
</LinkButton>

// Warning appearance
<LinkButton appearance="warning" href="/dangerous-action">
  Proceed with Caution
</LinkButton>
```

---

## split-button-examples

# Split Button Component Examples

## Basic example

```tsx
import SplitButton from "@atlaskit/button/new";

<SplitButton spacing="compact">
	<Button>Link work item</Button>
	<DropdownMenu shouldRenderToParent trigger={({ triggerRef, ...triggerProps }) => <IconButton ref={triggerRef} {...triggerProps} icon={ChevronDownIcon} label="More link work item options" />}>
		<DropdownItemGroup>
			<DropdownItem>Create new link</DropdownItem>
			<DropdownItem>Link existing item</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
</SplitButton>;
```

## Key Props

| Prop         | Type                     | Description                           |
| ------------ | ------------------------ | ------------------------------------- |
| `appearance` | `'default' \| 'primary'` | Applied to both Button and IconButton |
| `spacing`    | `'default' \| 'compact'` | Controls button spacing               |
| `isDisabled` | `boolean`                | Disables all child buttons            |

## Other examples

```tsx
// With custom button props
<SplitButton appearance="primary">
	<Button iconBefore={AddIcon} onClick={() => console.log("Primary action")}>
		Create Project
	</Button>
	<DropdownMenu shouldRenderToParent trigger={({ triggerRef, ...triggerProps }) => <IconButton ref={triggerRef} {...triggerProps} icon={ChevronDownIcon} label="More create project options" />}>
		<DropdownItemGroup>
			<DropdownItem>Create from template</DropdownItem>
			<DropdownItem>Import from file</DropdownItem>
			<DropdownItem>Clone existing</DropdownItem>
		</DropdownItemGroup>
	</DropdownMenu>
</SplitButton>
```

---

## banner-examples

# Banner Component Examples

## Basic example

```tsx
import Banner from "@atlaskit/banner";

<Banner appearance="announcement" isOpen={true}>
	System maintenance scheduled for tonight
</Banner>;
```

## Other examples

```tsx
// Error banner
<Banner appearance="error" isOpen={true}>
  Unable to connect to server
</Banner>

// Warning banner
<Banner appearance="warning" isOpen={true}>
  Data will be lost if you continue
</Banner>

// Banner with icon
import StatusWarningIcon from '@atlaskit/icon/core/status-warning';
<Banner
  appearance="warning"
  isOpen={true}
  icon={<StatusWarningIcon />}
>
  Critical security update required
</Banner>
```

---

## badge-examples

# Badge Component Examples

## Basic example

```tsx
import Badge from "@atlaskit/badge";

<Badge appearance="added">Badge</Badge>;
```

## Key Props

| Prop         | Type                                                    | Description                         |
| ------------ | ------------------------------------------------------- | ----------------------------------- |
| `appearance` | `'added' \| 'removed' \| 'moved' \| 'new' \| 'primary'` | Visual style of the badge           |
| `children`   | `ReactNode`                                             | Content to display inside the badge |

## Other examples

```tsx
// Online, success status
<Badge appearance="added">Online</Badge>

// Offline status
<Badge appearance="removed">Offline</Badge>

// Away status
<Badge appearance="moved">Away</Badge>

// Busy status
<Badge appearance="new">Busy</Badge>

// Notification count
<Badge appearance="primary">5</Badge>
```

---

## checkbox-examples

# Checkbox Component Examples

## Basic example

```tsx
import { Checkbox } from "@atlaskit/checkbox";

<Checkbox label="Accept terms and conditions" value="terms" name="agreement" onChange={handleChange} />;
```

## Other examples

```tsx
// Controlled checkbox
const [isChecked, setIsChecked] = useState(false);
<Checkbox
  label="Controlled checkbox"
  value="controlled"
  name="controlled"
  isChecked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

// Uncontrolled with default checked
<Checkbox
  label="Checked by default"
  value="default"
  name="default"
  defaultChecked
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

// Invalid checkbox
<Checkbox
  label="Invalid option"
  value="invalid"
  name="options"
  isInvalid
  onChange={handleChange}
/>

// Indeterminate checkbox (select all)
<Checkbox
  label="Select all"
  value="all"
  name="selectAll"
  isIndeterminate={someSelected && !allSelected}
  isChecked={allSelected}
  onChange={handleSelectAll}
/>

// Checkbox group
<div>
  <Checkbox
    label="Email notifications"
    value="email"
    name="notifications"
    onChange={handleChange}
  />
  <Checkbox
    label="SMS notifications"
    value="sms"
    name="notifications"
    onChange={handleChange}
  />
  <Checkbox
    label="Push notifications"
    value="push"
    name="notifications"
    onChange={handleChange}
  />
</div>
```

---

## progress-bar-examples

# Progress Bar Component Examples

## Basic example

```tsx
import ProgressBar from "@atlaskit/progress-bar";

<ProgressBar value={0.5} ariaLabel="Task progress: 50% complete" />;
```

## Other examples

```tsx
// Indeterminate loading
<ProgressBar isIndeterminate ariaLabel="Loading data" />

// Success state
<ProgressBar
  value={1}
  appearance="success"
  ariaLabel="Upload complete"
/>

// File upload progress
<ProgressBar
  value={0.75}
  ariaLabel="Uploading file: 75% complete"
/>

// Form submission progress
<ProgressBar
  value={0.33}
  ariaLabel="Saving changes: 1 of 3 steps complete"
/>

// Installation progress
<ProgressBar
  value={0.8}
  ariaLabel="Installing updates: 80% complete"
/>

// Dark theme (inverse)
<ProgressBar
  value={0.6}
  appearance="inverse"
  ariaLabel="Processing: 60% complete"
/>
```

---

## radio-examples

# Radio Component Examples

## Basic example

```tsx
import { Radio, RadioGroup } from "@atlaskit/radio";

<Radio value="option1" label="Option 1" name="choices" onChange={handleChange} />;
```

## Other examples

```tsx
// Radio group with options
const options = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue' },
  { name: 'color', value: 'green', label: 'Green' },
  { name: 'color', value: 'yellow', label: 'Yellow' }
];

<RadioGroup
  options={options}
  defaultValue="blue"
  onChange={handleChange}
/>

// Controlled radio group
const [value, setValue] = useState('red');
<RadioGroup
  options={options}
  value={value}
  onChange={(e) => setValue(e.currentTarget.value)}
/>

// Disabled radio
<Radio
  value="disabled"
  label="Disabled option"
  name="options"
  isDisabled
  onChange={handleChange}
/>

// Invalid radio
<Radio
  value="invalid"
  label="Invalid option"
  name="options"
  isInvalid
  onChange={handleChange}
/>

// Required radio
<Radio
  value="required"
  label="Required option"
  name="options"
  isRequired
  onChange={handleChange}
/>

// Size selection
<RadioGroup
  options={[
    { name: 'size', value: 'xs', label: 'Extra Small' },
    { name: 'size', value: 'sm', label: 'Small' },
    { name: 'size', value: 'md', label: 'Medium' },
    { name: 'size', value: 'lg', label: 'Large' },
    { name: 'size', value: 'xl', label: 'Extra Large' }
  ]}
  defaultValue="md"
  onChange={handleSizeChange}
/>

// Payment method selection
<RadioGroup
  options={[
    { name: 'payment', value: 'credit', label: 'Credit Card' },
    { name: 'payment', value: 'debit', label: 'Debit Card' },
    { name: 'payment', value: 'paypal', label: 'PayPal' },
    { name: 'payment', value: 'bank', label: 'Bank Transfer' }
  ]}
  onChange={handlePaymentChange}
/>
```

---

## tabs-examples

# Tabs Component Examples

## Basic example

```tsx
import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";

<Tabs>
	<TabList>
		<Tab>Overview</Tab>
		<Tab>Details</Tab>
	</TabList>
	<TabPanel>Overview content</TabPanel>
	<TabPanel>Details content</TabPanel>
</Tabs>;
```

## Other examples

```tsx
// Controlled tabs
const [selectedTab, setSelectedTab] = useState(0);
<Tabs selected={selectedTab} onChange={setSelectedTab}>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanel>Tab 1 content</TabPanel>
  <TabPanel>Tab 2 content</TabPanel>
  <TabPanel>Tab 3 content</TabPanel>
</Tabs>

// Settings tabs
<Tabs>
  <TabList>
    <Tab>General</Tab>
    <Tab>Notifications</Tab>
    <Tab>Privacy</Tab>
    <Tab>Security</Tab>
  </TabList>
  <TabPanel>
    <h3>General Settings</h3>
    <p>Configure general preferences</p>
  </TabPanel>
  <TabPanel>
    <h3>Notification Settings</h3>
    <p>Manage your notification preferences</p>
  </TabPanel>
  <TabPanel>
    <h3>Privacy Settings</h3>
    <p>Control your privacy options</p>
  </TabPanel>
  <TabPanel>
    <h3>Security Settings</h3>
    <p>Manage your security settings</p>
  </TabPanel>
</Tabs>

// Data view tabs
<Tabs>
  <TabList>
    <Tab>Table View</Tab>
    <Tab>Chart View</Tab>
    <Tab>List View</Tab>
  </TabList>
  <TabPanel>
    <table>Table content</table>
  </TabPanel>
  <TabPanel>
    <div>Chart content</div>
  </TabPanel>
  <TabPanel>
    <ul>List content</ul>
  </TabPanel>
</Tabs>

// Form sections
<Tabs>
  <TabList>
    <Tab>Personal Info</Tab>
    <Tab>Contact Details</Tab>
    <Tab>Preferences</Tab>
  </TabList>
  <TabPanel>
    <form>
      <input placeholder="First Name" />
      <input placeholder="Last Name" />
    </form>
  </TabPanel>
  <TabPanel>
    <form>
      <input placeholder="Email" />
      <input placeholder="Phone" />
    </form>
  </TabPanel>
  <TabPanel>
    <form>
      <input placeholder="Language" />
      <input placeholder="Timezone" />
    </form>
  </TabPanel>
</Tabs>
```

---

## tooltip-examples

# Tooltip Component Examples

## Basic example

```tsx
import Tooltip from "@atlaskit/tooltip";

<Tooltip content="Save document">
	<IconButton icon={SaveIcon} label="Save" />
</Tooltip>;
```

## Key Props

| Prop       | Type                                     | Description                       |
| ---------- | ---------------------------------------- | --------------------------------- |
| `content`  | `ReactNode`                              | Content to display in the tooltip |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | Position of the tooltip           |
| `children` | `ReactNode`                              | Element that triggers the tooltip |

## Other examples

```tsx
// Different positions
<Tooltip content="Top tooltip" position="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <button>Right</button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</Tooltip>

// Rich content tooltip
<Tooltip content={
  <div>
    <strong>Keyboard shortcut:</strong><br />
    Cmd + S (Mac) or Ctrl + S (Windows)
  </div>
}>
  <IconButton icon={SaveIcon} label="Save" />
</Tooltip>

// Multi-line tooltip
<Tooltip content={
  <div>
    <div>Click to expand</div>
    <div style={{ font: token('font.body.small'), color: token('color.text.subtle') }}>
      Shows additional options
    </div>
  </div>
}>
  <IconButton icon={ExpandIcon} label="Expand" />
</Tooltip>
```

---

## icon-examples

# Icon Component Examples

## Basic example

```tsx
import AddIcon from "@atlaskit/icon/core/add";

<AddIcon label="Add item" />;
```

## Key Props

| Prop    | Type                             | Description                         |
| ------- | -------------------------------- | ----------------------------------- |
| `label` | `string`                         | Accessible label for screen readers |
| `size`  | `'small' \| 'medium' \| 'large'` | Size of the icon                    |
| `color` | `string`                         | Color of the icon                   |

## Other examples

```tsx
// Basic icon with small size
<AddIcon label="Add item" size="small" />;

// Icon with custom color
import { token } from "@atlaskit/tokens";
<AddIcon label="Add item" color={token("color.icon.danger")} />;

// Icon in button
import Button from "@atlaskit/button/new";
<Button iconBefore={AddIcon}>Create</Button>;

// Icon in text field
import Textfield from "@atlaskit/textfield";
<Textfield placeholder="Search..." elemBeforeInput={<SearchIcon label="search" />} />;

// More menu icon
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
<ShowMoreHorizontalIcon label="More options" />;
```

---

## icon-tile-examples

# IconTile Component Examples

## Basic example

```tsx
import { IconTile } from "@atlaskit/icon";
import AddIcon from "@atlaskit/icon/core/add";

<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="24" />;
```

## Key Props

| Prop         | Type                                               | Description                         |
| ------------ | -------------------------------------------------- | ----------------------------------- |
| `icon`       | `ReactNode`                                        | Icon component to display           |
| `label`      | `string`                                           | Accessible label for screen readers |
| `appearance` | `'blue' \| 'green' \| 'red' \| 'yellow' \| 'gray'` | Color appearance                    |
| `shape`      | `'circle' \| 'square'`                             | Shape of the tile                   |
| `size`       | `'16' \| '24' \| '32' \| '40' \| '48'`             | Size in pixels                      |

## Other examples

```tsx
// Different shapes and sizes
<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="square" size="32" />
<IconTile icon={AddIcon} label="Add icon" appearance="blue" shape="circle" size="48" />

// Different appearances
<IconTile icon={StatusSuccessIcon} label="Success status" appearance="green" />
<IconTile icon={StatusErrorIcon} label="Error status" appearance="red" />
<IconTile icon={StatusWarningIcon} label="Warning status" appearance="yellow" />

// Bold appearances for high emphasis
<IconTile icon={PriorityHighIcon} label="High priority" appearance="redBold" />
<IconTile icon={StarIcon} label="Star decoration" appearance="yellowBold" />

// Status indicators
<IconTile icon={UserIcon} label="User online" appearance="green" shape="circle" size="24" />
<IconTile icon={UserIcon} label="User busy" appearance="yellow" shape="circle" size="24" />
<IconTile icon={UserIcon} label="User offline" appearance="gray" shape="circle" size="24" />

// Category indicators
<IconTile icon={BugIcon} label="Bug issue" appearance="red" shape="square" size="24" />
<IconTile icon={FeatureIcon} label="Feature request" appearance="blue" shape="square" size="24" />
<IconTile icon={TaskIcon} label="Task item" appearance="green" shape="square" size="24" />
```

---

## skeleton-examples

# Skeleton Component Examples

## Basic example

```tsx
import Skeleton from "@atlaskit/skeleton";

<Skeleton height="20px" width="200px" />;
```

## Other examples

```tsx
// Text line skeleton
<Skeleton height="16px" width="150px" />

// Card skeleton
<div>
  <Skeleton height="120px" width="100%" />
  <Skeleton height="16px" width="80%" />
  <Skeleton height="16px" width="60%" />
</div>

// List item skeleton
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Skeleton height="40px" width="40px" />
  <div>
    <Skeleton height="16px" width="120px" />
    <Skeleton height="14px" width="80px" />
  </div>
</div>

// Table skeleton
<div>
  <Skeleton height="20px" width="100%" />
  <Skeleton height="20px" width="100%" />
  <Skeleton height="20px" width="100%" />
</div>

// Button skeleton
<Skeleton height="32px" width="80px" />

// Avatar skeleton
<Skeleton height="40px" width="40px" />

// Disable shimmer animation
<Skeleton height="20px" width="200px" isShimmering={false} />
```

---

## tag-examples

# Tag Component Examples

## Basic example

```tsx
import Tag from "@atlaskit/tag";

<Tag text="React" />;
```

## Other examples

```tsx
// Rounded appearance
<Tag text="Design" appearance="rounded" />

// Colored tags
<Tag text="Bug" color="red" />
<Tag text="Feature" color="blue" />
<Tag text="Enhancement" color="green" />

// Status tags
<Tag text="Active" color="green" />
<Tag text="Inactive" color="gray" />
<Tag text="Pending" color="yellow" />

// Category tags
<Tag text="Frontend" />
<Tag text="Backend" />
<Tag text="Database" />

// Priority tags
<Tag text="High" color="red" />
<Tag text="Medium" color="yellow" />
<Tag text="Low" color="green" />

// Technology tags
<Tag text="JavaScript" />
<Tag text="TypeScript" />
<Tag text="Python" />

// Grouped tags
<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
  <Tag text="React" />
  <Tag text="TypeScript" />
  <Tag text="Frontend" />
</div>
```

---

## textarea-examples

# TextArea Component Examples

## Basic example

```tsx
import TextArea from "@atlaskit/textarea";

<TextArea placeholder="Enter your message" resize="auto" maxHeight="200px" />;
```

## Other examples

```tsx
// Comment textarea
<TextArea
  placeholder="Add a comment..."
  resize="auto"
  maxHeight="150px"
  name="comment"
/>

// Feedback form
<TextArea
  placeholder="Please describe your experience"
  resize="vertical"
  rows={5}
  name="feedback"
/>

// Disabled textarea
<TextArea
  placeholder="This field is disabled"
  isDisabled
  rows={3}
/>

// Required textarea
<TextArea
  placeholder="Enter description (required)"
  isRequired
  rows={4}
  name="description"
/>

// Controlled textarea
const [value, setValue] = useState('');
<TextArea
  placeholder="Enter your message"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  resize="auto"
  maxHeight="200px"
/>

// Default value
<TextArea
  placeholder="Enter your message"
  defaultValue="This is the default content"
  resize="auto"
  rows={4}
/>

// No resize
<TextArea
  placeholder="Fixed size textarea"
  resize="none"
  rows={3}
/>

// Horizontal resize only
<TextArea
  placeholder="Horizontal resize only"
  resize="horizontal"
  rows={3}
/>
```

---

## toggle-examples

# Toggle Component Examples

## Basic example

```tsx
import Toggle from "@atlaskit/toggle";

<Toggle id="notifications" label="Enable notifications" isChecked={false} onChange={handleChange} />;
```

## Other examples

```tsx
// Controlled toggle
const [isEnabled, setIsEnabled] = useState(false);
<Toggle
  id="feature"
  label="Enable new feature"
  isChecked={isEnabled}
  onChange={(e) => setIsEnabled(e.target.checked)}
/>

// Disabled toggle
<Toggle
  id="disabled"
  label="Disabled option"
  isDisabled
  onChange={handleChange}
/>

// Settings toggles
<div>
  <Toggle
    id="email-notifications"
    label="Email notifications"
    isChecked={emailEnabled}
    onChange={handleEmailToggle}
  />
  <Toggle
    id="push-notifications"
    label="Push notifications"
    isChecked={pushEnabled}
    onChange={handlePushToggle}
  />
  <Toggle
    id="sms-notifications"
    label="SMS notifications"
    isChecked={smsEnabled}
    onChange={handleSmsToggle}
  />
</div>

// Feature flags
<Toggle
  id="dark-mode"
  label="Dark mode"
  isChecked={darkModeEnabled}
  onChange={handleDarkModeToggle}
/>

// Privacy settings
<Toggle
  id="analytics"
  label="Allow analytics tracking"
  isChecked={analyticsEnabled}
  onChange={handleAnalyticsToggle}
/>

// Mode switching
<Toggle
  id="edit-mode"
  label="Edit mode"
  isChecked={editModeEnabled}
  onChange={handleEditModeToggle}
/>
```

---

## navigation-examples

# Navigation Component Examples

## Basic example

```tsx
import { LinkMenuItem } from "@atlaskit/navigation-system/side-nav-items/link-menu-item";

<LinkMenuItem href="/dashboard" elemBefore={<DashboardIcon label="" />} isSelected={currentPath === "/dashboard"}>
	Dashboard
</LinkMenuItem>;
```

## Key Props

| Prop         | Type         | Description                        |
| ------------ | ------------ | ---------------------------------- |
| `href`       | `string`     | URL for navigation (LinkMenuItem)  |
| `onClick`    | `() => void` | Click handler (ButtonMenuItem)     |
| `elemBefore` | `ReactNode`  | Icon or element before text        |
| `isSelected` | `boolean`    | Whether item is currently selected |

## Other examples

```tsx
// Button menu item for actions
import { ButtonMenuItem } from "@atlaskit/navigation-system/side-nav-items/button-menu-item";

<ButtonMenuItem onClick={handleAction} elemBefore={<AddIcon label="" />} isSelected={isModalOpen}>
	Create Project
</ButtonMenuItem>;

// Flyout menu item for hierarchical navigation
import { FlyoutMenuItem, FlyoutMenuItemContent, FlyoutMenuItemTrigger } from "@atlaskit/navigation-system/side-nav-items/flyout-menu-item";

<FlyoutMenuItem>
	<FlyoutMenuItemTrigger elemBefore={<ProjectIcon label="" />}>Projects</FlyoutMenuItemTrigger>
	<FlyoutMenuItemContent>
		<MenuList>
			<LinkMenuItem href="/projects/web-app">Web Application</LinkMenuItem>
			<LinkMenuItem href="/projects/mobile-app">Mobile Application</LinkMenuItem>
		</MenuList>
	</FlyoutMenuItemContent>
</FlyoutMenuItem>;

// Expandable menu item
import { ExpandableMenuItem, ExpandableMenuItemContent, ExpandableMenuItemTrigger } from "@atlaskit/navigation-system/side-nav-items/expandable-menu-item";

<ExpandableMenuItem>
	<ExpandableMenuItemTrigger elemBefore={<ProjectIcon label="" />}>Projects</ExpandableMenuItemTrigger>
	<ExpandableMenuItemContent>
		<MenuSection isMenuListItem>
			<MenuSectionHeading>Starred</MenuSectionHeading>
			<LinkMenuItem elemBefore={<Avatar label="" size="xsmall" />}>Teams</LinkMenuItem>
		</MenuSection>
	</ExpandableMenuItemContent>
</ExpandableMenuItem>;

// Complete navigation structure
import { SideNavContent, MenuList } from "@atlaskit/navigation-system";

<SideNavContent>
	<MenuList>
		<LinkMenuItem href="/" elemBefore={<HomeIcon label="" />} isSelected={currentPath === "/"}>
			Overview
		</LinkMenuItem>
		<ButtonMenuItem onClick={handleAction} elemBefore={<SettingsIcon label="" />} isSelected={activeSection === "settings"}>
			Settings
		</ButtonMenuItem>
	</MenuList>
</SideNavContent>;
```

---

## lozenge-examples

# Lozenge Component Examples

## Basic example

```tsx
import Lozenge from "@atlaskit/lozenge";

<Lozenge appearance="success">Done</Lozenge>;
```

## Key Props

| Prop         | Type                                                         | Description                           |
| ------------ | ------------------------------------------------------------ | ------------------------------------- |
| `appearance` | `'success' \| 'inprogress' \| 'removed' \| 'new' \| 'moved'` | Visual style of the lozenge           |
| `isBold`     | `boolean`                                                    | Use bold styling for emphasis         |
| `children`   | `ReactNode`                                                  | Content to display inside the lozenge |

## Other examples

```tsx
// Different status appearances
<Lozenge appearance="inprogress">In Progress</Lozenge>
<Lozenge appearance="removed">Error</Lozenge>
<Lozenge appearance="new">New</Lozenge>

// Bold styling for emphasis
<Lozenge appearance="success" isBold>Active</Lozenge>
<Lozenge appearance="removed" isBold>Critical</Lozenge>
<Lozenge appearance="inprogress" isBold>Processing</Lozenge>
```

---

## tooltip-examples

# Tooltip Component Examples

## Basic example

```tsx
import Tooltip from "@atlaskit/tooltip";

<Tooltip content="Save document">
	<IconButton icon={SaveIcon} label="Save" />
</Tooltip>;
```

## Key Props

| Prop       | Type                                     | Description                       |
| ---------- | ---------------------------------------- | --------------------------------- |
| `content`  | `ReactNode`                              | Content to display in the tooltip |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | Position of the tooltip           |
| `children` | `ReactNode`                              | Element that triggers the tooltip |

## Other examples

```tsx
// Different positions
<Tooltip content="Top tooltip" position="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <button>Right</button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</Tooltip>

// Rich content tooltip
<Tooltip content={
  <div>
    <strong>Keyboard shortcut:</strong><br />
    Cmd + S (Mac) or Ctrl + S (Windows)
  </div>
}>
  <IconButton icon={SaveIcon} label="Save" />
</Tooltip>

// Multi-line tooltip
<Tooltip content={
  <div>
    <div>Click to expand</div>
    <div style={{ font: token('font.body.small'), color: token('color.text.subtle') }}>
      Shows additional options
    </div>
  </div>
}>
  <IconButton icon={ExpandIcon} label="Expand" />
</Tooltip>
```

---

## text-examples

# Text Component Examples

## Basic example

```tsx
import { Text } from "@atlaskit/primitives";

<Text size="large">Body text</Text>;
```

## Key Props

| Prop     | Type                               | Description              |
| -------- | ---------------------------------- | ------------------------ |
| `size`   | `'small' \| 'medium' \| 'large'`   | Size of the text         |
| `weight` | `'normal' \| 'semibold' \| 'bold'` | Font weight of the text  |
| `color`  | `string`                           | Color token for the text |

## Other examples

```tsx
// Different sizes
<Text size="small">Small text</Text>
<Text size="medium">Medium text</Text>
<Text size="large">Large text</Text>

// Different weights
<Text weight="semibold">Semibold text</Text>
<Text weight="bold">Bold text</Text>

// Colored text
<Text weight="semibold" color="color.text.accent.purple.bolder">
  Colored text
</Text>

// ❌ Wrong - don't use `as` prop
<Text size="large" as="h1">Body text</Text>

// ✅ Right - use proper heading component
<Text size="large">Body text</Text>
```

---

## color-examples

# Color Token Examples

## Basic example

```tsx
import { token } from "@atlaskit/tokens";

<div style={{ backgroundColor: token("elevation.surface") }} />;
```

## Key Props

| Prop                  | Type       | Description                                   |
| --------------------- | ---------- | --------------------------------------------- |
| `token()`             | `function` | Function to access design system color tokens |
| `'elevation.surface'` | `string`   | Token name for background colors              |
| `'color.text'`        | `string`   | Token name for text colors                    |

## Other examples

```tsx
// Background colors
<div style={{ backgroundColor: token('elevation.surface') }} />

// Text colors
<div style={{ color: token('color.text') }} />

// Avoid direct Tailwind classes
// ❌ <div className="bg-blue-100" />
// ❌ <div className="text-black" />
```

---

## radius-examples

# Radius Token Examples

## Basic example

```tsx
import { token } from "@atlaskit/tokens";

<div style={{ borderRadius: token("radius.small") }} />;
```

## Key Props

| Prop              | Type       | Description                                    |
| ----------------- | ---------- | ---------------------------------------------- |
| `token()`         | `function` | Function to access design system radius tokens |
| `'radius.small'`  | `string`   | Small border radius                            |
| `'radius.medium'` | `string`   | Medium border radius                           |
| `'radius.large'`  | `string`   | Large border radius                            |

## Other examples

```tsx
// Small radius for buttons
<div style={{ borderRadius: token('radius.small') }} />

// Medium radius for cards
<div style={{ borderRadius: token('radius.medium') }} />

// Large radius for modals
<div style={{ borderRadius: token('radius.large') }} />
```

---

## spacing-examples

# Spacing Token Examples

## Basic example

```tsx
import { token } from "@atlaskit/tokens";

<div style={{ padding: token("space.200") }}>Content here</div>;
```

## Key Props

| Prop          | Type       | Description                                     |
| ------------- | ---------- | ----------------------------------------------- |
| `token()`     | `function` | Function to access design system spacing tokens |
| `'space.100'` | `string`   | 8px spacing                                     |
| `'space.150'` | `string`   | 12px spacing                                    |
| `'space.200'` | `string`   | 16px spacing                                    |

## Other examples

```tsx
// Container with consistent spacing
<div style={{
  padding: token('space.200'),
  margin: token('space.100'),
  gap: token('space.150')
}}>
  Content here
</div>

// Button spacing
<button style={{ padding: token('space.100') }}>
  Click me
</button>

// List item spacing
<li style={{ marginBottom: token('space.150') }}>
  List item
</li>
```

---
