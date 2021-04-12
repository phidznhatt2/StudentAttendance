import {
  GET_COURSE_STUDENT,
  GET_COURSE_STUDENT_SUCCESS,
  GET_COURSE_STUDENT_ERROR,
  GET_COURSE_BY_ID,
  GET_COURSE_BY_ID_SUCCESS,
  GET_COURSE_BY_ID_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  courseList: [],
  courseTemp: {},
};

const Course = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_STUDENT:
      return _.assign({}, state, { isLoading: true });
    case GET_COURSE_STUDENT_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        courseList: [...action.payload.items],
      });
    case GET_COURSE_STUDENT_ERROR:
      return _.assign({}, state, { isLoading: false });

    case GET_COURSE_BY_ID:
      return _.assign({}, state, { isLoading: true });
    case GET_COURSE_BY_ID_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        courseTemp: { ...action.payload },
      });
    case GET_COURSE_BY_ID_ERROR:
      return _.assign({}, state, { isLoading: false });

    default:
      return state;
  }
};

export default Course;
