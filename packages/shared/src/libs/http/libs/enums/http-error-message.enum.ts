const HTTPErrorMessage = {
	INTERNAL_SERVER_ERROR: "Internal server error.",
	NOT_FOUND: "The requested resource was not found.",
	TRIPS: {
		NOT_ENOUGH_PLACES:
			"There are no places to visit on specified path. Please, try to change filters.",
		INVALID_WALK_DURATION: "The minimum walk duration is too short.",
		NO_VALID_ROUTE: "There is no valid route between the specified points.",
		TRIP_BETWEEN_POINTS_NOT_FOUND:
			"Trip between specified points could not be created.",
	},
	AUTH: {
		INVALID_CREDENTIALS: "Invalid credentials.",
		EMAIL_ALREADY_EXISTS: "User with this email already exists.",
		USERNAME_ALREADY_EXISTS: "User with this username already exists.",
		UNAUTHORIZED: "Unauthorized access.",
		INVALID_TOKEN: "Invalid token.",
		FORBIDDEN: "Forbidden access.",
		USER_NOT_FOUND: "User not found.",
	},
	USER: {
		NOT_FOUND: "User not found.",
	},
} as const;

export { HTTPErrorMessage };
