import {
  GET_COURSE_STUDENT,
  GET_COURSE_STUDENT_SUCCESS,
  GET_COURSE_STUDENT_ERROR,
  GET_COURSE_BY_ID,
  GET_COURSE_BY_ID_SUCCESS,
  GET_COURSE_BY_ID_ERROR,
  GET_COURSE_BY_SUB,
  GET_COURSE_BY_SUB_SUCCESS,
  GET_COURSE_BY_SUB_ERROR,
  GET_COURSE_ALL_BY_SUB,
  GET_COURSE_ALL_BY_SUB_SUCCESS,
  GET_COURSE_ALL_BY_SUB_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  isScrolling: false,
  courseList: [],
  courseTemp: {},
  courseListSub: [],
  courseSubSize: 0,
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

    case GET_COURSE_ALL_BY_SUB:
      return _.assign({}, state, { isLoading: true });
    case GET_COURSE_ALL_BY_SUB_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        courseListSub: [...action.payload.items],
        courseSubSize: action.payload.totalRecords,
      });
    case GET_COURSE_ALL_BY_SUB_ERROR:
      return _.assign({}, state, { isLoading: false });

    case GET_COURSE_BY_SUB:
      return _.assign({}, state, { isScrolling: true });
    case GET_COURSE_BY_SUB_SUCCESS:
      return _.assign({}, state, {
        isScrolling: false,
        courseListSub: state.courseListSub.concat(action.payload.items),
      });
    case GET_COURSE_BY_SUB_ERROR:
      return _.assign({}, state, { isScrolling: false });
    default:
      return state;
  }
};

export default Course;
