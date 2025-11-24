import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./features/balanceSlice";
import payoutsReducer from "./features/payoutsSlice";
import transactionsSlice from "./features/transactionSlice";
import merchantInfoReducer from "./features/merchantSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      balance: balanceReducer,
      payouts: payoutsReducer,
      transactions: transactionsSlice,
      merchantInfo: merchantInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
