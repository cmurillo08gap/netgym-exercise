# Baseball Players App - Specification

## Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express.js + Knex.js
- **Database**: PostgreSQL (local)
- **LLM**: GitHub Models API (one-time batch generation)

## Core Features

### 1. Player List View
- Display all players with their stats
- Default sort by Hits (descending)
- Toggle sort between Hits or Home Runs (both descending)
- Clean, neutral Tailwind styling

### 2. Side Panel (Desktop & Mobile)
- **Desktop**: Slides in from right
- **Mobile**: Full-screen modal
- Contains:
  - LLM-generated 1-paragraph player description
  - 8 editable stat fields: Games, At-bat, Runs, Hits, Doubles, Home Runs, RBIs, Strikeouts
  - Save button to persist changes
  - Close button to collapse panel
- After save: list refreshes with updated stats

### 3. Edit Functionality
- Simple validation: non-negative numbers only
- Changes saved to database
- List auto-refreshes post-save

### 4. Database Setup
- Knex migration: create players table with all fields + description (initially empty)
- Knex seeder: populate all players from `baseball_data.json`
- Players table includes: id, name, position, games, at_bat, runs, hits, double, home_run, rbi, strikeouts, description, plus other stats

### 5. CLI Command
- Standalone script to generate descriptions using GitHub Models API
- Batch process all players one-time
- Store descriptions in database
- Run manually with full user control

### 6. API Endpoints
- `GET /api/players?sortBy=hits|homerun` - fetch all players with sorting
- `GET /api/players/:id` - fetch single player details
- `PUT /api/players/:id` - update player stats

### 7. Environment Setup
- `.env.example` file with required variables
- Local Postgres database (already running)
- No README for now
