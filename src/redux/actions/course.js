import * as apiCourse from '_api/course';
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

const createActionGetCourseStudent = type => payload => dispatch => {
  dispatch({ type });
  apiCourse
    .getCourseStudent(payload)
    .then(res => {
      dispatch({ type: GET_COURSE_STUDENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({ type: GET_COURSE_STUDENT_ERROR, payload: err.response.data });
    });
};

const createActionGetCourseById = type => payload => dispatch => {
  dispatch({ type });
  apiCourse
    .getCourseById(payload)
    .then(res => {
      dispatch({ type: GET_COURSE_BY_ID_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({ type: GET_COURSE_BY_ID_ERROR, payload: err.response.data });
    });
};

const createActionGetCourseAllBySub = type => payload => dispatch => {
  dispatch({ type });
  apiCourse
    .getCourseAllBySub(payload)
    .then(res => {
      dispatch({ type: GET_COURSE_ALL_BY_SUB_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({
        type: GET_COURSE_ALL_BY_SUB_ERROR,
        payload: err.response.data,
      });
    });
};

const createActionGetCourseBySub = type => payload => dispatch => {
  dispatch({ type });
  apiCourse
    .getCourseBySub(payload)
    .then(res => {
      dispatch({
        type: GET_COURSE_BY_SUB_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COURSE_BY_SUB_ERROR,
        payload: err.response.data,
      });
    });
};

export const getCourseStudent = createActionGetCourseStudent(
  GET_COURSE_STUDENT,
);

export const getCourseById = createActionGetCourseById(GET_COURSE_BY_ID);

export const getCourseAllBySub = createActionGetCourseAllBySub(
  GET_COURSE_ALL_BY_SUB,
);

export const getCourseBySub = createActionGetCourseBySub(GET_COURSE_BY_SUB);
