const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('players').del();
  
  // Read the baseball data JSON file
  const dataPath = path.join(__dirname, '../../data/baseball_data.json');
  const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  // Transform and clean the data
  const players = rawData.map(player => ({
    player_name: player['Player name'],
    position: player.position,
    games: player.Games,
    at_bat: player['At-bat'],
    runs: player.Runs,
    hits: player.Hits,
    double_2b: player['Double (2B)'],
    third_baseman: player['third baseman'],
    home_run: player['home run'],
    run_batted_in: player['run batted in'],
    a_walk: player['a walk'],
    strikeouts: player.Strikeouts,
    stolen_base: player['stolen base'],
    // Clean up "--" values to null for caught_stealing
    caught_stealing: player['Caught stealing'] === '--' ? null : player['Caught stealing'],
    avg: player.AVG,
    on_base_percentage: player['On-base Percentage'],
    slugging_percentage: player['Slugging Percentage'],
    on_base_plus_slugging: player['On-base Plus Slugging'],
    description: null // Will be populated later via CLI command
  }));
  
  // Insert players in batches
  await knex('players').insert(players);
};
