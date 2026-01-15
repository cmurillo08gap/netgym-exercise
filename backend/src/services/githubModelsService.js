/**
 * GitHub Models API Service
 * 
 * Uses @azure-rest/ai-inference to interact with GitHub Models API
 * for generating player descriptions.
 */

const ModelClient = require('@azure-rest/ai-inference').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// GitHub Models API endpoint
const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com';

// Model to use for generation (GPT-4o is recommended for quality)
const MODEL_NAME = 'gpt-4o';

/**
 * Create and return a configured GitHub Models API client
 */
function createClient() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }
  
  return ModelClient(
    GITHUB_MODELS_ENDPOINT,
    new AzureKeyCredential(token)
  );
}

/**
 * Generate a player description using the GitHub Models API
 * 
 * @param {Object} player - Player object with stats
 * @returns {Promise<string>} Generated description
 */
async function generatePlayerDescription(player) {
  const client = createClient();
  
  const prompt = buildPrompt(player);
  
  const response = await client.path('/chat/completions').post({
    body: {
      model: MODEL_NAME,
      messages: [
        {
          role: 'system',
          content: 'You are a baseball analyst and historian. Write concise, engaging player descriptions that highlight career achievements and statistical significance. Keep descriptions to one paragraph (3-5 sentences).'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    }
  });
  
  if (response.status !== '200') {
    throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(response.body)}`);
  }
  
  const description = response.body.choices[0]?.message?.content;
  
  if (!description) {
    throw new Error('No description generated from API response');
  }
  
  return description.trim();
}

/**
 * Build the prompt for generating a player description
 * 
 * @param {Object} player - Player object with stats
 * @returns {string} Formatted prompt
 */
function buildPrompt(player) {
  return `Write a one-paragraph description for the following baseball player:

Name: ${player.player_name}
Position: ${player.position}
Games Played: ${player.games}
At Bats: ${player.at_bat}
Runs: ${player.runs}
Hits: ${player.hits}
Doubles: ${player.double_2b}
Home Runs: ${player.home_run}
RBIs: ${player.run_batted_in}
Walks: ${player.a_walk}
Strikeouts: ${player.strikeouts}
Stolen Bases: ${player.stolen_base}
Batting Average: ${player.avg}
On-Base Percentage: ${player.on_base_percentage}
Slugging Percentage: ${player.slugging_percentage}
OPS: ${player.on_base_plus_slugging}

Focus on their career highlights, statistical achievements, and historical significance in baseball.`;
}

module.exports = {
  generatePlayerDescription
};
