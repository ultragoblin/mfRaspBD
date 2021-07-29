enum collectDataEnum {
  COLLECT_DATA = 'COLLECT_DATA',
  STOP_COLLECT_DATA = 'STOP_COLLECT_DATA'
}

export type collectDataT = {
  collecting : boolean
}

const initialState: collectDataT = {
  collecting: false
}

type collectData = {
  type: collectDataEnum.COLLECT_DATA
}

type stopCollectData = {
  type: collectDataEnum.STOP_COLLECT_DATA
}

export type collectDataAction = collectData | stopCollectData;

export default function raspData(
  state: collectDataT = initialState,
  action: collectDataAction
) {
  switch (action.type) {
    case collectDataEnum.COLLECT_DATA:
      return {
        collecting: true
      }
    case collectDataEnum.STOP_COLLECT_DATA:
      return {
        collecting: false
      }
    default:
      return state;
  }
}

export { collectDataEnum };
