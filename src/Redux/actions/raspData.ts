import {Dispatch} from "redux";
import {raspDataAction, raspDataEnum, raspDataT, raspDayT, TGroupInfo} from "../reducers/raspData";
import api, {authDefault} from "../../utils/api/api";
import errorLog from "../../utils/Logs/Error";

export const setData = (query: TGroupInfo) => {
    return (dispatch: Dispatch<raspDataAction>) => {
        fetch(api.getGroup(query), authDefault)
            .then((response) => response.json())
            .catch((error) => errorLog(`error with getting group rasp ${error}`))
            .then((okJson) => {
                return dispatch({type: raspDataEnum.SET_DATA, payload: okJson as raspDataT})
            });
    }
};

export const setDay = (dayData: raspDayT) => {
    return (dispatch: Dispatch<raspDataAction>) => {
        dispatch({type: raspDataEnum.SET_DAY, payload: dayData});
    }
};

export const clearData = () => {
    return (dispatch: Dispatch<raspDataAction>) => {
        dispatch({type: raspDataEnum.CLEAR_DATA});
    }
};

export const setGroupInfo = (groupInfo: TGroupInfo) => {
    return (dispatch: Dispatch<raspDataAction>) => {
        dispatch({type: raspDataEnum.SET_GROUP_INFO, groupInfo})
    }
}