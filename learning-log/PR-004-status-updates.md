# PR #4 — Change Issue Status

**PR:** [#4 — feat: change issue status](https://github.com/Kablan-A/issue-tracker/pull/4)  
**Date:** 2026-11-02  
**Status:** Merged

## 1. Implementation summary

Implemented the ability to change an issue's status from its details dialog.

Key changes:

- Added a status select to the issue dialog.
- Added `handleChangeIssue` in `App`, where the canonical issues state is managed.
- Updated issue data immutably using `map` and the functional state setter.
- Lifted dialog rendering from individual issue lists to `App`.
- Added `selectedIssueId` state and derived the selected issue from the canonical issues array.
- Passed callbacks through props to connect child interactions with parent-owned state.
- Moved status labels into shared constants.

## 2. Review questions and discussion

### Question 1 — Where should status-update logic live?

**My initial reasoning:**

The `App` component should own the function because it manages the overall issues state. I initially thought Context would be an ideal way to reach the desired component.

**Review explanation:**

The component that owns the state should generally own the logic that updates it. However, Context is not automatically necessary.

For a relatively shallow component tree, passing callback functions through props is simpler and makes dependencies explicit.

Context becomes more useful when many deeply nested or distant components need access to the same data or actions.

**Key takeaway:** State ownership and Context are separate decisions. A component can own state while exposing updates through props.

### Question 2 — Local state versus props

**My explanation:**

I initially used `useState(status)` to initialize the select's value. I forgot that a select can use `defaultValue`.

**Review explanation:**

`useState(status)` uses the prop only during the component's initial render. If the prop changes later, the local state does not automatically follow it.

This can create two sources of truth:

- The parent owns the actual issue status.
- The dialog maintains a separate local status.

The solution was to use the `status` prop directly as the controlled select's value and call the parent's update callback when the selection changes.

**Key takeaway:** Don't duplicate state unnecessarily. If a value is already owned by a parent and doesn't need independent local editing, derive it from props.

### Question 3 — Component lifecycle when changing status

**My explanation:**

Initially, the dialog was rendered inside each status-specific issue list. Moving an issue to another status would remove it from the original list, causing the dialog to close.

I wanted the dialog to remain open.

**Review explanation:**

When an issue is filtered out of its current list, its associated component subtree can unmount. React does not preserve component state merely because the same issue appears in another list.

The solution was to render the dialog outside the status-specific lists, at the `App` level.

**Key takeaway:** Component placement affects lifecycle. UI that must survive changes in a list should not necessarily be owned by an individual list item.

### Question 4 — Selected issue object versus selected issue ID

**My explanation:**

Storing the entire issue object separately could lead to stale data because updating the canonical issues array does not automatically update the separately stored object.

**Review explanation:**

Instead of storing `selectedIssue`, `App` stores `selectedIssueId` and derives the selected issue from the canonical array.

This ensures the dialog receives the latest issue data whenever the canonical array changes.

**Key takeaway:** Store the minimum state necessary. When possible, store an identifier and derive the full object from the source of truth.

## 3. Key concepts learned

- State ownership and lifting state up.
- Controlled components and props.
- Avoiding duplicated state.
- Immutable array updates with `map`.
- Functional state setters.
- Derived state using `find` and `filter`.
- Component mounting and unmounting.
- React component lifecycle and UI placement.
- Passing callbacks through props.
- When Context is useful versus ordinary prop passing.

## 4. Important takeaways

1. The component that owns shared state should generally own its update logic.
2. Context is useful when it solves a real prop-drilling problem, not simply because multiple components need data.
3. `useState(prop)` does not synchronize with subsequent prop changes.
4. A controlled input should receive its current value from the authoritative state.
5. Store an identifier instead of a duplicated object when the object can be derived from existing state.
6. Component placement can determine whether UI remains mounted during data changes.
7. Functional state updates help avoid relying on potentially stale state values.

## 5. Final verification

- [x] Issue moves to the correct column.
- [x] Dialog remains open after changing status.
- [x] Select displays the new status immediately.
- [x] Updated status remains correct after closing and reopening the dialog.
- [x] Typecheck — reported passing locally.
- [x] Lint — reported passing locally.
- [x] Build — reported passing locally.
- [x] PR merged.

**Final review decision:** Ready to merge; no blocking issues found.
