enum raspDataEnum {
  SET_DATA = 'SET_DATA',
  SET_DAY = 'SET_DAY',
  CLEAR_DATA = 'CLEAR_DATA'
}

export type pairT = {
  aud?: number[] | null,
  subgroup?: number,
  subject?: number,
  teacher?: number,
  week?: number
}

export type pairListT = {
  pair: pairT[],
  id: number,
  pairtime: string
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
  group: -1,
  semester: -1,
  year: -1
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

      let newState: raspDataT = state;
      let isInData: boolean = false;
      newState.day = newState.day.map((dayItem) => {
        if (dayItem.id === action.payload.id) {
          isInData = true;
          dayItem = action.payload;
        }
        return dayItem
      })

      if (!isInData) {
        newState.day.push(action.payload);
      }

      newState.day = newState.day.map((dayItem) => {
        dayItem.pairList = dayItem.pairList.map((pairItem) => {
          const newPairs: pairT[] = [];
          for (let i = 0; i < pairItem.pair.length; i++) {
            const {subgroup, subject, teacher, aud} = pairItem.pair[i];
            // if (aud == null) {
            //   pairItem.pair[i].aud = [];
            // }

            if (!teacher) {
              Object.assign(pairItem.pair[i], {
                teacher: null
              })
            }

            if (!subgroup) {
              Object.assign(pairItem.pair[i], {
                subgroup: null
              })
            }

            if (!aud) {
              Object.assign(pairItem.pair[i], {
                aud: []
              })
            }

            if (subject === null) {
              newPairs.push({});
            } else {
              newPairs.push(pairItem.pair[i])
            }
          }
          pairItem.pair = newPairs;
          return pairItem;
        })
        return dayItem;
      })
      debugger;
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
