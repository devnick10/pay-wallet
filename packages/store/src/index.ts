export { Provider } from "react-redux";
export { default as store } from "./store/store";
export { useBalance } from "./hooks/useBalance";
export type { RootState, AppDispatch } from "./store/store";
export { setBalance, incrementBalance, decrementBalance } from "./store/balanceSlice";