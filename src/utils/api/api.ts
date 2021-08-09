// админские списки: /rasp/api/adm/<teacher,aud,subject,group>/list

const api = {
  fullList: 'https://mf.bmstu.ru/rasp/api/adm/full_list',
  settings: 'https://mf.bmstu.ru/rasp/api/adm/settings',
  admLists: {
    teacher: 'https://mf.bmstu.ru/rasp/api/adm/teacher/list',
    aud: 'https://mf.bmstu.ru/rasp/api/adm/aud/list',
    subject: 'https://mf.bmstu.ru/rasp/api/adm/subject/list',
    group: 'https://mf.bmstu.ru/rasp/api/adm/group/list',
  }
};

export default api;