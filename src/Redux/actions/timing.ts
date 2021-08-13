import { Dispatch } from "redux";
import { timingAction, timingENUM } from "../reducers/timing";
import api, {authDefault} from "../../utils/api/api";
import errorLog from "../../utils/Logs/Error";

export const getTiming = () => {
  return (dispatch: Dispatch<timingAction>) => {

    fetch(api.pairList, authDefault)
        .then((response) => response.json())
        .catch((error) => errorLog(`pairList fetch error ${error}`))
        .then((okRes) => dispatch({type: timingENUM.GET_TIMINGS, payload: okRes}));

  };
};
