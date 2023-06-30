import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../constants';

const Header = () => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        height: screenHeight * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
      }}>
      <Image
        source={images.hlimage}
        style={{
          alignSelf: 'center',
          height: 48,
          width: 48,
        }}></Image>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: screenWidth * 0.3,
            justifyContent: 'center',
            marginHorizontal: 5,
          }}>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 13,
              color: '#a8a8a8',
            }}>
            Handicrafted by
          </Text>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 13,
              backgroundColor: 'white',
              color: '#232323',
            }}>
            Jim HLS
          </Text>
        </View>
        <Image
          source={images.sunflower}
          style={{
            borderRadius: 30,
            alignSelf: 'center',
            height: 48,
            width: 48,
          }}></Image>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
