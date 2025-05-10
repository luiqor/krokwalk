import { editMainAchievement, getUser } from "./actions.js";
import { UserService } from "./user.service.js";
import { actions, reducer } from "./user.slice.js";

const allActions = {
	...actions,
	getUser,
	editMainAchievement,
};

const userService = new UserService();

export { allActions as actions, reducer, userService };
