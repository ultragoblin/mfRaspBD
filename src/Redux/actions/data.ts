import { Dispatch } from "redux";
import { DataAction, EData, TAdmListsData } from "../reducers/data";
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

export const getAdmLists = () => {
  return (dispatch: Dispatch<DataAction>) => {
    let requestError: boolean = false;
    const admLists:TAdmListsData = {
      aud: [],
      group: [],
      subject: [],
      teacher: []
    };

    dispatch({type: EData.GET_ADM_LISTS});
    fetch(api.admLists.aud)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({type: EData.ERROR_ADM_LISTS, error: `adm aud = ${error}`});
      })
      .then((okAud) => admLists.aud = okAud);

    fetch(api.admLists.group)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({type: EData.ERROR_ADM_LISTS, error: `adm group = ${error}`});
      })
      .then((okGroup) => admLists.group = okGroup);

    fetch(api.admLists.subject)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({type: EData.ERROR_ADM_LISTS, error: `adm subjects = ${error}`});
      })
      .then((okSubjects) => admLists.subject = okSubjects);

    fetch(api.admLists.teacher)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({type: EData.ERROR_ADM_LISTS, error: `adm teacher = ${error}`})
      })
      .then((okTeachers) => admLists.teacher = okTeachers);

    if (!requestError) {
      return dispatch({type: EData.SUCCESS_ADM_LISTS, payload: admLists})
    }
  }
};
