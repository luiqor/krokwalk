const UsersApiPath = {
	ROOT: "/",
	$ID_PLACES: "/:id/places",
	$ID: "/:id",
	PLACES_$ID: "/places/:placeId",
	PLACES_$ID_VISIT_STATUS: "/places/:placeId/visit-status",
	PLACES_$ID_CONFIRM: "/places/:placeId/confirm",
	ACHIEVEMENTS_$ACHIEVEMNT_ID: "/achievements/:achievementId",
	LEADERBOARD_CONFIRMED_PLACES: "/leaderboard/confirmed-places",
	LEADERBOARD_ACHIEVEMENTS: "/leaderboard/achievements",
} as const;

export { UsersApiPath };
