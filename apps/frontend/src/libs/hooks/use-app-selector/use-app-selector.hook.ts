import { useSelector } from "react-redux";

import { type store } from "~/modules/store/store.js";

const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();

export { useAppSelector };
