import React from 'react';
import {
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  LogBox,
} from 'react-native';
import { connect } from 'react-redux';
import { changeProfile } from '_redux/actions/user';
import { getCourseStudent } from '_redux/actions/course';
import { ListItem, Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

LogBox.ignoreLogs(['componentWillReceiveProps']);

const Course = props => {
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
                props.navigation.navigate('Course');
              },
            },
          ]);
        } else {
          props.navigation.navigate('Course');
        }
      });

    return unsubscribe;
  }, [props.navigation, props.user.userSetting]);

  React.useEffect(() => {
    props.getCourseStudent(props.user.userInfo.id);
  }, []);

  const onRefresh = () => {
    props.getCourseStudent(props.user.userInfo.id);
  };

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

  const renderCourse = courseList =>
    courseList.map((l, i) => (
      <ListItem
        key={i}
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95} //
        linearGradientProps={{
          colors: ['#ECE9E6', '#fff'],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        ViewComponent={LinearGradient}
        containerStyle={styles.listContainer}>
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.title}>{l.nameSubject}</ListItem.Title>
          <ListItem.Subtitle style={[styles.subTitle, { marginBottom: 5 }]}>
            <View style={styles.subView}>
              <Icon
                style={styles.icon}
                name="school"
                type="material-community"
                size={16}
                color="#797979"
              />
              <Text style={styles.text}>{l.nameCourse}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle style={[styles.subTitle, { marginBottom: 5 }]}>
            <View style={styles.subView}>
              <Icon
                style={styles.icon}
                name="chalkboard-teacher"
                type="font-awesome-5"
                size={14}
                color="#797979"
              />
              <Text style={styles.text}>{l.nameTeacher}</Text>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={{ justifyContent: 'flex-end' }}>
          <Text
            style={[
              styles.text,
              { fontSize: 14, color: l.status ? '#797979' : '#FF464A' },
            ]}>
            {l.status ? 'Đã đăng ký' : 'Đang xử lý'}
          </Text>
        </View>
      </ListItem>
    ));

  return (
    <View style={styles.container}>
      {props.course.isLoading ? (
        <ActivityIndicator
          size="large"
          color="#1890ff"
          animating={props.course.isLoading}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl onRefresh={onRefresh} />}>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
            }}>
            {renderCourse(props.course.courseList)}
          </View>
        </ScrollView>
      )}
      <ActionButton
        buttonColor="rgb(66,133,244)"
        onPress={() => {
          props.navigation.navigate('SignUpCourse');
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  course: state.course,
});

export default connect(mapStateToProps, { getCourseStudent, changeProfile })(
  Course,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {},
  icon: {
    marginRight: 5,
    width: 20,
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
  subTitle: {},
  subView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  title: {
    color: '#797979',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
