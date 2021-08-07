import { combineReducers } from "redux";
import timing from './timing';
import raspData from "./raspData";
import collectData from "./collectData";
import data from "./data";

export const rootReducer = combineReducers({
  data,
  timing,
  raspData,
  collectData
});

export type RootState = ReturnType<typeof rootReducer>;
