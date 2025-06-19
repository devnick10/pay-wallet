import { useSelector } from "react-redux";
import { RootState } from "../../merchant";


export const useBalance = () => {
    return useSelector((state: RootState) => state.balance);
};
