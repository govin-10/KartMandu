import {
  CardField,
  useStripe,
  createToken,
  payments,
} from '@stripe/stripe-react-native';
// import { confirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';
import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {BASE_URL, SERVER_PORT} from '@env';
// import { createToken } from '@stripe/stripe-react-native';

export default function PayUI({payAmount, ItemDetails}) {
  const {confirmPayment} = useStripe();
  const [cardInfo, setCardInfo] = useState(null);
  console.log('ppp', payAmount);
  console.log('iii', ItemDetails);
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
        const payConfirm = await confirmPayment(resp?.paymentIntent, {
          paymentMethodType: 'Card',
          paymentMethodData: cardDetails,
        });
        console.log(payConfirm);
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
    <>
      <Text>Pay WIth Card</Text>
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
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          fetchCardDetail(cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Pressable onPress={() => handleSubmit(cardInfo)}>
        <Text>Pay</Text>
      </Pressable>
    </>
  );
}
