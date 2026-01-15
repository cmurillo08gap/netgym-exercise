# Phase 2 Issues & Resolutions

This document tracks issues encountered during Phase 2 (Backend Setup & Database) and their resolutions.

## Issue 1: Data Type for `caught_stealing` Field

**Problem:**
The baseball data JSON file contains a "--" value for the `Caught stealing` field (player M Ott), which is not numeric. Initial migration attempted to use `table.string()` to accommodate this value.

**Discussion:**
- Question raised: Should we accommodate bad data in the schema, or clean it up during the seed process?
- Decision: Clean up data during seeding rather than compromising the schema integrity

**Solution:**
- Changed migration schema from `table.string('caught_stealing')` to `table.integer('caught_stealing')`
- Updated seeder to transform "--" values to `null`:
  ```javascript
  caught_stealing: player['Caught stealing'] === '--' ? null : player['Caught stealing']
  ```
- Verified no other fields had similar data quality issues (only `Caught stealing` had "--" values)

**Files Modified:**
- `/backend/migrations/20260115180252_create_players_table.js`
- `/backend/seeds/seed_players.js`

**Outcome:**
✅ Database schema maintains proper data types
✅ Bad data is cleaned during import
✅ All ~100 players loaded successfully

---

**Phase 2 Status:** ✅ Complete with 1 minor issue resolved
