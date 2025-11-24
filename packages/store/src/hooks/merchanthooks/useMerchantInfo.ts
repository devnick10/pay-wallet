import { useSelector } from "react-redux";
import { RootState } from "../../store/merchantStore/merchantReducers";

export const useMerchantInfo = () => {
  return useSelector((state: RootState) => state.merchantInfo);
};
