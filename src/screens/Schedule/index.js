import React, { useState, useEffect } from 'react';
import {
  Platform,
  PermissionsAndroid,
  Animated,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TabView, SceneMap } from 'react-native-tab-view';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getUserById, changeProfile } from '_redux/actions/user';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ScheduleList } from './components';

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

const { width: w, height: h } = Dimensions.get('window');

const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

const initRoutes = [];

const initSceneMap = {};

const getScheduleTime = () => {
  const dayTime = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  // eslint-disable-next-line array-callback-return
  dayTime.map((item, index) => {
    const newDay = moment()
      .utc(7)
      .day('Monday')
      .add(index, 'days')
      .format('YYYY-MM-DD');

    initRoutes.push({ key: newDay, title: dayTime[index] });
    _.assign(initSceneMap, { [newDay]: ScheduleList });
  });
};

getScheduleTime();

const Schedule = props => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(initRoutes);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [showAlert, setShowAlert] = useState(false);

  const onChange = newWindow => {
    const { width, height } = newWindow.window;

    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  };

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

    if (w < h) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  React.useEffect(() => {
    const unsubscribe = props.navigation
      .dangerouslyGetParent()
      .addListener('tabPress', e => {
        if (isChangingProfile()) {
          e.preventDefault();
          Alert.alert('Thông báo', 'Bạn có muốn hủy thay đổi?', [
            { text: 'Không', style: 'cancel' },
            {
              text: 'Hủy thay đổi',
              onPress: () => {
                props.changeProfile({
                  data: {
                    id_User: props.user.userInfo.id,
                    fullName: props.user.userInfo.fullName,
                    email: props.user.userInfo.email,
                    ThumbnailImage: props.user.userInfo.urlImg,
                  },
                });
                props.navigation.navigate('Schedule');
              },
            },
          ]);
        } else {
          props.navigation.navigate('Schedule');
        }
      });

    return unsubscribe;
  }, [props.navigation, props.user.userSetting]);

  const isChangingProfile = () => {
    const { userInfo, userSetting } = props.user;
    if (
      userInfo.fullName === userSetting.fullName &&
      userInfo.email === userSetting.email &&
      userInfo.urlImg === userSetting.ThumbnailImage
    ) {
      return false;
    }
    return true;
  };

  const onAttendance = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'AttendanceOff' }],
    });
  };

  const onCancel = () => {
    setShowAlert(false);
  };

  const onConfirm = () => {
    props.navigation.navigate('Profile');
    setShowAlert(false);
  };

  const renderTabBar = propsTab => {
    const inputRange = propsTab.navigationState.routes.map((x, i) => i);

    return (
      <ScrollView
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          justifyContent: 'center',
          flex: orientation === 'PORTRAIT' ? 0 : 1,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.tabBar}>
          {propsTab.navigationState.routes.map((route, i) => {
            const opacity = propsTab.position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 1 : 0.5,
              ),
            });

            const active = i === index;

            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabItem,
                  { borderBottomColor: active ? '#1890ff' : 'transparent' },
                ]}
                onPress={() => setIndex(i)}>
                <Animated.Text
                  style={{ opacity, color: active ? '#1890ff' : '#000' }}>
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderScene = SceneMap(initSceneMap);

  const renderLazyPlaceholder = ({ route }) => (
    <LazyPlaceholder route={route} />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        renderLazyPlaceholder={renderLazyPlaceholder}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
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
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserById, changeProfile })(
  Schedule,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    alignItems: 'center',
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabItem: {
    borderBottomWidth: 2,
    padding: 16,
  },
});
