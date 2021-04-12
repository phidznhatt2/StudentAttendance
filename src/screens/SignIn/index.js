import PropTypes from 'prop-types';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Input } from '_components';
import { CheckBox, Button } from 'react-native-elements';
import validate from '_utils/validator';
import _ from 'lodash';
import { useForm } from '_hook';
import { loginUser } from '_redux/actions/user';
import { AuthContext } from '_context';

const LoginScreen = props => {
  const { signIn } = React.useContext(AuthContext);
  const [isShowPass, setIsShowPass] = React.useState(true);
  const [isSelected, setIsSelected] = React.useState(false);

  const login = () => {
    const { accountName: userName, accountPass: password } = formData;
    const data = {
      userName,
      password,
      rememberMe: true,
    };
    props.loginUser({ data, messageSuccess, messageError });
  };

  const { formData, handleChange, handleSubmit, errors } = useForm(
    login,
    validate,
  );

  const messageSuccess = token => {
    Alert.alert('Thông báo', 'Đăng nhập thành công!', [
      { text: 'OK', onPress: () => signIn(token) },
    ]);
  };

  const messageError = () => {
    Alert.alert('Thông báo', 'Tài khoản hoặc mật khẩu không chính xác!', [
      { text: 'OK' },
    ]);
  };

  const { accountName, accountPass } = formData;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.container}>
          <Image
            source={require('_assets/images/logo.png')}
            resizeMode="center"
            style={styles.image}
          />
          <Text style={styles.textTitle}>Welcome back</Text>
          <Text style={[styles.textBody, { fontSize: 16 }]}>
            Login to your existent account
          </Text>
          <View style={{ marginVertical: 10 }} />
          <Input
            name="Username or E-mail"
            value={accountName || ''}
            onChangeText={value => {
              handleChange('accountName', value);
            }}
            iconLeft="user"
          />
          <Input
            name="Password"
            value={accountPass || ''}
            onChangeText={value => {
              handleChange('accountPass', value);
            }}
            iconLeft="lock"
            pass={isShowPass}
            iconRight={isShowPass ? 'eye-slash' : 'eye'}
            onPressIconRight={() => setIsShowPass(pre => !pre)}
          />
          <View style={styles.actionContainer}>
            <CheckBox
              center
              title="Remember me"
              checkedIcon="check-square-o"
              uncheckedIcon="square-o"
              checked={isSelected}
              onPress={() => setIsSelected(pre => !pre)}
              containerStyle={styles.checkBox}
              textStyle={styles.textBody}
              size={20}
            />
            <Text style={styles.textBody}>Forgot Password?</Text>
          </View>
          <Button
            title="LOGIN"
            containerStyle={styles.containerButton}
            buttonStyle={{ borderRadius: 50 }}
            onPress={handleSubmit}
            disabled={!(!!accountName && !!accountPass && _.isEmpty(errors))}
            loading={props.user.isLoading}
          />
          <View
            style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.textBody}>
              Don&apos;t have an account?&nbsp;
            </Text>
            <Text
              style={[styles.textBody, { color: '#28d', fontSize: 14 }]}
              onPress={() => props.navigation.navigate('SignUp')}>
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  loginUser,
})(LoginScreen);
const styles = StyleSheet.create({
  actionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    width: '90%',
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  containerButton: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: '90%',
  },
  image: {
    height: 175,
    width: 175,
  },
  textBody: {
    color: 'grey',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 40,
  },
});
