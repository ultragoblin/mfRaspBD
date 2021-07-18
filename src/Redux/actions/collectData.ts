import { Dispatch } from "redux";
import { collectDataAction, collectDataEnum } from "../reducers/collectData";

export const collectData = () => {
  return (dispatch: Dispatch<collectDataAction>) => {
    dispatch({ type: collectDataEnum.COLLECT_DATA})
  }
}
