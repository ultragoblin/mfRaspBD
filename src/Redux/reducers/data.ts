enum EData {
  GET_FULL_LIST,
  ERROR_FULL_LIST,
  SUCCESS_FULL_LIST
};

export type TDataGroup = {
  grp_id: number,
  grp_name: string
};

export type TDataFac = {
  caf_id: number,
  caf_name: number,
  groups: TDataGroup[]
};

export type TDataSemesters = {
  cafs: TDataFac[],
  fac_id: number,
  fac_name: string
};

export type TFullListData = {
  semesters: {
    1: TDataSemesters[],
    2: TDataSemesters[]
  },
  year: number,
  year_id: number
};

export type TFullList = {
  data: TFullListData[],
  error: string,
  loading: boolean
}

export type TData = {
  fullList: TFullList
};

const initialState: TData = {
  fullList: {
    data: [],
    error: '',
    loading: false
  }
};

type getFullList = {
  type: EData.GET_FULL_LIST
};

type successFullList = {
  type: EData.SUCCESS_FULL_LIST,
  payload: TFullList
};

type errorFullList = {
  type: EData.ERROR_FULL_LIST,
  error: string
};

export type DataAction = getFullList | successFullList | errorFullList;

export default function data(
  state: TData = initialState,
  action: DataAction
) {
  switch (action.type) {
    case EData.GET_FULL_LIST:
      // console.log('started');
      return <TData>{
        ...state,
        fullList: {
          ...state.fullList,
          loading: true
        }
      };
    case EData.ERROR_FULL_LIST:
      // console.log('error', action.error);
      return <TData><unknown>{
        ...state,
        fullList: {
          data: [],
          loading: false,
          error: action.error
        },
      }
    case EData.SUCCESS_FULL_LIST:
      return <TData><unknown>{
        ...state,
        fullList: {
          data: action.payload,
          loading: false,
          error: '',
        },
      }
    default:
      return state;
  }
};

export { EData };