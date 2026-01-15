#!/usr/bin/env node

/**
 * CLI Script: Generate Player Descriptions
 * 
 * This script queries the database for players without descriptions,
 * generates descriptions using the GitHub Models API, and updates
 * the database with the generated content.
 * 
 * Usage: npm run generate-descriptions
 * 
 * Options (via environment variables):
 * - BATCH_SIZE: Number of players to process (default: all)
 * - DELAY_MS: Delay between API calls in milliseconds (default: 1000)
 */

require('dotenv').config();

const db = require('../src/db');
const { generatePlayerDescription } = require('../src/services/githubModelsService');

// Configuration
const BATCH_SIZE = process.env.BATCH_SIZE ? parseInt(process.env.BATCH_SIZE) : null;
const DELAY_MS = process.env.DELAY_MS ? parseInt(process.env.DELAY_MS) : 1000;

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get all players without descriptions
 */
async function getPlayersWithoutDescriptions() {
  const query = db('players')
    .whereNull('description')
    .orWhere('description', '');
  
  if (BATCH_SIZE) {
    query.limit(BATCH_SIZE);
  }
  
  return query.select('*');
}

/**
 * Update a player's description in the database
 */
async function updatePlayerDescription(playerId, description) {
  await db('players')
    .where({ id: playerId })
    .update({
      description,
      updated_at: db.fn.now()
    });
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting description generation...\n');
  
  // Verify GitHub token is set
  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN environment variable is not set');
    console.error('   Please add your GitHub token to /backend/.env');
    process.exit(1);
  }
  
  try {
    // Get players without descriptions
    const players = await getPlayersWithoutDescriptions();
    
    if (players.length === 0) {
      console.log('✅ All players already have descriptions!');
      process.exit(0);
    }
    
    console.log(`📊 Found ${players.length} players without descriptions\n`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const progress = `[${i + 1}/${players.length}]`;
      
      try {
        console.log(`${progress} Generating description for ${player.player_name}...`);
        
        const description = await generatePlayerDescription(player);
        await updatePlayerDescription(player.id, description);
        
        console.log(`${progress} ✅ ${player.player_name} - Done`);
        successCount++;
        
        // Add delay between API calls to avoid rate limiting
        if (i < players.length - 1) {
          await sleep(DELAY_MS);
        }
        
      } catch (error) {
        console.error(`${progress} ❌ ${player.player_name} - Error: ${error.message}`);
        errorCount++;
        
        // If rate limited, wait longer before continuing
        if (error.message.includes('429') || error.message.includes('rate')) {
          console.log('   ⏳ Rate limited. Waiting 30 seconds...');
          await sleep(30000);
        }
      }
    }
    
    console.log('\n========================================');
    console.log('📊 Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total: ${players.length}`);
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  } finally {
    // Close database connection
    await db.destroy();
  }
}

// Run the script
main();
