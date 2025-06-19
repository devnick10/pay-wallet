import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OnRampStatus = "Success" | "Failure" | "Processing"

interface onRampTxns {
    id:string
    time: Date,
    amount: number,
    status: OnRampStatus,
    provider: string
}

export interface OnRampState {
    onRampTxns: onRampTxns[]
}

const initialState: OnRampState = {
    onRampTxns: []
};

const onRampSlice = createSlice({
    name: "onRampTxns",
    initialState,
    reducers: {
        setOnRampTxns: (state, action: PayloadAction<onRampTxns[]>) => {
            state.onRampTxns = action.payload;
        },
        addOnRampTxns: (state, action: PayloadAction<onRampTxns>) => {
            state.onRampTxns.push(action.payload);
        },
    },
});

export const {
    setOnRampTxns,
    addOnRampTxns
} = onRampSlice.actions;
export default onRampSlice.reducer;
