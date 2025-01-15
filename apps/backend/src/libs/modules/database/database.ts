import { config } from "../config/config";
import { BaseDatabase } from "./base-database";

const database = new BaseDatabase(config);

export { database };
export { DatabaseTableName } from "./libs/enums/enums";
