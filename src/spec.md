# Specification

## Summary
**Goal:** Add login/logout and subscription navigation controls to the Navy Learning Hub so users can authenticate via the existing Internet Identity flow and view a static subscription info page.

**Planned changes:**
- Add a login/logout control to the primary navigation that uses the existing Internet Identity provider and updates based on authentication state, working in both desktop header and mobile Sheet menu layouts (including a disabled/loading state during auth initialization/in-progress).
- Add a "Subscribe" button/item to the primary navigation (desktop and mobile) that routes to a new in-app subscription information page (e.g., `/subscribe`).
- Create a new static subscription information route/page that explains subscription options in a simple, school-friendly way with no payment processing and works with the existing TanStack Router navigation.

**User-visible outcome:** Users see "Log in" or "Log out" in the navigation depending on their authentication state (on both desktop and mobile), and can open a "Subscribe" page from the navigation to read subscription information.
