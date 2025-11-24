export { useBalance } from "./useBalance";
export { useOnRampTxns } from "./useOnRampTxns";
export { useP2pTransactions } from "./useP2pTransactions";

import { useDispatch, useSelector, useStore } from "react-redux";
import type {
  AppDispatch,
  AppStore,
  RootState,
} from "../../store/userStore/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
