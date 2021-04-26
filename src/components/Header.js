import React, { useState } from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';
import _ from 'lodash';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]}>
    <Icon
      type="feather"
      size={20}
      name="message-circle"
      color={isWhite ? 'white' : '#4A4A4A'}
    />
    <View middle style={styles.notify} />
  </TouchableOpacity>
);

const CheckButton = ({ isWhite, style, onPress }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Icon
      type="feather"
      size={20}
      name="check"
      color={isWhite ? 'white' : '#4A4A4A'}
    />
  </TouchableOpacity>
);

const TextButton = ({ style, text, onPress }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={{ fontSize: 16, color: '#FF464A' }}>{text}</Text>
  </TouchableOpacity>
);

const Headers = props => {
  const handleLeftPress = () => {
    const { back, check, navigation } = props;

    if (back) {
      if (
        !_.isEmpty(props.scene.route.params) &&
        props.scene.route.params.isChanging
      ) {
        Alert.alert('Thông báo', 'Bạn có muốn hủy thay đổi?', [
          { text: 'Không', style: 'cancel' },
          {
            text: 'Hủy thay đổi',
            onPress: () => {
              navigation.goBack();
              return true;
            },
          },
        ]);
      } else {
        return navigation.goBack();
      }
    } else {
      return navigation.openDrawer();
    }
  };

  const renderLeft = () => {
    const { back } = props;
    const icon = back ? 'chevron-left' : 'navicon';

    return (
      back && (
        <Icon
          name={icon}
          type="evilicon"
          color="#4A4A4A"
          size={30}
          onPress={handleLeftPress}
        />
      )
    );
  };

  const renderRight = () => {
    const { white, title, navigation } = props;

    switch (title) {
      case 'Cá nhân':
        return [
          <CheckButton
            key="check-settings"
            navigation={navigation}
            onPress={() => props.scene.route.params.onSaveAll()}
          />,
        ];
      case 'Sửa tên':
        return [
          <TextButton
            key="save-name"
            text="Lưu"
            onPress={() => props.scene.route.params.onSave()}
          />,
        ];
      case 'Khóa học':
        return [
          <TextButton
            key="history-course"
            text="Lịch sử"
            onPress={() => navigation.navigate('HistoryCourse')}
          />,
        ];
      default:
        break;
    }
  };

  const renderSearch = () => {
    const [search, setSearch] = useState('');
    const { placeholderSearch } = props;

    return (
      <Input
        placeholder={placeholderSearch}
        rightIcon={{
          type: 'font-awesome',
          name: 'search',
          onPress: () => props.scene.route.params.onSearch(search),
        }}
        onChangeText={text => setSearch(text)}
      />
    );
  };

  const renderHeader = () => {
    const { search } = props;
    if (search) {
      return <View>{search ? renderSearch() : null}</View>;
    }
    return null;
  };

  const { back, title, white, transparent, navigation } = props;

  const noShadow = [
    'Trang chủ',
    'Khóa học',
    'Điểm danh',
    'Bảo mật',
    'Cài đặt',
  ].includes(title);

  return (
    <View style={[styles.shadow, styles.container]}>
      <StatusBar translucent barStyle="light-content" backgroundColor="#fff" />
      <Header
        placement="center"
        leftComponent={renderLeft}
        rightComponent={renderRight}
        centerComponent={{ text: title, style: styles.title }}
        containerStyle={styles.header}
        centerContainerStyle={{ alignSelf: 'center' }}
        leftContainerStyle={{ alignSelf: 'center' }}
      />
      {renderHeader()}
    </View>
  );
};

export default withNavigation(Headers);

const styles = StyleSheet.create({
  button: {
    padding: 6,
    position: 'relative',
  },
  container: {
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0,
    height: 90,
    paddingVertical: 16,
    zIndex: 5,
  },
  notify: {
    backgroundColor: '#FE2472',
    borderRadius: 3,
    height: 6,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 6,
  },
  shadow: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
