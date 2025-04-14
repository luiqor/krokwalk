import { logOut, signIn, signUp } from "./actions.js";
import { AuthService } from "./auth.service.js";
import { actions, reducer } from "./auth.slice.js";

const allActions = {
	...actions,
	signIn,
	signUp,
	logOut,
};
const authService = new AuthService();

export { authService, allActions as actions, reducer };
export type { UserDto } from "shared";
