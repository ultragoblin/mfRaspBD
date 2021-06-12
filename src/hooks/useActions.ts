import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as timingActionCreators from "../Redux/actions/timing";

export const useActions = () => {
  const disptach = useDispatch();
  return bindActionCreators(timingActionCreators, disptach);
};
