# framer-tidy

## Maximize configurability using `addPropertyControls` for a polished experience.

### Core Principles

- **Granularity**: Expose all visual styles (colors, padding, radius, shadows) using their specific ControlTypes.
- **Grouping**: Use `ControlType.Object` to group related props (e.g., `styleObject`, `animObject`) to keep the UI clean.
- **Clarity**: Use clear titles (Sentence case), sensible `defaultValue`s, and `description` fields.
- **Connectivity**: Use `ComponentInstance` for slots and `Array` for lists or multiple connections.

### Steps to add property controls

1. Use Context7 to reference the latest Framer documentation on Property Controls and Auto-Sizing:

- https://www.framer.com/developers/property-controls
- https://www.framer.com/developers/auto-sizing

2. Audit the code for comprehensive property exposure:

- **Analyze the component code** to identify all visual styles, animation properties, and expose them as controls.
- Ensure specific property uses their dedicated ControlTypes:
  - `ControlType.Color`: For any color properties (backgrounds, text, fills).
  - `ControlType.Padding`: For spacing inside containers.
  - `ControlType.BorderRadius`: For corner rounding.
  - `ControlType.BoxShadow`: For drop shadows and inner shadows.
  - `ControlType.Border`: For border width, color, and style.
  - `ControlType.Cursor`: For hover interactions (e.g., `pointer`, `grab`).
  - `ControlType.Link`: For any interactive elements requiring navigation.
  - `ControlType.Date`: For any timestamp or calendar data.
  - `ControlType.Transition`: For animations and transitions, or grouped objects with `icon: "effect"`.

3. Leverage connectivity and lists with `Array` and `ComponentInstance`:

- Use `ControlType.ComponentInstance` to allow connecting to other Frames on the canvas (e.g., for content slots, overlays, or navigation targets).
- Use `ControlType.Array` wrapping `ControlType.ComponentInstance` when multiple connections are needed (e.g., carousels, grids, feeds).
- Use `ControlType.Array` for iterating over data lists (e.g., feature lists, testimonials, menu items).

4. Refine control definitions and grouping:

- Group logically related properties (e.g. padding, radius, icons) into `Object` controls for a tidy, nested UI.
  - Add an optional `icon` property (e.g., "color", "effect", "interact") to `Object` controls for better visual recognition.
- Ensure hidden callbacks correctly reference nested props (e.g. `hidden: (props) => !props.snapObject?.snap`).
- Prefer `Enum` controls using `displaySegmentedControl: true` for directional, toggle, or choice-based props.
- Use `optionIcons` for `Enum` controls to improve alignment and directional controls (e.g., for vertical alignment `align-top`, `align-middle`, `align-bottom`) and (e.g., for horizontal alignment `align-left`, `align-center`, `align-right`).
- Replace dropdown enums with `segmentedControlDirection: vertical` where multiple visual options fit better vertically.
- Prefer `ControlType.ResponsiveImage` over `ControlType.Image` for better asset optimization and handling.

5. Refactor for clarity and consistency:

- Use `ControlType.Font` with `controls: "extended"` or `displayFontSize: true` for comprehensive typography settings.
- Group Font and Color controls into a single `styleObject` or `fontObject` if they change together.
- Keep text content (`title`, `label`, `value`, `placeholder`) as top-level controls for easier variable binding.
- Use spread syntax (e.g., `...paddingControl`, `...radiusControl`) from shared utilities for consistent standard controls.
- Move layout-related props (sizing, snapping, alignment) into dedicated grouped objects.

6. Enhance user experience and polish:

- Use `optional: true` for aesthetic or advanced groups (e.g. shadows, animation).

  - Ensure all property controls provide smart `defaultValue`s that reflect the component's intended initial state.
  - Eliminate `defaultProps`. Define default values in the component's destructured props and ensure the `defaultValue` in `addPropertyControls` matches it.
  - Add sensible `defaultValue`, `min`, `max`, and `unit` fields for all numeric controls.
  - Use `displayStepper: true` for `ControlType.Number` when the range is small (e.g. 0-10) to allow easy incrementing.
  - Add a `description` property to the _last_ property control in the list to include a brief description of this code component.

- Ensure naming consistency and clean UI presentation:
  - Ensure property control keys use camelCase (e.g. `tagTheme`) for clean code references.
  - Use sentence case for the `title` field (e.g. `Tag theme`) to ensure readability in the Framer UI.
  - Make sure the label use in camelCase are exactly the same as the sentence case (e.g. `tagTheme` vs `Tag theme`). The only difference is camelCase doesn't have the spacing.
- Use TypeScript Enums and `Object.values()` for `Enum` options to ensure type safety and reduce duplication.
- Maintain alphabetic order or logical visual grouping in property registration.

7. Validate component layout responsiveness:

- Confirm the component respects `auto`, `stretch`, and `fixed` sizing behaviors.
- Apply proper Framer auto-sizing configuration to support both “hug” and “fill” scenarios.
- Verify auto-sizing annotations (`@framerSupportedLayoutWidth`, `@framerSupportedLayoutHeight`) match component intent.

### Comprehensive Example

```tsx
import { addPropertyControls, ControlType } from "framer";

addPropertyControls(MyComponent, {
	// 1. Content & Basics
	title: {
		type: ControlType.String,
		title: "Title",
		defaultValue: "Hello World",
		placeholder: "Enter title...",
		displayTextArea: true, // Multi-line support
	},
	link: {
		type: ControlType.Link,
		title: "Link",
	},

	// 2. Visual Styles (Use specific ControlTypes)
	color: {
		type: ControlType.Color,
		title: "Color",
		defaultValue: "#0099FF",
	},
	// Prefer ResponsiveImage for better optimization
	image: {
		type: ControlType.ResponsiveImage,
		title: "Image",
		allowedFileTypes: ["jpg", "png", "svg"],
	},

	// 3. Layout & Spacing (Grouped)
	layout: {
		type: ControlType.Object,
		title: "Layout",
		controls: {
			padding: { type: ControlType.Padding, title: "Padding", defaultValue: 20 },
			radius: { type: ControlType.BorderRadius, title: "Radius", defaultValue: 8 },
			gap: {
				type: ControlType.Number,
				title: "Gap",
				min: 0,
				max: 100,
				displayStepper: true,
				defaultValue: 10,
			},
		},
	},

	// 4. Typography (Extended options)
	font: {
		type: ControlType.Font,
		title: "Typography",
		controls: "extended", // Shows weight, style, etc.
		displayFontSize: true,
		defaultFontType: "sans-serif",
		defaultValue: {
			fontSize: 16,
			lineHeight: "1.4em",
		},
	},

	// 5. Interactive & Advanced Groups
	interaction: {
		type: ControlType.Object,
		title: "Interaction",
		icon: "interact", // "color" | "effect" | "interact"
		controls: {
			cursor: {
				type: ControlType.Cursor,
				title: "Cursor",
				defaultValue: "pointer",
			},
			onTap: { type: ControlType.EventHandler },
			hover: {
				type: ControlType.Boolean,
				title: "Hover Effect",
				enabledTitle: "On",
				disabledTitle: "Off",
				defaultValue: true,
			},
		},
	},

	// 6. Enums with Icons (Visual choices)
	align: {
		type: ControlType.Enum,
		title: "Align",
		options: ["left", "center", "right"],
		optionIcons: ["align-left", "align-center", "align-right"],
		displaySegmentedControl: true,
		defaultValue: "center",
	},

	// 7. Lists & Connections
	items: {
		type: ControlType.Array,
		title: "List Items",
		control: {
			type: ControlType.Object,
			controls: {
				title: { type: ControlType.String },
				date: { type: ControlType.Date },
				icon: { type: ControlType.Icon },
			},
		},
		maxCount: 6,
	},
	slots: {
		type: ControlType.Array,
		title: "Children",
		control: { type: ControlType.ComponentInstance },
		maxCount: 5,
	},

	// 8. Effects & Transitions
	effect: {
		type: ControlType.Object,
		title: "Effect",
		icon: "effect",
		optional: true, // Adds a toggle switch for the whole group
		controls: {
			shadow: {
				type: ControlType.BoxShadow,
				title: "Shadow",
				defaultValue: "0px 2px 4px rgba(0,0,0,0.1)",
			},
			transition: {
				type: ControlType.Transition,
				title: "Transition",
			},
		},
	},
});
```

### Best Practices Checklist

1. [ ] **Specific Types**: Use `Color`, `Padding`, `BorderRadius`, `BoxShadow` instead of generic numbers/strings.
2. [ ] **Objects**: Group related props (e.g., `layout`, `style`, `animation`) with `ControlType.Object`.
3. [ ] **Icons**: Use `optionIcons` for Enums and `icon` property for Objects to improve visual scanning.
4. [ ] **Defaults**: Use `defaultValue` in controls instead of `defaultProps`. Set sensible `min`, `max`, and `step` for numbers.
5. [ ] **Descriptions**: Add a `description` to top-level or complex controls for inline documentation.
6. [ ] **Hiding**: Use `hidden: (props) => ...` to show/hide controls based on other prop values.
