// Implement the initialization migration schema which should be run before calling any API to set up the necessary tables
import type { Knex } from "knex";

// This will contain the changes that need to be done. In this case we create the users and items tables and set up all the fields within these tables
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
    }).createTable('items', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('name').notNullable();
        table.integer('quantity').notNullable();
        table.string('store').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}

// This should revert whatever has been done in the previous function. In this case, we need to drop both tables
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('items').dropTableIfExists('users');
}

