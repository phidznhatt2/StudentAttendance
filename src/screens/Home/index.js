import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getUserById } from '_redux/actions/user';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ScrollView } from 'react-native-gesture-handler';

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

const HomeScreen = props => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(async () => {
    // Request Location
    await requestLocationPermission();

    // Get User Logined
    await AsyncStorage.getItem('uuid').then(id =>
      props.getUserById({
        id,
        onAttendance,
        showAlert: () => setShowAlert(true),
      }),
    );
  }, []);

  const onRefresh = () => {
    const { id } = props.user.userInfo;
    props.getUserById({
      id,
    });
  };

  const onCancel = () => {
    setShowAlert(false);
  };

  const onConfirm = () => {
    props.navigation.navigate('Setting');
    setShowAlert(false);
  };

  const onAttendance = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'AttendanceOff' }],
    });
  };

  const { isLoading } = props.user;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1890ff" />
        ) : (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            refreshControl={<RefreshControl onRefresh={onRefresh} />}>
            <Text style={{ textAlign: 'center' }}>Home</Text>
          </ScrollView>
        )}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Thông báo"
          message="Thiết bị chưa đăng ký điểm danh."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Để sau"
          confirmText="Đăng ký ngay"
          confirmButtonColor="#DD6B55"
          onCancelPressed={onCancel}
          onConfirmPressed={onConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  getUserById: PropTypes.func,
  user: PropTypes.shape({
    isLoading: PropTypes.any,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserById })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
