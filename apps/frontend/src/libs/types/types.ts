import { extraArgument, store } from "~/modules/store/store.js";

type AsyncThunkConfig = {
  state: ReturnType<typeof store.getState>;
  dispatch: typeof store.dispatch;
  extra: typeof extraArgument;
};

type TitledEntity = {
  title: string;
  [key: string]: string | number | boolean;
};

export type { AsyncThunkConfig, TitledEntity };
