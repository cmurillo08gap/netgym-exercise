# Phase 1: Project Initialization - Issues & Resolutions

## Date: January 15, 2026

---

## Issues Encountered

### 1. Node.js Version Incompatibility ⚠️
**Issue:** Node.js v20.16.0 was installed, but Vite v7.3.1 requires Node.js v20.19+ or v22.12+

**Error Message:**
```
You are using Node.js 20.16.0. Vite requires Node.js version 20.19+ or 22.12+. 
Please upgrade your Node.js version.
```

**Resolution:**
- Used `nvm` (Node Version Manager) to upgrade Node.js
- Ran: `nvm install 22`
- Successfully upgraded from v20.16.0 → v22.22.0
- Ran: `nvm use 22` to activate the new version

**Status:** ✅ Resolved (app runs despite terminal showing old version in some sessions)

---

### 2. Tailwind CSS v4 PostCSS Plugin Change 🔧
**Issue:** Tailwind CSS v4 moved the PostCSS plugin to a separate package

**Error Message:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS 
with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

**Resolution:**
1. Installed the new PostCSS plugin:
   ```bash
   npm install -D @tailwindcss/postcss tailwindcss@latest
   ```

2. Updated `postcss.config.js`:
   ```javascript
   // BEFORE
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   
   // AFTER
   export default {
     plugins: {
       '@tailwindcss/postcss': {},
       autoprefixer: {},
     },
   }
   ```

3. Updated `src/index.css` to use Tailwind v4 syntax:
   ```css
   // BEFORE
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   // AFTER
   @import "tailwindcss";
   ```

**Status:** ✅ Resolved

---

### 3. Tailwind CSS Init Command Failed ❌
**Issue:** `npx tailwindcss init -p` command failed to execute

**Error Message:**
```
npm error could not determine executable to run
```

**Resolution:**
- Manually created configuration files:
  - `tailwind.config.js`
  - `postcss.config.js`

**Status:** ✅ Resolved (manual file creation worked)

---

### 4. Environment Variable Structure Clarification 📝
**Issue:** Initial plan had redundant `.env` files (both root and backend)

**Discussion:**
- Only backend needs `.env` for database credentials and API keys
- Frontend uses build-time environment variables (not runtime `.env`)
- Root `.env.example` serves as documentation template

**Resolution:**
- Simplified to single `.env` location: `/backend/.env`
- Updated documentation and todo.md accordingly

**Status:** ✅ Resolved

---

### 5. VS Code Linter Errors for Tailwind Directives ⚠️
**Issue:** VS Code CSS linter showed errors for `@import "tailwindcss";`

**Error Message:**
```
Unknown at rule @tailwind
```

**Resolution:**
- This is expected behavior (VS Code's CSS linter doesn't recognize Tailwind directives)
- No action needed - the app compiles correctly despite linter warnings

**Status:** ✅ Expected behavior (can be ignored)

---

## Final Status: Phase 1 Complete ✅

### What Works:
- ✅ Git repository initialized
- ✅ Backend directory structure created with `package.json`
- ✅ Frontend React + Vite + Tailwind CSS setup complete
- ✅ Development server running at http://localhost:5173/
- ✅ `.gitignore` configured
- ✅ `.env.example` created with all required variables

### Manual Steps Completed by User:
- ✅ Created `/backend/.env` (copied from `.env.example`)
- ✅ Configured database credentials in `.env`

### Outstanding Items:
- None - Phase 1 fully complete

---

## Lessons Learned

1. **Always verify Node.js version compatibility** before initializing frontend frameworks
2. **Tailwind CSS v4 has breaking changes** - requires `@tailwindcss/postcss` package
3. **Keep environment variable structure simple** - avoid redundant `.env` files
4. **Manual configuration works** when CLI tools fail unexpectedly
5. **VS Code linter warnings** for Tailwind directives are safe to ignore

---

## Next Steps: Phase 2
Ready to proceed with Backend Setup & Database:
- Install backend dependencies (Express, Knex, pg, GitHub Models API client, etc.)
- Configure Knex for PostgreSQL
- Create database migrations
- Create database seeders
