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
  GEO_APIFY: {
    URL: String(process.env.GEO_APIFY_URL),
    API_KEY: String(process.env.GEO_APIFY_API_KEY),
  },
};

type Config = typeof config;

export { config };
export { type Config };
