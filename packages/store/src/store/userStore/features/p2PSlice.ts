import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface P2PTransfer {
  id: number;
  amount: number;
  timestamp: Date;
  fromUser: {
    id: number;
    number?: string;
    name: string | null;
  };
  toUser: {
    id: number | undefined;
    number?: string;
    name: string | undefined;
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
    setP2pTransactions: (state, action: PayloadAction<P2PTransfer[]>) => {
      state.transactions = action.payload;
    },
    addP2pTransaction: (state, action: PayloadAction<P2PTransfer>) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { setP2pTransactions, addP2pTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
