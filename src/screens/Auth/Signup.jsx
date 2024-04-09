import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import {BASE_URL, SERVER_PORT} from '@env';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Logic for handling sign-up
    try {
      const signupData = {
        name,
        email,
        password,
      };
      axios
        .post(`${BASE_URL}:${SERVER_PORT}/users/signup`, signupData)

        .then(() => {
          Alert.alert(
            'Signup Successful',
            'Please check your email and follow the link to verify your email',
            [
              {
                text: 'OK',
                onPress: () => {
                  setName('');
                  setEmail('');
                  setPassword('');
                  setTimeout(() => {
                    navigation.navigate('Login');
                  }, 1000);
                },
              },
            ],
          );
        });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logo}>Your Logo</Text>
        <Text style={styles.signUpMessage}>Sign Up for an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="words"
          value={name}
          onChangeText={text => setName(text)}
        />
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
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  signUpMessage: {
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
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

export default SignUpScreen;
