import {Dispatch} from "redux";
import {raspDataAction, raspDataEnum, raspDataT, raspDayT} from "../reducers/raspData";
import api, {authDefault, TGetGroupRasp} from "../../utils/api/api";
import errorLog from "../../utils/Logs/Error";

export const setData = (query: TGetGroupRasp) => {
    return (dispatch: Dispatch<raspDataAction>) => {
        console.log('kkek')
        fetch(api.getGroup(query), authDefault)
            .then((response) => response.json())
            .catch((error) => errorLog(`error with getting group rasp ${error}`))
            .then((okJson) => {
                console.log('okJSON >>> ', okJson as raspDataT)
                return dispatch({type: raspDataEnum.SET_DATA, payload: okJson as raspDataT})
            });
    }
};

export const setDay = (dayData: raspDayT) => {
    console.log('payload kek', dayData)
    return (dispatch: Dispatch<raspDataAction>) => {
        dispatch({type: raspDataEnum.SET_DAY, payload: dayData});
    }
};

export const clearData = () => {
    return (dispatch: Dispatch<raspDataAction>) => {
        dispatch({type: raspDataEnum.CLEAR_DATA});
    }
};