// админские списки: /rasp/api/adm/<teacher,aud,subject,group>/list

import {TGroupInfo} from "../../Redux/reducers/raspData";

const api = {
  fullList: '/api/adm/full_list',
  pairList: '/api/adm/pair/list',
  settings: '/api/adm/settings',
  admLists: {
    teacher: '/api/adm/teacher/list',
    aud: '/api/adm/aud/list',
    subject: '/api/adm/subject/list',
    group: '/api/adm/group/list',
    subgroup: '/api/adm/subgroup/list',
    caf: '/api/adm/caf/list',
    stage: '/api/adm/stage/list',
    faculty: '/api/adm/faculty/list',
    year: '/api/adm/year/list'
  },
  DB: {
    group: '/api/adm/group',
    subject: '/api/adm/subject',
    teacher: '/api/adm/teacher',
    aud: '/api/adm/aud'
  },
  getGroup: ({
               group,
               year,
               semester
             }: TGroupInfo) => `/api/adm/group?id=${group}&year=${year}&semester=${semester}`
};

export const authDefault: RequestInit | undefined = {
  headers: {
    Authorization: 'Basic cmFzcHRlc3Q6ViNUMzR2dHZqd2N2dDkzNDI='
  },
}

export default api;
