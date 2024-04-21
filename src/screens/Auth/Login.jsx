import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, SERVER_PORT} from '@env';
import SplashScreen from 'react-native-splash-screen';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('rr', BASE_URL);
    const checkAuthToken = async () => {
      const token = await AsyncStorage.getItem('authToken');

      if (token) {
        navigation.replace('Main');
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      } else {
        SplashScreen.hide();
      }
    };
    checkAuthToken();
  });

  const handleLogin = async () => {
    try {
      const loginData = {
        email,
        password,
      };
      console.log(loginData);
      await axios
        .post(`${BASE_URL}:${SERVER_PORT}/users/login`, loginData)
        .then(resp => {
          setEmail('');
          setPassword('');
          return resp.data.token;
        })
        .then(async token => {
          await AsyncStorage.setItem('authToken', token);
          navigation.replace('Main');
          Alert.alert('Welcome', 'Login Successful', [
            {
              text: 'Thanks',
              onPress: () => {},
            },
          ]);
        });
    } catch (error) {}
  };

  /*   const setItemWithExpiry = async (key, value, expirySeconds) => {
    try {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + expirySeconds * 1000, // Calculate expiry time in milliseconds
      };
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error);
    }
  }; */

  const redirectToRegister = () => {
    navigation.navigate('Signup'); // Assuming 'Register' is the name of your registration screen
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Text style={styles.logo}>Your Logo</Text>
          <Text style={styles.loginMessage}>Login to your account</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={redirectToRegister}>
            <Text style={styles.registerLink}>
              New to the app? Register here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  outer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

export default LoginScreen;
