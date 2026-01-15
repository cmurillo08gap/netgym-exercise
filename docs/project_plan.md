# Project Plan: Baseball Players App

This plan is based on the detailed specification in `docs/spec.md`. It provides a step-by-step, iterative blueprint for building the app, broken down into right-sized, incremental prompts for code-generation LLMs. Each prompt builds on the previous, ensuring best practices and no orphaned code.

---

## 1. Project Initialization

### Prompt 1: Initialize the Project Structure
```
Create a new Node.js project with Express.js and Knex.js for the backend, and set up a React project with Tailwind CSS for the frontend. Organize the codebase into `backend/` and `frontend/` directories. Add a `.env.example` file in the root with placeholders for all required environment variables (e.g., DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, CLAUDE_API_KEY).
```

---

## 2. Database Setup

### Prompt 2: Create Knex Migration for Players Table
```
Write a Knex migration to create a `players` table in PostgreSQL. Include all fields from the player data and a `description` field (nullable, initially empty). Use best practices for naming and types.
```

### Prompt 3: Create Knex Seeder for Initial Player Data
```
Write a Knex seeder that loads all player data from `data/baseball_data.json` into the `players` table. Leave the `description` field empty for now.
```

---

## 3. Backend API

### Prompt 4: Implement GET /api/players Endpoint
```
Implement an Express route `GET /api/players` that returns all players, supporting optional sorting by `hits` or `home_run` (descending). Use Knex for DB queries. Return JSON.
```

### Prompt 5: Implement GET /api/players/:id Endpoint
```
Implement an Express route `GET /api/players/:id` that returns a single player's details by ID, including the description.
```

### Prompt 6: Implement PUT /api/players/:id Endpoint
```
Implement an Express route `PUT /api/players/:id` that updates the 8 editable fields for a player. Validate that all values are non-negative numbers. Return the updated player.
```

---

## 4. CLI Description Generator

### Prompt 7: Implement CLI Script for LLM Descriptions
```
Create a standalone Node.js CLI script that reads all players without a description, calls the GitHub Models API to generate a 1-paragraph description for each, and updates the database. Use the GitHub token from environment variables. Skip players who already have a description.
```

---

## 5. Frontend Implementation

### Prompt 8: Set Up React App with Tailwind CSS
```
Initialize the React frontend with Tailwind CSS. Set up the project structure and configure Tailwind. Create a basic layout with a player list and a placeholder for the side panel.
```

### Prompt 9: Fetch and Display Player List
```
Implement a component that fetches the player list from the backend API and displays it in a table or list. Add sorting controls for Hits and Home Runs (descending).
```

### Prompt 10: Implement Side Panel for Player Details
```
Implement a side panel (desktop: slides in from right; mobile: full-screen modal) that displays when a player is selected. Show the player's description and the 8 editable fields. Add a close button.
```

### Prompt 11: Edit and Save Player Data
```
Add editing capability for the 8 fields in the side panel. Include a Save button that sends a PUT request to the backend. On success, refresh the player list and close the panel.
```

---

## 6. Integration and Finalization

### Prompt 12: Wire Everything Together
```
Ensure all components are integrated: the frontend fetches and updates data via the backend, the backend serves data from the database, and the CLI script can be run independently to populate descriptions. Test the full flow end-to-end.
```

---

# Iterative Breakdown of Prompts

Each prompt above can be further broken down into smaller, safer steps. Here is a refined breakdown:

---

## 1. Project Initialization (Detailed)
- Initialize a new git repository
- Create backend/ and frontend/ directories
- Set up Node.js project in backend/
- Set up React + Tailwind in frontend/
- Add .env.example with all required variables

## 2. Database Setup (Detailed)
- Install and configure Knex and pg in backend/
- Create knexfile.js and configure environments
- Write migration for players table
- Write seeder for player data

## 3. Backend API (Detailed)
- Set up Express server
- Connect Knex to Postgres
- Implement GET /api/players
- Implement GET /api/players/:id
- Implement PUT /api/players/:id

## 4. CLI Description Generator (Detailed)
- Set up CLI entry point
- Read players without description from DB
- Call GitHub Models API for each player
- Update DB with new descriptions
- Handle errors and rate limits

## 5. Frontend Implementation (Detailed)
- Initialize React app
- Configure Tailwind
- Create PlayerList component
- Add sorting controls
- Create SidePanel component
- Fetch and display player details
- Add edit/save functionality
- Handle loading and error states

## 6. Integration and Finalization (Detailed)
- Test backend endpoints
- Test CLI script
- Test frontend integration
- Polish UI/UX
- Final review and cleanup

---

# Prompts for Code-Generation LLM

Each prompt above is ready to be used as a standalone instruction for a code-generation LLM. They are sequenced to ensure incremental, best-practice development with no orphaned code at any stage.
