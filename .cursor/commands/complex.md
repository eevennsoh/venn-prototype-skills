# Complex Problem-Solving Methodology

When tackling a complex problem, follow this systematic approach to ensure a robust, well-documented solution.

## Phase 1: Understand the Problem

### 1.1 Reproduce and Document

- Get a clear description of the issue (error messages, unexpected behavior, etc.)
- Identify specific reproduction steps
- Note the environment/context where it occurs

### 1.2 Current State Analysis

Read the relevant code and document:

- What the code is currently doing
- What technologies/patterns are in use
- Any existing limitations or technical debt
- Research external web on similar problems and solutions

**Template:**

```markdown
## Current State Analysis

The existing implementation uses:

- [List technologies, patterns, approaches]

**Key observations:**

- [What's happening]
- [What dependencies exist]
- [What constraints are in place]
```

## Phase 2: Root Cause Analysis

### 2.1 Dig Deeper Than Symptoms

Don't just fix symptoms—understand WHY the problem occurs:

- Trace the execution flow
- Identify the exact point of failure
- Understand the underlying conflict or race condition

### 2.2 Visualize the Flow

Create a flow diagram of what's happening:

**Template:**

```markdown
## Root Cause

### The Problem Flow
```

Step 1 → Step 2 → Step 3 → FAILURE

```

### Why This Fails
[Explain the fundamental reason, not just the surface error]
```

## Phase 3: Solution Design

### 3.1 Evaluate Multiple Approaches

Before coding, consider 2-3 different solutions:

- Approach A: [Description, pros, cons]
- Approach B: [Description, pros, cons]
- Approach C: [Description, pros, cons]

### 3.2 Choose and Justify

Select the best approach and explain why:

- Why it addresses the root cause
- Why it's better than alternatives
- Any tradeoffs being made

### 3.3 Architecture Decision

Document the high-level strategy before implementation:

**Template:**

```markdown
## Solution Strategy

### Chosen Approach: [Name]

**Why this works:**

1. [Reason 1]
2. [Reason 2]
3. [Reason 3]

### New Flow
```

Step 1 → Step 2 → Step 3 → SUCCESS

```

```

## Phase 4: Data Model & Types

### 4.1 Define Types First

Before writing implementation, define:

- Type definitions
- State shapes
- Interface contracts

**Template:**

```typescript
// Define the core types needed
interface [Name] {
  // Properties with comments explaining purpose
}

type [Name] =
  | { type: "a"; ... }
  | { type: "b"; ... };
```

### 4.2 Utility Functions

Identify helper functions needed:

- What transformations are required
- What queries on the data
- What mutations

## Phase 5: Implementation Plan

### 5.1 Break Into Phases

Divide implementation into logical phases:

**Template:**

```markdown
### Phase 1: [Foundation]

- [ ] Create utility functions
- [ ] Define types

### Phase 2: [Core Logic]

- [ ] Implement main handler
- [ ] Add state management

### Phase 3: [Integration]

- [ ] Connect to existing code
- [ ] Update components

### Phase 4: [Polish]

- [ ] Handle edge cases
- [ ] Add error handling
```

### 5.2 Code Changes with Context

For each change, provide:

- The file being modified
- The specific code change
- Why this change is needed

## Phase 6: Edge Cases

### 6.1 Enumerate Edge Cases

Think through what could go wrong:

**Template:**

```markdown
## Edge Cases to Handle

1. **[Edge case name]**: [Description and how to handle]
2. **[Edge case name]**: [Description and how to handle]
3. **[Edge case name]**: [Description and how to handle]
```

### 6.2 Boundary Conditions

Consider:

- Empty states
- Maximum/minimum values
- Concurrent operations
- Error states
- User interruption mid-operation

## Phase 7: Test Plan

### 7.1 Define Test Scenarios

Create specific, reproducible test cases:

**Template:**

```markdown
## Test Plan

1. **[Test name]**

   - Steps: [How to test]
   - Expected: [What should happen]

2. **[Test name]**
   - Steps: [How to test]
   - Expected: [What should happen]
```

### 7.2 Regression Tests

Ensure existing functionality still works:

- List features that might be affected
- Create tests for those features

## Phase 8: Documentation

### 8.1 Create a Plan Document

Save the analysis and solution to `.cursor/plans/[descriptive-name].md`:

- Include all phases above
- Mark completed tasks
- Document decisions made

### 8.2 Update Plan on Completion

After implementation:

- Mark all tasks as complete
- Add any additional findings
- Note alternative approaches for future reference

---

## Quick Checklist

When starting a complex problem:

- [ ] Can I reproduce the issue?
- [ ] Have I read the relevant code?
- [ ] Do I understand the root cause (not just symptoms)?
- [ ] Have I considered multiple solutions?
- [ ] Have I chosen the best approach with justification?
- [ ] Have I defined the types/data model?
- [ ] Have I broken implementation into phases?
- [ ] Have I considered edge cases?
- [ ] Have I created a test plan?
- [ ] Have I documented the solution in a plan file?

---

## Example Plan Structure

```markdown
# [Problem Title]

## Problem

[Clear description of what's wrong]

## Current State Analysis

[What the code does now]

## Root Cause

[Why it's failing - the fundamental reason]

## Solution Strategy

[High-level approach]

## Data Model

[Types and interfaces]

## Implementation

### Phase 1: [Name]

- [ ] Task 1
- [ ] Task 2

### Phase 2: [Name]

- [ ] Task 3
- [ ] Task 4

## Edge Cases

1. [Case 1]
2. [Case 2]

## Test Plan

1. [Test 1]
2. [Test 2]

## Completed Tasks

- [x] All tasks marked when done
```

---

## When to Use This Approach

Use this methodology when:

- The problem involves multiple interacting systems
- Previous fix attempts have failed
- The issue is intermittent or hard to reproduce
- The solution requires significant refactoring
- You need to explain the solution to others
- The codebase will benefit from documentation

For simple bugs with obvious fixes, a lighter approach is fine—but when in doubt, take the systematic path.
