import type { Skill } from "./skills";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Generate a unique ID for text nodes
 */
let textNodeIdCounter = 0;
export function generateTextNodeId(): string {
	return `text-${Date.now()}-${++textNodeIdCounter}`;
}

/**
 * EditorNode represents either plain text or an atomic skill tag in the editor
 */
export type EditorNode = { type: "text"; content: string; id: string } | { type: "skill"; skill: Skill };

/**
 * Position within the editor content
 * For text nodes: offset is character position within the text
 * For skill nodes: offset is 0 (before) or 1 (after)
 */
export interface EditorPosition {
	nodeIndex: number;
	offset: number;
}

/**
 * Selection range with anchor (start) and focus (end) positions
 */
export interface EditorSelection {
	anchor: EditorPosition;
	focus: EditorPosition;
}

/**
 * Complete editor state
 */
export interface EditorState {
	nodes: EditorNode[];
	cursor: EditorPosition;
	selection: EditorSelection | null;
}

// ============================================================================
// Node Utilities
// ============================================================================

/**
 * Convert nodes to plain text (for prompt extraction)
 */
export function nodesToText(nodes: EditorNode[]): string {
	return nodes
		.filter((node): node is { type: "text"; content: string; id: string } => node.type === "text")
		.map((node) => node.content)
		.join(" ")
		.trim();
}

/**
 * Get all skills from nodes
 */
export function nodesToSkills(nodes: EditorNode[]): Skill[] {
	return nodes.filter((node): node is { type: "skill"; skill: Skill } => node.type === "skill").map((node) => node.skill);
}

/**
 * Get the length of a node (text length or 1 for skills)
 */
export function getNodeLength(node: EditorNode): number {
	return node.type === "text" ? node.content.length : 1;
}

/**
 * Check if a position is on a skill node
 */
export function isPositionOnSkill(nodes: EditorNode[], nodeIndex: number): boolean {
	const node = nodes[nodeIndex];
	return node?.type === "skill";
}

/**
 * Check if nodes array is empty (no content)
 */
export function isNodesEmpty(nodes: EditorNode[]): boolean {
	return nodes.every((node) => (node.type === "text" ? node.content === "" : false));
}

/**
 * Ensure nodes array always has at least one text node
 */
export function ensureTextNode(nodes: EditorNode[]): EditorNode[] {
	if (nodes.length === 0) {
		return [{ type: "text", content: "", id: generateTextNodeId() }];
	}
	return nodes;
}

/**
 * Normalize nodes by merging adjacent text nodes and ensuring structure
 */
export function normalizeNodes(nodes: EditorNode[]): EditorNode[] {
	if (nodes.length === 0) {
		return [{ type: "text", content: "", id: generateTextNodeId() }];
	}

	const result: EditorNode[] = [];

	for (const node of nodes) {
		const lastNode = result[result.length - 1];

		if (node.type === "text" && lastNode?.type === "text") {
			// Merge adjacent text nodes (keep the first node's ID)
			lastNode.content += node.content;
		} else if (node.type === "text") {
			// Ensure text node has an ID
			result.push({ ...node, id: node.id || generateTextNodeId() });
		} else {
			result.push({ ...node });
		}
	}

	// Ensure we have at least one text node
	if (result.length === 0) {
		return [{ type: "text", content: "", id: generateTextNodeId() }];
	}

	return result;
}

// ============================================================================
// Position Utilities
// ============================================================================

/**
 * Convert node position to absolute character offset
 */
export function positionToAbsolute(nodes: EditorNode[], position: EditorPosition): number {
	let absolute = 0;

	for (let i = 0; i < position.nodeIndex && i < nodes.length; i++) {
		absolute += getNodeLength(nodes[i]);
	}

	absolute += position.offset;
	return absolute;
}

/**
 * Convert absolute character offset to node position
 */
export function absoluteToPosition(nodes: EditorNode[], absoluteOffset: number): EditorPosition {
	let remaining = absoluteOffset;

	for (let i = 0; i < nodes.length; i++) {
		const nodeLength = getNodeLength(nodes[i]);

		if (remaining <= nodeLength) {
			return { nodeIndex: i, offset: remaining };
		}

		remaining -= nodeLength;
	}

	// Position at the end
	const lastIndex = Math.max(0, nodes.length - 1);
	const lastNode = nodes[lastIndex];
	return {
		nodeIndex: lastIndex,
		offset: lastNode ? getNodeLength(lastNode) : 0,
	};
}

/**
 * Get the total length of all nodes
 */
export function getTotalLength(nodes: EditorNode[]): number {
	return nodes.reduce((sum, node) => sum + getNodeLength(node), 0);
}

/**
 * Compare two positions: returns -1 if a < b, 0 if equal, 1 if a > b
 */
export function comparePositions(nodes: EditorNode[], a: EditorPosition, b: EditorPosition): number {
	const absA = positionToAbsolute(nodes, a);
	const absB = positionToAbsolute(nodes, b);

	if (absA < absB) return -1;
	if (absA > absB) return 1;
	return 0;
}

/**
 * Get the start and end positions of a selection (ordered)
 */
export function getSelectionBounds(nodes: EditorNode[], selection: EditorSelection): { start: EditorPosition; end: EditorPosition } {
	const cmp = comparePositions(nodes, selection.anchor, selection.focus);

	if (cmp <= 0) {
		return { start: selection.anchor, end: selection.focus };
	} else {
		return { start: selection.focus, end: selection.anchor };
	}
}

/**
 * Check if a selection is collapsed (cursor, no range)
 */
export function isSelectionCollapsed(selection: EditorSelection | null): boolean {
	if (!selection) return true;
	return selection.anchor.nodeIndex === selection.focus.nodeIndex && selection.anchor.offset === selection.focus.offset;
}

/**
 * Find the nearest text position to a given position
 * Used when cursor lands on a skill and needs to be adjusted
 */
export function findNearestTextPosition(nodes: EditorNode[], position: EditorPosition, direction: "up" | "down" | "left" | "right"): EditorPosition {
	const node = nodes[position.nodeIndex];

	// Already on text node
	if (node?.type === "text") {
		return position;
	}

	// On a skill node - find nearest text
	const preferBefore = direction === "left" || direction === "up";

	if (preferBefore) {
		// Try to find text node before
		for (let i = position.nodeIndex - 1; i >= 0; i--) {
			if (nodes[i].type === "text") {
				return { nodeIndex: i, offset: getNodeLength(nodes[i]) };
			}
		}
		// Fall back to after
		for (let i = position.nodeIndex + 1; i < nodes.length; i++) {
			if (nodes[i].type === "text") {
				return { nodeIndex: i, offset: 0 };
			}
		}
	} else {
		// Try to find text node after
		for (let i = position.nodeIndex + 1; i < nodes.length; i++) {
			if (nodes[i].type === "text") {
				return { nodeIndex: i, offset: 0 };
			}
		}
		// Fall back to before
		for (let i = position.nodeIndex - 1; i >= 0; i--) {
			if (nodes[i].type === "text") {
				return { nodeIndex: i, offset: getNodeLength(nodes[i]) };
			}
		}
	}

	// No text nodes found - return original position
	return position;
}

// ============================================================================
// DOM Mapping Utilities
// ============================================================================

/**
 * Find the node index from a DOM element with data-node-index attribute
 */
export function getNodeIndexFromElement(element: Element | null): number | null {
	if (!element) return null;

	const indexAttr = element.getAttribute("data-node-index");
	if (indexAttr !== null) {
		return parseInt(indexAttr, 10);
	}

	// Check parent
	const parent = element.parentElement;
	if (parent) {
		const parentIndex = parent.getAttribute("data-node-index");
		if (parentIndex !== null) {
			return parseInt(parentIndex, 10);
		}
	}

	return null;
}

/**
 * Check if an element is a skill node
 */
export function isSkillElement(element: Element | null): boolean {
	if (!element) return false;
	return element.getAttribute("data-node-type") === "skill";
}

/**
 * Convert DOM selection to editor position
 */
export function domSelectionToPosition(containerRef: HTMLElement, selection: Selection | null): EditorPosition | null {
	if (!selection || selection.rangeCount === 0) return null;

	const range = selection.getRangeAt(0);
	return domPointToPosition(containerRef, range.startContainer, range.startOffset);
}

/**
 * Convert a DOM point (node + offset) to editor position
 */
export function domPointToPosition(containerRef: HTMLElement, domNode: Node, domOffset: number): EditorPosition | null {
	// Find the element with data-node-index
	let element: Element | null = null;

	if (domNode.nodeType === Node.TEXT_NODE) {
		element = domNode.parentElement;
	} else if (domNode.nodeType === Node.ELEMENT_NODE) {
		element = domNode as Element;
	}

	// Walk up to find element with data-node-index
	while (element && element !== containerRef) {
		const indexAttr = element.getAttribute("data-node-index");
		if (indexAttr !== null) {
			const nodeIndex = parseInt(indexAttr, 10);
			const isSkill = element.getAttribute("data-node-type") === "skill";

			if (isSkill) {
				// For skills, offset is 0 or 1
				return { nodeIndex, offset: domOffset > 0 ? 1 : 0 };
			} else {
				// For text nodes, use the actual offset
				return { nodeIndex, offset: domOffset };
			}
		}
		element = element.parentElement;
	}

	// If we're directly in the container, find the child index
	if (domNode === containerRef || domNode.parentNode === containerRef) {
		// Handle direct text node children (browser-inserted text outside spans)
		if (domNode.nodeType === Node.TEXT_NODE && domNode.parentNode === containerRef) {
			const childNodes = Array.from(containerRef.childNodes);
			const textNodeIndex = childNodes.indexOf(domNode as ChildNode);

			// Calculate position by counting text before this direct text node
			// and finding which logical text span it should belong to
			let accumulatedOffset = 0;
			let lastTextSpanIndex = 0;
			let lastTextSpanContentLength = 0;

			for (let i = 0; i < childNodes.length; i++) {
				const child = childNodes[i];

				if (i === textNodeIndex) {
					// We found our direct text node - return position relative to last text span
					return { nodeIndex: lastTextSpanIndex, offset: lastTextSpanContentLength + domOffset };
				}

				if (child.nodeType === Node.ELEMENT_NODE) {
					const el = child as Element;
					const nodeType = el.getAttribute("data-node-type");
					const nodeIndex = el.getAttribute("data-node-index");

					if (nodeType === "text" && nodeIndex !== null) {
						lastTextSpanIndex = parseInt(nodeIndex, 10);
						lastTextSpanContentLength = el.textContent?.length || 0;
					}
				}
			}

			// Fallback: return position in first/last text span
			return { nodeIndex: lastTextSpanIndex, offset: lastTextSpanContentLength + domOffset };
		}

		const children = Array.from(containerRef.children);
		let targetIndex = 0;

		if (domNode === containerRef) {
			targetIndex = Math.min(domOffset, children.length - 1);
		} else {
			targetIndex = children.indexOf(domNode as Element);
		}

		if (targetIndex >= 0 && targetIndex < children.length) {
			const child = children[targetIndex];
			const nodeIndex = parseInt(child.getAttribute("data-node-index") || "0", 10);
			return { nodeIndex, offset: 0 };
		}
	}

	return null;
}

/**
 * Convert DOM selection to editor selection
 */
export function domSelectionToEditorSelection(containerRef: HTMLElement, selection: Selection | null): EditorSelection | null {
	if (!selection || selection.rangeCount === 0) return null;

	const range = selection.getRangeAt(0);

	const anchor = domPointToPosition(containerRef, selection.anchorNode!, selection.anchorOffset);
	const focus = domPointToPosition(containerRef, selection.focusNode!, selection.focusOffset);

	if (!anchor || !focus) return null;

	return { anchor, focus };
}

/**
 * Set DOM selection from editor position
 */
export function setDomSelectionFromPosition(containerRef: HTMLElement, position: EditorPosition): void {
	const children = Array.from(containerRef.children);
	const targetElement = children.find((el) => el.getAttribute("data-node-index") === String(position.nodeIndex));

	if (!targetElement) return;

	const selection = window.getSelection();
	if (!selection) return;

	const range = document.createRange();

	const isSkill = targetElement.getAttribute("data-node-type") === "skill";

	if (isSkill) {
		// For skills, select the whole element or position before/after
		if (position.offset === 0) {
			range.setStartBefore(targetElement);
			range.setEndBefore(targetElement);
		} else {
			range.setStartAfter(targetElement);
			range.setEndAfter(targetElement);
		}
	} else {
		// For text nodes, find the text node and set offset
		let textNode = targetElement.firstChild;

		// If the span is empty, create a text node so the cursor has somewhere to go
		if (!textNode) {
			textNode = document.createTextNode("");
			targetElement.appendChild(textNode);
		}

		if (textNode.nodeType === Node.TEXT_NODE) {
			const offset = Math.min(position.offset, textNode.textContent?.length || 0);
			range.setStart(textNode, offset);
			range.setEnd(textNode, offset);
		} else {
			// Fallback: position at start of element
			range.selectNodeContents(targetElement);
			range.collapse(true);
		}
	}

	selection.removeAllRanges();
	selection.addRange(range);
}

/**
 * Set DOM selection from editor selection range
 */
export function setDomSelectionFromRange(containerRef: HTMLElement, editorSelection: EditorSelection): void {
	const children = Array.from(containerRef.children);
	const selection = window.getSelection();
	if (!selection) return;

	const range = document.createRange();

	// Helper to set range point
	const setPoint = (position: EditorPosition, setStart: boolean): boolean => {
		const targetElement = children.find((el) => el.getAttribute("data-node-index") === String(position.nodeIndex));

		if (!targetElement) return false;

		const isSkill = targetElement.getAttribute("data-node-type") === "skill";

		if (isSkill) {
			if (position.offset === 0) {
				if (setStart) {
					range.setStartBefore(targetElement);
				} else {
					range.setEndBefore(targetElement);
				}
			} else {
				if (setStart) {
					range.setStartAfter(targetElement);
				} else {
					range.setEndAfter(targetElement);
				}
			}
		} else {
			const textNode = targetElement.firstChild;
			if (textNode && textNode.nodeType === Node.TEXT_NODE) {
				const offset = Math.min(position.offset, textNode.textContent?.length || 0);
				if (setStart) {
					range.setStart(textNode, offset);
				} else {
					range.setEnd(textNode, offset);
				}
			} else {
				if (setStart) {
					range.setStart(targetElement, 0);
				} else {
					range.setEnd(targetElement, 0);
				}
			}
		}

		return true;
	};

	if (!setPoint(editorSelection.anchor, true)) return;
	if (!setPoint(editorSelection.focus, false)) return;

	selection.removeAllRanges();
	selection.addRange(range);
}

// ============================================================================
// Node Manipulation
// ============================================================================

/**
 * Insert a skill at the current cursor position, replacing any partial word
 */
export function insertSkillAtPosition(nodes: EditorNode[], position: EditorPosition, skill: Skill): { nodes: EditorNode[]; newPosition: EditorPosition } {
	const node = nodes[position.nodeIndex];

	if (!node || node.type !== "text") {
		// Insert skill after current position
		const newNodes = [
			...nodes.slice(0, position.nodeIndex + 1),
			{ type: "skill" as const, skill },
			{ type: "text" as const, content: "", id: generateTextNodeId() },
			...nodes.slice(position.nodeIndex + 1),
		];

		return {
			nodes: normalizeNodes(newNodes),
			newPosition: { nodeIndex: position.nodeIndex + 2, offset: 0 },
		};
	}

	const textContent = node.content;
	const beforeCursor = textContent.slice(0, position.offset);
	const afterCursor = textContent.slice(position.offset);

	// Find the word being typed (text after last space before cursor)
	const lastSpaceIndex = beforeCursor.lastIndexOf(" ");
	const textBeforeWord = lastSpaceIndex === -1 ? "" : beforeCursor.slice(0, lastSpaceIndex + 1);

	const newNodes: EditorNode[] = [
		...nodes.slice(0, position.nodeIndex),
		...(textBeforeWord ? [{ type: "text" as const, content: textBeforeWord, id: generateTextNodeId() }] : []),
		{ type: "skill" as const, skill },
		{ type: "text" as const, content: afterCursor, id: generateTextNodeId() },
		...nodes.slice(position.nodeIndex + 1),
	];

	const normalized = normalizeNodes(newNodes);

	// Find the position after the inserted skill
	let newNodeIndex = 0;
	for (let i = 0; i < normalized.length; i++) {
		const n = normalized[i];
		if (n.type === "skill" && n.skill.id === skill.id) {
			newNodeIndex = i + 1;
			break;
		}
	}

	// Ensure there's a text node after the skill
	if (newNodeIndex >= normalized.length || normalized[newNodeIndex].type !== "text") {
		normalized.splice(newNodeIndex, 0, { type: "text", content: "", id: generateTextNodeId() });
	}

	return {
		nodes: normalized,
		newPosition: { nodeIndex: newNodeIndex, offset: 0 },
	};
}

/**
 * Remove a skill by ID
 */
export function removeSkillById(nodes: EditorNode[], skillId: string): { nodes: EditorNode[]; removedIndex: number } {
	const skillIndex = nodes.findIndex((node) => node.type === "skill" && node.skill.id === skillId);

	if (skillIndex === -1) {
		return { nodes, removedIndex: -1 };
	}

	const newNodes = nodes.filter((_, i) => i !== skillIndex);
	return {
		nodes: normalizeNodes(newNodes),
		removedIndex: skillIndex,
	};
}

/**
 * Delete content in a selection range
 */
export function deleteSelection(nodes: EditorNode[], selection: EditorSelection): { nodes: EditorNode[]; newPosition: EditorPosition } {
	const { start, end } = getSelectionBounds(nodes, selection);

	// Same position - nothing to delete
	if (start.nodeIndex === end.nodeIndex && start.offset === end.offset) {
		return { nodes, newPosition: start };
	}

	const result: EditorNode[] = [];

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];

		if (i < start.nodeIndex) {
			// Before selection - keep as is
			result.push({ ...node });
		} else if (i > end.nodeIndex) {
			// After selection - keep as is
			result.push({ ...node });
		} else if (i === start.nodeIndex && i === end.nodeIndex) {
			// Selection within single node
			if (node.type === "text") {
				const newContent = node.content.slice(0, start.offset) + node.content.slice(end.offset);
				result.push({ type: "text", content: newContent, id: node.id });
			}
			// If it's a skill and fully selected, don't add it
		} else if (i === start.nodeIndex) {
			// Start of selection
			if (node.type === "text") {
				const newContent = node.content.slice(0, start.offset);
				if (newContent) {
					result.push({ type: "text", content: newContent, id: node.id });
				}
			}
			// If skill at start boundary, don't include if offset > 0
			else if (start.offset === 0) {
				// Skill is fully in selection, skip it
			} else {
				// Skill is before selection start
				result.push({ ...node });
			}
		} else if (i === end.nodeIndex) {
			// End of selection
			if (node.type === "text") {
				const newContent = node.content.slice(end.offset);
				if (newContent) {
					result.push({ type: "text", content: newContent, id: node.id });
				}
			}
			// If skill at end and offset is 1 (after), it's in selection, skip
			else if (end.offset === 1) {
				// Skill is fully in selection, skip it
			} else {
				// Skill is after selection end
				result.push({ ...node });
			}
		}
		// Nodes fully within selection are skipped
	}

	const normalized = normalizeNodes(result);

	// Position cursor at deletion point
	let newPosition: EditorPosition = { nodeIndex: 0, offset: 0 };

	if (start.nodeIndex < normalized.length) {
		const nodeAtStart = normalized[start.nodeIndex];
		if (nodeAtStart?.type === "text") {
			newPosition = {
				nodeIndex: start.nodeIndex,
				offset: Math.min(start.offset, nodeAtStart.content.length),
			};
		} else {
			newPosition = { nodeIndex: start.nodeIndex, offset: 0 };
		}
	} else if (normalized.length > 0) {
		const lastIndex = normalized.length - 1;
		const lastNode = normalized[lastIndex];
		newPosition = {
			nodeIndex: lastIndex,
			offset: lastNode.type === "text" ? lastNode.content.length : 1,
		};
	}

	return { nodes: normalized, newPosition };
}

/**
 * Get the current word being typed (for suggestions)
 */
export function getCurrentWord(nodes: EditorNode[], position: EditorPosition): string {
	const node = nodes[position.nodeIndex];
	if (!node || node.type !== "text") return "";

	const textBeforeCursor = node.content.slice(0, position.offset);
	const lastSpaceIndex = textBeforeCursor.lastIndexOf(" ");
	return textBeforeCursor.slice(lastSpaceIndex + 1);
}

/**
 * Get skill IDs that are within a selection
 */
export function getSelectedSkillIds(nodes: EditorNode[], selection: EditorSelection): string[] {
	if (isSelectionCollapsed(selection)) return [];

	const { start, end } = getSelectionBounds(nodes, selection);
	const skillIds: string[] = [];

	for (let i = start.nodeIndex; i <= end.nodeIndex && i < nodes.length; i++) {
		const node = nodes[i];
		if (node.type !== "skill") continue;

		// Check if skill is within selection
		if (i === start.nodeIndex && start.offset > 0) {
			// Skill is at start but cursor is after it
			continue;
		}
		if (i === end.nodeIndex && end.offset === 0) {
			// Skill is at end but cursor is before it
			continue;
		}

		skillIds.push(node.skill.id);
	}

	return skillIds;
}
