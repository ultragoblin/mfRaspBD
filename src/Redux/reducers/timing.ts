enum timingENUM {
  GET_TIMINGS = "GET_TIMINGS",
}

export type TTiming = {
  id: number,
  number: number,
  time: string
};

const initialState: TTiming[] = [];

type getTiming = {
  type: timingENUM.GET_TIMINGS;
  payload: TTiming[];
};

export type timingAction = getTiming;

export default function timing(
  state: TTiming[] = initialState,
  action: timingAction
) {
  switch (action.type) {
    case timingENUM.GET_TIMINGS:
      return action.payload;
    default:
      return state;
  }
}

export { timingENUM };
