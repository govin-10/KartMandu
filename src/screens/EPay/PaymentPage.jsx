import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {PUBLISHABLE_KEY} from '@env';
import PayUI from './PayUI';

const PaymentPage = () => {
  const route = useRoute();
  const items = route.params;
  const {cartItems} = route.params;
  const {totalAmount} = route.params;
  console.log(totalAmount);
  console.log('from payment:', cartItems);
  return (
    <View style={styles.pageWrapper}>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
        <Text style={{color: 'black', fontSize: 25}}>Payment</Text>
        <Text style={{color: 'black', fontSize: 20, marginVertical: 15}}>
          Your Items
        </Text>
        <View>
          {cartItems.map(item => (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Image
                source={{uri: item.image}}
                style={{width: 50, height: 50}}
              />
              <Text style={{color: 'black', fontSize: 15}}>{item.title}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            backgroundColor: 'gray',
            padding: 10,
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Total:
          </Text>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            $ {totalAmount}
          </Text>
        </View>
        <PayUI payAmount={totalAmount} ItemDetails={cartItems} />
      </StripeProvider>
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  pageWrapper: {
    padding: 10,
  },
});
