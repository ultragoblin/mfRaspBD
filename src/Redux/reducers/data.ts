import {TOptions} from "../../components/Header/Header";

enum EData {
    GET_FULL_LIST = 'GET_FULL_LIST',
    ERROR_FULL_LIST = 'ERROR_FULL_LIST',
    SUCCESS_FULL_LIST = 'SUCCESS_FULL_LIST',
    GET_ADM_LISTS = 'GET_ADM_LISTS',
    ERROR_ADM_LISTS = 'ERROR_ADM_LISTS',
    SUCCESS_ADM_LISTS = 'SUCCESS_ADM_LISTS',
    PUT_GROUP = 'PUT_GROUP',
    PATCH_GROUP = 'PATCH_GROUP',
    DELETE_GROUP = 'DELETE_GROUP',
    PUT_SUBJECT = 'PUT_SUBJECT',
    PATCH_SUBJECT = 'PUT_SUBJECT',
    DELETE_SUBJECT = 'DELETE_SUBJECT',
    PUT_TEACHER = 'PUT_TEACHER',
    PATCH_TEACHER = 'PATCH_TEACHER',
    DELETE_TEACHER = 'DELETE_TEACHER',
    PUT_AUD = 'PUT_AUD',
    PATCH_AUD = 'PATCH_AUD',
    DELETE_AUD = 'PATCH_AUD'
};

// options types //

export type TTeacherOptions = {
    teacher: string,
    teacherid: number
}

export type TSubjectOptions = {
    subject: string,
    subjectid: number
}

export type TAudOptions = {
    aud: string,
    audid: number
}

export type TSubGroupOptions = {
    subgroup: string,
    subgroupid: number
}

export type IEveryOptions = {
    subject: TSubjectOptions[],
    teacher: TTeacherOptions[],
    aud: TAudOptions[],
    subgroup: TSubGroupOptions[]
}

export type TEveryDefaultOptionsSingle = {
    subject: number,
    aud: number[],
    teacher: number,
    subgroup: number
}

export type TEveryDefaultOptionDouble = {
    first: TEveryDefaultOptionsSingle,
    second: TEveryDefaultOptionsSingle
}

///////////////////

export type TDataGroup = {
    grp_id: number,
    grp_name: string
};

export type TDataCaf = {
    caf_id: number,
    caf_name: number,
};

export type TDataSemesters = {
    cafs: TDataCaf[],
    fac_id: number,
    fac_name: string
};

export type TDataSem = {
    1: TDataSemesters[],
    2: TDataSemesters[]
}

export type TFullListData = {
    semesters: TDataSem,
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
    id?: number,
    name?: string,
    number: number,
    stageid: number,
    startyear: number
};

export type TAdmAudList = {
    id: number,
    name: string
};

export type TAdmSubjectList = {
    id: number,
    name: string,
    nameshort: string
};

export type TAdmTeacherList = {
    fullname: string,
    id: number,
    name: string
};

export type TAdmSubgroupList = {
    id: number,
    name: string
};

export type TAdmCafList = {
    facultyid: number,
    id: number,
    name: string | null,
    nameshort: string,
    number: number
};

export type TAdmStageList = {
    id: number,
    name: string | null,
    suffix: string
};

export type TFacList = {
    id: number,
    name: string
};

export type TYearList = {
    id: number,
    year: number
};

export type TNormalisedYearList = {
    id: number,
    year: string
}

export type TAdmListsData = {
    teacher: {
        options: TTeacherOptions[],
        val: TAdmTeacherList[],
    },
    aud: {
        options: TAudOptions[],
        val: TAdmAudList[]
    },
    subject: {
        options: TSubjectOptions[],
        val: TAdmSubjectList[]
    },
    group: TAdmGroupList[],
    subgroup: {
        options: TSubGroupOptions[],
        val: TAdmSubgroupList[]
    },
    caf: TAdmCafList[],
    stage: TAdmStageList[],
    fac: TFacList[],
    year: TNormalisedYearList[]
};

export type TAdmLists = {
    data: TAdmListsData,
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
        data: {
            group: [],
            teacher: {
                options: [],
                val: []
            },
            aud: {
                options: [],
                val: []
            },
            subject: {
                options: [],
                val: []
            },
            subgroup: {
                options: [],
                val: []
            },
            caf: [],
            stage: [],
            fac: [],
            year: []
        },
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

type putGroupAdm = {
    type: EData.PUT_GROUP,
    id: number
};

type patchGroupAdm = {
    type: EData.PATCH_GROUP,
    // group: TAdmGroupList
};

type deleteGroupAdm = {
    type: EData.DELETE_GROUP,
    // id: number
};

type putSubjectAdm = {
    type: EData.PUT_SUBJECT,
    subject: {
        id: number,
        name: string
    }
};

type patchSubjectAdm = {
    type: EData.PATCH_SUBJECT,
    // subject: TAdmSubjectList
};

type deleteSubjectAdm = {
    type: EData.DELETE_SUBJECT,
    // id: number
};

type putTeacherAdm = {
    type: EData.PUT_TEACHER,
    id: number
};

type patchTeacherAdm = {
    type: EData.PATCH_TEACHER,
    // teacher: TAdmTeacherList
};

type deleteTeacherAdm = {
    type: EData.DELETE_TEACHER,
    // id: number
};

type putAudAmd = {
    type: EData.PUT_AUD,
    id: number
};

type patchAudAdm = {
    type: EData.PATCH_AUD,
    // aud: TAdmAudList
};

type deleteAudAmd = {
    type: EData.DELETE_AUD,
    // id: number
};

// Creating types actions //

type fullListActions = getFullList | successFullList | errorFullList;
type admListsActions =
    getAdmLists
    | successAdmLists
    | errorAdmLists
    | putGroupAdm
    | putSubjectAdm
    | putTeacherAdm
    | putAudAmd
    | patchGroupAdm
    | patchSubjectAdm
    | patchTeacherAdm
    | patchAudAdm
    | deleteGroupAdm
    | deleteSubjectAdm
    | deleteTeacherAdm
    | deleteAudAmd;

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
                    data: {},
                    error: action.error,
                    loading: false
                }
            }
        case EData.SUCCESS_ADM_LISTS:
            return <TData>{
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

export {EData};