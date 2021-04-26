import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { delDeviceUser } from '_redux/actions/user';
import { Button } from 'react-native-elements';

const Device = props => {
  const [content, setContent] = useState('');

  const delDevice = reason => {
    const { id, studentEquipment } = props.user.userInfo;
    const data = {
      reason,
      id_BLE: studentEquipment[0].id_BLE,
      id_User: id,
    };

    props.delDeviceUser({ data, message });
  };

  const message = msg => {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }]);
  };

  const renderText = () => (
    <Text style={styles.text}>
      Để thay đổi thiết bị khác, bạn vui lòng cung cấp thêm lý do. Yêu cầu của
      bạn sẽ được gửi đến giáo viên bộ môn.
    </Text>
  );

  const renderTextInput = () => (
    <TextInput
      multiline
      editable
      numberOfLines={7}
      onChangeText={text => setContent(text)}
      value={content}
      placeholder="Lý do thay đổi thiết bị"
      placeholderTextColor="#797979"
      style={[styles.text, styles.textInput]}
    />
  );

  const renderRequire = () => (
    <Button
      title="Gửi"
      titleStyle={styles.textRequire}
      buttonStyle={styles.require}
      disabled={!content}
      onPress={() => delDevice(content)}
      loading={props.user.isDelDevice}
    />
  );

  const renderView = () => {
    if (props.user.userInfo.studentEquipment[0].status) {
      return (
        <>
          {renderText()}
          {renderTextInput()}
          {renderRequire()}
        </>
      );
    }
    return (
      <Text style={styles.text}>
        Yêu cầu thay đổi thiết bị của bạn đang trong quá trình xử lý. Để thời
        giản xử lý nhanh hơn, vui lòng liên hệ với giáo viên bộ môn.
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>{renderView()}</View>
      </ScrollView>
    </View>
  );
};

Device.propTypes = {
  delDeviceUser: PropTypes.func,
  user: PropTypes.shape({
    isDelDevice: PropTypes.any,
    userInfo: PropTypes.shape({
      id: PropTypes.any,
      studentEquipment: PropTypes.any,
    }),
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  delDeviceUser,
})(Device);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  require: {
    backgroundColor: '#FF464A',
    borderRadius: 5,
    height: 50,
    marginTop: 20,
    padding: 10,
    width: '100%',
  },
  text: {
    color: '#797979',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'justify',
  },
  textInput: {
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 20,
    textAlignVertical: 'top',
  },
  textRequire: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  wrapper: {
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
});
