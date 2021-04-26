import api from '_services/api';

const endPoint = '/Student';
const endPointRegister = 'Register';
const endPointLogin = 'authenticate';
const endPointRegisterAcount = `${endPointRegister}/Account`;
const endPointRegisterEquipment = `${endPointRegister}/Equipment`;
const endPointRegisterCourse = `${endPointRegister}/CourseByUSer`;
const endPointEquipmentTeacher = 'EquipmentTeacher';
const endPointAttendance = '/AttendanceStudent/CreatebyStudent';
const endPointStatusAttendance = 'PagingBySchedule';
const endPointDelDevice = 'Notification/Create';

export const loginUser = params =>
  api.post(`${endPoint}/${endPointLogin}`, params);

export const signupUser = params =>
  api.post(`${endPoint}/${endPointRegisterAcount}`, params);

export const getUserbyId = params =>
  api.get(`${endPoint}/${params}`, { timeout: 7500 });

export const addDeviceUser = params =>
  api.post(`${endPoint}/${endPointRegisterEquipment}`, params);

export const getEquipmentTeacher = params =>
  api.get(`${endPoint}/${endPointEquipmentTeacher}?id_Schedule=${params}`);

export const attendanceStudent = params =>
  api.post(`${endPointAttendance}`, params);

export const getStatusAttendance = params =>
  api.get(`${endPoint}/${endPointStatusAttendance}?id_Schedule=${params}`);

export const delDeviceUser = params => api.post(`${endPointDelDevice}`, params);

export const registerCourse = params =>
  api.post(`${endPoint}/${endPointRegisterCourse}`, params);

export const saveProfile = params => api.put(`${endPoint}/Update`, params);
