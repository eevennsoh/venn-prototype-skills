<!-- 84527355-e7c6-4c2c-b4ba-790026881221 735490ee-0435-4c7d-a2eb-f8d58fc62bb2 -->
# Fix contentEditable removeChild DOM Error

## Problem

The `useLayoutEffect` in `useInlineEditor.ts` calls `node.remove()` on DOM nodes that React has already removed/replaced during reconciliation. This causes "Failed to execute 'removeChild' on 'Node'" errors when deleting text segments, especially at boundaries.

## Solution Strategy

1. **Remove the problematic `useLayoutEffect` cleanup entirely** - Let React handle DOM updates
2. **Add a defensive DOM check** if any manual manipulation is truly needed
3. **Improve `parseNodesFromDOM`** to handle edge cases more robustly
4. **Ensure stable React keys** prevent reconciliation issues

---

## Changes

### 1. Remove or Guard the `useLayoutEffect` cleanup (`app/hooks/useInlineEditor.ts`)

The simplest and safest fix: **remove the manual text node cleanup**.

```typescript
// DELETE lines 151-173 entirely, OR guard with parent check:
useLayoutEffect(() => {
  if (!containerRef.current || !needsTextNodeCleanupRef.current) return;
  needsTextNodeCleanupRef.current = false;

  const container = containerRef.current;
  const hasSpanElements = container.querySelector("[data-node-type]") !== null;
  
  if (hasSpanElements) {
    Array.from(container.childNodes).forEach((child) => {
      // CRITICAL: Check if child is still a child BEFORE removing
      if (child.nodeType === Node.TEXT_NODE && child.parentNode === container) {
        child.remove();
      }
    });
  }
}, [nodes]);
```

**Recommended approach**: Remove the entire `useLayoutEffect` block and instead handle text node deduplication in `parseNodesFromDOM` by ignoring direct text nodes when span elements exist.

### 2. Update `parseNodesFromDOM` to ignore browser-inserted text nodes (`app/hooks/useInlineEditor.ts`)

```typescript
const parseNodesFromDOM = useCallback((): EditorNode[] => {
  if (!containerRef.current) return nodes;

  const result: EditorNode[] = [];
  const childNodes = Array.from(containerRef.current.childNodes);
  
  // Check if we have proper span elements rendered by React
  const hasSpanElements = containerRef.current.querySelector("[data-node-type]") !== null;

  for (const child of childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      // If React has rendered spans, ignore browser-inserted direct text nodes
      // as they will be duplicates of content inside spans
      if (hasSpanElements) continue;
      
      const textContent = child.textContent || "";
      if (textContent) {
        result.push({ type: "text", content: textContent, id: generateTextNodeId() });
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      // ... existing element handling logic
    }
  }

  return normalizeNodes(result);
}, [nodes]);
```

### 3. Remove the `needsTextNodeCleanupRef` flag and related logic

Since we're not doing manual cleanup, remove:

- `needsTextNodeCleanupRef` declaration (line 101)
- All assignments to it (`needsTextNodeCleanupRef.current = true` on lines 281, 318, 656)
- The entire `useLayoutEffect` block (lines 151-173)

---

## Test Plan

1. **Render `"hello delete this"` and delete `"hello"` (first segment)**

   - Expected: No error, remaining text `" delete this"` displays correctly

2. **Render `"[skill1] some text [skill2]" `and delete `"some text"`**

   - Expected: No error, skills remain with empty text between them

3. **Render `"prefix [skill] suffix" `and delete `"prefix"`, then `"suffix"`**

   - Expected: No error at any step

4. **Rapid typing and deleting across skill boundaries**

   - Expected: No console errors, cursor position stable

5. **Select all and delete**

   - Expected: Editor clears without errors

### To-dos

- [ ] Remove the problematic useLayoutEffect text node cleanup block and needsTextNodeCleanupRef
- [ ] Update parseNodesFromDOM to ignore direct text nodes when React spans exist
- [ ] Manually verify all test scenarios pass without removeChild errors