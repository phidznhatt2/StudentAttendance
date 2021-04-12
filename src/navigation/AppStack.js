/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { Header, Sidebar } from '_components';
import {
  HomeScreen,
  CourseScreen,
  ProfileScreen,
  SettingScreen,
  ScheduleScreen,
  AttendanceScreen,
  AttendanceOffScreen,
} from '_screens';

import stylesByPlatform from '_utils/font';

const window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator mode="card" headerMode="screen">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header
            white
            transparent
            title="Trang chủ"
            navigation={navigation}
            scene={scene}
          />
        ),
      }}
    />
    {/* <Stack.Screen
      name="AttendanceOff"
      component={AttendanceOffScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header title="Điểm danh" navigation={navigation} scene={scene} />
        ),
      }}
    /> */}
  </Stack.Navigator>
);

const CourseStack = () => (
  <Stack.Navigator mode="card" headerMode="screen">
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
  </Stack.Navigator>
);

const ScheduleStack = () => (
  <Stack.Navigator initialRouteName="Schedule" mode="card" headerMode="screen">
    <Stack.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header title="Lịch học" navigation={navigation} scene={scene} />
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

const ProfileStack = () => (
  <Stack.Navigator mode="card" headerMode="screen">
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header title="Bảo mật" navigation={navigation} scene={scene} />
        ),
      }}
    />
  </Stack.Navigator>
);

const SettingStack = () => (
  <Stack.Navigator mode="card" headerMode="screen">
    <Stack.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        header: ({ navigation, scene }) => (
          <Header title="Cài đặt" navigation={navigation} scene={scene} />
        ),
      }}
    />
  </Stack.Navigator>
);

const AppDrawer = ({ navigation }) => {
  const [initWidth, setInitWidth] = useState(width);

  useEffect(() => {
    if (width > height) {
      setInitWidth(height);
    }
  }, []);

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <Sidebar {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: initWidth * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: '#9C26B0',
        inactiveBackgroundColor: 'transparent',
        itemStyle: {
          width: initWidth * 0.74,
          paddingHorizontal: 12,
          paddingVertical: 0,
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 14,
          alignSelf: 'flex-start',
          ...stylesByPlatform,
        },
      }}
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <View>
              <Icon
                type="font-awesome-5"
                name="home"
                size={16}
                color={focused ? 'white' : '#979797'}
                style={{ width: 16, height: 16 }}
              />
            </View>
          ),
          drawerLabel: 'Trang chủ',
        }}
      />
      <Drawer.Screen
        name="Course"
        component={CourseStack}
        options={{
          drawerIcon: ({ focused }) => (
            <View>
              <Icon
                type="font-awesome-5"
                name="clipboard-list"
                size={16}
                color={focused ? 'white' : '#979797'}
                style={{ width: 16, height: 16 }}
              />
            </View>
          ),
          drawerLabel: 'Khóa học',
        }}
      />
      <Drawer.Screen
        name="Schedule"
        component={ScheduleStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              type="font-awesome-5"
              name="calendar-check"
              size={16}
              color={focused ? 'white' : '#979797'}
              style={{ width: 16, height: 16 }}
            />
          ),
          drawerLabel: 'Lịch học',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              type="font-awesome-5"
              name="user-cog"
              size={16}
              color={focused ? 'white' : '#979797'}
              style={{ width: 16, height: 16 }}
            />
          ),
          drawerLabel: 'Bảo mật',
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              type="font-awesome-5"
              name="cog"
              size={16}
              color={focused ? 'white' : '#979797'}
              style={{ width: 16, height: 16 }}
            />
          ),
          drawerLabel: 'Cài đặt',
        }}
      />
    </Drawer.Navigator>
  );
};

const AppStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Drawer">
    <Stack.Screen
      name="Drawer"
      component={AppDrawer}
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
