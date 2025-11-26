// Auto-complete text input with tag conversion on Tab key press
import React, { useState, useRef, useEffect, startTransition, useId, useMemo, type CSSProperties } from "react";
import { addPropertyControls, ControlType } from "framer";
import { useSearchStore, ATLASSIAN_SKILLS, TagProps } from "./Store.tsx";

interface SuggestionProps {
	text: string;
	icon: string;
	iconColor: string;
}

interface ComposerProps {
	style?: CSSProperties;
	placeholder?: string;
	suggestions?: SuggestionProps[];
	inputTheme?: {
		textColor: string;
		placeholderColor: string;
		suggestionTextColor: string;
		font: {
			fontSize: string;
			variant: string;
			letterSpacing: string;
			lineHeight: string;
		};
	};
	tagTheme?: {
		backgroundColor: string;
		textColor: string;
		slashColor: string;
		slashWidth: number;
		skewAngle: number;
		font: {
			fontSize: string;
			variant: string;
			letterSpacing: string;
			lineHeight: string;
		};
	};
	spacing?: {
		tagGap: number;
		tagPadding: string;
		tagMarginRight: number;
		tagMarginBottom: number;
		iconGap: number;
	};
	sizing?: {
		tagHeight: number;
		iconSize: number;
		containerMinHeight: number;
		inputMinWidth: number;
	};
	styling?: {
		tagBorderRadius: number;
		containerCursor: string;
		tagCursor: string;
	};
	focus?: {
		outlineColor: string;
		outlineWidth: number;
		outlineOffset: number;
	};
}

/**
 * Auto-complete Input with Tag Conversion
 *
 * @framerIntrinsicWidth 344
 * @framerIntrinsicHeight 20
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function Composer(props: ComposerProps) {
	const {
		placeholder = "Type something...",
		suggestions = ATLASSIAN_SKILLS.map((s) => ({
			text: s.title,
			icon: s.icon,
			iconColor: s.iconColor,
		})),
		inputTheme = {
			textColor: "#000000",
			placeholderColor: "#999999",
			suggestionTextColor: "#CCCCCC",
			font: {
				fontSize: "14px",
				variant: "Regular",
				letterSpacing: "0",
				lineHeight: "20px",
			},
		},
		tagTheme = {
			backgroundColor: "#EEEEEE",
			textColor: "#000000",
			slashColor: "transparent",
			slashWidth: 4,
			skewAngle: -10,
			font: {
				fontSize: "14px",
				variant: "Regular",
				letterSpacing: "0",
				lineHeight: "20px",
			},
		},
		spacing = {
			tagGap: 6,
			tagPadding: "0 8px",
			tagMarginRight: 8,
			tagMarginBottom: 2,
			iconGap: 6,
		},
		sizing = {
			tagHeight: 20,
			iconSize: 12,
			containerMinHeight: 20,
			inputMinWidth: 4,
		},
		styling = {
			tagBorderRadius: 4,
			containerCursor: "text",
			tagCursor: "pointer",
		},
		focus = {
			outlineColor: "rgba(0, 123, 255, 0.5)",
			outlineWidth: 2,
			outlineOffset: 2,
		},
	} = props;

	const [inputValue, setInputValue] = useState("");
	const [tags, setTags] = useState<TagProps[]>([]);
	const [suggestion, setSuggestion] = useState<SuggestionProps | null>(null);
	const [hasWrapping, setHasWrapping] = useState(false);
	const inputRef = useRef<HTMLSpanElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [store, setStore] = useSearchStore();
	const id = useId();
	const uniqueClass = useMemo(() => `composer-${id.replace(/:/g, "")}`, [id]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	// Sync contentEditable with state
	useEffect(() => {
		if (inputRef.current && inputRef.current.textContent !== inputValue) {
			inputRef.current.textContent = inputValue;
			// Move cursor to end
			const range = document.createRange();
			const sel = window.getSelection();
			range.selectNodeContents(inputRef.current);
			range.collapse(false);
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}, [inputValue]);

	useEffect(() => {
		if (inputValue.length > 0) {
			const match = suggestions.find((s) => s.text.toLowerCase().startsWith(inputValue.toLowerCase()));
			if (match) {
				startTransition(() => setSuggestion(match));
			} else {
				startTransition(() => setSuggestion(null));
			}
		} else {
			startTransition(() => setSuggestion(null));
		}
	}, [inputValue, suggestions]);

	// Check if content is wrapping to multiple lines
	useEffect(() => {
		const checkWrapping = () => {
			if (containerRef.current) {
				const range = document.createRange();
				range.selectNodeContents(containerRef.current);
				const rect = range.getBoundingClientRect();
				const isMultiLine = rect.height > sizing.containerMinHeight + 2;
				setHasWrapping(isMultiLine);
			}
		};

		const rAF = requestAnimationFrame(checkWrapping);
		return () => cancelAnimationFrame(rAF);
	}, [tags, inputValue, sizing.containerMinHeight]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
		if (e.key === "Tab" && suggestion) {
			e.preventDefault();

			// Explicitly fetch icon from Store to ensure it's supplied from there
			const storeSkill = ATLASSIAN_SKILLS.find((s) => s.title === suggestion.text);
			const icon = storeSkill ? storeSkill.icon : suggestion.icon;
			const iconColor = storeSkill ? storeSkill.iconColor : suggestion.iconColor;

			const newTag: TagProps = {
				id: Date.now().toString(),
				text: suggestion.text,
				icon: icon,
				iconColor: iconColor,
			};
			startTransition(() => {
				const updatedTags = [...tags, newTag];
				setTags(updatedTags);
				setInputValue("");
				setSuggestion(null);
				setStore({ query: "", tags: updatedTags });
			});
		} else if (e.key === "Enter") {
			// Prevent default newline behavior for Enter
			e.preventDefault();
		} else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
			// Only delete if caret is at start?
			// For simplified UX, if empty, backspace deletes last tag.
			e.preventDefault();
			startTransition(() => {
				const updatedTags = tags.slice(0, -1);
				setTags(updatedTags);
				setStore({ ...store, tags: updatedTags });
			});
		}
	};

	const handleTagKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, tagId: string) => {
		if (e.key === "Delete" || e.key === "Backspace") {
			e.preventDefault();
			e.stopPropagation();
			removeTag(tagId);
			// Focus back to input after deletion
			setTimeout(() => inputRef.current?.focus(), 0);
		} else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			// Redirect typing to input if a tag is focused
			e.preventDefault();
			e.stopPropagation();
			inputRef.current?.focus();
			startTransition(() => {
				setInputValue((prev) => prev + e.key);
				setStore({ ...store, query: inputValue + e.key });
			});
		}
	};

	const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
		const newValue = e.currentTarget.textContent || "";
		// Prevent newlines if any sneak in
		if (newValue.includes("\n")) return;

		startTransition(() => {
			setInputValue(newValue);
			setStore({ ...store, query: newValue });
		});
	};

	const removeTag = (id: string) => {
		startTransition(() => {
			const updatedTags = tags.filter((tag) => tag.id !== id);
			setTags(updatedTags);
			setStore({ ...store, tags: updatedTags });
		});
	};

	const commonTextStyle: CSSProperties = {
		...inputTheme.font,
		margin: 0,
		padding: 0,
		border: "none",
		outline: "none",
		width: "100%",
		whiteSpace: "pre-wrap",
		overflowWrap: "break-word",
		wordBreak: "normal",
		caretColor: inputTheme.textColor,
	};

	return (
		<div
			style={{
				...props.style,
				position: "relative",
				cursor: styling.containerCursor,
			}}
			onClick={() => inputRef.current?.focus()}
		>
			<style>{`
				.${uniqueClass}:empty::before {
					content: attr(data-placeholder);
					color: ${inputTheme.placeholderColor};
					pointer-events: none;
				}
			`}</style>
			<div
				ref={containerRef}
				style={{
					// Inherit font styles to ensure correct line-height for empty state caret
					...inputTheme.font,
					display: "block", // Allows flow wrapping
					minHeight: sizing.containerMinHeight,
					maxHeight: hasWrapping ? "none" : sizing.containerMinHeight,
					overflow: "visible",
				}}
			>
				{tags.map((tag) => (
					<div
						key={tag.id}
						contentEditable={false}
						tabIndex={0}
						onKeyDown={(e) => handleTagKeyDown(e, tag.id)}
						onClick={(e) => {
							e.stopPropagation();
							// Focus the tag when clicked
							e.currentTarget.focus();
						}}
						style={{
							display: "inline-flex",
							boxSizing: "border-box",
							alignItems: "center",
							gap: spacing.tagGap,
							height: sizing.tagHeight,
							padding: spacing.tagPadding,
							backgroundColor: tagTheme.backgroundColor,
							transform: `skewX(${tagTheme.skewAngle}deg)`,
							borderRadius: styling.tagBorderRadius,
							position: "relative",
							overflow: "hidden",
							marginRight: spacing.tagMarginRight,
							marginBottom: hasWrapping ? spacing.tagMarginBottom : 0,
							verticalAlign: "middle",
							cursor: styling.tagCursor,
							outline: "none",
						}}
						onFocus={(e) => {
							// Add visual feedback when focused
							e.currentTarget.style.outline = `${focus.outlineWidth}px solid ${focus.outlineColor}`;
							e.currentTarget.style.outlineOffset = `${focus.outlineOffset}px`;
						}}
						onBlur={(e) => {
							e.currentTarget.style.outline = "none";
						}}
					>
						{tagTheme.slashColor && tagTheme.slashColor !== "transparent" && tagTheme.slashWidth > 0 && (
							<div
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									bottom: 0,
									width: tagTheme.slashWidth,
									backgroundColor: tagTheme.slashColor,
								}}
							/>
						)}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: spacing.iconGap,
								transform: `skewX(${-tagTheme.skewAngle}deg)`,
							}}
						>
							{tag.icon ? (
								<div
									style={{
										width: "12px",
										height: "12px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: tag.iconColor || "inherit",
									}}
									dangerouslySetInnerHTML={{
										__html: tag.icon.replace(/<svg([^>]*)>/, (match, attrs) => {
											const cleaned = attrs.replace(/(width|height)="[^"]*"/g, "");
											return `<svg${cleaned} width="12" height="12">`;
										}),
									}}
								/>
							) : null}
							<span
								style={{
									...tagTheme.font,
									color: tagTheme.textColor,
								}}
							>
								{tag.text}
							</span>
						</div>
					</div>
				))}

				{/* Input Area */}
				<span
					ref={inputRef}
					contentEditable
					onInput={handleInput}
					onKeyDown={handleKeyDown}
					className={uniqueClass}
					data-placeholder={tags.length === 0 ? placeholder : undefined}
					style={{
						...commonTextStyle,
						display: "inline-block",
						width: "auto",
						minWidth: sizing.inputMinWidth,
						outline: "none",
						verticalAlign: "middle",
						color: inputTheme.textColor,
					}}
				/>

				{/* Suggestion Suffix */}
				{suggestion && inputValue && (
					<span
						style={{
							...commonTextStyle,
							color: inputTheme.suggestionTextColor,
							pointerEvents: "none",
							display: "inline",
							verticalAlign: "middle",
						}}
					>
						{suggestion.text.slice(inputValue.length)}
					</span>
				)}
			</div>
		</div>
	);
}

addPropertyControls(Composer, {
	placeholder: {
		type: ControlType.String,
		title: "Placeholder",
		defaultValue: "Type something...",
	},
	suggestions: {
		type: ControlType.Array,
		title: "Suggestions",
		control: {
			type: ControlType.Object,
			controls: {
				text: {
					type: ControlType.String,
					title: "Text",
					defaultValue: "Suggestion",
				},
				icon: {
					type: ControlType.File,
					title: "Icon",
					allowedFileTypes: ["svg", "png", "jpg", "jpeg"],
				},
				iconColor: {
					type: ControlType.Color,
					title: "Icon Color",
					defaultValue: "#000000",
				},
			},
		},
		defaultValue: ATLASSIAN_SKILLS.map((s) => ({
			text: s.title,
			icon: s.icon,
			iconColor: s.iconColor,
		})),
	},
	inputTheme: {
		type: ControlType.Object,
		title: "Input",
		icon: "color",
		controls: {
			textColor: {
				type: ControlType.Color,
				title: "Text",
				defaultValue: "#000000",
			},
			placeholderColor: {
				type: ControlType.Color,
				title: "Placeholder",
				defaultValue: "#999999",
			},
			suggestionTextColor: {
				type: ControlType.Color,
				title: "Suggestion color",
				defaultValue: "#CCCCCC",
			},
			font: {
				type: ControlType.Font,
				title: "Font",
				controls: "extended",
				defaultFontType: "sans-serif",
				defaultValue: {
					fontSize: "15px",
					variant: "Medium",
					letterSpacing: "-0.01em",
					lineHeight: "1.3em",
				},
			},
		},
	},
	tagTheme: {
		type: ControlType.Object,
		title: "Tag",
		icon: "color",
		controls: {
			backgroundColor: {
				type: ControlType.Color,
				title: "Background",
				defaultValue: "#EEEEEE",
			},
			textColor: {
				type: ControlType.Color,
				title: "Text",
				defaultValue: "#000000",
			},
			slashColor: {
				type: ControlType.Color,
				title: "Slash color",
				defaultValue: "transparent",
			},
			slashWidth: {
				type: ControlType.Number,
				title: "Slash width",
				defaultValue: 4,
				min: 0,
				max: 16,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			skewAngle: {
				type: ControlType.Number,
				title: "Skew angle",
				defaultValue: -10,
				min: -30,
				max: 30,
				step: 1,
				unit: "deg",
				displayStepper: true,
			},
			font: {
				type: ControlType.Font,
				title: "Font",
				controls: "extended",
				defaultFontType: "sans-serif",
				defaultValue: {
					fontSize: "14px",
					variant: "Medium",
					letterSpacing: "-0.01em",
					lineHeight: "1em",
				},
			},
		},
	},
	spacing: {
		type: ControlType.Object,
		title: "Spacing",
		icon: "interact",
		controls: {
			tagGap: {
				type: ControlType.Number,
				title: "Tag gap",
				defaultValue: 6,
				min: 0,
				max: 24,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			tagPadding: {
				type: ControlType.Padding,
				title: "Tag padding",
				defaultValue: "0 8px",
			},
			tagMarginRight: {
				type: ControlType.Number,
				title: "Tag margin right",
				defaultValue: 8,
				min: 0,
				max: 32,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			tagMarginBottom: {
				type: ControlType.Number,
				title: "Tag margin bottom",
				defaultValue: 2,
				min: 0,
				max: 16,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			iconGap: {
				type: ControlType.Number,
				title: "Icon gap",
				defaultValue: 6,
				min: 0,
				max: 24,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
		},
	},
	sizing: {
		type: ControlType.Object,
		title: "Sizing",
		icon: "interact",
		controls: {
			tagHeight: {
				type: ControlType.Number,
				title: "Tag height",
				defaultValue: 20,
				min: 16,
				max: 48,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			iconSize: {
				type: ControlType.Number,
				title: "Icon size",
				defaultValue: 12,
				min: 8,
				max: 24,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			containerMinHeight: {
				type: ControlType.Number,
				title: "Container min height",
				defaultValue: 20,
				min: 16,
				max: 48,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			inputMinWidth: {
				type: ControlType.Number,
				title: "Input min width",
				defaultValue: 4,
				min: 0,
				max: 32,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
		},
	},
	styling: {
		type: ControlType.Object,
		title: "Styling",
		icon: "effect",
		optional: true,
		controls: {
			tagBorderRadius: {
				type: ControlType.BorderRadius,
				title: "Tag radius",
				defaultValue: "4px",
			},
			containerCursor: {
				type: ControlType.Enum,
				title: "Container cursor",
				options: ["text", "pointer", "default", "not-allowed", "grab", "grabbing"],
				optionTitles: ["Text", "Pointer", "Default", "Not allowed", "Grab", "Grabbing"],
				defaultValue: "text",
			},
			tagCursor: {
				type: ControlType.Enum,
				title: "Tag cursor",
				options: ["pointer", "text", "default", "not-allowed"],
				optionTitles: ["Pointer", "Text", "Default", "Not allowed"],
				defaultValue: "pointer",
			},
		},
	},
	focus: {
		type: ControlType.Object,
		title: "Focus state",
		icon: "effect",
		optional: true,
		description: "Auto-complete text input with tag conversion. Press Tab to convert suggestions to tags, Delete/Backspace to remove tags.",
		controls: {
			outlineColor: {
				type: ControlType.Color,
				title: "Outline color",
				defaultValue: "rgba(0, 123, 255, 0.5)",
			},
			outlineWidth: {
				type: ControlType.Number,
				title: "Outline width",
				defaultValue: 2,
				min: 0,
				max: 8,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
			outlineOffset: {
				type: ControlType.Number,
				title: "Outline offset",
				defaultValue: 2,
				min: 0,
				max: 8,
				step: 1,
				unit: "px",
				displayStepper: true,
			},
		},
	},
});
