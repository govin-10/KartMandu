import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';
import Product from '../../components/Product';

const Feed = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const datas = await response.data;
        setProducts(datas);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const categoryList = [
    {
      id: '0',
      image:
        'https://0201.nccdn.net/4_2/000/000/008/486/Andrew-Technologies_November_Basic-Electronic-Components-and-Parts_Image-1-1280x900.jpg',
      name: 'Electric Comp.',
    },
    {
      id: '1',
      image:
        'https://i.extremetech.com/imagery/content-types/05yzd4BfQEqCVIDCYxExr64/hero-image.fill.size_994x559.v1678673371.jpg',
      name: 'Laptops',
    },
    {
      id: '3',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Headphone',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '5',
      image:
        'https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/fujifilm_finepix_s8600_digital_camera_1388976657_1021628.jpg',
      name: 'Cameras',
    },
    {
      id: '6',
      image:
        'http://tweaklibrary.com/wp-content/uploads/2019/07/Find-the-right-gaming-laptop.jpg',
      name: 'Gaming Laptops',
    },
  ];

  const bannerImages = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'blue',
            padding: 10,
          }}>
          <Text>KM</Text>
          <TextInput placeholder="Search" style={styles.searchBox} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingVertical: 10, backgroundColor: 'white'}}>
          {categoryList.map((item, index) => (
            <Pressable
              key={index}
              style={{
                alignItems: 'center',
                margin: 10,
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: item.image}}
                style={{width: 60, height: 60, borderRadius: 50}}
              />
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={{backgroundColor: 'white', paddingVertical: 10}}>
          <SliderBox
            images={bannerImages}
            autoPlay
            circleLoop
            dotColor={'red'}
            ImageComponentStyle={{width: '100%'}}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            padding: 15,
          }}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
            Explore...
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {products?.map((item, index) => (
              <Product
                productItem={item}
                index={index}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  searchBox: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
});
