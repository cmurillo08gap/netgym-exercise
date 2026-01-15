# Phase 1 Issues & Resolutions

This document tracks issues encountered during Phase 1 (Project Initialization) and their resolutions.

## Issue 1: Node.js Version Incompatibility

**Problem:**
Node.js v20.16.0 was installed, but Vite v7.3.1 requires Node.js v20.19+ or v22.12+

**Error Message:**
```
You are using Node.js 20.16.0. Vite requires Node.js version 20.19+ or 22.12+. 
Please upgrade your Node.js version.
```

**Solution:**
- Used `nvm` (Node Version Manager) to upgrade Node.js
- Ran: `nvm install 22`
- Successfully upgraded from v20.16.0 → v22.22.0
- Ran: `nvm use 22` to activate the new version

**Outcome:**
✅ App runs correctly with Node.js v22.22.0

---

## Issue 2: Tailwind CSS v4 PostCSS Plugin Change

**Problem:**
Tailwind CSS v4 moved the PostCSS plugin to a separate package

**Error Message:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS 
with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

**Solution:**
1. Installed the new PostCSS plugin:
   ```bash
   npm install -D @tailwindcss/postcss tailwindcss@latest
   ```

2. Updated `postcss.config.js`:
   ```javascript
   export default {
     plugins: {
       '@tailwindcss/postcss': {},
       autoprefixer: {},
     },
   }
   ```

3. Updated `src/index.css` to use Tailwind v4 syntax:
   ```css
   @import "tailwindcss";
   ```

**Files Modified:**
- `/frontend/postcss.config.js`
- `/frontend/src/index.css`

**Outcome:**
✅ Tailwind CSS v4 working correctly with PostCSS

---

## Issue 3: Tailwind CSS Init Command Failed

**Problem:**
`npx tailwindcss init -p` command failed to execute

**Error Message:**
```
npm error could not determine executable to run
```

**Solution:**
- Manually created configuration files:
  - `tailwind.config.js`
  - `postcss.config.js`

**Outcome:**
✅ Manual file creation worked successfully

---

## Issue 4: Environment Variable Structure Clarification

**Problem:**
Initial plan had redundant `.env` files (both root and backend)

**Discussion:**
- Only backend needs `.env` for database credentials and API keys
- Frontend uses build-time environment variables (not runtime `.env`)
- Root `.env.example` serves as documentation template

**Solution:**
- Simplified to single `.env` location: `/backend/.env`
- Updated documentation and todo.md accordingly

**Outcome:**
✅ Cleaner project structure with single `.env` location

---

## Issue 5: VS Code Linter Errors for Tailwind Directives

**Problem:**
VS Code CSS linter showed errors for `@import "tailwindcss";`

**Error Message:**
```
Unknown at rule @tailwind
```

**Solution:**
- This is expected behavior (VS Code's CSS linter doesn't recognize Tailwind directives)
- No action needed - the app compiles correctly despite linter warnings

**Outcome:**
✅ Expected behavior (safe to ignore)

---

**Phase 1 Status:** ✅ Complete with 5 issues resolved
4. **Manual configuration works** when CLI tools fail unexpectedly
5. **VS Code linter warnings** for Tailwind directives are safe to ignore

---

## Next Steps: Phase 2
Ready to proceed with Backend Setup & Database:
- Install backend dependencies (Express, Knex, pg, GitHub Models API client, etc.)
- Configure Knex for PostgreSQL
- Create database migrations
- Create database seeders
