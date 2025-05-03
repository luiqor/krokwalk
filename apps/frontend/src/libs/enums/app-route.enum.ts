const AppRoute = {
	ANY: "*",
	ROOT: "/",
	INFORMATION: "places/:id",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	TOURPAGE: "/tour-page",
	TOURSPAGE: "/tours",
	PROFILE: "/profile",
	PROFILE_$ID: "/profile/:id",
} as const;

export { AppRoute };
