import {View, Text} from 'react-native';
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
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <Text>PaymentPage</Text>
      <View>
        {cartItems.map(item => (
          <View>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
      <PayUI payAmount={totalAmount} ItemDetails={cartItems} />
    </StripeProvider>
  );
};

export default PaymentPage;
