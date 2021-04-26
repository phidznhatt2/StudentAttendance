import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import BLEAdvertiser from 'react-native-ble-advertiser';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { Button } from 'react-native-elements';

// Uses the Apple code to pick up iPhones
// 0x02 0x15 android
const APPLE_ID = 0x4c;
const MANUF_DATA = [1, 0];

BLEAdvertiser.setCompanyId(APPLE_ID);

export async function requestLocationPermission() {
  const checkLocationPermission = PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (checkLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }
  try {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }

  return false;
}

const Toast = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};

const AttendanceOffline = () => {
  const [idBle, setIdBle] = useState(null);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
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
    } catch (error) {
      setBluetoothEnabled(false);
    }
  };

  const requestEnabled = callBack => {
    BluetoothStateManager.requestToEnable()
      .then(result => {
        /* console.log(result); */
        callBack();
      })
      .catch(err => {
        /* console.log(err); */
      });
  };

  useEffect(async () => {
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

    await AsyncStorage.getItem('idBle').then(id => setIdBle(id));

    return () => {
      onBTStatusChange.remove();
      stopAttendance();
    };
  }, []);

  const startAdvertising = async () => {
    try {
      console.log(idBle, 'Starting Advertising');
      await BLEAdvertiser.broadcast(idBle, MANUF_DATA, {
        advertiseMode: BLEAdvertiser.ADVERTISE_MODE_LOW_LATENCY,
        txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_LOW,
        connectable: false,
        includeDeviceName: false,
        includeTxPowerLevel: false,
      })
        .then(sucess => console.log(idBle, 'Adv Successful', sucess))
        .catch(error => console.log(idBle, 'Adv Error', error));

      console.log(idBle, 'Starting Scanner');
      await BLEAdvertiser.scan(MANUF_DATA, {
        scanMode: BLEAdvertiser.SCAN_MODE_LOW_LATENCY,
      })
        .then(sucess => console.log(idBle, 'Scan Successful', sucess))
        .catch(error => console.log(idBle, 'Scan Error', error));
    } catch (err) {
      Toast(err.message);
    }
  };

  const stopAdvertising = () => {
    console.log(idBle, 'Stopping Broadcast');

    BLEAdvertiser.stopBroadcast()
      .then(sucess => console.log(idBle, 'Stop Broadcast Successful', sucess))
      .catch(error => console.log(idBle, 'Stop Broadcast Error', error));

    console.log(idBle, 'Stopping Scanning');
    BLEAdvertiser.stopScan()
      .then(sucess => console.log(idBle, 'Stop Scan Successful', sucess))
      .catch(error => console.log(idBle, 'Stop Scan Error', error));
  };

  const startAttendance = async () => {
    const checkPermission = await requestLocationPermission();
    if (checkPermission) {
      if (!bluetoothEnabled) {
        requestEnabled(onStartScan);
      } else {
        onStartScan();
      }
    }
  };

  const onStartScan = async () => {
    await startAdvertising();
    setDiscovering(true);
  };

  const stopAttendance = () => {
    stopAdvertising();
    setDiscovering(false);
  };

  const title = discovering ? 'Đang điểm danh' : 'Điểm danh';
  const toggleDiscovery = discovering
    ? () => stopAttendance()
    : () => startAttendance();

  return (
    <View style={styles.container}>
      <Image
        source={require('_assets/images/logo-sub.png')}
        resizeMode="center"
        style={styles.logo}
      />
      <Button
        block
        onPress={toggleDiscovery}
        title={title}
        style={styles.btn}
      />
    </View>
  );
};

export default AttendanceOffline;

const styles = StyleSheet.create({
  btn: {
    flex: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    width: '90%',
  },
});
