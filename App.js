import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from './components';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = props => {
  const {loadVote, addVote, storeItems, remove} = props;

  const [jokeContent, setJokeContent] = useState([
    {
      id: 1,
      content: `A child asked his father, "How were people born?" So his father said, "Adam and Eve made babies, then their babies became adults and made babies, and so on."

      The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now."

      The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."`,
      isRead: false,
      fun: null,
    },
    {
      id: 2,
      content:
        'Teacher: "Kids,what does the chicken give you?" Student: "Meat!" Teacher: "Very good! Now what does the pig give you?" Student: "Bacon!" Teacher: "Great! And what does the fat cow give you?" Student: "Homework!"',
      isRead: false,
      fun: null,
    },
    {
      id: 3,
      content: `The teacher asked Jimmy, "Why is your cat at school today Jimmy?" Jimmy replied crying, "Because I heard my daddy tell my mommy, 'I am going to eat that pussy once Jimmy leaves for school today!'"`,
      isRead: false,
      fun: null,
    },
    {
      id: 4,
      content: `A housewife, an accountant and a lawyer were asked "How much is 2+2?" The housewife replies: "Four!". The accountant says: "I think it's either 3 or 4. Let me run those figures through my spreadsheet one more time." The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"`,
      isRead: false,
      fun: null,
    },
  ]);

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [currentJoke, setCurrentJoke] = useState(null);

  const fetchCart = async () => {
    const exists = await AsyncStorage.getItem('Vote');
    if (!exists) {
      await AsyncStorage.setItem('Vote', JSON.stringify([]));
    } else {
      const data = JSON.parse(exists);
      loadVote(data);
    }
  };

  useEffect(() => {
    fetchCart();

    const getRandomUnreadJoke = () => {
      const unreadJokes = jokeContent.filter(joke => !joke.isRead);
      const randomIndex = Math.floor(Math.random() * unreadJokes.length);
      return unreadJokes[randomIndex];
    };

    setCurrentJoke(getRandomUnreadJoke());
  }, [jokeContent]);

  const handleVoteYes = fun => {
    if (currentJoke) {
      const updatedJokes = jokeContent.map(joke => {
        if (joke.id === currentJoke.id) {
          return {
            ...joke,
            isRead: true,
          };
        }

        return joke;
      });

      setJokeContent(updatedJokes);

      handleNextJoke();
    }
  };

  const handleNextJoke = () => {
    const unreadJokes = jokeContent.filter(joke => !joke.isRead);
    if (unreadJokes.length > 0) {
      const randomIndex = Math.floor(Math.random() * unreadJokes.length);
      const randomJoke = unreadJokes[randomIndex];
      setCurrentJoke(randomJoke);
    } else {
      setCurrentJoke(null);
    }
  };

  const handleClearCookies = async () => {
    try {
      // console.log('Cookies cleared successfully');
    } catch (error) {
      // console.log('Error clearing cookies:', error);
    }
  };

  return (
    <ScrollView>
      <Header />
      <View
        style={{
          height: 1,
          backgroundColor: '#cdcdcd',
        }}></View>
      <View
        style={{
          height: screenHeight * 0.25,
          backgroundColor: '#29b363',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 19,
            color: 'white',
            textAlign: 'center',
            paddingVertical: 15,
          }}>
          A joke a day keeps the doctor away
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            textAlign: 'center',
            paddingVertical: 20,
          }}>
          If you joke wrong way, your teeth have to pay. (Serious)
        </Text>
      </View>
      {currentJoke ? (
        <View>
          <View
            style={{
              height: screenHeight * 0.43,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#656565',
                marginVertical: 35,
                marginHorizontal: 30,
              }}>
              {currentJoke.content}
            </Text>
          </View>
          <View
            style={{
              height: screenHeight * 0.1,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                handleVoteYes();
                const updatedJoke = {
                  ...currentJoke,
                  isRead: true,
                  fun: true,
                };
                addVote(updatedJoke);
              }}>
              <View
                style={{
                  height: screenHeight * 0.056,
                  width: screenWidth * 0.36,
                  backgroundColor: '#2c7edb',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 16,
                  }}>
                  This is Funny!
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleVoteYes();
                const updatedJoke = {
                  ...currentJoke,
                  isRead: true,
                  fun: false,
                };
                addVote(updatedJoke);
              }}>
              <View
                style={{
                  height: screenHeight * 0.056,
                  width: screenWidth * 0.36,
                  backgroundColor: '#29b363',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '400',
                    fontSize: 16,
                  }}>
                  This is not funny.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            marginTop: 15,
            width: screenWidth,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 15,
              color: '#242424',
            }}>
            That's all the jokes for today! Come back another day!
          </Text>

          <TouchableOpacity
            onPress={() => {
              remove();
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#65cfdf',
                fontSize: 13,
                marginTop: 10,
              }}>
              Clear all cookies
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          height: 1,
          backgroundColor: '#d0d0d0',
          marginTop: 25,
          marginHorizontal: 20,
        }}></View>
      <View
        style={{
          marginVertical: 5,
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            padding: 3,
            fontSize: 13,
            color: '#818181',
            marginBottom: 10,
          }}>
          Tained on this website are provided for general information only and
          do not constitute any form of advice. HLS assumes no responsibility
          for the accuracy of any particular statement and accepts no liability
          for any loss or damage which may arise from reliance on the infor-
          mation contained on this site.
        </Text>
        <Text
          style={{
            marginBottom: 20,
            marginTop: 3,
            textAlign: 'center',
            fontSize: 14,
            color: '#484848',
          }}>
          Copyright 2021 HLS
        </Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    storeItems: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadVote: vo => dispatch({type: 'LOAD_VOTE', payload: vo}),

    addVote: vo => dispatch({type: 'ADD_VOTE', payload: vo}),

    remove: vo => dispatch({type: 'REMOVE_VOTE', payload: vo}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({});
