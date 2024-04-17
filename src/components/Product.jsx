import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/features/cart/cartSlice';
import axios from 'axios';
import {BASE_URL, SERVER_PORT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Product = ({productItem, index, navigation}) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const handleAddToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));

    addToCarts(item);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const addToCarts = async productItem => {
    const token = await AsyncStorage.getItem('authToken');
    await axios.post(`${BASE_URL}:${SERVER_PORT}/cart/add`, productItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //   const product = productItem.item;
  //   console.log('item', product);
  return (
    <View style={styles.card} key={index}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductInfo', {
            productItem,
          })
        }>
        <Image source={{uri: productItem.image}} style={styles.image} />
        <Text style={styles.name}>{productItem.title}</Text>
      </TouchableOpacity>
      <Text style={styles.price}>${productItem.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{productItem.rating.rate} / 5</Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(productItem)}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    width: '45%',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    elevation: 5,
  },
  image: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
    marginRight: 5,
    color: '#ff6600',
  },
  addToCartButton: {
    backgroundColor: '#ff6600',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
