import { Dispatch } from "redux";
import { raspDataAction, raspDataEnum, raspDataT, raspDayT } from "../reducers/raspData";

export const setData = (data: raspDataT) => {
  return (dispatch: Dispatch<raspDataAction>) => {
    dispatch({ type: raspDataEnum.SET_DATA, payload: data })
  }
}

export const setDay = (dayData: raspDayT) => {
  return (dispatch: Dispatch<raspDataAction>) => {
    dispatch({type: raspDataEnum.SET_DAY, payload: dayData})
  }
}