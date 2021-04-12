import api from '_services/api';

const endPoint = '/Schedule';
const endPointDate = 'PagingByDate';

export const getScheduleByDate = params => {
  const { date, id } = params;
  return api.get(`${endPoint}/${endPointDate}?date=${date}&id_Student=${id}`);
};
