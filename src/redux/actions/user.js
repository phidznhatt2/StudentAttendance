import RNRestart from 'react-native-restart';
import * as apiUser from '_api/user';
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
import AsyncStorage from '@react-native-community/async-storage';
import { getUniqueId } from 'react-native-device-info';
import _ from 'lodash';
import { Alert } from 'react-native';

const createActionLoginUser = type => payload => dispatch => {
  const { data, messageSuccess, messageError } = payload;
  dispatch({ type });
  apiUser
    .loginUser(data)
    .then(res => {
      const { accessToken, ...rest } = res.data.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: rest });
      AsyncStorage.multiSet([
        ['accessToken', accessToken],
        ['uuid', rest.id],
      ]);
      messageSuccess(accessToken);
    })
    .catch(err => {
      dispatch({ type: LOGIN_USER_ERROR, payload: err.response.data });
      messageError();
    });
};

const createActionSignupUser = type => payload => dispatch => {
  const { data, message } = payload;
  dispatch({ type });
  apiUser
    .signupUser(data)
    .then(res => {
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.data });
      message(res.data.message);
    })
    .catch(err => {
      dispatch({ type: SIGNUP_USER_ERROR, payload: err.response.data });
      message(err.response.data.message);
    });
};

const createActionLogoutUser = type => payload => dispatch => {
  const { signOut } = payload;
  AsyncStorage.clear();
  signOut();
  dispatch({ type });
};

const createActionAddDeviceUser = type => payload => dispatch => {
  const { data, message } = payload;
  dispatch({ type });
  apiUser
    .addDeviceUser(data)
    .then(res => {
      const { id_Student, ...rest } = data;
      dispatch({
        type: ADD_DEVICE_USER_SUCCESS,
        payload: { status: res.data.isSuccessed, deviceInfo: rest },
      });
      AsyncStorage.setItem('idBle', data.id_BLE);
      message(res.data.message);
    })
    .catch(err => {
      dispatch({ type: ADD_DEVICE_USER_ERROR, payload: err.response.data });
      message(err.response.data.message);
    });
};

const createActionGetUserById = type => payload => dispatch => {
  const { id, onAttendance, showAlert } = payload;
  dispatch({ type });
  apiUser
    .getUserbyId(id)
    .then(res => {
      dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: res.data.data });
      const { studentEquipment } = res.data.data;
      const equipment = studentEquipment.find(
        ite => ite.id_Equipment === getUniqueId(),
      );

      if (!_.isEmpty(equipment)) {
        AsyncStorage.setItem('idBle', equipment.id_BLE);
      } else if (showAlert) {
        setTimeout(() => {
          showAlert();
        }, 1000);
      }
    })
    .catch(err => {
      dispatch({ type: GET_USER_BY_ID_ERROR, payload: err });
      AsyncStorage.getItem('idBle').then(idBle => {
        if (!_.isNull(idBle)) {
          Alert.alert('Lỗi kết nối', 'Điểm danh khi không sử dụng mạng!', [
            { text: 'Thử lại', onPress: () => RNRestart.Restart() },
            { text: 'Điểm danh', onPress: onAttendance },
          ]);
        } else {
          Alert.alert(
            'Lỗi kết nối',
            'Vui lòng kiểm tra lại kết nối mạng!',
            [
              {
                text: 'Thử lại',
                onPress: () => RNRestart.Restart(),
              },
            ],
            { cancelable: false },
          );
        }
      });
    });
};

const createActionGetEquipmentTeacher = type => payload => dispatch => {
  dispatch({ type });
  apiUser
    .getEquipmentTeacher(payload)
    .then(res => {
      dispatch({ type: GET_EQUIPMENT_TEACHER_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({
        type: GET_EQUIPMENT_TEACHER_ERROR,
        payload: err.response.data,
      });
    });
};

const createActionAttendanceStudent = type => payload => dispatch => {
  const { data, message } = payload;
  dispatch({ type });
  apiUser
    .attendanceStudent(data)
    .then(res => {
      dispatch({ type: ATTENDANCE_STUDENT_SUCCESS, payload: res.data.data });
      message('Điểm danh thành công!');
    })
    .catch(err => {
      dispatch({ type: ATTENDANCE_STUDENT_ERROR, payload: err.response.data });
      message(err.response.message);
    });
};

const createActionGetStatusAttendance = type => payload => dispatch => {
  const { idSchedule, idUser } = payload;
  dispatch({ type });
  apiUser
    .getStatusAttendance(idSchedule)
    .then(res => {
      const userInfo = res.data.data.items.find(
        ite => ite.id_Student === idUser,
      );
      const { status } = userInfo;
      dispatch({ type: GET_STATUS_ATTENDANCE_SUCCESS, payload: status });
    })
    .catch(err => {
      dispatch({
        type: GET_STATUS_ATTENDANCE_ERROR,
        payload: err.response.data,
      });
    });
};

const createActionDelDeviceUser = type => payload => dispatch => {
  const { data, closeModal } = payload;
  dispatch({ type });
  apiUser
    .delDeviceUser(data)
    .then(res => {
      dispatch({
        type: DEL_DEVICE_USER_SUCCESS,
        payload: { statusDel: false, idBle: data.id_BLE },
      });
      closeModal();
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DEL_DEVICE_USER_ERROR, payload: err.response.data });
    });
};

export const loginUser = createActionLoginUser(LOGIN_USER);
export const signupUser = createActionSignupUser(SIGNUP_USER);
export const logoutUser = createActionLogoutUser(LOGOUT_USER);
export const addDeviceUser = createActionAddDeviceUser(ADD_DEVICE_USER);
export const getUserById = createActionGetUserById(GET_USER_BY_ID);
export const getEquipmentTeacher = createActionGetEquipmentTeacher(
  GET_EQUIPMENT_TEACHER,
);
export const attendanceStudent = createActionAttendanceStudent(
  ATTENDANCE_STUDENT,
);
export const getStatusAttendance = createActionGetStatusAttendance(
  GET_STATUS_ATTENDANCE,
);
export const delDeviceUser = createActionDelDeviceUser(DEL_DEVICE_USER);
