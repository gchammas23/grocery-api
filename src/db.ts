import { knex } from "knex";
const dbConfig = require("../knexfile");

// Set up database connection using knex
export default knex(dbConfig.development);

