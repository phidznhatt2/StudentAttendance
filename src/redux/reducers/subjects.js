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
import _ from 'lodash';

const initialState = {
  isLoading: false,
  isScrolling: false,
  subjectList: [],
  subjectTemp: {},
  subjectSize: 0,
};

const Subject = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_ALL:
      return _.assign({}, state, { isLoading: true });
    case GET_SUBJECT_ALL_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        subjectList: [...action.payload.items],
        subjectSize: action.payload.totalRecords,
      });
    case GET_SUBJECT_ALL_ERROR:
      return _.assign({}, state, { isLoading: false });

    case GET_SUBJECT:
      return _.assign({}, state, { isScrolling: true });
    case GET_SUBJECT_SUCCESS:
      return _.assign({}, state, {
        isScrolling: false,
        subjectList: state.subjectList.concat(action.payload.items),
      });
    case GET_SUBJECT_ERROR:
      return _.assign({}, state, { isScrolling: false });

    case GET_SUBJECT_BY_ID:
      return _.assign({}, state, { isLoading: true });
    case GET_SUBJECT_BY_ID_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        subjectTemp: { ...action.payload },
      });
    case GET_SUBJECT_BY_ID_ERROR:
      return _.assign({}, state, { isLoading: false });

    default:
      return state;
  }
};

export default Subject;
