/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary(); // ID sebagai primary key
    table.integer('order_id').notNullable(); // ID order
    table.integer('product_id').notNullable(); // ID produk
    table.integer('quantity').notNullable(); // Jumlah produk yang dipesan
    table.timestamps(true, true); // created_at dan updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('order_items');
};
