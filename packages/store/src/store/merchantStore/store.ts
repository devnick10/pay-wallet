import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import payoutsReducer from "./payoutsSlice";

const store = configureStore({
    reducer: {
        balance: balanceReducer,
        payouts: payoutsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;