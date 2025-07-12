import { useSelector } from "react-redux";
import { RootState } from "../../merchant";

export const useTransactions = () => {
  return useSelector((state: RootState) => state.transactions.transactions);
};
