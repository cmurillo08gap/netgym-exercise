# Baseball Players App - Implementation Checklist

**Reference Documents:**
- `docs/spec.md` - Complete specification
- `docs/project_plan.md` - Detailed implementation plan

---

## Phase 1: Project Initialization

- [x] Initialize git repository in `/netgym-exercise`
- [x] Create `/backend` directory structure
- [x] Create `/frontend` directory structure
- [x] Initialize Node.js project in `/backend` with `npm init`
- [x] Initialize React project in `/frontend` with `npx create-react-app` or `vite`
- [x] Configure Tailwind CSS in `/frontend`
- [x] Create `.env.example` in root with:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASS`
  - `GITHUB_TOKEN`
- [x] Create `/backend/.env` file (copy from `.env.example` with local values) - **MANUAL STEP REQUIRED**
- [x] Add `.gitignore` (ignore node_modules, .env, dist, build)

---

## Phase 2: Backend Setup & Database

### Installation & Configuration
- [x] Install dependencies in `/backend`:
  - `express`
  - `knex`
  - `pg` (PostgreSQL client)
  - `dotenv`
  - `cors`
  - `body-parser`
  - `@azure-rest/ai-inference` (for GitHub Models API)
  - `@azure/core-auth` (for GitHub Models API authentication)
- [x] Create `knexfile.js` in `/backend` with:
  - Development environment config
  - Database connection settings
  - Migration and seed directories
- [x] Create `/backend/migrations` directory
- [x] Create `/backend/seeds` directory

### Database Migrations & Seeders
- [x] Write migration: create `players` table with columns:
  - `id` (primary key, auto-increment)
  - `Player name` (VARCHAR)
  - `position` (VARCHAR)
  - `Games` (INTEGER)
  - `At-bat` (INTEGER)
  - `Runs` (INTEGER)
  - `Hits` (INTEGER)
  - `Double (2B)` (INTEGER)
  - `third baseman` (INTEGER)
  - `home run` (INTEGER)
  - `run batted in` (INTEGER)
  - `a walk` (INTEGER)
  - `Strikeouts` (INTEGER)
  - `stolen base` (INTEGER)
  - `Caught stealing` (INTEGER, handle NULL for "--" values)
  - `AVG` (DECIMAL)
  - `On-base Percentage` (DECIMAL)
  - `Slugging Percentage` (DECIMAL)
  - `On-base Plus Slugging` (DECIMAL)
  - `description` (TEXT, nullable, initially NULL)
  - `created_at` (TIMESTAMP, default NOW())
  - `updated_at` (TIMESTAMP, default NOW())
- [x] Run migration: `npx knex migrate:latest`
- [x] Write seeder: load all data from `/data/baseball_data.json`
- [x] Run seeder: `npx knex seed:run`
- [x] Verify data loaded correctly in Postgres

---

## Phase 3: Backend API Implementation

### Project Structure
- [x] Create `/backend/src` directory
- [x] Create `/backend/src/app.js` (Express app setup)
- [x] Create `/backend/src/server.js` (server entry point)
- [x] Create `/backend/src/db.js` (Knex database connection)
- [x] Create `/backend/src/routes` directory
- [x] Create `/backend/src/routes/players.js` (routes file)
- [x] Create `/backend/src/controllers` directory
- [x] Create `/backend/src/controllers/playersController.js` (business logic)

### API Endpoints
- [x] Implement `GET /api/players` endpoint
  - Support `?sortBy=hits` query parameter (default)
  - Support `?sortBy=home_run` query parameter
  - Return players sorted descending by selected field
  - Test with curl/Postman
- [x] Implement `GET /api/players/:id` endpoint
  - Return single player with all fields including description
  - Return 404 if player not found
  - Test with curl/Postman
- [x] Implement `PUT /api/players/:id` endpoint
  - Accept JSON body with 8 editable fields:
    - `games`
    - `at_bat`
    - `runs`
    - `hits`
    - `double_2b`
    - `home_run`
    - `run_batted_in`
    - `strikeouts`
  - Validate all values are non-negative integers
  - Update database
  - Return updated player
  - Return 400 if validation fails
  - Test with curl/Postman
- [x] Set up Express middleware:
  - `cors` for cross-origin requests
  - `body-parser` for JSON
  - Error handling middleware
- [x] Add `package.json` scripts:
  - `npm run start` - start server
- [x] Test all endpoints locally

---

## Phase 4: CLI Description Generator

### Project Structure
- [x] Create `/backend/scripts` directory
- [x] Create `/backend/scripts/generate-descriptions.js` (CLI script - kept for reference)
- [x] Create `/backend/scripts/githubModelsService.js` (GitHub Models API calls)

### Implementation (On-Demand Generation)
- [x] Set up GitHub Models API client
- [x] Read environment variable `GITHUB_TOKEN`
- [x] Integrate description generation into GET /api/players/:id endpoint
- [x] Generate description on-the-fly when player is viewed (if not exists)
- [x] Update player record in database with generated description
- [x] Handle errors gracefully (don't fail request if generation fails)
- [x] CLI script available for batch processing if needed later

**Note:** Changed from batch CLI approach to on-demand generation to reduce API costs.
Only generates descriptions for players that are actually viewed.

---

## Phase 5: Frontend Setup & Components

### Project Structure
- [x] Create `/frontend/src/components` directory
- [x] Create `/frontend/src/services` directory
- [x] Create `/frontend/src/services/api.js` (API calls)
- [x] Create `/frontend/src/App.jsx` (main app component)

### API Service Layer
- [x] Create `api.js` with functions:
  - `fetchPlayers(sortBy = 'hits')` - GET /api/players
  - `fetchPlayerById(id)` - GET /api/players/:id
  - `updatePlayer(id, data)` - PUT /api/players/:id
- [x] Set `API_BASE_URL` from environment or default to `http://localhost:3001`

### Components - Player List
- [x] Create `/frontend/src/components/PlayerList.jsx`
  - Display players in a table or list view
  - Show columns: Name, Position, Games, At-bat, Runs, Hits, Doubles, HRs, RBIs, Strikeouts
  - Load players on component mount
  - Handle loading and error states
- [x] Create `/frontend/src/components/SortControls.jsx`
  - Two buttons: "Sort by Hits" and "Sort by Home Runs"
  - Active button highlighted
  - Trigger re-fetch with correct `sortBy` parameter
- [x] Create `/frontend/src/components/PlayerRow.jsx`
  - Single player row component
  - Click handler to select player
  - Pass selected player ID to parent

### Components - Side Panel
- [x] Create `/frontend/src/components/SidePanel.jsx`
  - Desktop: slide in from right (fixed position, z-index)
  - Mobile: full-screen modal
  - Show player description at top
  - Show 8 editable fields below:
    - Games, At-bat, Runs, Hits, Doubles, HRs, RBIs, Strikeouts
  - Add Close button (top-right or bottom)
  - Add Save button (bottom)
  - Implement responsive design using Tailwind classes
- [x] Create `/frontend/src/components/EditFields.jsx`
  - 8 input fields for editable stats
  - Input type: `number`
  - Min value: 0 (HTML5 validation)
  - Show original values from player data
  - Track changes in local state

### App Integration
- [x] In `App.jsx`:
  - Use state to track selected player ID
  - Render `SortControls` at top
  - Render `PlayerList` with click handler to set selected player
  - Conditionally render `SidePanel` based on selected player
  - Handle panel close (clear selected player)
- [x] Add global styles in `index.css` for:
  - Smooth transitions
  - Mobile-responsive breakpoints
- [x] Test layout on desktop and mobile

---

## Phase 6: Frontend - Data Editing

### Edit & Save Flow
- [x] Implement `handleSave()` in `SidePanel.jsx`:
  - Collect 8 field values from `EditFields`
  - Call `updatePlayer(playerId, updatedData)` from API service
  - Show loading state (disable Save button)
  - Show success/error message
- [x] On successful save:
  - Close the side panel
  - Refresh player list (re-fetch with current sort)
  - Show brief success message (toast or alert)
- [x] On error:
  - Display error message to user
  - Keep panel open with data intact
  - Allow user to retry
- [x] Add form validation:
  - Check all values are non-negative
  - Show validation errors inline
- [x] Test edit flow end-to-end

---

## Phase 7: Integration & Testing

### Backend & Frontend Integration
- [x] Ensure backend server is running on `http://localhost:5000` (or configured port)
- [x] Ensure frontend is running on `http://localhost:3000` (or configured port)
- [x] Test CORS setup (requests should go through)
- [x] Test full flow:
  - Load player list
  - Sort by Name
  - Sort by Hits
  - Sort by Home Runs
  - Click a player
  - Side panel opens with description and edit fields
  - Edit a field
  - Save changes
  - List refreshes with updated data
  - Close panel
- [ ] Test on mobile viewport (DevTools)
- [x] Test on desktop viewport

### Error Handling
- [x] Test network failure (backend down)
- [x] Test invalid player ID
- [x] Test invalid form data
- [x] Test database error scenarios
- [x] Verify graceful error messages shown to user

### UI/UX Polish
- [x] Verify Tailwind styling is clean and neutral
- [x] Check alignment, spacing, colors
- [x] Ensure responsive design works
- [x] Test side panel slide/modal animations
- [x] Test button hover/active states
- [x] Verify loading spinners/placeholders appear

---

## Phase 8: Unit Testing

### Backend Testing Setup
- [ ] Install testing dependencies:
  - `jest` (test runner)
  - `supertest` (HTTP assertions)
  - `@types/jest` (TypeScript definitions if needed)
- [ ] Create `/backend/tests` directory
- [ ] Configure Jest in `package.json` or `jest.config.js`
- [ ] Add test script: `npm run test`

### Backend Unit Tests
- [ ] Create `/backend/tests/players.test.js`
- [ ] Test `GET /api/players`:
  - Returns array of players
  - Default sort by hits descending
  - Sort by home_run descending
  - Sort by player_name ascending/descending
  - Handles invalid sortBy parameter gracefully
- [ ] Test `GET /api/players/:id`:
  - Returns single player by ID
  - Returns 404 for non-existent player
  - Returns all player fields including description
- [ ] Test `PUT /api/players/:id`:
  - Updates player stats successfully
  - Returns updated player data
  - Returns 400 for invalid data (negative numbers)
  - Returns 404 for non-existent player
  - Validates all 8 editable fields
- [ ] Test database helper functions (if any)
- [ ] Test error handling middleware

### Frontend Testing Setup
- [ ] Install testing dependencies:
  - `vitest` (Vite-native test runner)
  - `@testing-library/react` (React testing utilities)
  - `@testing-library/jest-dom` (DOM matchers)
  - `@testing-library/user-event` (user interaction simulation)
  - `msw` (Mock Service Worker for API mocking)
- [ ] Create `/frontend/src/__tests__` directory
- [ ] Configure Vitest in `vite.config.js`
- [ ] Add test script: `npm run test`

### Frontend Unit Tests
- [ ] Create `/frontend/src/__tests__/PlayerList.test.jsx`
  - Renders loading state
  - Renders error state
  - Renders list of players
  - Handles player click
  - Sortable headers work correctly
- [ ] Create `/frontend/src/__tests__/SidePanel.test.jsx`
  - Renders player details
  - Renders edit fields with correct values
  - Save button triggers API call
  - Close button works
  - Shows loading state during save
  - Shows error on failed save
- [ ] Create `/frontend/src/__tests__/EditFields.test.jsx`
  - Renders all 8 input fields
  - Updates values on change
  - Validates non-negative numbers
- [ ] Create `/frontend/src/__tests__/api.test.js`
  - Test `fetchPlayers()` API call
  - Test `fetchPlayerById()` API call
  - Test `updatePlayer()` API call
  - Handle network errors

### Integration Tests
- [ ] Test full user flow with mocked API:
  - Load players → Sort → Select → Edit → Save → Refresh
- [ ] Test error scenarios with mocked failures

### Test Coverage
- [ ] Aim for 80%+ code coverage
- [ ] Run coverage report: `npm run test:coverage`
- [ ] Review uncovered lines and add tests as needed

---

## Phase 9: Final Review & Deployment Prep

### Code Quality
- [x] Review backend code for best practices
- [x] Review frontend code for best practices
- [ ] Ensure no console errors or warnings
- [ ] Remove any debug code or console.logs
- [ ] Verify all environment variables are properly used
- [ ] Check `.gitignore` is complete

### Documentation
- [ ] Verify `.env.example` has all required variables
- [ ] Add inline code comments where needed
- [ ] Ensure all files have proper headers/descriptions

### Final Testing
- [x] Full end-to-end test of all features
- [x] Verify database persists changes
- [x] Verify descriptions were generated correctly
- [x] Test with fresh database (run migrations + seeders again)

### Repository Setup
- [x] Initialize git and commit all code
- [x] Push to GitHub repository
- [x] Verify repository structure matches project plan

---

## Summary

**Total Phases:** 9  
**Total Checkpoints:** 180+  

This checklist ensures every step of the project is completed, tested, and integrated before moving forward. Reference `docs/spec.md` and `docs/project_plan.md` as needed during implementation.
