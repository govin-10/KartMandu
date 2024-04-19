import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL, SERVER_PORT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonIcon from 'react-native-vector-icons/Fontisto';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const Profile = () => {
  const [profileEdited, setProfileEdited] = useState(false);
  const [userData, setUserData] = useState({});

  const navigation = useNavigation();

  const updateAddress = useSelector(state => state.updateAddress);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(BASE_URL);
        const token = await AsyncStorage.getItem('authToken');
        const userDatas = await axios.get(
          `${BASE_URL}:${SERVER_PORT}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await userDatas.data;

        setUserData(data.user);
      } catch (error) {}
    };
    setTimeout(() => {
      fetchUserData();
    }, 1000);
  }, [updateAddress]);

  const handleEditAddress = async () => {
    navigation.navigate('EditAddress');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken').then(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.header}>
        {userData.avatar ? (
          <Image source={userData.avatar} />
        ) : (
          <PersonIcon name="person" size={90} style={styles.defaultPhoto} />
        )}
        <Text style={{color: 'black', fontSize: 20}}>{userData.name}</Text>
      </View>
      <View style={styles.addressView}>
        <View style={styles.addressHeader}>
          <Text style={{fontSize: 20}}>Address</Text>
          <Pressable onPress={handleEditAddress}>
            <EditIcon name="edit" size={25} />
          </Pressable>
        </View>
        <Text>
          {userData.address?.Local}-{userData.address?.Ward},
          {userData.address?.TollName},{userData.address?.District}
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataView}>My Orders</Text>
        <Pressable onPress={handleLogout}>
          <Text style={styles.dataView}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  header: {
    marginVertical: 25,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  defaultPhoto: {
    color: 'black',
  },
  addressView: {
    paddingHorizontal: 10,
  },
  addressHeader: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dataContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  dataView: {
    padding: 10,
    fontSize: 18,
    backgroundColor: 'grey',
    margin: 3,
    borderRadius: 15,
    color: 'white',
  },
});
