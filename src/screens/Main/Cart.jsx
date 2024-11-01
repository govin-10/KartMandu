import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutIcon from 'react-native-vector-icons/MaterialIcons';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL, SERVER_PORT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeFromCart} from '../../../redux/features/cart/cartSlice';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();

  const [counts, setCounts] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('authToken');

        const cartInfo = await axios.get(
          `${BASE_URL}:${SERVER_PORT}/cart/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const carts = await cartInfo.data;

        setCartItems(carts);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchCart();
    }, 1000);
  }, [cart]);

  // Increment count for an item
  const increment = itemId => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: Math.min(9, prevCounts[itemId] || 1) + 1,
    }));
  };

  // Decrement count for an item
  const decrement = itemId => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: Math.max(1, prevCounts[itemId] || 0) - 1,
    }));
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + (counts[item.id] || 1) * item.price;
  }, 0);

  const handleRemoveFromCart = async productItem => {
    // console.log(productItem);
    dispatch(removeFromCart(productItem));
    try {
      const itemId = productItem.id;

      const token = await AsyncStorage.getItem('authToken');
      await axios.delete(`${BASE_URL}:${SERVER_PORT}/cart/delete/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };

  const handleProceedPayment = () => {
    navigation.navigate('PaymentPage', {cartItems, totalAmount: total});
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Your Cart</Text>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 25, color: 'black', fontWeight: 900}}>
              ${total}
            </Text>
            <Pressable onPress={handleProceedPayment}>
              <CheckoutIcon
                name="shopping-cart-checkout"
                size={30}
                color="green"
              />
            </Pressable>
          </View>
          {cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <View>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <View style={styles.optionBox}>
                  <View style={styles.quantityController}>
                    <TouchableOpacity onPress={() => decrement(item.id)}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{counts[item.id] || 1}</Text>
                    <TouchableOpacity onPress={() => increment(item.id)}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Pressable onPress={() => handleRemoveFromCart(item)}>
                    <DeleteIcon name="delete" size={20} color="red" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 30,
  },
  itemImage: {
    width: 95,
    height: 95,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flexWrap: 'wrap',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  optionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityController: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default Cart;
