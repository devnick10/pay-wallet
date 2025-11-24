import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface P2PTransfer {
  id: number;
  amount: number;
  timestamp: Date;
  fromUser: {
    number?: string;
    name: string | null;
  };
}

export interface transactions {
  transactions: P2PTransfer[];
}

const initialState: transactions = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<P2PTransfer[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
