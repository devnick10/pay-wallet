import { useSelector } from "react-redux";
import { RootState } from "../../store/merchantStore/merchantReducers";

export const useBalance = () => {
  return useSelector((state: RootState) => state.balance);
};
