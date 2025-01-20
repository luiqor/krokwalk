import { useDispatch } from "react-redux";
import { type store } from "~/modules/store/store.js";

const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export { useAppDispatch };
