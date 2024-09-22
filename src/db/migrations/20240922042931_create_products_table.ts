/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary(); // ID sebagai primary key
    table.string('name').notNullable(); // Nama produk
    table.integer('price').notNullable(); // Harga produk
    table.integer('stock').notNullable().defaultTo(0); // Stok produk, default 0
    table.integer('sold').notNullable().defaultTo(0); // Terjual, default 0
    table.timestamps(true, true); // created_at dan updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products'); // Menghapus tabel jika rollback
};
