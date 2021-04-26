import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, Image, StyleSheet, View, Button } from 'react-native';

const Header = props => {
  const { avatar } = props;
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        style={styles.headerBackgroundImage}
        blurRadius={5}
        source={require('_assets/images/bg-uit.jpg')}>
        <View style={styles.headerColumn}>
          <Image
            style={styles.userImage}
            source={{ uri: `https://appattendance.somee.com${avatar}` }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

Header.propTypes = {
  avatar: PropTypes.any,
};

export default Header;

const styles = StyleSheet.create({
  headerBackgroundImage: {
    height: 200,
  },
  headerColumn: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  userImage: {
    borderRadius: 40,
    height: 80,
    width: 80,
  },
});
