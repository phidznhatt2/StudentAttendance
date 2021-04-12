import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGOUT_USER,
  ADD_DEVICE_USER,
  ADD_DEVICE_USER_SUCCESS,
  ADD_DEVICE_USER_ERROR,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
  GET_EQUIPMENT_TEACHER,
  GET_EQUIPMENT_TEACHER_SUCCESS,
  GET_EQUIPMENT_TEACHER_ERROR,
  ATTENDANCE_STUDENT,
  ATTENDANCE_STUDENT_SUCCESS,
  ATTENDANCE_STUDENT_ERROR,
  GET_STATUS_ATTENDANCE,
  GET_STATUS_ATTENDANCE_SUCCESS,
  GET_STATUS_ATTENDANCE_ERROR,
  DEL_DEVICE_USER,
  DEL_DEVICE_USER_SUCCESS,
  DEL_DEVICE_USER_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  isLoadingEq: false,
  isLoadingSt: false,
  isActing: false,
  loginSuccess: false,
  userInfo: {},
  history: {
    status: false,
  },
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return _.assign({}, state, { isLoading: true });
    case LOGIN_USER_SUCCESS:
      return _.assign({}, state, { isLoading: false, loginSuccess: true });
    case LOGIN_USER_ERROR:
      return _.assign({}, state, { isLoading: false, loginSuccess: false });

    case SIGNUP_USER:
      return _.assign({}, state, { isLoading: true });
    case SIGNUP_USER_SUCCESS:
      return _.assign({}, state, { isLoading: false });
    case SIGNUP_USER_ERROR:
      return _.assign({}, state, { isLoading: false });

    case ADD_DEVICE_USER:
      return _.assign({}, state, { isLoading: true });
    case ADD_DEVICE_USER_SUCCESS:
      const { status, deviceInfo } = action.payload;
      if (status) {
        if (_.isEmpty(state.userInfo.studentEquipment)) {
          const studentEquipment = [];
          studentEquipment.push({ ...deviceInfo, status: true });
          return _.assign(
            {},
            { ...state, userInfo: { ...state.userInfo, studentEquipment } },
            { isLoading: false },
          );
        }
        state.userInfo.studentEquipment.push({ ...deviceInfo, status: true });
      }
      return _.assign({}, state, { isLoading: false });
    case ADD_DEVICE_USER_ERROR:
      return _.assign({}, state, { isLoading: false });

    case GET_USER_BY_ID:
      return _.assign({}, state, { isLoading: true });
    case GET_USER_BY_ID_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        userInfo: { ...action.payload },
      });
    case GET_USER_BY_ID_ERROR:
      return _.assign({}, state, { isLoading: false });

    case GET_EQUIPMENT_TEACHER:
      return _.assign({}, state, { isLoadingEq: true });
    case GET_EQUIPMENT_TEACHER_SUCCESS:
      return _.assign({}, state, {
        isLoadingEq: false,
        history: { ...state.history, ...action.payload },
      });
    case GET_EQUIPMENT_TEACHER_ERROR:
      return _.assign({}, state, { isLoadingEq: false });

    case ATTENDANCE_STUDENT:
      return _.assign({}, state, { isActing: true });
    case ATTENDANCE_STUDENT_SUCCESS:
      return _.assign({}, state, {
        isActing: false,
        history: { ...state.history, status: true },
      });
    case ATTENDANCE_STUDENT_ERROR:
      return _.assign({}, state, {
        isActing: false,
        history: { ...state.history, status: false },
      });

    case GET_STATUS_ATTENDANCE:
      return _.assign({}, state, { isLoadingSt: true });
    case GET_STATUS_ATTENDANCE_SUCCESS:
      return _.assign({}, state, {
        isLoadingSt: false,
        history: { ...state.history, status: action.payload },
      });
    case GET_STATUS_ATTENDANCE_ERROR:
      return _.assign({}, state, { isLoadingSt: false });

    case DEL_DEVICE_USER:
      return _.assign({}, state, { isActing: true });
    case DEL_DEVICE_USER_SUCCESS:
      const { statusDel, idBle } = action.payload;
      const { studentEquipment } = state.userInfo;
      const indexTemp = state.userInfo.studentEquipment.findIndex(
        ite => idBle === ite.id_BLE,
      );
      studentEquipment[indexTemp] = {
        ...studentEquipment[indexTemp],
        status: statusDel,
      };

      return _.assign({}, state, {
        isActing: false,
        userInfo: {
          ...state.userInfo,
          studentEquipment: [...studentEquipment],
        },
      });
    case DEL_DEVICE_USER_ERROR:
      return _.assign({}, state, { isActing: false });
    default:
      return state;
  }
};

export default User;
