import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const { APP_PORT } = process.env;

const config = {
  APP: {
    PORT: Number(APP_PORT),
  },
  DB: {
    DIALECT: process.env.DB_DIALECT,
    CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  },
};

type Config = typeof config;

export { config };
export { type Config };
