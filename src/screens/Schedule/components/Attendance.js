/* eslint-disable function-paren-newline */
import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import BLEAdvertiser from 'react-native-ble-advertiser';
import { BleManager } from 'react-native-ble-plx';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getEquipmentTeacher,
  attendanceStudent,
  getStatusAttendance,
} from '_redux/actions/user';
import { getCourseById } from '_redux/actions/course';
import { getUniqueId } from 'react-native-device-info';

const manager = new BleManager();

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('[Permissions]', 'Location Permission granted');
      } else {
        console.log('[Permissions]', 'Location Permission denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

const Toast = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};

const Attendance = props => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [isDevice, setIsDevice] = React.useState(false);
  const [discovering, setDiscovering] = useState(false);

  const checkBluetootEnabled = async () => {
    try {
      const enabled = await BLEAdvertiser.getAdapterState()
        .then(result => {
          console.log('[Bluetooth]', 'Bluetooth Status', result);
          return result === 'STATE_ON';
        })
        .catch(error => {
          console.log('[Bluetooth]', 'Bluetooth Not Enabled', error);
          return false;
        });

      setBluetoothEnabled(enabled);

      /*       if (!enabled) {
        setTimeout(() => {
          requestEnabled();
        }, 1000);
      } else {
        setBluetoothEnabled(enabled);
      } */
    } catch (error) {
      setBluetoothEnabled(false);
    }
  };

  const requestEnabled = () => {
    BluetoothStateManager.requestToEnable()
      .then(result => {
        /* console.log(result); */
      })
      .catch(err => {
        /* console.log(err); */
      });
  };

  React.useLayoutEffect(() => {
    // get Info
    const { id: idUser } = props.user.userInfo;
    const { idSchedule, idCourse } = props.route.params;
    props.getEquipmentTeacher(idSchedule);
    props.getCourseById(idCourse);
    props.getStatusAttendance({ idSchedule, idUser });
  }, []);

  useEffect(async () => {
    // request location
    await requestLocationPermission();

    // check init status bluetooth
    await checkBluetootEnabled();

    // onChange bluetooth
    const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);
    const onBTStatusChange = eventEmitter.addListener('onBTStatusChange', e => {
      setBluetoothEnabled(e.enabled);
      if (!e.enabled) {
        stopAttendance();
      }
    });

    return () => {
      onBTStatusChange.remove();
      stopAttendance();
      manager.destroy();
    };
  }, []);

  const scanAdvertising = () => {
    const { id_EquipmentTeacher: idEquipmentTeacher } = props.user.history;

    manager.startDeviceScan(null, null, (error, device) => {
      // Location services are disabled
      if (!_.isNull(device.serviceUUIDs)) {
        const uuid = device.serviceUUIDs[0];
        if (uuid === idEquipmentTeacher) {
          setIsDevice(true);
          stopAttendance();
        }
      }

      if (error) {
        console.log(error);
        stopAttendance();
      }
    });
  };

  const startAttendance = async () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(async response => {
        if (response) {
          if (!bluetoothEnabled) {
            requestEnabled();
          } else {
            scanAdvertising();
            setDiscovering(true);
          }
        } else {
          await requestLocationPermission();
        }
      })
      .catch(error => console.log(error));
  };

  const stopAttendance = () => {
    manager.stopDeviceScan();
    setDiscovering(false);
  };

  const message = msg => {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }]);
  };

  const onRefresh = () => {
    const { id: idUser } = props.user.userInfo;
    const { idSchedule } = props.route.params;
    props.getStatusAttendance({ idSchedule, idUser });
    stopAttendance();
    setIsDevice(false);
  };

  const saveAttendance = () => {
    const { idSchedule } = props.route.params;
    const { studentEquipment } = props.user.userInfo;
    const equipment = studentEquipment.find(
      ite => ite.id_Equipment === getUniqueId(),
    );

    const data = {
      id_Schedule: idSchedule,
      id_BLE: equipment.id_BLE,
    };
    props.attendanceStudent({ data, message });
  };

  const title = discovering ? 'Đang điểm danh (dừng)' : 'Điểm danh';
  const toggleDiscovery = discovering
    ? () => stopAttendance()
    : () => startAttendance();

  const { nameTeacher, name } = props.course.courseTemp;
  const { isLoading: loadingCourse } = props.course;
  const { status } = props.user.history;
  const { isLoadingEq, isLoadingSt, isActing } = props.user;

  const animating = loadingCourse || isLoadingEq || isLoadingSt;

  return (
    <View style={styles.container}>
      {animating ? (
        <ActivityIndicator size="large" color="#1890ff" animating={animating} />
      ) : (
        <>
          {status ? (
            <Button title="Bạn đã điểm danh" disabled />
          ) : (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl onRefresh={onRefresh} />}>
                <View>
                  {isDevice && (
                    <ListItem style={styles.deviceListItem}>
                      <ListItem.Content>
                        <ListItem.Title>{name}</ListItem.Title>
                        <ListItem.Subtitle>{nameTeacher}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  )}
                </View>
              </ScrollView>
              {Platform.OS !== 'ios' ? (
                <View>
                  <Button block onPress={toggleDiscovery} title={title} />
                  <Button
                    block
                    onPress={saveAttendance}
                    title="Lưu"
                    containerStyle={{ marginTop: 10 }}
                    loading={isActing}
                    disabled={!isDevice}
                  />
                </View>
              ) : undefined}
            </>
          )}
        </>
      )}
    </View>
  );
};

Attendance.propTypes = {
  attendanceStudent: PropTypes.func,
  course: PropTypes.shape({
    courseTemp: PropTypes.shape({
      nameTeacher: PropTypes.any,
      name: PropTypes.any,
    }),
    isLoading: PropTypes.any,
  }),
  createRepo: PropTypes.func,
  getCourseById: PropTypes.func,
  getEquipmentStudent: PropTypes.func,
  getEquipmentTeacher: PropTypes.func,
  getStatusAttendance: PropTypes.func,
  getStudentBySchedule: PropTypes.func,
  idSchedule: PropTypes.any,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        idSchedule: PropTypes.any,
      }),
    }),
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      idCourse: PropTypes.any,
      idSchedule: PropTypes.any,
    }),
  }),
  schedule: PropTypes.shape({
    idCourse: PropTypes.any,
  }),
  teacher: PropTypes.shape({
    equipmentList: PropTypes.array,
    isActing: PropTypes.any,
    isLoading: PropTypes.any,
    isLoadingEq: PropTypes.any,
    isLoadingRp: PropTypes.any,
    studentList: PropTypes.any,
  }),
  user: PropTypes.shape({
    history: PropTypes.shape({
      id_EquipmentTeacher: PropTypes.any,
      status: PropTypes.any,
    }),
    isActing: PropTypes.any,
    isLoading: PropTypes.any,
    isLoadingEq: PropTypes.any,
    isLoadingSt: PropTypes.any,
    userInfo: PropTypes.shape({
      id: PropTypes.any,
      studentEquipment: PropTypes.array,
    }),
  }),
};

const mapStateToProps = state => ({
  user: state.user,
  course: state.course,
  schedule: state.schedule,
});

export default connect(mapStateToProps, {
  getEquipmentTeacher,
  attendanceStudent,
  getStatusAttendance,
  getCourseById,
})(Attendance);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  deviceListItem: {
    alignItems: 'center',
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 1,
  },
});
