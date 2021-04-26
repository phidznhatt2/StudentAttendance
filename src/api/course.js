import api from '_services/api';
import { COURSE_SIZE } from '_constant';

const endPoint = '/Course';

export const getCourseStudent = params =>
  api.get(`Student/HistoryOfStudent?Id_User=${params}&PageIndex=1&PageSize=20`);

export const getCourseById = params => api.get(`${endPoint}/${params}`);

export const getCourseAllBySub = params => {
  const { keyword, idSubject } = params;

  return api.get(
    `${endPoint}/AllPagingBySubject?Id_Subject=${idSubject}&Keyword=${keyword}&PageIndex=1&PageSize=${COURSE_SIZE}`,
  );
};

export const getCourseBySub = params => {
  const { keyword, page, idSubject } = params;

  return api.get(
    `${endPoint}/AllPagingBySubject?Id_Subject=${idSubject}&Keyword=${keyword}&PageIndex=${page}&PageSize=${COURSE_SIZE}`,
  );
};
