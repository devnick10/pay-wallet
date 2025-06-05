import { useSelector } from "react-redux"
import { RootState } from "../../merchant"


export const usePayouts = () => {
  const payouts = useSelector((state: RootState) => state.payouts)
  return { payouts };
}