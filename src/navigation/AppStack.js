/* eslint-disable react/display-name */
import React from 'react';
import { Alert } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { Header } from '_components';
import {
  CourseScreen,
  SettingScreen,
  ScheduleScreen,
  AttendanceScreen,
  AttendanceOffScreen,
  SignUpCourseScreen,
  CourseBySubjectScreen,
  DeviceSettingScreen,
  NameSettingScreen,
  HistoryCourseScreen,
} from '_screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ScheduleStack = () => (
  <Stack.Navigator initialRouteName="Schedule" mode="card" headerMode="screen">
    <Stack.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header title="Điểm danh" navigation={navigation} scene={scene} />
        ),
      }}
    />
    <Stack.Screen
      name="Attendance"
      component={AttendanceScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            title="Điểm danh"
            back
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const CourseStack = () => (
  <Stack.Navigator mode="card" headerMode="screen" initialRouteName="Course">
    <Stack.Screen
      name="Course"
      component={CourseScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            white
            transparent
            title="Khóa học"
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
    <Stack.Screen
      name="SignUpCourse"
      component={SignUpCourseScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            back
            title="Đăng ký"
            search
            placeholderSearch="Môn học"
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
    <Stack.Screen
      name="CourseBySubject"
      component={CourseBySubjectScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            back
            title={scene.route.params.name}
            search
            check
            placeholderSearch="Khóa học"
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
    <Stack.Screen
      name="HistoryCourse"
      component={HistoryCourseScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            back
            title="Lịch sử đăng ký"
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator mode="card" headerMode="screen">
    <Stack.Screen
      name="Profile"
      component={SettingScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header title="Cá nhân" navigation={navigation} scene={scene} />
        ),
      }}
    />
    <Stack.Screen
      name="DeviceSetting"
      component={DeviceSettingScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            title="Thay đổi thiết bị"
            back
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
    <Stack.Screen
      name="NameSetting"
      component={NameSettingScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            title="Sửa tên"
            back
            check
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    initialRouteName="Schedule"
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}>
    <Tab.Screen
      name="Schedule"
      component={ScheduleStack}
      options={({ route }) => ({
        tabBarLabel: 'Điểm danh',
        tabBarIcon: ({ color }) => (
          <Icon
            type="font-awesome-5"
            name="calendar-check"
            color={color}
            size={20}
          />
        ),
        // eslint-disable-next-line no-shadow
        tabBarVisible: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';

          if (routeName === 'Attendance') {
            return false;
          }

          return true;
        })(route),
      })}
    />
    <Tab.Screen
      name="Course"
      component={CourseStack}
      options={{
        tabBarLabel: 'Khóa học',
        tabBarIcon: ({ color }) => (
          <Icon
            type="font-awesome-5"
            name="clipboard-list"
            color={color}
            size={20}
          />
        ),
      }}
      /* listeners={({ navigation, route }) => ({
        tabPress: e => {
          console.log(navigation, route);
          e.preventDefault();

          Alert.alert('Thông báo', 'Bạn có muốn hủy thay đổi?', [
            { text: 'Không', style: 'cancel' },
            {
              text: 'Hủy thay đổi',
              onPress: () => {
                navigation.navigate('Course');
              },
            },
          ]);
        },
      })} */
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Cá nhân',
        tabBarIcon: ({ color }) => (
          <Icon type="font-awesome-5" name="user-cog" color={color} size={20} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Tabs">
    <Stack.Screen
      name="Tabs"
      component={AppTabs}
      options={{
        animationEnabled: false,
      }}
    />
    <Stack.Screen
      name="AttendanceOff"
      component={AttendanceOffScreen}
      options={{
        animationEnabled: false,
      }}
    />
  </Stack.Navigator>
);

export default AppStack;
