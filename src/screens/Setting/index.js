import React, { useState } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Card, Avatar } from 'react-native-elements';
import _ from 'lodash';
import stylesByPaltform from '_utils/font';
import { addDeviceUser, delDeviceUser } from '_redux/actions/user';
import { getUniqueId, getDeviceName } from 'react-native-device-info';
import { v4 } from 'react-native-uuid';
import { InfoText, BaseIcon, Modal } from './components';

const Setting = props => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState({});
  const [content, setContent] = useState('');

  const onChangePushNotifications = () => {
    setPushNotifications(pre => !pre);
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

  const message = msg => {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }]);
  };

  const onDelDevice = () => {
    const { id } = props.user.userInfo;
    const data = {
      reason: content,
      id_BLE: device.id_BLE,
      id_User: id,
    };

    props.delDeviceUser({ data, closeModal: () => setShowModal(false) });
  };

  const renderHeader = () => {
    const { urlImg, fullName, email } = props.user.userInfo;

    return (
      <ListItem>
        {_.isNull(urlImg) ? (
          <Icon type="material-community" name="face" size={50} />
        ) : (
          <Avatar source={{ uri: urlImg }} />
        )}
        <ListItem.Content>
          <ListItem.Title style={styles.titleHeader}>{fullName}</ListItem.Title>
          <ListItem.Subtitle style={styles.subHeader}>
            {email}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  const renderEquipment = () => {
    const { isLoading, userInfo } = props.user;

    const headerEquipment = (
      <ListItem bottomDivider containerStyle={{ marginLeft: 5 }}>
        <ListItem.Content>
          <ListItem.Title>Thiết bị đã đăng ký</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content
          style={[styles.rightContent, { justifyContent: 'flex-end' }]}>
          {!isLoading ? (
            <TouchableOpacity onPress={addDevice}>
              <Text>Thêm thiết bị</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="small" color="#1e90ff" />
          )}
          <ListItem.Chevron />
        </ListItem.Content>
      </ListItem>
    );

    const bodyEquipment = userInfo.studentEquipment.map((item, index) => (
      <ListItem
        key={index}
        bottomDivider
        containerStyle={styles.listItemContainer}>
        <ListItem.Content style={styles.rightContent}>
          <BaseIcon
            containerStyle={{ backgroundColor: '#57DCE7' }}
            icon={{
              type: 'font-awesome-5',
              name: 'mobile-alt',
            }}
          />
          <View>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </View>
        </ListItem.Content>
        <ListItem.Content style={{ alignItems: 'flex-end', marginRight: 5 }}>
          <Icon
            name="trash"
            type="font-awesome-5"
            size={15}
            color={item.status ? 'red' : 'rgba(0,0,0,0.5)'}
            onPress={() => {
              if (item.status) {
                setDevice(item);
                setShowModal(true);
                setContent('');
              } else {
                message('Đang trong quá trình xử lý!');
              }
            }}
          />
        </ListItem.Content>
      </ListItem>
    ));

    return (
      <View>
        {headerEquipment}
        {bodyEquipment}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {renderHeader()}
            <InfoText text="Tài khoản" />
            <View>
              <ListItem bottomDivider containerStyle={styles.listItemContainer}>
                <ListItem.Content style={styles.rightContent}>
                  <BaseIcon
                    containerStyle={{
                      backgroundColor: '#FFADF2',
                    }}
                    icon={{
                      type: 'material',
                      name: 'notifications',
                    }}
                  />
                  <ListItem.Title>Thông báo</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content
                  style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Switch
                    onValueChange={onChangePushNotifications}
                    value={pushNotifications}
                  />
                </ListItem.Content>
              </ListItem>

              <ListItem bottomDivider containerStyle={styles.listItemContainer}>
                <ListItem.Content style={styles.rightContent}>
                  <BaseIcon
                    containerStyle={{ backgroundColor: '#FEA8A1' }}
                    icon={{
                      type: 'material',
                      name: 'language',
                    }}
                  />
                  <ListItem.Title>Ngôn ngữ</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content
                  style={[styles.rightContent, { justifyContent: 'flex-end' }]}>
                  <Text>Tiếng Việt</Text>
                  <ListItem.Chevron />
                </ListItem.Content>
              </ListItem>
            </View>
            <InfoText text="Thêm" />
            {renderEquipment()}
          </Card>
          <Modal
            loading={props.user.isActing}
            title="Xóa thiết bị"
            isVisible={showModal}
            item={device}
            content={content}
            onChangeContent={text => setContent(text)}
            onDelDevice={onDelDevice}
            onClose={() => setShowModal(false)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { addDeviceUser, delDeviceUser })(
  Setting,
);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  listItemContainer: {
    borderColor: '#ECECEC',
    borderWidth: 0.5,
    height: 55,
  },
  rightContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  scroll: {
    backgroundColor: 'white',
  },
  subHeader: {
    fontSize: 16,
    ...stylesByPaltform,
  },
  titleHeader: {
    fontSize: 20,
    ...stylesByPaltform,
  },
});
