import api from '_services/api';
import { SUBJECT_SIZE } from '_constant';

const endPoint = '/Subject';

export const getSubjectById = params => api.get(`${endPoint}/${params}`);

export const getSubjectAll = params => {
  const { keyword } = params;

  return api.get(
    `${endPoint}/AllPaging?Keyword=${keyword}&PageIndex=1&PageSize=${SUBJECT_SIZE}`,
  );
};

export const getSubject = params => {
  const { keyword, page } = params;

  return api.get(
    `${endPoint}/AllPaging?Keyword=${keyword}&PageIndex=${page}&PageSize=${SUBJECT_SIZE}`,
  );
};
