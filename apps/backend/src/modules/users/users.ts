import { encrypt } from "~/libs/modules/encrypt/encrypt";

import { UserModel } from "./user.model";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { userPlacesService } from "../user-places/user-places";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, encrypt);
const userController = new UserController(userService, userPlacesService);

const userRouter = userController.router;

export { userService, userRouter };
