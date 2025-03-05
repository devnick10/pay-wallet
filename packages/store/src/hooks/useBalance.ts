import { useSelector } from "react-redux";
import { RootState } from "../store/store";


export const useBalance = () => {
    const balance = useSelector((state: RootState) => state.balance.balance);
    return balance;
};

