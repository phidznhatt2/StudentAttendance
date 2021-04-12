import * as apiSchedule from '_api/schedule';
import {
  GET_SCHEDULE_BY_DATE,
  GET_SCHEDULE_BY_DATE_SUCCESS,
  GET_SCHEDULE_BY_DATE_ERROR,
} from '_constant';

const createActionGetScheduleByDate = type => payload => dispatch => {
  dispatch({ type });
  apiSchedule
    .getScheduleByDate(payload)
    .then(res => {
      dispatch({
        type: GET_SCHEDULE_BY_DATE_SUCCESS,
        payload: { date: payload.date, data: res.data.data },
      });
    })
    .catch(err => {
      dispatch({
        type: GET_SCHEDULE_BY_DATE_ERROR,
        payload: err.response.data,
      });
    });
};

export const getScheduleByDate = createActionGetScheduleByDate(
  GET_SCHEDULE_BY_DATE,
);
