# Inline Editor Refactor Plan

## Current State Analysis

The existing implementation in `useComposer.ts` uses:

- A `Segment[]` array with text and skill nodes
- Multiple `contentEditable` spans (one per text segment)
- Direct DOM manipulation for cursor positioning
- Basic left/right arrow navigation between segments

**Key limitations:**

- Up/Down arrows delegate to parent (`onKeyArrow`) instead of handling cross-line navigation
- Selection is handled via native browser selection with limited control
- Multiple contentEditable elements make cursor tracking fragile

---

## Architecture Decision: Single ContentEditable Container

Replace multiple contentEditable spans with a **single contentEditable container** that contains:

- Text nodes (native DOM text)
- Non-editable skill tag elements (rendered via React portals or inline elements)

This approach:

- Gives native browser handling for text wrapping and line breaks
- Provides consistent selection/range APIs across the entire content
- Enables proper Up/Down navigation using browser's caret positioning

---

## Data Model

### EditorNode Type

```typescript
type EditorNode = { type: "text"; content: string } | { type: "skill"; skill: Skill };
```

### EditorState

```typescript
interface EditorState {
	nodes: EditorNode[];
	// Cursor position as (nodeIndex, offset within node)
	// For skill nodes, offset is always 0 (before) or 1 (after)
	cursor: { nodeIndex: number; offset: number };
	// Selection range (null if no selection)
	selection: {
		anchor: { nodeIndex: number; offset: number };
		focus: { nodeIndex: number; offset: number };
	} | null;
}
```

### Position Utilities

Create functions in `lib/editor-utils.ts`:

- `nodesToText(nodes)`: Convert nodes to plain text
- `positionToAbsolute(nodes, nodeIndex, offset)`: Convert node position to absolute character offset
- `absoluteToPosition(nodes, absoluteOffset)`: Reverse conversion
- `isPositionOnSkill(nodes, nodeIndex)`: Check if position is on a skill node

---

## Rendering Strategy

### Single Container Approach

```tsx
<div
  ref={containerRef}
  contentEditable
  onInput={handleInput}
  onKeyDown={handleKeyDown}
  onSelect={handleSelectionChange}
  suppressContentEditableWarning
>
  {nodes.map((node, index) => (
    node.type === 'text'
      ? <span key={index} data-node-index={index}>{node.content}</span>
      : <span
          key={index}
          data-node-index={index}
          data-node-type="skill"
          contentEditable={false}
          style={{ userSelect: 'all' }}
        >
          <SkillLozenge ... />
        </span>
  ))}
</div>
```

### Key Rendering Details

1. Skill nodes use `contentEditable={false}` to be atomic
2. `userSelect: 'all'` ensures skill is selected as a unit
3. `data-node-index` attributes enable mapping DOM positions back to nodes

---

## Keyboard Navigation

### Left/Right Arrow Keys

In `handleKeyDown`:

1. Get current cursor position from DOM selection
2. Map to node position
3. If at boundary of text node adjacent to skill:

   - Moving into skill: Set skill as focused (visual indicator)
   - Moving past skill: Jump to other side of skill

4. Update DOM selection accordingly

### Up/Down Arrow Keys (Cross-Line Navigation)

This is the complex part. Strategy:

1. **Let browser handle initial movement** - Don't prevent default initially
2. **After browser moves caret** - Check if caret landed on a skill node
3. **If on skill, adjust** - Move to nearest text position (before/after skill)

Implementation in `handleKeyDown`:

```typescript
if (e.key === "ArrowUp" || e.key === "ArrowDown") {
	// Use setTimeout to check position AFTER browser moves caret
	setTimeout(() => {
		const sel = window.getSelection();
		const position = domPositionToNodePosition(sel);
		if (isPositionOnSkill(nodes, position.nodeIndex)) {
			// Adjust to nearest text position
			const adjusted = findNearestTextPosition(nodes, position, e.key);
			setDomSelection(adjusted);
		}
		syncStateFromDOM();
	}, 0);
}
```

### Tab Key (Skill Insertion)

When Tab is pressed with a suggestion available:

1. Find the current word being typed (text before cursor up to last space)
2. Replace that text segment with: `[text before word] + [skill node] + [text after cursor]`
3. Position cursor after the inserted skill

---

## Selection Handling

### Internal Selection Representation

```typescript
interface SelectionRange {
	anchor: { nodeIndex: number; offset: number };
	focus: { nodeIndex: number; offset: number };
}
```

### Cmd+A (Select All)

1. Set selection to cover all nodes: `{ anchor: {0, 0}, focus: {lastNode, lastOffset} }`
2. Update DOM selection to match
3. Mark all skill nodes as visually "selected/focused"

### Selection Change Handler

On `onSelect` or `selectionchange` event:

1. Read DOM selection
2. Convert to node positions
3. Identify which skills are within selection range
4. Update `focusedSkillIds` state for visual feedback

### Deletion with Selection

When Backspace/Delete pressed with selection:

1. Identify all nodes (or partial nodes) within selection
2. Remove fully selected nodes
3. Truncate partially selected text nodes
4. Merge remaining adjacent text nodes
5. Position cursor at deletion point

---

## Focus States

### Skill Focus (Single Skill Navigation)

When cursor moves onto a skill via arrow keys:

- Set `focusedSkillId` to highlight that skill
- Skill shows focus ring via `SkillLozenge` prop

### Skill Selection (Multi-Select)

When selection includes skills:

- Set `selectedSkillIds: string[]` array
- All selected skills show selected state

---

## File Structure

### New/Modified Files:

1. **`lib/editor-utils.ts`** (new) - Position utilities, node manipulation helpers
2. **`app/hooks/useInlineEditor.ts`** (new) - Core editor state management hook
3. **`app/hooks/useComposer.ts`** - Refactor to use `useInlineEditor` internally
4. **`app/components/ChatComposer.tsx`** - Update rendering to single container

### useInlineEditor Hook API:

```typescript
interface UseInlineEditorReturn {
	containerRef: RefObject<HTMLDivElement>;
	nodes: EditorNode[];
	focusedSkillId: string | null;
	selectedSkillIds: string[];

	// Handlers to attach to container
	handleInput: (e: FormEvent) => void;
	handleKeyDown: (e: KeyboardEvent) => void;
	handleSelect: () => void;

	// Actions
	insertSkill: (skill: Skill) => void;
	removeSkill: (skillId: string) => void;
	clear: () => void;
	focus: () => void;

	// Derived state
	getText: () => string;
	getSkills: () => Skill[];
}
```

---

## Implementation Phases

### Phase 1: Editor Utilities

Create `lib/editor-utils.ts` with:

- Node type definitions
- Position conversion functions
- DOM-to-node position mapping
- Node manipulation (insert, remove, merge)

### Phase 2: Core Editor Hook

Create `useInlineEditor.ts`:

- State management for nodes and cursor
- Input handling (sync DOM changes to state)
- Basic keyboard navigation (left/right)
- Skill insertion logic

### Phase 3: Advanced Navigation

Add to `useInlineEditor.ts`:

- Up/Down arrow cross-line navigation
- Skill focus state management
- Proper caret adjustment when landing on skills

### Phase 4: Selection Handling

Add to `useInlineEditor.ts`:

- Selection state tracking
- Cmd+A implementation
- Deletion with selection
- Multi-skill selection visual state

### Phase 5: Integration

Update `useComposer.ts` and `ChatComposer.tsx`:

- Replace existing segment logic with useInlineEditor
- Update rendering to single container
- Preserve existing external API (props, callbacks)
- Add ghost text rendering

---

## Edge Cases to Handle

1. **Empty editor**: Always maintain at least one empty text node
2. **Adjacent skills**: Ensure text node exists between skills for cursor positioning
3. **Skill at start/end**: Cursor can be positioned before first skill or after last
4. **Line wrapping on skill boundary**: Skills move as atomic units to next line
5. **Paste handling**: Parse pasted text, insert as text nodes only
6. **IME input**: Ensure composition events work correctly
