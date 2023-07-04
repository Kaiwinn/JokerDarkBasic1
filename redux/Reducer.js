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
  const checkExists = storeState.some(element => {
    return element.id === newVote.id;
  });

  if (checkExists == false) {
    return [...storeState, newVote];
  } else {
    let newStore = storeState.map(eachStore => {
      if (eachStore.id == newVote.id) {
        return newVote;
      } else {
        return eachStore;
      }
    });
    return newStore;
  }
};

function storeItems(state = [], action) {
  switch (action.type) {
    case Types.LOAD_VOTE:
      return [...action.payload];
    case Types.ADD_VOTE:
      const newVote = {
        id: action.payload.id,
        content: action.payload.content,
        isRead: action.payload.isRead,
        fun: action.payload.fun,
      };

      getStorage()
        .then(data => {
          const store = [...data];
          const newStore = handlerAddVote(store, newVote);
          setStorage(newStore);
          console.log('Đã add :');
          console.log(newStore);
        })
        .catch(err => console.log('err   ' + err.message));

      const storeState = [...state];
      const newStoreState = handlerAddVote(storeState, newVote);

      return newStoreState;

    case Types.REMOVE_VOTE:
      getStorage()
        .then(data => {
          setStorage([]);
          console.log('Đã xóa hết !');
        })
        .catch(err => console.log('err Remove  ' + err.message));
      return [];
  }
  return state;
}

export default storeItems;
