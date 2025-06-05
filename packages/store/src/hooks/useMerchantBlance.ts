import { useSelector } from "react-redux";
import { RootState } from "../store/merchantStore/store";


export const useBalance = () => {
    const balance = useSelector((state: RootState) => state.balance.amount);
    const locked = useSelector((state: RootState) => state.balance.locked);
    return { locked, balance };
};
