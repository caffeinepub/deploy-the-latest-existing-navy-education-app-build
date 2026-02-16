# Core Flows Smoke Test

## Purpose
This document outlines the post-deployment smoke test steps for verifying the core user flows of the Navy education application work correctly against the deployed backend canisters.

## Prerequisites
- Deployed frontend URL
- Deployed backend canister (with quiz data initialized)
- Internet Identity for authentication
- Modern web browser

## Core Flow 1: Browse and View Quizzes

### Steps
1. Navigate to the deployed frontend URL
2. Click "Take a Quiz" button on the home page OR navigate to `/quizzes`
3. Verify the quizzes page loads successfully
4. Confirm quiz cards are displayed (fetched from backend)
5. Verify each quiz shows:
   - Quiz title
   - Topic name
   - "Start Quiz" button

### Expected Results
- ✅ Quizzes page renders without errors
- ✅ Quiz data is successfully fetched from the deployed backend
- ✅ At least one quiz is displayed (backend should have sample data)
- ✅ No loading spinners stuck or error messages

### Failure Indicators
- ❌ Blank page or "No quizzes available" when backend has data
- ❌ Network errors in browser console
- ❌ Infinite loading state

---

## Core Flow 2: Play a Quiz Through to Completion

### Steps
1. From the quizzes page, click "Start Quiz" on any quiz
2. Verify the quiz play page loads with the first question
3. Select an answer using the radio buttons
4. Click "Next" to advance to the next question
5. Repeat for all questions in the quiz
6. On the last question, click "Submit Quiz"
7. Verify the results page loads

### Expected Results
- ✅ Quiz questions load from backend successfully
- ✅ Radio button selection works for each question
- ✅ Navigation between questions works (Next/Previous buttons)
- ✅ Progress indicator updates correctly
- ✅ Submit button appears on the last question
- ✅ Results page displays the score
- ✅ Answer review shows which answers were correct/incorrect

### Failure Indicators
- ❌ Questions don't load or display incorrectly
- ❌ Radio buttons don't respond to clicks
- ❌ Navigation buttons don't work
- ❌ Submit fails with an error
- ❌ Results page doesn't load or shows incorrect score

---

## Core Flow 3: Submit Quiz Attempt and Verify Progress

### Steps
1. **Authenticate with Internet Identity**
   - Click "Login" in the navigation header
   - Complete Internet Identity authentication flow
   - Verify login succeeds and user is authenticated

2. **Complete a Quiz (Authenticated)**
   - Navigate to `/quizzes`
   - Start and complete any quiz
   - Submit the quiz attempt
   - Note the score displayed on the results page

3. **Verify Progress Page**
   - Navigate to `/progress`
   - Verify the progress page loads successfully
   - Confirm the quiz attempt just submitted appears in the history
   - Verify the attempt shows:
     - Quiz title
     - Score
     - Timestamp
   - Check that statistics section updates (total attempts, average score)

### Expected Results
- ✅ Internet Identity login succeeds
- ✅ Quiz attempt submission succeeds (backend update call)
- ✅ Progress page loads without errors
- ✅ New quiz attempt appears in the attempt history
- ✅ Attempt data is correct (quiz ID, score, timestamp)
- ✅ Statistics reflect the new attempt

### Failure Indicators
- ❌ Login fails or gets stuck
- ❌ Quiz submission returns an error
- ❌ Progress page shows "Unauthorized" error
- ❌ New attempt doesn't appear in history
- ❌ Attempt data is incorrect or missing

---

## Core Flow 4: User Profile Setup (First-Time Login)

### Steps
1. **Login with a New Internet Identity**
   - Use a fresh Internet Identity that has never logged into this app
   - Complete authentication

2. **Profile Setup Modal**
   - Verify a profile setup modal/dialog appears
   - Enter a name in the profile form
   - Submit the profile
   - Verify the modal closes

3. **Verify Profile Persistence**
   - Navigate to different pages
   - Verify the profile setup modal does NOT appear again
   - Logout and login again with the same identity
   - Verify the profile setup modal does NOT appear (profile was saved)

### Expected Results
- ✅ Profile setup modal appears for new users
- ✅ Profile form accepts input and submits successfully
- ✅ Profile is saved to backend (saveCallerUserProfile call succeeds)
- ✅ Modal doesn't reappear after profile is saved
- ✅ Profile persists across sessions

### Failure Indicators
- ❌ Profile modal doesn't appear for new users
- ❌ Profile submission fails with an error
- ❌ Modal keeps reappearing after profile is saved
- ❌ Profile data is lost after logout/login

---

## Additional Verification Points

### Backend Connectivity
- [ ] All backend query calls succeed (getQuizzes, getQuiz, getQuizQuestions)
- [ ] All backend update calls succeed (submitQuizAttempt, saveCallerUserProfile)
- [ ] No CORS or network errors in browser console
- [ ] Backend canister ID is correctly configured in frontend

### Authentication Flow
- [ ] Login button works and triggers Internet Identity
- [ ] Logout button works and clears user session
- [ ] Authenticated routes require login (Progress page)
- [ ] Public routes work without authentication (Learn, Quizzes, Games)

### Data Integrity
- [ ] Quiz questions match expected content
- [ ] Correct answers are properly validated
- [ ] Scores are calculated correctly
- [ ] Timestamps are reasonable (not far in past/future)

---

## Pass/Fail Criteria

### PASS
All four core flows complete successfully without errors, and all verification points are confirmed.

### FAIL
Any of the following occur:
- Backend API calls fail consistently
- Quiz submission doesn't save to progress
- Authentication flow is broken
- Critical UI elements don't render or function

---

## Reporting Issues

If any smoke test fails, document:
1. Which flow/step failed
2. Error messages (browser console and UI)
3. Network request details (check browser DevTools Network tab)
4. Screenshots of the failure state
5. Browser and OS information

---

## Notes
- These tests should be run immediately after deployment
- Tests verify the integration between frontend and deployed backend
- Focus is on critical user journeys, not exhaustive feature testing
- If all tests pass, the deployment is considered successful for core functionality
