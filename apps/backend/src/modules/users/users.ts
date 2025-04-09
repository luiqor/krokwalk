import { encrypt } from "~/libs/modules/encrypt/encrypt";

import { UserModel } from "./user.model";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, encrypt);

export { userService };