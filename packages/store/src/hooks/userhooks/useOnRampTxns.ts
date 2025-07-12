import { useSelector } from "react-redux";
import { RootState } from "../../store/userStore/store";

export const useOnRampTxns = () => {
  return useSelector((state: RootState) => state.onRampTransactions);
};
