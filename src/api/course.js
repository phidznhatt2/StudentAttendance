import api from '_services/api';

const endPoint = '/Course';
const endPointStudent = 'PagingByStudent';

export const getCourseStudent = params =>
  api.get(
    `${endPoint}/${endPointStudent}?Id=${params}&PageIndex=1&PageSize=20`,
  );

export const getCourseById = params => api.get(`${endPoint}/${params}`);
