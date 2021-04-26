import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  LogBox,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { registerCourse } from '_redux/actions/user';
import { getCourseAllBySub, getCourseBySub } from '_redux/actions/course';
import { ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import moment from 'moment';
import { Loading } from '_components';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const CourseBySubject = props => {
  const [keySearch, setKeySearch] = useState('');
  const [pageCount, setPageCount] = useState(1);
  let onEndReachedCalledDuringMomentum = true;
  const { idSubject } = props.route.params;

  useEffect(() => {
    props.navigation.setParams({
      onSearch,
    });
    props.getCourseAllBySub({ idSubject, keyword: keySearch });
  }, []);

  const onSearch = keyword => {
    setKeySearch(keyword);
    setPageCount(1);
    props.getCourseAllBySub({ idSubject, keyword });
  };

  const onRefresh = () => {
    setPageCount(1);
    props.getCourseAllBySub({ idSubject, keyword: keySearch });
  };

  const onLoadMore = () => {
    if (props.course.courseListSub.length < props.course.courseSubSize) {
      props.getCourseBySub({
        idSubject,
        keyword: keySearch,
        page: pageCount + 1,
      });
      setPageCount(pageCount + 1);
    }
  };

  const onSignUpCourse = (idCourse, name) => {
    const { id: idStudent } = props.user.userInfo;
    Alert.alert('Thông báo', `Bạn có muốn đăng ký khóa học ${name}?`, [
      {
        text: 'Không',
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: () =>
          props.registerCourse({
            id_Course: idCourse,
            id_Student: idStudent,
            message,
          }),
      },
    ]);
  };

  const message = msg => {
    Alert.alert('Thông báo', `${msg}`, [
      {
        text: 'Ok',
      },
    ]);
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem
      key={item.id_Subject}
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
      containerStyle={styles.listContainer}
      onPress={() => onSignUpCourse(item.id_Course, item.name)}>
      <ListItem.Content style={styles.content}>
        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.wrapperText}>
            <Icon
              style={styles.icon}
              name="clock"
              type="font-awesome-5"
              size={16}
              color="#797979"
            />
            <Text style={styles.text}>
              {moment(item.dateBegin).format('DD/MM')}&nbsp;-&nbsp;
              {moment(item.dateEnd).format('DD/MM')}
            </Text>
          </View>
          <View style={styles.wrapperText}>
            <Icon
              style={styles.icon}
              name="user-alt"
              type="font-awesome-5"
              size={16}
              color="#797979"
            />
            <Text style={styles.text}>{item.nameTeacher}</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  );

  const footerList = () =>
    props.course.isScrolling && (
      <Text style={{ textAlign: 'center', color: '#FF464A' }}>Đang tải</Text>
    );

  return (
    <View style={styles.container}>
      <Loading loading={props.user.isRegister} />
      {props.course.isLoading ? (
        <ActivityIndicator
          size="large"
          color="#1890ff"
          animating={props.course.isLoading}
        />
      ) : (
        <>
          {!_.isEmpty(props.course.courseListSub) ? (
            <FlatList
              style={{ flex: 1 }}
              keyExtractor={keyExtractor}
              data={props.course.courseListSub}
              renderItem={renderItem}
              onEndReached={({ distanceFromEnd }) => {
                if (!onEndReachedCalledDuringMomentum) {
                  onLoadMore();
                  onEndReachedCalledDuringMomentum = true;
                }
              }}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => {
                onEndReachedCalledDuringMomentum = false;
              }}
              ListFooterComponent={footerList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onRefresh={onRefresh}
              refreshing={props.course.isLoading}
            />
          ) : (
            <Text style={{ textAlign: 'center' }}>Không có dữ liệu!</Text>
          )}
        </>
      )}
    </View>
  );
};

CourseBySubject.propTypes = {
  course: PropTypes.shape({
    courseListSub: PropTypes.any,
    courseSubSize: PropTypes.any,
    isLoading: PropTypes.any,
    isScrolling: PropTypes.any,
  }),
  getCourseAllBySub: PropTypes.func,
  getCourseBySub: PropTypes.func,
  navigation: PropTypes.shape({
    setParams: PropTypes.func,
  }),
  registerCourse: PropTypes.func,
  route: PropTypes.shape({
    params: PropTypes.shape({
      idSubject: PropTypes.any,
    }),
  }),
  user: PropTypes.shape({
    isRegister: PropTypes.any,
    userInfo: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

const mapStateToProps = state => ({
  course: state.course,
  user: state.user,
});

export default connect(mapStateToProps, {
  registerCourse,
  getCourseBySub,
  getCourseAllBySub,
})(CourseBySubject);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {},
  icon: {
    marginRight: 5,
  },
  listContainer: {
    alignSelf: 'center',
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
  text: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  title: {
    color: '#797979',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wrapperText: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
});
