import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const { APP_PORT } = process.env;

const config = {
  APP: {
    PORT: Number(APP_PORT),
  },
};

export { config };
