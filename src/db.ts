import { knex } from "knex";
const dbConfig = require("../knexfile");

export default knex(dbConfig.development);

