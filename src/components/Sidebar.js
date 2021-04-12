import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { DrawerItemList } from '@react-navigation/drawer';
import { logoutUser } from '_redux/actions/user';
import { AuthContext } from '_context';

const heightBar = StatusBar.currentHeight;

const Sidebar = props => {
  const { signOut } = React.useContext(AuthContext);

  const onLogout = () => {
    props.logoutUser({ signOut });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('_assets/images/profile.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{props.user.userInfo.fullName}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Icon
            type="ionicon"
            name="mail"
            size={16}
            color="rgba(255,255,255,0.8)"
          />
          <Text style={styles.email}>{props.user.userInfo.email}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView>
          <DrawerItemList {...props} />
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logout} onPress={onLogout}>
          <Icon
            type="material"
            name="exit-to-app"
            size={20}
            color="rgba(0, 0, 0, 0.87)"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(Sidebar);

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 20,
    height: 40,
    marginBottom: 16,
    width: 40,
  },
  body: {
    flex: 1,
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  email: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginLeft: 4,
  },
  footer: {
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    borderTopWidth: 0.5,

    paddingHorizontal: 22,
    paddingVertical: 4,
  },
  header: {
    backgroundColor: '#784BA0',
    justifyContent: 'center',
    paddingBottom: 16,
    paddingHorizontal: 28,
    paddingTop: 32 + heightBar,
  },
  logout: {
    alignItems: 'center',
    borderRadius: 4,

    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  logoutIcon: {
    height: 20,
    opacity: 0.62,
    width: 20,
  },
  logoutText: {
    color: '#000',
    fontSize: 14,
    marginLeft: 30,
    paddingVertical: 13,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
