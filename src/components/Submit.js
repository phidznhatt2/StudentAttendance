import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

const Submit = props => (
  <Button title={props.title} containerStyle={styles.container} />
);

Submit.propTypes = {
  color: PropTypes.any,
  title: PropTypes.any,
};

export default Submit;

const styles = StyleSheet.create({
  container: {
    borderColor: '#28d',
    borderRadius: 10,
    borderWidth: 0,
    height: 50,
    marginVertical: 15,
    paddingHorizontal: 10,
    width: '90%',
  },
});
