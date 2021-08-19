enum collectDataEnum {
  COLLECT_DATA = 'COLLECT_DATA',
  STOP_COLLECT_DATA = 'STOP_COLLECT_DATA',
  SENDED_DATA = 'SENDED_DATA'
}

export type collectDataT = {
  collecting : boolean,
  sendReq: boolean
}

const initialState: collectDataT = {
  collecting: false,
  sendReq: false
}

type collectData = {
  type: collectDataEnum.COLLECT_DATA
}

type stopCollectData = {
  type: collectDataEnum.STOP_COLLECT_DATA
}

type sendedData = {
  type: collectDataEnum.SENDED_DATA
}

export type collectDataAction = collectData | stopCollectData | sendedData;

export default function raspData(
  state: collectDataT = initialState,
  action: collectDataAction
) {
  switch (action.type) {
    case collectDataEnum.COLLECT_DATA:
      return {
        collecting: true,
        sendReq: false
      }
    case collectDataEnum.STOP_COLLECT_DATA:
      return {
        collecting: false,
        sendReq: true
      }
    case collectDataEnum.SENDED_DATA:
      return {
        ...state,
        sendReq: false
      }
    default:
      return state;
  }
}

export { collectDataEnum };
