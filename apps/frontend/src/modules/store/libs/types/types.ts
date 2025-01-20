import { type store, type extraArgument } from "../../store.js";

type AsyncThunkConfig = {
  state: ReturnType<typeof store.getState>;
  dispatch: typeof store.dispatch;
  extra: typeof extraArgument;
};

export { type AsyncThunkConfig };
