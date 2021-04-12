import PropTypes from 'prop-types';
import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';

const GoBackIcon = ({ navigation }) => (
  <Icon
    name={Platform.OS === 'android' ? 'arrow-back' : 'arrow-back-ios'}
    type="material"
    color="#fff"
    onPress={() => navigation.goBack()}
  />
);

GoBackIcon.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

export default GoBackIcon;
