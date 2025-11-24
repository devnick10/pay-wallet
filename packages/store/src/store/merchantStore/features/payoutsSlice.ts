import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OnRampStatus = "Success" | "Failure" | "Processing";

interface Payouts {
  id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  merchantId: number | null;
}

export interface PayoutState {
  payouts: Payouts[];
}

const initialState: PayoutState = {
  payouts: [],
};

const payoutSlice = createSlice({
  name: "payouts",
  initialState,
  reducers: {
    setPayouts: (state, action: PayloadAction<Payouts[]>) => {
      state.payouts = action.payload;
    },
    addPayout: (state, action: PayloadAction<Payouts>) => {
      state.payouts.push(action.payload);
    },
  },
});

export const { setPayouts, addPayout } = payoutSlice.actions;
export default payoutSlice.reducer;
