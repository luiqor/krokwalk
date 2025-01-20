import { store } from "../../store.js";
import { extraArgument } from "../../store.js";

type AsyncThunkConfig = {
  state: typeof store.getState;
  dispatch: typeof store.dispatch;
  extra: typeof extraArgument;
};

export { type AsyncThunkConfig };
