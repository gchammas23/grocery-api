// This is the main configuration file for the database connection
import "dotenv/config";

import type { Knex } from "knex";
import mainConfig from "./src/utils/config";

// Set up configuration for development. The same can be done for all other environments (staging, production)
const config: { [key: string]: Knex.Config } = {
  development: {
    client: mainConfig.db.client,
    connection: {
      user: mainConfig.db.user,
      password: mainConfig.db.password as string,
      host: mainConfig.db.host,
      database: mainConfig.db.name
    },
    migrations: {
      directory: "./migrations" // Define the directory where migrations will be stored within the project
    }
  },

};

module.exports = config;
