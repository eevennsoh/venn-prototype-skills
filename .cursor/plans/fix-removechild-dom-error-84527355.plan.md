<!-- 84527355-e7c6-4c2c-b4ba-790026881221 735490ee-0435-4c7d-a2eb-f8d58fc62bb2 -->

# Fix contentEditable removeChild DOM Error

## Problem

The `useLayoutEffect` in `useInlineEditor.ts` calls `node.remove()` on DOM nodes that React has already removed/replaced during reconciliation. This causes "Failed to execute 'removeChild' on 'Node'" errors when deleting text segments, especially at boundaries (e.g., typing "aa" then deleting both characters).

### Root Cause

The original approach had a race condition:

```
User types → Browser modifies DOM → handleInput fires → parseNodesFromDOM() reads DOM
→ setNodes() triggers React re-render → React tries to reconcile → Browser already deleted text nodes
→ "removeChild" error
```

---

## ✅ Implemented Solution: Controlled `beforeinput` Approach

Instead of letting the browser modify the DOM and then parsing it back, we **intercept all input before it happens** using the `beforeinput` event, update state programmatically, and let React handle all DOM rendering.

### New Flow

```
User types → beforeinput event fires → e.preventDefault() stops browser modification
→ insertTextAtCursor() updates React state → React re-renders cleanly → cursor restored via useLayoutEffect
```

---

## Changes Made

### 1. Added `beforeinput` Event Handler (`app/hooks/useInlineEditor.ts`)

Intercepts ALL input types before the browser can modify the DOM:

```typescript
useEffect(() => {
	const container = containerRef.current;
	if (!container) return;

	const handleBeforeInput = (e: InputEvent) => {
		if (isDisabled) {
			e.preventDefault();
			return;
		}

		// Skip during IME composition
		if (isComposingRef.current) return;

		const inputType = e.inputType;

		switch (inputType) {
			case "insertText":
			case "insertReplacementText": {
				e.preventDefault();
				const text = e.data || "";
				if (selection && !isSelectionCollapsed(selection)) {
					replaceSelection(text);
				} else {
					insertTextAtCursor(text);
				}
				break;
			}

			case "deleteContentBackward":
			case "deleteSoftLineBackward":
			case "deleteWordBackward": {
				e.preventDefault();
				deleteBackward();
				break;
			}

			case "deleteContentForward":
			case "deleteSoftLineForward":
			case "deleteWordForward": {
				e.preventDefault();
				deleteForward();
				break;
			}

			// ... other input types handled similarly
		}
	};

	container.addEventListener("beforeinput", handleBeforeInput);
	return () => container.removeEventListener("beforeinput", handleBeforeInput);
}, [isDisabled, selection, insertTextAtCursor, deleteBackward, deleteForward, replaceSelection]);
```

### 2. Added Programmatic Text Manipulation Functions

- `insertTextAtCursor(text)` - Inserts text at cursor position by updating state directly
- `deleteBackward()` - Handles backspace by updating state (includes skill deletion)
- `deleteForward()` - Handles delete key by updating state
- `replaceSelection(text)` - Handles typing over selected text

### 3. Cursor Position Sync via `useLayoutEffect`

```typescript
const pendingCursorRef = useRef<EditorPosition | null>(null);

useLayoutEffect(() => {
	if (pendingCursorRef.current && containerRef.current) {
		const pos = pendingCursorRef.current;
		pendingCursorRef.current = null;

		requestAnimationFrame(() => {
			if (containerRef.current) {
				setDomSelectionFromPosition(containerRef.current, pos);
			}
		});
	}
}, [nodes]);
```

### 4. Updated `ChatComposer.tsx` - Stable React Keys

```tsx
// Text node - use stable ID-based key
<span key={`text-${node.id}`} data-node-index={index} data-node-type="text" style={{ display: "inline", verticalAlign: "middle" }}>
	{/* Use explicit text or zero-width space for empty spans */}
	{node.content || "\u200B"}
</span>
```

### 5. Removed Problematic Code

- Removed `parseNodesFromDOM()` function (no longer needed)
- Removed `needsTextNodeCleanupRef` and related cleanup logic
- Removed DOM-parsing in `handleInput`
- `handleInput` is now a no-op fallback for browsers without `beforeinput` support

---

## Why This Works

1. **No DOM Parsing**: State is the single source of truth. We never read from DOM to update state.
2. **No Race Condition**: `beforeinput` fires BEFORE browser modifies DOM, so we prevent the modification entirely.
3. **Clean React Reconciliation**: React always renders from state, and the DOM matches what React expects.
4. **Stable Keys**: Text nodes use stable IDs, preventing unnecessary DOM node replacement.
5. **Zero-Width Space**: Empty text spans have content (`\u200B`) so cursor can be placed there.

---

## Test Plan

1. **Type "aa" and delete both characters**

   - ✅ Expected: No error, editor clears correctly

2. **Render `"hello delete this"` and delete `"hello"` (first segment)**

   - ✅ Expected: No error, remaining text displays correctly

3. **Render `"[skill1] some text [skill2]"` and delete `"some text"`**

   - ✅ Expected: No error, skills remain with empty text between them

4. **Render `"prefix [skill] suffix"` and delete `"prefix"`, then `"suffix"`**

   - ✅ Expected: No error at any step

5. **Rapid typing and deleting across skill boundaries**

   - ✅ Expected: No console errors, cursor position stable

6. **Select all and delete**

   - ✅ Expected: Editor clears without errors

7. **IME input (e.g., Chinese/Japanese)**
   - ✅ Expected: Composition works correctly, text inserted on composition end

---

## Completed Tasks

- [x] Refactored `useInlineEditor.ts` to use `beforeinput` event handler
- [x] Added programmatic text manipulation functions (`insertTextAtCursor`, `deleteBackward`, `deleteForward`, `replaceSelection`)
- [x] Added cursor position sync via `useLayoutEffect` and `pendingCursorRef`
- [x] Updated `ChatComposer.tsx` with stable keys and zero-width space for empty spans
- [x] Removed DOM parsing logic and cleanup effects
- [x] Verified all test scenarios pass without removeChild errors

---

## Alternative Approaches (for reference)

If edge cases persist, consider:

1. **Rich Text Libraries**: [Slate](https://docs.slatejs.org/), [Lexical](https://lexical.dev/), [TipTap](https://tiptap.dev/) handle all contentEditable complexities.

2. **Hidden Input Overlay**: Use a hidden `<textarea>` for input, render visual representation separately.

3. **Key-based Reset**: Force React to replace entire editor container on structure changes using dynamic key.


### To-dos

- [x] Remove the problematic useLayoutEffect text node cleanup block and needsTextNodeCleanupRef
- [x] Update parseNodesFromDOM to ignore direct text nodes when React spans exist
- [x] Manually verify all test scenarios pass without removeChild errors