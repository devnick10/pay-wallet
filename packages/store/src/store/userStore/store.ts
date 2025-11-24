import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./features/balanceSlice";
import p2pReducer from "./features/p2PSlice";
import onRampTxnsReducer from "./features/onRampTransactionSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      balance: balanceReducer,
      p2PTransactions: p2pReducer,
      onRampTransactions: onRampTxnsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
