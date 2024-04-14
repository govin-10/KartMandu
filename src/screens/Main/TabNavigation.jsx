import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import HomeIcon from 'react-native-vector-icons/Foundation';
//name = "home"
import CartIcon from 'react-native-vector-icons/Ionicons';
//name = "cart"
import ProfileIcon from 'react-native-vector-icons/FontAwesome';
//name = "user-circle"
import HeartIcon from 'react-native-vector-icons/AntDesign';
//name="heart"

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from './Feed';
import Cart from './Cart';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabNavigation = ({route}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIconStyle: {},
      }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <HomeIcon
                name="home"
                size={30}
                color={focused ? 'black' : 'grey'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <CartIcon
                name="cart"
                size={30}
                color={focused ? 'black' : 'grey'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <ProfileIcon
                name="user-circle"
                size={25}
                color={focused ? 'black' : 'grey'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
