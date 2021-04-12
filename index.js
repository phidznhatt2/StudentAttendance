/**
 * @format
 */
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { typography } from '_utils/typography';
import App from './src';
import { name as appName } from './app.json';

typography();

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
