enum EData {
  GET_FULL_LIST,
  ERROR_FULL_LIST,
  SUCCESS_FULL_LIST,
  GET_ADM_LISTS,
  ERROR_ADM_LISTS,
  SUCCESS_ADM_LISTS
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

///////////////////////////////////////////////////////////

export type TAdmGroupList = {
  cafid: number,
  id: number,
  number: number,
  stageid: number,
  startyear: number
};

type TAdmAudList = {
  id: number,
  name: string
};

type TAdmSubjectList = {
  id: number,
  name: string,
  nameshort: string
};

type TAdmTeacherList = {
  fullname: string,
  id: number,
  name: string
};

export type TAdmListsData = {
  teacher: TAdmTeacherList[],
  aud: TAdmAudList[],
  subject: TAdmSubjectList[],
  group: TAdmGroupList[]
};

export type TAdmLists = {
  data: TAdmListsData[],
  error: string,
  loading: boolean
};

/////////////////////////////////////////////////////

export type TData = {
  fullList: TFullList,
  admLists: TAdmLists,
};

const initialState: TData = {
  fullList: {
    data: [],
    error: '',
    loading: false
  },
  admLists: {
    data: [],
    error: '',
    loading: false
  }
};

// Actions for full list //

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

///////////////////////////////////////////////////////////////////////

// Actions for admLists //

type getAdmLists = {
  type: EData.GET_ADM_LISTS
};

type successAdmLists = {
  type: EData.SUCCESS_ADM_LISTS,
  payload: TAdmListsData
};

type errorAdmLists = {
  type: EData.ERROR_ADM_LISTS,
  error: string
};

// Creating types actions //

type fullListActions = getFullList | successFullList | errorFullList;
type admListsActions = getAdmLists | successAdmLists | errorAdmLists;

export type DataAction = fullListActions | admListsActions;

export default function data(
  state: TData = initialState,
  action: DataAction
) {
  switch (action.type) {
    case EData.GET_FULL_LIST:
      return <TData>{
        ...state,
        fullList: {
          ...state.fullList,
          loading: true
        }
      };
    case EData.ERROR_FULL_LIST:
      return <TData>{
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
    case EData.GET_ADM_LISTS:
      return <TData>{
        ...state,
        admLists: {
          ...state.admLists,
          loading: true
        }
      }
    case EData.ERROR_ADM_LISTS:
      return <TData>{
        ...state,
        admLists: {
          data: [],
          error: action.error,
          loading: false
        }
      }
    case EData.SUCCESS_ADM_LISTS:
      return <TData><unknown>{
        ...state,
        admLists: {
          data: action.payload,
          error: '',
          loading: false
        }
      }
    default:
      return state;
  }
};

export { EData };