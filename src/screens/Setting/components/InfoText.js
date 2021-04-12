import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const InfoText = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

InfoText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InfoText;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F5F4',
    paddingBottom: 12,
    paddingTop: 20,
  },
  infoText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
  },
});
