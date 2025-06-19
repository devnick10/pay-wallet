import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import p2pReducer from "./p2PSlice";
import onRampTxnsReducer from "./onRampTransactionSlice";

const store = configureStore({
    reducer: {
        balance: balanceReducer,
        p2PTransactions: p2pReducer,
        onRampTransactions:onRampTxnsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;