import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';
import {BASE_URL, SERVER_PORT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {toogle} from '../../redux/features/updateAddress/updateAddressSlicer';

const EditAddress = () => {
  const [addressData, setAddressData] = useState({
    Country: '',
    District: '',
    Local: '',
    Ward: 0,
    TollName: '',
    Street: '',
    HouseNo: '',
    postalCode: '',
  });

  const navigation = useNavigation();

  const updateAddress = useSelector(state => state.updateAddress);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    if (field === 'Ward') {
      value = parseInt(value, 10);
    }
    setAddressData({
      ...addressData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission here (e.g., send data to backend)

    const updateAddress = async () => {
      const token = await AsyncStorage.getItem('authToken');
      await axios
        .post(`${BASE_URL}:${SERVER_PORT}/address/update`, addressData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          Alert.alert('Address updated successfully');
          dispatch(toogle());
        })
        .then(() => {
          navigation.navigate('Profile');
        });
    };
    updateAddress();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={addressData.Country}
        onChangeText={text => handleChange('Country', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="District"
        value={addressData.District}
        onChangeText={text => handleChange('District', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Local"
        value={addressData.Local}
        onChangeText={text => handleChange('Local', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ward"
        value={addressData.Ward}
        onChangeText={text => handleChange('Ward', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Toll Name"
        value={addressData.TollName}
        onChangeText={text => handleChange('TollName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={addressData.Street}
        onChangeText={text => handleChange('Street', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="House No"
        value={addressData.HouseNo}
        onChangeText={text => handleChange('HouseNo', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={addressData.postalCode}
        onChangeText={text => handleChange('postalCode', text)}
      />
      <Button title="Update Address" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EditAddress;
