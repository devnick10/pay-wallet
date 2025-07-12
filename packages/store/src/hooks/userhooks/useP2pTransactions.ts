import { useSelector } from "react-redux";
import { RootState } from "../../store/userStore/store";

export const useP2pTransactions = () => {
  return useSelector((state: RootState) => state.p2PTransactions.transactions);
};
