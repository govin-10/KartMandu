import {
  CardField,
  useStripe,
  createToken,
  payments,
} from '@stripe/stripe-react-native';
import axios from 'axios';
import {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {BASE_URL, SERVER_PORT} from '@env';
import {useNavigation} from '@react-navigation/native';
// import { createToken } from '@stripe/stripe-react-native';

export default function PayUI({payAmount, ItemDetails}) {
  const navigation = useNavigation();
  const {confirmPayment} = useStripe();
  const [cardInfo, setCardInfo] = useState(null);
  const fetchCardDetail = cardDetail => {
    // console.log("my card details",cardDetail)
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };
  console.log(cardInfo);

  const handleSubmit = async cardDetails => {
    // if (!!cardInfo) {
    //   try {
    //     const resToken = await createToken({
    //       ...cardDetails,
    //       type: 'Card',
    //     });

    //     console.log('Token: ', resToken);
    //     if (resToken) {
    try {
      const paymentData = {
        totalAmount: payAmount,
      };
      const paymentIntentHit = await axios.post(
        `${BASE_URL}:${SERVER_PORT}/pay/payment-intent`,
        paymentData,
      );
      const resp = await paymentIntentHit.data;

      if (resp?.paymentIntent) {
        await confirmPayment(resp?.paymentIntent, {
          paymentMethodType: 'Card',
          paymentMethodData: cardDetails,
        });

        Alert.alert('Payment Success');

        navigation.navigate('Feed');
      }
    } catch (error) {
      console.log(error);
    }
    //     }
    //   } catch (error) {
    //     console.log('Error in creating token');
    //   }
  };

  //
  // }
  //   };

  return (
    <View style={styles.pageWrapper}>
      <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
        Pay WIth Card
      </Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 20,
        }}
        onCardChange={cardDetails => {
          fetchCardDetail(cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Pressable
        onPress={() => handleSubmit(cardInfo)}
        style={styles.confirmButton}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Confirm Payment
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    marginTop: 30,
  },
  confirmButton: {
    backgroundColor: 'orange',
    padding: 10,
  },
});
