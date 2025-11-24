import { useSelector } from "react-redux";
import { RootState } from "../../store/merchantStore/merchantReducers";

export const usePayouts = () => {
  const payouts = useSelector((state: RootState) => state.payouts);
  return { payouts };
};
