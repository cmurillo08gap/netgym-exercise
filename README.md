# Baseball Players App

A full-stack web application for viewing and managing baseball player statistics. Features include sortable player listings, detailed player profiles with AI-generated descriptions, and editable stats.

## Tech Stack

### Backend
- **Node.js** (v22+)
- **Express** - Web framework
- **Knex** - SQL query builder
- **PostgreSQL** - Database

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling

### AI Integration
- **GitHub Models API** - On-demand player description generation (GPT-4o)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v22.12+ (or v20.19+)
- **npm** v10+
- **PostgreSQL** v14+
- **Git**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cmurillo08gap/netgym-exercise.git
cd netgym-exercise
```

### 2. Create the PostgreSQL Database

Connect to PostgreSQL and create the database manually:

```bash
psql -U postgres
```

```sql
CREATE DATABASE "netgym-baseball";
\q
```

> **Note:** The database must be created manually before running migrations. The migrations only create tables, not the database itself.

### 3. Configure Environment Variables

#### Backend Environment

```bash
cp .env.example backend/.env
```

Edit `backend/.env` with your local settings:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=netgym-baseball
DB_USER=postgres
DB_PASS=your_password_here

# GitHub Models API (for AI-generated descriptions)
GITHUB_TOKEN=your_github_token_here
```

> **GitHub Token:** To enable AI-generated player descriptions, you need a GitHub token with access to GitHub Models. Get one at https://github.com/settings/tokens

#### Frontend Environment (Optional)

The frontend defaults to `http://localhost:3001` for the API. To override:

```bash
# Create frontend/.env (optional)
echo "VITE_API_URL=http://localhost:3001" > frontend/.env
```

### 4. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 5. Run Database Migrations & Seed Data

```bash
cd ../backend

# Run migrations (creates tables)
npm run migrate

# Seed the database with player data
npm run seed
```

This will:
- Create the `players` table with all required columns
- Load 172 baseball players from `/data/baseball_data.json`

### 6. Start the Application

#### Option A: Run in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

#### Option B: Using a Process Manager

You can use tools like `concurrently` or `pm2` to run both services.

### 7. Open the Application

Navigate to: **http://localhost:5173**

---

## Project Structure

```
netgym-exercise/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app setup
│   │   ├── server.js           # Server entry point
│   │   ├── db.js               # Knex database connection
│   │   ├── routes/
│   │   │   └── players.js      # Player routes
│   │   ├── controllers/
│   │   │   └── playersController.js
│   │   └── services/
│   │       └── githubModelsService.js  # AI description generator
│   ├── migrations/             # Database migrations
│   ├── seeds/                  # Database seeders
│   └── knexfile.js            # Knex configuration
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── components/
│   │   │   ├── PlayerList.jsx
│   │   │   ├── PlayerRow.jsx
│   │   │   ├── SidePanel.jsx
│   │   │   └── EditFields.jsx
│   │   └── services/
│   │       └── api.js         # API client
│   └── index.html
├── data/
│   └── baseball_data.json     # Source player data
├── docs/
│   ├── spec.md                # Project specification
│   ├── project_plan.md        # Implementation plan
│   └── todo.md                # Development checklist
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all players (supports `?sortBy=hits\|home_run\|player_name` and `?sortDir=asc\|desc`) |
| GET | `/api/players/:id` | Get single player by ID (generates AI description if not exists) |
| PUT | `/api/players/:id` | Update player stats |

---

## Features

### Player List
- View all 172 baseball players
- Sort by Name, Hits, or Home Runs (ascending/descending)
- Click column headers to sort
- Responsive table with sticky headers

### Player Details (Side Panel)
- View detailed player statistics
- AI-generated player description (on first view)
- Collapsible "About" section

### Edit Stats
- Edit 8 player statistics:
  - Games, At Bats, Runs, Hits
  - Doubles (2B), Home Runs, RBIs, Strikeouts
- Validation for non-negative values
- Auto-refresh list after save

---

## Development

### Reset Database

To reset the database and start fresh:

```bash
cd backend

# Rollback all migrations
npm run migrate:rollback

# Run migrations again
npm run migrate

# Re-seed data
npm run seed
```

### Useful Commands

```bash
# Backend
cd backend
npm run dev          # Start development server (nodemon)
npm run start        # Start production server

# Frontend
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Troubleshooting

### Port Already in Use

If port 3001 is busy:
```bash
# Find process using port 3001
lsof -i :3001
# Kill the process
kill -9 <PID>
```

### Database Connection Error

1. Ensure PostgreSQL is running:
   ```bash
   brew services start postgresql  # macOS with Homebrew
   ```

2. Verify database exists:
   ```bash
   psql -U postgres -l | grep netgym-baseball
   ```

3. Check credentials in `backend/.env`

### GitHub Models API Errors

- Ensure `GITHUB_TOKEN` is set in `backend/.env`
- Token needs access to GitHub Models (Copilot)
- If token is invalid, player descriptions will be empty (app still works)

---

## License

This project is for educational/exercise purposes.
