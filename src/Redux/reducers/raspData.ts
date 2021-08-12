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
  id: number,
  pairTime?: string
}

export type raspDayT = {
  pairList: pairListT[],
  id: number,
  special_day: boolean,
  name: string
}

export type raspDataT = {
  day: raspDayT[],
  group: number,
  semester: number,
  year: number
}

const initialState: raspDataT = {
  day: [],
  group: 8612,
  semester: 1,
  year: 6
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
      console.log('action', action.payload.pairList)
      let newState: raspDataT = state;
      let isInData: boolean = false;
      newState.day = newState.day.map((dayItem) => {
        if (dayItem.id === action.payload.id) {
          isInData = true;
          return dayItem = action.payload;
        } else return dayItem
      })

      if (!isInData) {
        newState.day.push(action.payload);
      }

      newState.day = newState.day.map((dayItem) => {
        dayItem.pairList = dayItem.pairList.filter((pairs) => Object.keys(pairs).length > 0);
        return dayItem;
      })
      console.log("FINAL >>>", newState);

      return {
        ...newState
      };
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
