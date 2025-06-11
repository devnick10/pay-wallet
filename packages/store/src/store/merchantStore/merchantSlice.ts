import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MerchantInfo {
  name: string | null;
  email: string;
  number: string | null;
}

export interface InitialMerchantState {
  merchantInfo: MerchantInfo;
}

const initialState: InitialMerchantState = {
  merchantInfo: {
    name: "",
    email: "",
    number: "",
  },
};

const merchantSlice = createSlice({
  name: "merchantInfo",
  initialState,
  reducers: {
    setMerchantInfo: (state, action: PayloadAction<MerchantInfo>) => {
      state.merchantInfo = action.payload;
    },
  },
});

export const { setMerchantInfo } = merchantSlice.actions;
export default merchantSlice.reducer;
