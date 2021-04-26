import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { changeProfile } from '_redux/actions/user';

const Name = props => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const input = React.createRef();

  useEffect(() => {
    setValue(props.user.userSetting.fullName);
  }, []);

  useEffect(() => {
    props.navigation.setParams({
      onSave,
      isChanging: value !== props.user.userSetting.fullName,
    });

    if (value) {
      setError('');
    }
  }, [value]);

  const onSave = () => {
    if (!value) {
      setError('Phần tên không được bỏ trống. Vui lòng nhập lại!');
    } else {
      props.changeProfile({
        data: { fullName: value },
        onNavigate: () => props.navigation.navigate('Profile'),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Input
        ref={input}
        multiline
        inputStyle={styles.inputStyle}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.inputContainerStyle}
        value={value}
        onChangeText={v => setValue(v)}
        errorStyle={{ color: 'red' }}
        errorMessage={error}
        rightIcon={
          !!value && (
            <Icon
              color="rgba(0,0,0,0.4)"
              type="ionicon"
              name="close-circle"
              onPress={() => {
                input.current.clear();
                setValue('');
              }}
            />
          )
        }
      />
    </View>
  );
};

Name.propTypes = {
  changeProfile: PropTypes.func,
  navigation: PropTypes.shape({
    setParams: PropTypes.func,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { changeProfile })(Name);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  inputStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
