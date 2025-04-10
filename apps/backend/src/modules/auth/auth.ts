import { encrypt } from "~/libs/modules/encrypt/encrypt";
import { userService } from "../users/users";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

const authService = new AuthService(userService, encrypt);
const authController = new AuthController(authService);

const authRouter = authController.router;

export { authRouter };
