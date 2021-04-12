import React from 'react';
import {
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getCourseStudent } from '_redux/actions/course';
import { ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

const Course = props => {
  React.useEffect(() => {
    props.getCourseStudent(props.user.userInfo.id);
  }, []);

  const onRefresh = () => {
    props.getCourseStudent(props.user.userInfo.id);
  };

  const convertTime = d => {
    console.log(d);
  };

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
            {props.course.courseList.map((l, i) => (
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
                  <ListItem.Title style={styles.title}>
                    {l.nameSubject}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={[styles.subTitle, { marginBottom: 2.5 }]}>
                    <View style={styles.subView}>
                      <Icon
                        style={styles.icon}
                        name="school"
                        type="material-community"
                        size={16}
                        color="#797979"
                      />
                      <Text style={styles.text}>{l.name}</Text>
                    </View>
                  </ListItem.Subtitle>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={styles.subView}>
                      <Icon
                        style={styles.icon}
                        name="clock-outline"
                        type="material-community"
                        size={16}
                        color="#797979"
                      />
                      <Text style={styles.text}>{l.schoolYear}</Text>
                    </View>
                    <View style={styles.subView}>
                      <Icon
                        style={styles.icon}
                        name="clock-outline"
                        type="material-community"
                        size={16}
                        color="#797979"
                      />
                      <Text style={styles.text}>{l.schoolYear}</Text>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  course: state.course,
});

export default connect(mapStateToProps, { getCourseStudent })(Course);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {},
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
  subTitle: {},
  subView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#797979',
    fontSize: 16,
  },
  title: {
    color: '#797979',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
