import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import payoutsReducer from "./payoutsSlice";
import transactionsSlice from "./transactionSlice";

const store = configureStore({
    reducer: {
        balance: balanceReducer,
        payouts: payoutsReducer,
        transactions: transactionsSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 