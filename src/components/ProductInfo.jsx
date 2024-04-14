import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ProductInfo = ({route}) => {
  const product = route.params.productItem;
  const {title, price, description, image, rating} = product;
  console.log(title, price, description, image, rating);

  //   const handleAddToCart = () => {
  //     // Implement your logic for adding the product to cart
  //   };

  //   // Calculate the number of filled stars based on the rating rate
  //   const filledStars = Math.round(rating.rate);
  //   // Calculate the number of empty stars
  //   const emptyStars = 5 - filledStars;

  //   // Function to render filled stars
  //   const renderFilledStars = () => {
  //     const stars = [];
  //     for (let i = 0; i < filledStars; i++) {
  //       stars.push(<Image key={i} source={require('./filled_star.png')} style={styles.starIcon} />);
  //     }
  //     return stars;
  //   };

  //   // Function to render empty stars
  //   const renderEmptyStars = () => {
  //     const stars = [];
  //     for (let i = 0; i < emptyStars; i++) {
  //       stars.push(<Image key={i} source={require('./empty_star.png')} style={styles.starIcon} />);
  //     }
  //     return stars;
  //   };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{title}</Text>
        <View style={styles.ratingContainer}>
          {/* {renderFilledStars()}
          {renderEmptyStars()} */}
          <Text style={styles.ratingText}>({rating.count})</Text>
        </View>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },
  image: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    alignContent: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#808080',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff6600',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#ff6600',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
