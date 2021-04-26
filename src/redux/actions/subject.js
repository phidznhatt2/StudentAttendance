import * as apiSubject from '_api/subject';
import {
  GET_SUBJECT_ALL,
  GET_SUBJECT_ALL_SUCCESS,
  GET_SUBJECT_ALL_ERROR,
  GET_SUBJECT,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_ERROR,
  GET_SUBJECT_BY_ID,
  GET_SUBJECT_BY_ID_SUCCESS,
  GET_SUBJECT_BY_ID_ERROR,
} from '_constant';

const createActionGetSubjectAll = type => payload => dispatch => {
  dispatch({ type });
  apiSubject
    .getSubjectAll(payload)
    .then(res => {
      dispatch({ type: GET_SUBJECT_ALL_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({ type: GET_SUBJECT_ALL_ERROR, payload: err.response.data });
    });
};

const createActionGetSubject = type => payload => dispatch => {
  dispatch({ type });
  apiSubject
    .getSubject(payload)
    .then(res => {
      dispatch({
        type: GET_SUBJECT_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(err => {
      dispatch({ type: GET_SUBJECT_ERROR, payload: err.response.data });
    });
};

const createActionGetSubjectById = type => payload => dispatch => {
  dispatch({ type });
  apiSubject
    .getSubjectById(payload)
    .then(res => {
      dispatch({ type: GET_SUBJECT_BY_ID_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({ type: GET_SUBJECT_BY_ID_ERROR, payload: err.response.data });
    });
};

export const getSubjectAll = createActionGetSubjectAll(GET_SUBJECT_ALL);

export const getSubject = createActionGetSubject(GET_SUBJECT);

export const getSubjectById = createActionGetSubjectById(GET_SUBJECT_BY_ID);
