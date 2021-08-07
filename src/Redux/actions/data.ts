import { Dispatch } from "redux";
import { DataAction, EData } from "../reducers/data";
import api from "../../utils/api/api";

export const getFullList = () => {
  return (dispatch: Dispatch<DataAction>) => {
    dispatch({ type: EData.GET_FULL_LIST });
    return fetch(api.fullList)
      .then((response) => response.json())
      .catch((error) => dispatch({ type: EData.ERROR_FULL_LIST, error }))
      .then((ok) => dispatch({ type: EData.SUCCESS_FULL_LIST, payload: ok }))
  }
};
