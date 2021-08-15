import { Dispatch } from "redux";
import {
  DataAction,
  EData,
  TAdmAudList,
  TAdmGroupList,
  TAdmListsData,
  TAdmStageList,
  TAdmSubgroupList,
  TAdmSubjectList,
  TAdmTeacherList,
  TAudOptions,
  TSubGroupOptions,
  TSubjectOptions,
  TTeacherOptions
} from "../reducers/data";
import api, { authDefault } from "../../utils/api/api";
import { TSubjectModal } from "../../components/CustomModal/CustomModal";

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
      },
      caf: [],
      stage: []
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

    fetch(api.admLists.caf, authDefault)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({ type: EData.ERROR_ADM_LISTS, error: `adm caf = ${error}` });
      })
      .then((okCaf) => admLists.caf = okCaf);

    fetch(api.admLists.stage, authDefault)
      .then((response) => response.json())
      .catch((error) => {
        requestError = true;
        return dispatch({ type: EData.ERROR_ADM_LISTS, error: `adm stage = ${error}` });
      })
      .then((okStage: TAdmStageList[]) => admLists.stage = okStage);

    if (!requestError) {
      return dispatch({ type: EData.SUCCESS_ADM_LISTS, payload: admLists });
    }
  }
};

export const putGroupAdm = (group: TAdmGroupList) => {
  return (dispatch: Dispatch<DataAction>) => {
    fetch(api.DB.group, {
      ...authDefault,
      method: "PUT",
      body: JSON.stringify(group)
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("При добавлении группы произошла ошибка!");
      })
      .then((ok) => {
        alert("Группа успешна добавлена");
        return dispatch({ type: EData.PUT_GROUP, id: ok.id })
      })
  }
}

export const patchGroupAdm = (group: TAdmGroupList, id: number) => {
  return (dispatch: Dispatch<DataAction>) => {
    fetch(`${api.DB.group}?id=${id}`, {
      ...authDefault,
      method: "PATCH",
      body: JSON.stringify(group)
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("При Измемении группы произошла ошибка!");
      })
      .then((ok) => {
        alert("Изменение группы прошло удачно");
        return dispatch({ type: EData.PATCH_GROUP })
      })
  }
}

export const deleteGroupAdm = (id: number) => {
  return (dispatch: Dispatch<DataAction>) => {
    fetch(`${api.DB.group}?id=${id}`, {
      ...authDefault,
      method: "DELETE"
    })
      .then((response) => {
        alert('Группа(ы) успешно удалены');
        return dispatch({type: EData.DELETE_GROUP});
      })
      .catch((error) => alert('Произошла ошибка при удалении групп(ы)!'));
  }
}

export const putSubjectAdm = (subject: TSubjectModal) => {
  return (dispatch: Dispatch<DataAction>) => {
    fetch(api.DB.subject, {
      ...authDefault,
      method: "PUT",
      body: JSON.stringify(subject)
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("При добавлении предмета произошла ошибка!");
      })
      .then((ok) => {
        alert("Предмет добавлен");
        return dispatch({ type: EData.PUT_SUBJECT, id: ok.id })
      })
  }
}

export const patchSubjectAdm = (subject: TSubjectModal) => {
  return (dispatch: Dispatch<DataAction>) => {
    fetch(api.DB.subject, {
      ...authDefault,
      method: "PATCH",
      body: JSON.stringify(subject)
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("При добавлении предмета произошла ошибка!");
      })
      .then((ok) => dispatch({ type: EData.PATCH_SUBJECT }))
  }
}

export const putTeacherAdm = (teacher: TAdmTeacherList) => {
  return (dispatch: Dispatch<DataAction>) => {
    fetch(api.DB.teacher, {
      ...authDefault,
      method: "PUT",
      body: JSON.stringify(teacher)
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("При добавлении преподователя произошла ошибка!");
      })
      .then((ok) => dispatch({ type: EData.PUT_TEACHER, id: ok.id }))
  }
}

export const putAudAdm = (aud: TAdmAudList) => {
  return (dispatch: Dispatch<DataAction>) => {
    fetch(api.DB.aud, {
      ...authDefault,
      method: "PUT",
      body: JSON.stringify(aud)
    })
      .then((response) => response.json())
      .catch((error) => {
        alert("При добавлении аудитории произошла ошибка!");
      })
      .then((ok) => dispatch({ type: EData.PUT_AUD, id: ok.id }))
  }
};