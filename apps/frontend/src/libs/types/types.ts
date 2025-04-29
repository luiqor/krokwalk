import { extraArgument, store } from "~/modules/store/store.js";

type AsyncThunkConfig = {
	state: ReturnType<typeof store.getState>;
	dispatch: typeof store.dispatch;
	extra: typeof extraArgument;
};

type UrlFriendlyEntity = {
	slug: string;
	title: string;
	[key: string]: string | number | boolean;
};

export type { AsyncThunkConfig, UrlFriendlyEntity };
export type { GeoPoint } from "shared";
