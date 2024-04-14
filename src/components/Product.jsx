import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Product = ({productItem, index, navigation}) => {
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
        // onPress={onPressAddToCart}
      >
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
