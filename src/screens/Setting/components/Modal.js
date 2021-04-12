import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function BaseModal({
  isVisible = false,
  loading = false,
  title,
  item = {},
  content = '',
  onChangeContent,
  onDelDevice,
  onClose,
}) {
  const modalHeader = title && (
    <View style={styles.modalHeader}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider}></View>
    </View>
  );

  const modalBody = (
    <View style={styles.modalBody}>
      <Text style={styles.bodyText}>
        {`Bạn có muốn xóa thiết bị ${item.name}? \n\nVui lòng viết rõ lý do trước khi xóa.`}
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={2}
        onChangeText={text => onChangeContent(text)}
        value={content}
        style={{
          marginTop: 10,
          borderColor: 'rgba(0,0,0,0.7)',
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
        }}
        placeholder="Lý do"
      />
    </View>
  );

  const modalFooter = (
    <View style={styles.modalFooter}>
      <View style={styles.divider}></View>
      <View style={{ flexDirection: 'row-reverse', margin: 10 }}>
        <TouchableOpacity
          style={{ ...styles.actions, backgroundColor: '#db2828' }}
          onPress={onClose}>
          <Text style={styles.actionText}>Không</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.actions,
            backgroundColor: _.isEmpty(content) ? 'rgba(0,0,0,0.5)' : '#21ba45',
          }}
          disabled={_.isEmpty(content)}
          onPress={onDelDevice}>
          {loading ? (
            <ActivityIndicator animating={loading} size="small" color="#fff" />
          ) : (
            <Text style={styles.actionText}>Xóa</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const modalContainer = (
    <View style={styles.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  );

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modal}>
        <View>{modalContainer}</View>
      </View>
    </Modal>
  );
}

BaseModal.propTypes = {
  content: PropTypes.string,
  isVisible: PropTypes.bool,
  item: PropTypes.object,
  loading: PropTypes.bool,
  onChangeContent: PropTypes.func,
  onClose: PropTypes.any,
  onDelDevice: PropTypes.any,
  title: PropTypes.any,
};

const styles = StyleSheet.create({
  actionText: {
    color: '#fff',
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  divider: {
    backgroundColor: 'lightgray',
    height: 1,
    width: '100%',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
  },
  modalBody: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  modalContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 5,
    width: width * 0.8,
  },
  modalFooter: {},
  modalHeader: {},
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
  },
});
