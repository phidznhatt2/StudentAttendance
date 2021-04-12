import PropTypes from 'prop-types';
import React from 'react';
import { Icon } from 'react-native-elements';

const MenuIcon = ({ navigation }) => (
  <Icon
    name="menu"
    type="material"
    color="#fff"
    onPress={() => navigation.openDrawer()}
  />
);

MenuIcon.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func,
  }),
};

export default MenuIcon;
