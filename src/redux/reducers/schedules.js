import {
  GET_SCHEDULE_BY_DATE,
  GET_SCHEDULE_BY_DATE_SUCCESS,
  GET_SCHEDULE_BY_DATE_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  scheduleDates: {},
};

const Course = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_BY_DATE:
      return _.assign({}, state, { isLoading: true });
    case GET_SCHEDULE_BY_DATE_SUCCESS:
      const { scheduleDates } = state;
      const { date, data } = action.payload;

      if (scheduleDates.date !== date) {
        _.assign(scheduleDates, { [date]: data.items });
      }

      return _.assign({}, state, {
        isLoading: false,
        scheduleDates,
      });
    case GET_SCHEDULE_BY_DATE_ERROR:
      return _.assign({}, state, { isLoading: false });

    default:
      return state;
  }
};

export default Course;
