/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('players', (table) => {
    table.increments('id').primary();
    table.string('player_name').notNullable();
    table.string('position');
    table.integer('games');
    table.integer('at_bat');
    table.integer('runs');
    table.integer('hits');
    table.integer('double_2b');
    table.integer('third_baseman');
    table.integer('home_run');
    table.integer('run_batted_in');
    table.integer('a_walk');
    table.integer('strikeouts');
    table.integer('stolen_base');
    table.integer('caught_stealing'); // Will clean up "--" values during seeding
    table.decimal('avg', 5, 3);
    table.decimal('on_base_percentage', 5, 3);
    table.decimal('slugging_percentage', 5, 3);
    table.decimal('on_base_plus_slugging', 5, 3);
    table.text('description'); // LLM-generated description
    table.timestamps(true, true); // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('players');
};
