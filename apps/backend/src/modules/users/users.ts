import { encrypt } from "~/libs/modules/encrypt/encrypt";

import { achievementService } from "../achievements/achievements";
import { userPlacesService } from "../user-places/user-places";

import { UserModel } from "./user.model";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const userRepository = new UserRepository(UserModel);
const userService = new UserService({
	encrypt,
	repository: userRepository,
	achievementService,
});
const userController = new UserController(userService, userPlacesService);

const userRouter = userController.router;

export { userService, userRouter, type UserService };
