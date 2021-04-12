import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Splash = () => (
  <View style={styles.container}>
    <Image
      source={require('_assets/images/logo-sub.png')}
      resizeMode="center"
      style={styles.logo}
    />
  </View>
);

export default Splash;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: '90%',
  },
});
