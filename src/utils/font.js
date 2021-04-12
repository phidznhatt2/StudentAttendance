import { Platform } from 'react-native';

const stylesByPlatform = Platform.select({
  ios: {},
  android: { fontFamily: 'Roboto' },
});

export default stylesByPlatform;
