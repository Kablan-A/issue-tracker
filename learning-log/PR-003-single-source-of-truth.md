# PR #3 — Single Source of Truth for Issues

**PR:** https://github.com/Kablan-A/issue-tracker/pull/3  
**Related issue:** https://github.com/Kablan-A/issue-tracker/issues/1  
**Status:** Merged

## 1. Implementation summary

Replaced three independent React state arrays (`openIssues`, `inProgressIssues`, and `closedIssues`) with one canonical `issues` state array.

The three column lists are now derived by filtering the canonical array according to each issue's status.

The `handleAddIssue` function now adds new issues to the single array.

Removed unnecessary `useMemo` usage because filtering these small arrays does not require memoization.

## 2. Review questions

### Question 1 — Understanding useMemo

**Question:**

What benefit does `useMemo` provide in this implementation, and what would happen if you calculated the three filtered arrays directly during rendering?

**My answer:**

I thought that when dependencies don't change, the component wouldn't rerender.

**Correction and explanation:**

`useMemo` does not prevent a component from rerendering. It caches the result of a calculation between renders.

- If dependencies change, the calculation runs again.
- If dependencies remain unchanged, React can reuse the previously calculated value.
- The component can still rerender in either case.

For these relatively small arrays, direct filtering is simpler and sufficiently efficient.

### Question 2 — Single source of truth

**Question:**

Why is keeping all issues in one state array safer than maintaining three separate arrays? What could go wrong when an issue moves from `open` to `closed`?

**My answer:**

Keeping one state array is safer because we only need to maintain one array, and the other lists are filtered by status.

With separate arrays, changing an issue's status would require deleting it from one array and adding it to another. With one array, we can simply change the issue's status instead of copying it between arrays.

**Explanation:**

Correct.

With separate arrays, coordinating two updates introduces the possibility of:

- An issue appearing in two columns.
- An issue disappearing from all columns.
- Inconsistent data if one update succeeds but the other is missed.

With one canonical array, changing an issue's status is enough. The derived lists automatically reflect the change.

Other issue properties remain attached to the same issue object.

## 3. Key concepts learned

- Single source of truth.
- Derived data versus independently stored state.
- React rendering and useMemo.
- The difference between memoizing a calculation and preventing a rerender.
- Why unnecessary memoization can make code more complicated without providing meaningful benefits.

## 4. Important takeaways

1. Avoid storing data that can be derived from existing state.
2. Keep one canonical collection when multiple views represent the same entities.
3. Prefer simple calculations until performance measurements justify optimization.
4. Understand what a React optimization actually does before introducing it.

## 5. Final review

- [x] Functional requirements checked
- [x] Typecheck passed (reported)
- [x] Lint passed (reported)
- [x] Build passed (reported)
- [x] Manual testing completed (reported)
- [x] Review questions answered
- [x] PR merged

**Review decision:** Approved — merged.
