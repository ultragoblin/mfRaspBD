import { Dispatch } from "redux";
import {
  DataAction,
  EData,
  TAdmAudList,
  TAdmListsData, TAdmSubgroupList,
  TAdmSubjectList,
  TAdmTeacherList,
  TAudOptions, TSubGroupOptions,
  TSubjectOptions,
  TTeacherOptions
} from "../reducers/data";
import api, { authDefault } from "../../utils/api/api";

export const getFullList = () => {
  return (dispatch: Dispatch<DataAction>) => {
    dispatch({ type: EData.GET_FULL_LIST });
    return fetch(api.fullList, authDefault)
      .then((response) => response.json())
      .catch((error) => dispatch({ type: EData.ERROR_FULL_LIST, error }))
      .then((ok) => dispatch({ type: EData.SUCCESS_FULL_LIST, payload: ok }))
  }
};

export const getAdmLists = () => {
  return (dispatch: Dispatch<DataAction>) => {
    let requestError: boolean = false;
    const admLists: TAdmListsData = {
      aud: {
        options: [],
        val: []
      },
      group: [],
      subject: {
        options: [],
        val: []
      },
      teacher: {
        options: [],
        val: []
      },
      subgroup: {
        options: [],
        val: []
      }
    };

    dispatch({ type: EData.GET_ADM_LISTS });
    fetch(api.admLists.aud, authDefault)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({ type: EData.ERROR_ADM_LISTS, error: `adm aud = ${error}` });
      })
      .then((okAud) => {
        admLists.aud.val = okAud;
        return okAud.forEach((aud: TAdmAudList) => admLists.aud.options.push(<TAudOptions>{
          aud: aud.name,
          audid: aud.id
        }));
      });

    fetch(api.admLists.subject)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({ type: EData.ERROR_ADM_LISTS, error: `adm subjects = ${error}` });
      })
      .then((okSubjects) => {
        admLists.subject.val = okSubjects;
        return okSubjects.forEach((subject: TAdmSubjectList) => admLists.subject.options.push(<TSubjectOptions>{
          subject: subject.name,
          subjectid: subject.id
        }));
      });

    fetch(api.admLists.teacher, authDefault)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({ type: EData.ERROR_ADM_LISTS, error: `adm teacher = ${error}` })
      })
      .then((okTeachers: TAdmTeacherList[]) => {
        admLists.teacher.val = okTeachers;
        return okTeachers.forEach((teacher) => admLists.teacher.options.push(<TTeacherOptions>{
          teacher: teacher.name,
          teacherid: teacher.id
        }));
      });

    fetch(api.admLists.subgroup, authDefault)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({ type: EData.ERROR_ADM_LISTS, error: `adm subgroup = ${error}` })
      })
      .then((okSubgroup) => {
        admLists.subgroup.val = okSubgroup;
        return okSubgroup.forEach((subgroup: TAdmSubgroupList) => admLists.subgroup.options.push(<TSubGroupOptions>{
          subgroup: subgroup.name,
          subgroupid: subgroup.id
        }))
      });

    fetch(api.admLists.group, authDefault)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({ type: EData.ERROR_ADM_LISTS, error: `adm group = ${error}` });
      })
      .then((okGroup) => admLists.group = okGroup);

    if (!requestError) {
      return dispatch({ type: EData.SUCCESS_ADM_LISTS, payload: admLists })
    }
  }
};
