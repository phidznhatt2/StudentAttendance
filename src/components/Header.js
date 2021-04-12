import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]}>
    <Icon
      type="evilicon"
      size={20}
      name="comment"
      color={isWhite ? 'white' : '#4A4A4A'}
    />
    <View middle style={styles.notify} />
  </TouchableOpacity>
);

const Headers = props => {
  const handleLeftPress = () => {
    const { back, navigation } = props;

    return back ? navigation.goBack() : navigation.openDrawer();
  };

  const renderLeft = () => {
    const { back } = props;
    const icon = back ? 'chevron-left' : 'navicon';

    return (
      <Icon
        name={icon}
        type="evilicon"
        color="#4A4A4A"
        onPress={handleLeftPress}
      />
    );
  };

  const renderRight = () => {
    const { white, title, navigation } = props;

    switch (title) {
      case 'Trang chủ':
        return [<ChatButton key="chat-home" navigation={navigation} />];
      case 'Khóa học':
        return [<ChatButton key="chat-courses" navigation={navigation} />];
      case 'Lịch học':
        return [<ChatButton key="chat-schedules" navigation={navigation} />];
      case 'Điểm danh':
        return [<ChatButton key="chat-attendance" navigation={navigation} />];
      case 'Bảo mật':
        return [<ChatButton key="chat-profile" navigation={navigation} />];
      case 'Cài đặt':
        return [<ChatButton key="chat-settings" navigation={navigation} />];
      default:
        break;
    }
  };

  const renderSearch = () => {
    const { navigation } = props;
    return (
      <Input
        placeholder="Tìm kiếm"
        rightIcon={{ type: 'font-awesome', name: 'search' }}
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

  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
  ];

  return (
    <View style={[styles.shadow, styles.container]}>
      <StatusBar translucent barStyle="light-content" backgroundColor="#fff" />
      <Header
        placement="left"
        leftComponent={renderLeft}
        centerComponent={{ text: title, style: styles.title }}
        rightComponent={renderRight}
        containerStyle={styles.header}
        centerContainerStyle={{ alignSelf: 'center' }}
        leftContainerStyle={{ alignSelf: 'center' }}
        rightContainerStyle={{ alignSelf: 'center' }}
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
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
  },
});
