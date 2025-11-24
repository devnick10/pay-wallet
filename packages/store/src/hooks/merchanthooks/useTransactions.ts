import { useSelector } from "react-redux";
import { RootState } from "../../store/merchantStore/merchantReducers";

export const useTransactions = () => {
  return useSelector((state: RootState) => state.transactions.transactions);
};
