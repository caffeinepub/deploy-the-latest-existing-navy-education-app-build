# Route Smoke Test - Manual Navigation Checklist

## Purpose
This checklist provides a simple manual verification process to ensure all routes in the deployed Navy education application load and render correctly in a browser.

## Prerequisites
- Deployed frontend URL
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet Identity for authenticated routes (optional for initial smoke test)

## Navigation Smoke Test

### Public Routes (No Authentication Required)

1. **Home Page (`/`)**
   - [ ] Page loads without errors
   - [ ] Hero section displays "Welcome to Navy Forged"
   - [ ] Four feature cards are visible (Learn, Quizzes, Games, Progress)
   - [ ] "Start Learning" and "Take a Quiz" buttons are present
   - [ ] Footer displays with caffeine.ai attribution

2. **Learn Index (`/learn`)**
   - [ ] Page loads without errors
   - [ ] Six Navy topic cards are displayed
   - [ ] Topics include: History, Ships, Ranks, Traditions, Careers, Technology
   - [ ] Each card has a "Learn More" button

3. **Learn Topic Page (`/learn/[topicId]`)**
   - [ ] Navigate to any topic (e.g., `/learn/history`)
   - [ ] Topic content displays with heading and description
   - [ ] Key facts section is visible
   - [ ] "Related Quizzes" section appears
   - [ ] Back navigation works

4. **Quizzes Page (`/quizzes`)**
   - [ ] Page loads without errors
   - [ ] Quiz cards are displayed (fetched from backend)
   - [ ] Each quiz shows title and topic
   - [ ] "Start Quiz" buttons are present

5. **Games Page (`/games`)**
   - [ ] Page loads without errors
   - [ ] Two game cards are displayed (Signal Flags Memory, Ship Log Timeline)
   - [ ] Each game has a "Play Game" button
   - [ ] Game descriptions are visible

6. **About Page (`/about`)**
   - [ ] Page loads without errors
   - [ ] School-approval information section displays
   - [ ] Privacy policy section is visible
   - [ ] Non-affiliation disclaimer is present

7. **Subscribe Page (`/subscribe`)**
   - [ ] Page loads without errors
   - [ ] Free and Premium access cards are displayed
   - [ ] School & Institutional Access section is visible
   - [ ] No payment forms or checkout flows are present
   - [ ] Navigation buttons work correctly

### Authenticated Routes (Requires Internet Identity Login)

8. **Progress Page (`/progress`)**
   - [ ] Login prompt appears if not authenticated
   - [ ] After login, page displays quiz attempt history
   - [ ] Statistics section shows total attempts and average score
   - [ ] Empty state displays if no attempts exist

### Dynamic Routes

9. **Quiz Play Page (`/quiz/[quizId]`)**
   - [ ] Navigate from quizzes page to any quiz
   - [ ] Quiz questions load from backend
   - [ ] Radio button answers are selectable
   - [ ] Progress indicator shows current question
   - [ ] "Next" and "Previous" buttons work
   - [ ] "Submit Quiz" button appears on last question

10. **Quiz Results Page (`/quiz/[quizId]/results`)**
    - [ ] After submitting a quiz, results page loads
    - [ ] Score is displayed
    - [ ] Answer review section shows correct/incorrect answers
    - [ ] "Back to Quizzes" button works

11. **Game Play Pages (`/games/[gameId]`)**
    - [ ] Navigate to Signal Flags Memory game
    - [ ] Game renders and is interactive
    - [ ] Navigate to Ship Log Timeline game
    - [ ] Game renders and is interactive

## Navigation Flow Test

- [ ] Click through primary navigation menu (all links work)
- [ ] Use browser back/forward buttons (routing works correctly)
- [ ] Mobile menu opens and closes properly (responsive design)
- [ ] All internal links navigate without page reloads (SPA behavior)

## Authentication Flow Test

- [ ] Login button is visible in desktop navigation when not authenticated
- [ ] Login button is visible in mobile menu when not authenticated
- [ ] Clicking login triggers Internet Identity flow
- [ ] After login, button changes to "Log out"
- [ ] Clicking logout clears session and returns to logged-out state
- [ ] Login/logout button shows loading state during authentication
- [ ] Mobile menu closes after login/logout action

## Subscribe Flow Test

- [ ] Subscribe button is visible in desktop navigation
- [ ] Subscribe button is visible in mobile menu
- [ ] Clicking Subscribe navigates to `/subscribe` route
- [ ] Subscribe page displays subscription options
- [ ] Mobile menu closes after navigating to Subscribe page
- [ ] Navigation from Subscribe page back to other routes works

## Pass Criteria
- All routes load without blank screens or console errors
- Navigation between pages works smoothly
- No 404 or routing errors occur
- Interactive elements are clickable and functional
- Authentication flow works correctly
- Subscribe route is accessible and functional

## Notes
- This is a visual/functional smoke test, not an automated test suite
- Focus on verifying routes render, not detailed feature testing
- Report any blank screens, 404 errors, or broken navigation immediately
