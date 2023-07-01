import * as Types from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async () => {
  const vo = await AsyncStorage.getItem('Vote');
  const data = JSON.parse(vo);
  return data;
};
export const setStorage = async votes => {
  return await AsyncStorage.setItem('Vote', JSON.stringify(votes));
};

export const handlerAddVote = (storeState, newVote) => {
  return [...storeState, newVote];
};

function storeItems(state = [], action) {
  switch (action.type) {
    case Types.LOAD_VOTE:
      return [...action.payload];
    case Types.ADD_VOTE:
      const newVote = {
        id: action.payload.id,
        name: action.payload.name,
      };

      getStorage()
        .then(data => {
          const store = [...data];
          const newStore = handlerAddVote(store, newVote);
          setStorage(newStore);
          console.log('Kaiiiwinn :');
          console.log(store);
        })
        .catch(err => console.log('err   ' + err.message));

      const storeState = [...state];
      const newStoreState = handlerAddVote(storeState, newVote);

      return newStoreState;

    case Types.REMOVE_VOTE:
      getStorage()
        .then(data => {
          setStorage(
            state.filter(storeItems => storeItems.id != action.payload.id),
          );
        })
        .catch(err => console.log('err   ' + err.message));
      return state.filter(storeItems => storeItems.id != action.payload.id);
  }
  return state;
}

export default storeItems;
