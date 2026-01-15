# Phase 3 Issues & Resolutions

This document tracks issues encountered during Phase 3 (Backend API Implementation) and their resolutions.

## Issue 1: Port 5000 Already in Use

**Problem:**
Server started successfully but immediately exited with "Port 5000 is already in use" error.

**Error Message:**
```
🚀 Server running on http://localhost:5000
📊 API available at http://localhost:5000/api/players
❌ Port 5000 is already in use
```

**Cause:**
macOS uses port 5000 for AirPlay Receiver (System Preferences → General → AirDrop & Handoff → AirPlay Receiver), causing a conflict.

**Solution:**
- Changed default port from 5000 to 3001 in `/backend/src/server.js`
- Updated `PORT` value in `/backend/.env` to 3001

**Files Modified:**
- `/backend/src/server.js`
- `/backend/.env`

**Outcome:**
✅ Server runs successfully on port 3001

---

## Issue 2: Server Missing Error Handling for Port Conflicts

**Problem:**
Original server code didn't provide helpful error messages when the port was already in use - it would just exit silently.

**Solution:**
Added proper error handling to `server.js`:
```javascript
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});
```

**Files Modified:**
- `/backend/src/server.js`

**Outcome:**
✅ Server now provides clear error messages for port conflicts

---

**Phase 3 Status:** ✅ Complete with 2 issues resolved
