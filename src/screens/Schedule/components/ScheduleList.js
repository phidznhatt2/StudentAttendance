import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { getScheduleByDate } from '_redux/actions/schedule';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import checkDevice from '_utils/checkDevice';
import AwesomeAlert from 'react-native-awesome-alerts';

const TimeStart = {
  1: '7:30',
  2: '8:15',
  3: '9:00',
  4: '10:00',
  5: '10:45',
  6: '13:00',
  7: '13:45',
  8: '14:30',
  9: '15:30',
  10: '16:15',
};

const TimeEnd = {
  1: '8:15',
  2: '9:00',
  3: '9:45',
  4: '10:45',
  5: '11:30',
  6: '13:45',
  7: '14:30',
  8: '15:15',
  9: '16:15',
  10: '17:00',
};

const ScheduleItem = props => {
  const { data, navigation, equipmentList } = props;
  const [showAlert, setShowAlert] = useState(false);

  const getTimeDuration = (start, end) =>
    `${TimeStart[start]} - ${TimeEnd[end]}`;

  const checkDateTime = d => {
    const date = new Date(d).toLocaleDateString();
    const today = new Date().toLocaleDateString();

    return today === date;
  };

  const onCancel = () => {
    setShowAlert(false);
  };

  const onConfirm = () => {
    props.navigation.navigate('Setting');
    setShowAlert(false);
  };

  return (
    <>
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95} //
        linearGradientProps={{
          colors: ['#ECE9E6', '#fff'],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        ViewComponent={LinearGradient} // Only if no expo
        containerStyle={styles.listContainer}
        onPress={() => {
          if (checkDevice(equipmentList)) {
            navigation.navigate('Attendance', {
              idSchedule: data.id_Schedule,
              idCourse: data.id_Course,
            });
          } else {
            setShowAlert(true);
          }
        }}
        /*  disabled={!checkDateTime(data.date)} */
      >
        <ListItem.Content>
          <View style={styles.subView}>
            <Icon
              style={styles.icon}
              name="school"
              type="material-community"
              size={16}
              color="#797979"
            />
            <Text style={styles.text}>{data.nameCourse}</Text>
          </View>

          <View style={[styles.subView, { marginTop: 10 }]}>
            <View style={[styles.subView, { justifyContent: 'flex-start' }]}>
              <Icon
                style={styles.icon}
                name="map-marker-outline"
                type="material-community"
                size={16}
                color="#797979"
              />
              <Text style={styles.text}>{data.nameClass}</Text>
            </View>
            <View style={[styles.subView, { justifyContent: 'flex-end' }]}>
              <Icon
                style={styles.icon}
                name="clock-outline"
                type="material-community"
                size={16}
                color="#797979"
              />
              <Text style={styles.text}>
                {getTimeDuration(data.timeBegin, data.timeEnd)}
              </Text>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
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
    </>
  );
};

ScheduleItem.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.any,
    id_Course: PropTypes.any,
    id_Schedule: PropTypes.any,
    nameClass: PropTypes.any,
    timeBegin: PropTypes.any,
    timeEnd: PropTypes.any,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

const ScheduleList = props => {
  const { isLoading, scheduleDates } = props.schedule;
  const { key: date } = props.route;
  const navigation = useNavigation();

  useEffect(async () => {
    await AsyncStorage.getItem('uuid').then(id =>
      props.getScheduleByDate({ date, id }),
    );
  }, []);

  const onRefresh = () => {
    const { id } = props.user.userInfo;
    props.getScheduleByDate({ date, id });
  };

  const renderSchedule = () => {
    if (!_.isEmpty(scheduleDates[date])) {
      return scheduleDates[date].map((item, index) => (
        <ScheduleItem
          key={index}
          data={item}
          navigation={navigation}
          equipmentList={props.user.userInfo.studentEquipment}
        />
      ));
    }

    return <Text>Không có dữ liệu!</Text>;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#1890ff" animating={isLoading} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl onRefresh={onRefresh} />}>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              flex: 1,
            }}>
            {renderSchedule()}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

ScheduleList.propTypes = {
  getScheduleByDate: PropTypes.func,
  route: PropTypes.shape({
    key: PropTypes.any,
  }),
  schedule: PropTypes.shape({
    isLoading: PropTypes.any,
    scheduleDates: PropTypes.any,
  }),
  user: PropTypes.shape({
    userInfo: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

const mapStateToProps = state => ({
  user: state.user,
  schedule: state.schedule,
});

export default connect(mapStateToProps, { getScheduleByDate })(ScheduleList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  listContainer: {
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: '85%',
  },
  subView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: '#797979',
    fontSize: 16,
  },
});
