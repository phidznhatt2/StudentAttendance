import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

const Loading = ({ loading, ...rest }) => (
  <Modal transparent={true} animationType={'none'} visible={loading} {...rest}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" color="#1890ff" animating={loading} />
        <Text style={styles.text}>Đang tải</Text>
      </View>
    </View>
  </Modal>
);

Loading.propTypes = {
  loading: PropTypes.any,
};

export default Loading;

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: '#00000040',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text: {
    color: '#FF464A',
    marginTop: 10,
  },
});
