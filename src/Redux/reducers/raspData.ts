enum raspDataEnum {
  SET_DATA = 'SET_DATA',
  SET_GROUP_INFO = 'SET_GROUP_INFO',
  SET_DAY = 'SET_DAY',
  CLEAR_DATA = 'CLEAR_DATA'
};

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
  pairtime?: string
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

export type TGroupInfo = {
  group: number,
  semester: number,
  year: number
};

const initialState: raspDataT = {
  day: [],
  group: -1,
  semester: -1,
  year: -1
}

type setClear = {
  type: raspDataEnum.SET_GROUP_INFO,
  groupInfo: TGroupInfo
};

type setData = {
  type: raspDataEnum.SET_DATA,
  payload: raspDataT
};

type setDay = {
  type: raspDataEnum.SET_DAY,
  payload: raspDayT
};

type clearData = {
  type: raspDataEnum.CLEAR_DATA,
};

export type raspDataAction = setData | setDay | clearData | setClear;

export default function raspData(
  state: raspDataT = initialState,
  action: raspDataAction
) {
  switch (action.type) {
    case raspDataEnum.SET_GROUP_INFO:
      const {year, semester, group} = action.groupInfo;
      return {
        ...state,
        group,
        year,
        semester
      };
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

      // забиваем пустые поля при незаполнении
      newState.day = newState.day.map((dayItem) => {
        dayItem.pairList = dayItem.pairList.map((pairItem) => {
          const newPairs: pairT[] = [];
          for (let i = 0; i < pairItem.pair.length; i++) {
            const { subgroup, subject, teacher, aud } = pairItem.pair[i];

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

      // чистим дубликаты
      newState.day = newState.day.map((dayItem) => {
        let newPairs: pairListT[] = [];
        // newPairs.push(dayItem);
        dayItem.pairList.forEach((pairListItem) => {
          let isDuplicate: boolean = false;
          newPairs.forEach((second) => {
            if (pairListItem.id === second.id) {
              isDuplicate = true;
            }
          })

          if (!isDuplicate) {
            newPairs.push(pairListItem);
          }

          return newPairs;
        });
        dayItem.pairList = newPairs;
        return dayItem;
      })


      // Добавляем пустые пары на пропусках если день не пустой
      newState.day = newState.day.map((dayItem) => {
        if (dayItem.pairList.length > 0) {
          let newPairs: pairListT[] = [];
          let skippedPairs: number[] = [];
          let oldPairsID: number[] = [];

          dayItem.pairList.forEach((pairItem) => {
            oldPairsID.push(pairItem.id);
          })

          for (let i = 1; i < dayItem.pairList[dayItem.pairList.length - 1].id; i++) {

            if (oldPairsID.find((item) => item === i) === undefined) {
              skippedPairs.push(i);
            }
          }

          for (let i = 0; i < skippedPairs.length; i++) {
            newPairs[skippedPairs[i] - 1] = {
              id: skippedPairs[i],
              pair: []
            };
          }

          for (let i = 0; i < oldPairsID.length + skippedPairs.length; i++) {
            if (newPairs[i] === undefined) {
              let savedPair = dayItem.pairList.find((item) => item.id === i + 1)
              if (savedPair) {
                newPairs[i] = savedPair;
              }
            }
          }

          dayItem.pairList = newPairs;
        }

        return dayItem;
      })

      return newState;
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
