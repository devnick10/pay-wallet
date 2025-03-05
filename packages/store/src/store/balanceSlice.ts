// src/store/balanceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    balance: 0,
};

// Create a slice
const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        // Action to set the balance
        setBalance(state, action: PayloadAction<number>) {
            state.balance = action.payload;
        },
        // Action to increment the balance
        incrementBalance(state, action: PayloadAction<number>) {
            state.balance += action.payload;
        },
        // Action to decrement the balance
        decrementBalance(state, action: PayloadAction<number>) {
            state.balance -= action.payload;
        },
    },
});

// Export the actions
export const { setBalance, incrementBalance, decrementBalance } = balanceSlice.actions;

// Export the reducer
export default balanceSlice.reducer;