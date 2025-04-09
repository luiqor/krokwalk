import { BaseEncrypt } from "./base-encrypt.module.js";

const SALT_ROUNDS = 10;

const encrypt = new BaseEncrypt(SALT_ROUNDS);

export { encrypt };
export { type Encrypt } from "./libs/types/types.js";
