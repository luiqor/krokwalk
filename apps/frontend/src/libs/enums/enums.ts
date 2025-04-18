const SliceName = {
	AUTH: "auth",
	PLACES: "places",
	TAGS: "tags",
	LOCATION: "location",
	TRIPS: "trips",
} as const;

export { SliceName };
export { APIPath } from "shared";
export { AppRoute } from "./app-route.enum.js";
export { DataStatus } from "./data-status.enum.js";
