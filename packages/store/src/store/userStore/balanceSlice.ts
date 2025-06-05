import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  locked: 0
};

const amountSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setamount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setlockedamout: (state, action: PayloadAction<number>) => {
      state.locked = action.payload;
    },
    incrementamount: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },
    incrementlockedamount: (state, action: PayloadAction<number>) => {
      state.locked += action.payload;
    },
    decrementamount: (state, action: PayloadAction<number>) => {
      state.amount -= action.payload;
    },
    decrementlockedamount: (state, action: PayloadAction<number>) => {
      state.locked -= action.payload;
    },
  },
});

export const {
  setamount,
  incrementamount,
  decrementamount,
  setlockedamout,
  incrementlockedamount,
  decrementlockedamount
} = amountSlice.actions;
export default amountSlice.reducer;
