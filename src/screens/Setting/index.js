import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  getUserById,
  logoutUser,
  addDeviceUser,
  saveProfile,
} from '_redux/actions/user';
import { getUniqueId, getDeviceName } from 'react-native-device-info';
import { v4 } from 'react-native-uuid';
import { AuthContext } from '_context';
import { Loading } from '_components';
import { Header, Body } from './components';

const Setting = props => {
  const { signOut } = React.useContext(AuthContext);
  const { isLoading } = props.user;

  useEffect(() => {
    props.navigation.setParams({
      onSaveAll,
    });
  }, [props.user.userSetting]);

  const onSaveAll = () => {
    props.saveProfile({
      data: { ...props.user.userSetting },
      messageSuccess,
      messageError,
    });
  };

  const addDevice = () => {
    getDeviceName()
      .then(deviceName => {
        const { id } = props.user.userInfo;

        const data = {
          id_BLE: `${v4().slice(0, -2)}00`,
          id_Equipment: getUniqueId(),
          id_Student: id,
          name: deviceName,
          description: deviceName,
        };

        props.addDeviceUser({ data, message });
      })
      .catch(error => console.log(error));
  };

  const messageSuccess = msg => {
    Alert.alert('Thông báo', msg, [
      {
        text: 'OK',
        onPress: () => props.getUserById({ id: props.user.userInfo.id }),
      },
    ]);
  };

  const message = msg => {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }]);
  };

  const messageError = msg => {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }]);
  };

  const onSignOut = () => props.logoutUser({ signOut });

  const headerProps = {
    avatar: props.user.userInfo.urlImg,
  };

  const bodyProps = {
    isLoading: props.user.isDelDevice,
    ...props.user.userInfo,
    userSetting: props.user.userSetting,
    navigation: props.navigation,
    addDevice,
    onSignOut,
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Loading loading={props.user.isAddDevice || props.user.isSaving} />
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#1890ff"
            animating={isLoading}
          />
        ) : (
          <>
            <Header {...headerProps} />
            <Body {...bodyProps} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

Setting.propTypes = {
  addDeviceUser: PropTypes.func,
  delDeviceUser: PropTypes.func,
  logoutUser: PropTypes.func,
  navigation: PropTypes.any,
  studentEquipment: PropTypes.any,
  user: PropTypes.shape({
    isAddDevice: PropTypes.any,
    isLoading: PropTypes.any,
    urlImg: PropTypes.any,
    userInfo: PropTypes.shape({
      id: PropTypes.any,
      urlImg: PropTypes.any,
    }),
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getUserById,
  logoutUser,
  addDeviceUser,
  saveProfile,
})(Setting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
