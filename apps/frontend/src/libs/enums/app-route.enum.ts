const AppRoute = {
	ANY: "*",
	ROOT: "/",
	PLACE_$ID: "/places/:id",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	TOUR_$ID: "/tour/:id",
	TOURS: "/tours",
	PROFILE: "/profile",
	PROFILE_$ID: "/profile/:id",
} as const;

export { AppRoute };
