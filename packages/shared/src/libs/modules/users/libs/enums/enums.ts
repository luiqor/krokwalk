const UsersApiPath = {
	ROOT: "/",
	$ID_PLACES: "/:id/places",
	$ID: "/:id",
	PLACES_$ID: "/places/:placeId",
	PLACES_$ID_VISIT_STATUS: "/places/:placeId/visit-status",
	PLACES_$ID_CONFIRM: "/places/:placeId/confirm",
} as const;

export { UsersApiPath };
