// админские списки: /rasp/api/adm/<teacher,aud,subject,group>/list

import {TGroupInfo} from "../../Redux/reducers/raspData";

const api = {
  fullList: 'https://rasp.msfu.ru/api/adm/full_list',
  pairList: 'https://rasp.msfu.ru/api/adm/pair/list',
  settings: 'https://rasp.msfu.ru/api/adm/settings',
  admLists: {
    teacher: 'https://rasp.msfu.ru/api/adm/teacher/list',
    aud: 'https://rasp.msfu.ru/api/adm/aud/list',
    subject: 'https://rasp.msfu.ru/api/adm/subject/list',
    group: 'https://rasp.msfu.ru/api/adm/group/list',
    subgroup: 'https://rasp.msfu.ru/api/adm/subgroup/list',
    caf: 'https://rasp.msfu.ru/api/adm/caf/list',
    stage: 'https://rasp.msfu.ru/api/adm/stage/list',
    faculty: 'https://rasp.msfu.ru/api/adm/faculty/list',
    year: 'https://rasp.msfu.ru/api/adm/year/list'
  },
  DB: {
    group: 'https://rasp.msfu.ru/api/adm/group',
    subject: 'https://rasp.msfu.ru/api/adm/subject',
    teacher: 'https://rasp.msfu.ru/api/adm/teacher',
    aud: 'https://rasp.msfu.ru/api/adm/aud'
  },
  getGroup: ({
               group,
               year,
               semester
             }: TGroupInfo) => `https://rasp.msfu.ru/api/adm/group?id=${group}&year=${year}&semester=${semester}`
};

export const authDefault: RequestInit | undefined = {
  headers: {
    Authorization: 'Basic cmFzcHRlc3Q6ViNUMzR2dHZqd2N2dDkzNDI='
  },
}

export default api;