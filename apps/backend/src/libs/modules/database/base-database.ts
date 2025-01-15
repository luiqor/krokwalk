import knex, { type Knex } from "knex";
import { knexSnakeCaseMappers, Model } from "objection";

import { DatabaseTableName } from "./libs/enums/enums";
import { type Config } from "../config/config";

class BaseDatabase {
  private config: Config;

  public constructor(config: Config) {
    this.config = config;
  }

  public connect(): void {
    console.log("Connecting to database...");

    const knexInstance = knex(this.initialConfig);
    Model.knex(knexInstance);
  }

  private get initialConfig(): Knex.Config {
    return {
      client: this.config.DB.DIALECT,
      connection: {
        connectionString: this.config.DB.CONNECTION_STRING,
      },
      debug: false,
      migrations: {
        directory: "src/db/migrations",
        tableName: DatabaseTableName.MIGRATIONS,
      },
      seeds: {
        directory: "src/db/seeds",
      },
      ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true }),
    };
  }

  public get environmentsConfig(): Knex.Config {
    return this.initialConfig;
  }
}

export { BaseDatabase };
