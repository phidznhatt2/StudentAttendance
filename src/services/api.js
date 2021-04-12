import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'https://appattendance.somee.com/api/',
});

instance.interceptors.request.use(
  async config => {
    await AsyncStorage.getItem('accessToken')
      .then(token => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      })
      .catch(err => console.log(err));

    return config;
  },
  err => err,
);

export default instance;
