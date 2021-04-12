import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon } from 'react-native-elements';

const Inputs = ({
  name,
  pass,
  typeIcon = 'font-awesome-5',
  iconLeft,
  iconRight,
  onChangeText,
  onPressIconRight,
  value,
  errorStyle,
  errorMessage,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputElementRef = React.useRef(null);

  React.useEffect(() => {
    inputElementRef.current.setNativeProps({
      style: { fontFamily: 'Roboto-Regular' },
    });
  }, []);

  const onFocusChange = () => {
    setIsFocused(true);
  };

  const onBlurChange = () => {
    setIsFocused(false);
  };

  const { style } = rest;
  return (
    <View style={[styles.container, style]}>
      <Input
        ref={inputElementRef}
        placeholder={name}
        onFocus={onFocusChange}
        onBlur={onBlurChange}
        containerStyle={styles.inputContainer}
        inputContainerStyle={{ borderColor: isFocused ? '#2089dc' : 'grey' }}
        inputStyle={styles.inputText}
        secureTextEntry={pass}
        secure
        value={value}
        onChangeText={onChangeText}
        leftIcon={
          <Icon
            type={typeIcon}
            name={iconLeft}
            size={15}
            color={isFocused ? '#2089dc' : 'grey'}
          />
        }
        rightIcon={
          <Icon
            type={typeIcon}
            name={iconRight}
            size={15}
            onPress={onPressIconRight}
          />
        }
        errorStyle={errorStyle}
        errorMessage={errorMessage}
      />
    </View>
  );
};

Inputs.propTypes = {
  errorMessage: PropTypes.any,
  errorStyle: PropTypes.any,
  icon: PropTypes.any,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  name: PropTypes.any,
  onChangeText: PropTypes.any,
  onPressIconRight: PropTypes.any,
  pass: PropTypes.any,
  styleContainer: PropTypes.any,
  typeIcon: PropTypes.string,
  value: PropTypes.any,
};

export default Inputs;

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 10,
    width: '90%',
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
  },
});
