# Frontend Test Documentation (BienVenidos)

## Overview
Unit tests were added to the **frontend** portion of the project to meet and exceed the coverage requirement (>=70%). The test suite focuses on real user behavior and critical logic paths: API helper calls, form validation, component rendering, and navigation flow.

## Tooling & Setup
- **Test runner:** Jest
- **UI testing:** React Testing Library
- **Environment:** jsdom
- **Next.js support:** next/jest

**Key config files**
- `frontend/jest.config.js`
- `frontend/jest.setup.tsx`
- `frontend/test/__mocks__/fileMock.ts`

**Scripts**
- `npm run test` -> run tests
- `npm run test:coverage` -> run tests with coverage report

## What Was Tested

### 1. API Helper Logic
**File:** `src/lib/api.test.ts`

Covers:
- Signup/login POST calls
- `me()` auth request
- Logout response handling
- Error handling (non-OK responses)

### 2. Shared Data & Templates
**Files:**
- `src/app/_shared/category_data.test.ts`
- `src/app/_shared/category_components/CategoryTemplate.test.tsx`

Covers:
- Category maps and resources are valid
- Category template renders titles and resource details

### 3. Authentication & Forms
**Files:**
- `src/app/login/page.test.tsx`
- `src/app/sign-up/page.test.tsx`

Covers:
- Empty field validation
- Success paths (redirects)
- API error handling
- Network error handling

### 4. Page Rendering (All Pages)
**File:** `src/app/pages.test.tsx`

Covers:
- Basic rendering of every `page.tsx` file

### 5. Component Behavior
**Files:**
- `src/components/HeaderAuth.test.tsx`
- `src/components/SuggestionsButton.test.tsx`

Covers:
- Auth states (logged in vs logged out)
- Suggestions modal open
- Email validation
- Submit success handling

### 6. Users & Need Help Pages
**Files:**
- `src/app/users/page.test.tsx`
- `src/app/needhelp/page.test.tsx`

Covers:
- Welcome message and invite flow
- Category selection
- Dynamic form sections
- Submission confirmation

## Coverage Results (Latest Run)
```
All files: 81.29% statements, 83.09% lines
Tests: 42 passed, 10 suites total
```

This exceeds the 70% requirement.

## How to Run
```bash
cd frontend
npm install
npm run test
npm run test:coverage
```

## Notes
- All changes are isolated to **frontend** only.
- Tests focus on behavior, not implementation details, to avoid brittle assertions.
- Coverage report highlights any remaining gaps by file and line number.
