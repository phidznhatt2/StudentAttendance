import React, { useEffect, useState } from 'react';
import {
  LogBox,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { getSubject, getSubjectAll } from '_redux/actions/subject';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const SignUpCourse = props => {
  const [keySearch, setKeySearch] = useState('');
  const [pageCount, setPageCount] = useState(1);
  let onEndReachedCalledDuringMomentum = true;

  useEffect(() => {
    props.navigation.setParams({
      onSearch,
    });
    props.getSubjectAll({ keyword: keySearch });
  }, []);

  const onSearch = keyword => {
    setKeySearch(keyword);
    setPageCount(1);
    props.getSubjectAll({ keyword });
  };

  const onRefresh = () => {
    setPageCount(1);
    props.getSubjectAll({ keyword: keySearch });
  };

  const onLoadMore = () => {
    if (props.subject.subjectList.length < props.subject.subjectSize) {
      props.getSubject({ keyword: keySearch, page: pageCount + 1 });
      setPageCount(pageCount + 1);
    }
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
      onPress={() =>
        props.navigation.navigate('CourseBySubject', {
          idSubject: item.id_Subject,
          name: item.name,
        })
      }>
      <ListItem.Content style={styles.content}>
        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.text}>
          {item.description}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const footerList = () =>
    props.subject.isScrolling && (
      <Text style={{ textAlign: 'center', color: '#FF464A' }}>Đang tải</Text>
    );

  return (
    <View style={styles.container}>
      {props.subject.isLoading ? (
        <ActivityIndicator
          size="large"
          color="#1890ff"
          animating={props.subject.isLoading}
        />
      ) : (
        <>
          {!_.isEmpty(props.subject.subjectList) ? (
            <FlatList
              style={{ flex: 1 }}
              keyExtractor={keyExtractor}
              data={props.subject.subjectList}
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
              refreshing={props.subject.isLoading}
            />
          ) : (
            <Text style={{ textAlign: 'center' }}>Không có dữ liệu!</Text>
          )}
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  subject: state.subject,
});

export default connect(mapStateToProps, { getSubject, getSubjectAll })(
  SignUpCourse,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {},
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
