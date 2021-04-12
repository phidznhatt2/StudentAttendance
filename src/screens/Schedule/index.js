import React, { useState, useEffect } from 'react';
import {
  Animated,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import moment from 'moment';
import _ from 'lodash';
import { ScheduleList } from './components';

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

const Schedule = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(initRoutes);
  const [orientation, setOrientation] = useState('PORTRAIT');

  const onChange = newWindow => {
    const { width, height } = newWindow.window;

    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  };

  useEffect(() => {
    console.log(moment().utc(7));

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

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

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
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
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
  );
};

export default Schedule;

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
