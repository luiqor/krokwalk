const HTTPErrorMessage = {
	INTERNAL_SERVER_ERROR: "Internal server error.",
	NOT_FOUND: "The requested resource was not found.",
	TRIPS: {
		NOT_ENOUGH_PLACES:
			"There are no places to visit on specified path. Please, try to change filters.",
		INVALID_WALK_DURATION: "The minimum walk duration is too short.",
		NO_VALID_ROUTE: "There is no valid route between the specified points.",
	},
} as const;

export { HTTPErrorMessage };
