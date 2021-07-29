enum raspDataEnum {
  SET_DATA = 'SET_DATA',
  SET_DAY = 'SET_DAY',
}

export type pairT = {
  aud: number,
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
  "day": [
    {
      "pairList": [],
      "id": 1,
      "special_day": false
    },
    {
      "pairList": [],
      "id": 2,
      "special_day": false
    },
    {
      "pairList": [],
      "id": 3,
      "special_day": false
    },
    {
      "pairList": [],
      "id": 4,
      "special_day": false
    },
    {
      "pairList": [],
      "id": 5,
      "special_day": false
    },
    {
      "pairList": [],
      "id": 6,
      "special_day": false
    }
  ],
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

export type raspDataAction = setData | setDay;

export default function raspData(
  state: raspDataT = initialState,
  action: raspDataAction
) {
  switch (action.type) {
    case raspDataEnum.SET_DATA:
      return action.payload;
    case raspDataEnum.SET_DAY:
      console.log('entered')
      state.day.forEach((day) => {
        if (day.id === action.payload.id) {
          day.pairList = action.payload.pairList;
        }
      })
      console.log(state);
      return state;
    default:
      return state;
  }
}

export { raspDataEnum };
