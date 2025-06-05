import { useSelector } from "react-redux";
import { RootState } from "../../store/userStore/store";


export const useBalance = () => {
    const balance = useSelector((state: RootState) => state.balance.amount);
    const locked = useSelector((state: RootState) => state.balance.locked);
    return { locked, balance };
};
