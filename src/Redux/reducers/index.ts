import { combineReducers } from "redux";
import timing from './timing';
import raspData from "./raspData";
import collectData from "./collectData";

export const rootReducer = combineReducers({
  timing,
  raspData,
  collectData
});

export type RootState = ReturnType<typeof rootReducer>;
