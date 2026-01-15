const db = require('../db');
const { generatePlayerDescription } = require('../services/githubModelsService');

// GET /api/players - Get all players with optional sorting
const getAllPlayers = async (req, res) => {
  try {
    const { sortBy = 'hits' } = req.query; // Default sort by hits
    
    // Validate sortBy parameter
    const validSortFields = ['hits', 'home_run'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'hits';
    
    const players = await db('players')
      .select('*')
      .orderBy(sortField, 'desc');
    
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

// GET /api/players/:id - Get a single player by ID
// If player has no description, generate one on-the-fly using GitHub Models API
const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    
    let player = await db('players')
      .where({ id })
      .first();
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    // Generate description on-the-fly if not exists
    if (!player.description) {
      try {
        console.log(`Generating description for ${player.player_name}...`);
        const description = await generatePlayerDescription(player);
        
        // Update database with generated description
        await db('players')
          .where({ id })
          .update({ 
            description, 
            updated_at: db.fn.now() 
          });
        
        // Update player object with new description
        player.description = description;
        console.log(`✅ Description generated for ${player.player_name}`);
      } catch (genError) {
        // Log error but don't fail the request - return player without description
        console.error(`Failed to generate description for ${player.player_name}:`, genError.message);
      }
    }
    
    res.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
};

// PUT /api/players/:id - Update a player's editable stats
const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      games,
      at_bat,
      runs,
      hits,
      double_2b,
      home_run,
      run_batted_in,
      strikeouts
    } = req.body;
    
    // Validate that all values are non-negative numbers
    const updates = {
      games,
      at_bat,
      runs,
      hits,
      double_2b,
      home_run,
      run_batted_in,
      strikeouts
    };
    
    // Check for invalid values
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && value !== null) {
        if (typeof value !== 'number' || value < 0) {
          return res.status(400).json({ 
            error: `Invalid value for ${key}. Must be a non-negative number.` 
          });
        }
      }
    }
    
    // Check if player exists
    const player = await db('players').where({ id }).first();
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    // Update the player
    await db('players')
      .where({ id })
      .update({
        ...updates,
        updated_at: db.fn.now()
      });
    
    // Fetch and return the updated player
    const updatedPlayer = await db('players').where({ id }).first();
    res.json(updatedPlayer);
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'Failed to update player' });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  updatePlayer
};
