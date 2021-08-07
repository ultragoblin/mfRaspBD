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

export type TFullList = {
  data: {
    semesters: TDataSemesters[]
    year: number,
    year_id: number
  },
  error: string,
  loading: boolean
}

export type TData = {
  fullList: TFullList
};

const initialState: TData = {
  fullList: {
    data: {
      semesters: [],
      year: 0,
      year_id: 0
    },
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
      console.log('started');
      return {
        ...state,
        loading: true
      };
    case EData.ERROR_FULL_LIST:
      console.log('error', action.error);
      return {
        data: [],
        loading: false,
        error: action.error
      }
    case EData.SUCCESS_FULL_LIST:
      console.log('success', action.payload)
      return {
        data: action.payload,
        loading: false,
        error: '',
      }
    default:
      return state;
  }
};

export { EData };