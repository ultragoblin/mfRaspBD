// админские списки: /rasp/api/adm/<teacher,aud,subject,group>/list

export type TGetGroupRasp = {
    groupID: number,
    yearID: number,
    semester: number
}

const api = {
    fullList: 'https://mf.bmstu.ru/rasp/api/adm/full_list',
    settings: 'https://mf.bmstu.ru/rasp/api/adm/settings',
    admLists: {
        teacher: 'https://mf.bmstu.ru/rasp/api/adm/teacher/list',
        aud: 'https://mf.bmstu.ru/rasp/api/adm/aud/list',
        subject: 'https://mf.bmstu.ru/rasp/api/adm/subject/list',
        group: 'https://mf.bmstu.ru/rasp/api/adm/group/list',
        subgroup: 'https://mf.bmstu.ru/rasp/api/adm/subgroup/list'
    },
    getGroup: ({
                   groupID,
                   yearID,
                   semester
               }: TGetGroupRasp) => `https://mf.bmstu.ru/rasp/api/adm/group?id=${groupID}&year=${yearID}&semester=${semester}`
};

export const authDefault: RequestInit | undefined = {
    headers: {
        Authorization: 'Basic cmFzcHRlc3Q6ViNUMzR2dHZqd2N2dDkzNDI='
    },
}

export default api;