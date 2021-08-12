import {Dispatch} from "redux";
import {collectDataAction, collectDataEnum} from "../reducers/collectData";

export const collectData = () => {
  return (dispatch: Dispatch<collectDataAction>) => {
    dispatch({ type: collectDataEnum.COLLECT_DATA});
    setTimeout(() => dispatch({type: collectDataEnum.STOP_COLLECT_DATA}), 3000)
  }
}
