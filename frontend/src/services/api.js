/**
 * API Service Layer
 * 
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Fetch all players with optional sorting
 * @param {string} sortBy - Field to sort by ('hits' or 'home_run')
 * @returns {Promise<Array>} Array of player objects
 */
export async function fetchPlayers(sortBy = 'hits') {
  const response = await fetch(`${API_BASE_URL}/api/players?sortBy=${sortBy}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }
  
  return response.json();
}

/**
 * Fetch a single player by ID
 * @param {number} id - Player ID
 * @returns {Promise<Object>} Player object
 */
export async function fetchPlayerById(id) {
  const response = await fetch(`${API_BASE_URL}/api/players/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Player not found');
    }
    throw new Error('Failed to fetch player');
  }
  
  return response.json();
}

/**
 * Update a player's stats
 * @param {number} id - Player ID
 * @param {Object} data - Object with stats to update
 * @returns {Promise<Object>} Updated player object
 */
export async function updatePlayer(id, data) {
  const response = await fetch(`${API_BASE_URL}/api/players/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update player');
  }
  
  return response.json();
}
