import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const Body = props => {
  const changeDevice = () => {
    props.navigation.navigate('DeviceSetting');
  };

  const renderName = () => (
    <View style={styles.contentWrap}>
      <ListItem
        bottomDivider
        onPress={() => props.navigation.navigate('NameSetting')}>
        <ListItem.Content>
          <ListItem.Title style={styles.text}>Tên</ListItem.Title>
        </ListItem.Content>
        <View style={styles.contentRight}>
          <Text
            style={[
              styles.text,
              !props.userSetting.fullName && styles.setting,
            ]}>
            {props.userSetting.fullName
              ? props.userSetting.fullName
              : 'Thiết lập ngay'}
          </Text>
          <Icon
            type="feather"
            name="chevron-right"
            size={20}
            style={styles.iconRight}
            color="#797979"
          />
        </View>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={styles.text}>Tên đăng nhập</ListItem.Title>
        </ListItem.Content>
        <View style={styles.contentRight}>
          <Text style={styles.text}>{props.userName}</Text>
          <Icon
            type="feather"
            name="chevron-right"
            size={20}
            style={styles.iconRight}
            color="#797979"
          />
        </View>
      </ListItem>
    </View>
  );

  const renderProfile = () => {
    const protectEmail = email => {
      const index = email.indexOf('@');
      const newEmail = `${email.substring(0, 2)}*****${email.substring(
        index,
        email.length,
      )}`;
      return newEmail;
    };

    return (
      <View style={styles.contentWrap}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.text}>Giới tính</ListItem.Title>
          </ListItem.Content>
          <View style={styles.contentRight}>
            <Text style={[styles.text, !props.gender && styles.setting]}>
              {props.gender ? props.gender : 'Thiết lập ngay'}
            </Text>
            <Icon
              type="feather"
              name="chevron-right"
              size={20}
              style={styles.iconRight}
              color="#797979"
            />
          </View>
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.text}>Email</ListItem.Title>
          </ListItem.Content>
          <View style={styles.contentRight}>
            <Text style={styles.text}>{protectEmail(props.email)}</Text>
            <Icon
              type="feather"
              name="chevron-right"
              size={20}
              style={styles.iconRight}
              color="#797979"
            />
          </View>
        </ListItem>
      </View>
    );
  };

  const renderDevice = () => (
    <View style={styles.contentWrap}>
      <ListItem
        onPress={props.studentEquipment[0] ? changeDevice : props.addDevice}>
        <ListItem.Content>
          <ListItem.Title style={styles.text}>
            Thiết bị đã đăng ký
          </ListItem.Title>
        </ListItem.Content>
        <View style={styles.contentRight}>
          <Text
            style={[styles.text, !props.studentEquipment[0] && styles.setting]}>
            {props.studentEquipment[0]
              ? props.studentEquipment[0].name
              : 'Thiết lập ngay'}
          </Text>
          <Icon
            type="feather"
            name="chevron-right"
            size={20}
            style={styles.iconRight}
            color="#797979"
          />
        </View>
      </ListItem>
    </View>
  );

  const renderPassword = () => (
    <View style={styles.contentWrap}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={styles.text}>Thay đổi mật khẩu</ListItem.Title>
        </ListItem.Content>
        <View style={styles.contentRight}>
          <Icon
            type="feather"
            name="chevron-right"
            size={20}
            style={styles.iconRight}
            color="#797979"
          />
        </View>
      </ListItem>
    </View>
  );

  const renderSignOut = () => (
    <TouchableOpacity
      style={[styles.contentWrap, styles.signOut]}
      onPress={props.onSignOut}>
      <Text style={styles.textSignOut}>Đăng xuất</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bodyContainer}>
      {renderName()}
      {renderProfile()}
      {renderDevice()}
      {renderPassword()}
      {renderSignOut()}
    </View>
  );
};

Body.propTypes = {
  addDevice: PropTypes.any,
  email: PropTypes.any,
  fullName: PropTypes.any,
  gender: PropTypes.any,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  onSignOut: PropTypes.any,
  studentEquipment: PropTypes.any,
  userName: PropTypes.any,
};

export default Body;

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  contentRight: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentWrap: {
    marginBottom: 25,
  },
  iconRight: {
    marginLeft: 5,
  },
  setting: {
    color: '#797979',
  },
  signOut: {
    alignSelf: 'center',
    backgroundColor: '#FF464A',
    borderRadius: 5,
    padding: 10,
    width: 175,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  textSignOut: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
