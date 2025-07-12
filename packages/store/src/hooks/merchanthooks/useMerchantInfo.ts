import { useSelector } from "react-redux";
import { RootState } from "../../merchant";

export const useMerchantInfo = () => {
  return useSelector((state: RootState) => state.merchantInfo);
};
