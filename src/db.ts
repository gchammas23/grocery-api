import { Knex, knex } from "knex";
import mainConfig from "./config";

// Set up database configuration for local DB
const config: Knex.Config = {
    client: mainConfig.db.client,
    connection: {
        user: mainConfig.db.user,
        password: mainConfig.db.password,
        host: mainConfig.db.host,
        database: mainConfig.db.name
    },
    migrations: {
        directory: './migrations'
    }
}

export default knex(config);

