enum collectDataEnum {
  COLLECT_DATA = 'COLLECT_DATA'
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

export type collectDataAction = collectData;

export default function raspData(
  state: collectDataT = initialState,
  action: collectDataAction
) {
  switch (action.type) {
    case collectDataEnum.COLLECT_DATA:
      return {
        collecting: true
      }
      break;
    default:
      return state;
  }
}

export { collectDataEnum };
