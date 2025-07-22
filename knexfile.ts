import "dotenv/config";

import type { Knex } from "knex";
import mainConfig from "./src/config";

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
      directory: "./migrations"
    }
  },

};

module.exports = config;
