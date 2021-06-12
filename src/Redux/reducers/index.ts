import { combineReducers } from "redux";
import timing from './timing';

export const rootReducer = combineReducers({
  timing
});

export type RootState = ReturnType<typeof rootReducer>;
