import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/Login';
import SignUpScreen from './screens/Auth/Signup';
import TabNavigation from './screens/Main/TabNavigation';
import ProductInfo from './components/ProductInfo';
import EditAddress from './screens/EditAddress';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Main" component={TabNavigation} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="EditAddress" component={EditAddress} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
