const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const playersRouter = require('./routes/players');

const app = express();

// Middleware
// Enable CORS for all routes - allows frontend to make requests from different origin (e.g., localhost:5173)
app.use(cors());
// Parse incoming JSON request bodies - makes req.body available for JSON payloads
app.use(bodyParser.json());
// Parse URL-encoded request bodies - handles form submissions with extended syntax for nested objects
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/players', playersRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
