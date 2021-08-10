enum raspDataEnum {
  SET_DATA = 'SET_DATA',
  SET_DAY = 'SET_DAY',
  CLEAR_DATA = 'CLEAR_DATA'
}

export type pairT = {
  aud: number[],
  subgroup: number,
  subject: number,
  teacher: number,
  week: number
}

export type pairListT = {
  pair: pairT[] | {},
  id: number
}

export type raspDayT = {
  pairList: pairListT[],
  id: number,
  special_day: boolean
}

export type raspDataT = {
  day: raspDayT[],
  group: number,
  semestr: number,
  year: number
}

const initialState: raspDataT = {
  day: [],
  group: 0,
  semestr: 0,
  year: 0
}

type setData = {
  type: raspDataEnum.SET_DATA,
  payload: raspDataT
}

type setDay = {
  type: raspDataEnum.SET_DAY,
  payload: raspDayT
}

type clearData = {
  type: raspDataEnum.CLEAR_DATA
}

export type raspDataAction = setData | setDay | clearData;

export default function raspData(
  state: raspDataT = initialState,
  action: raspDataAction
) {
  switch (action.type) {
    case raspDataEnum.SET_DATA:
      return action.payload;
    case raspDataEnum.SET_DAY:
      state.day.forEach((day) => {
        if (day.id === action.payload.id) {
          day.pairList = action.payload.pairList;
        }
      })
      return state;
    case raspDataEnum.CLEAR_DATA:
      return {
        ...state,
        day: [],
      }
    default:
      return state;
  }
}

export { raspDataEnum };
