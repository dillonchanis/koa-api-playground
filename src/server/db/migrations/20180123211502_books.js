exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
    table.increments()
    table.string('name').notNullable()
    table.string('author').notNullable()
    table.string('genre').notNullable()
    table.integer('rating').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
