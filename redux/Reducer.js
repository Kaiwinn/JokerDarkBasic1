import * as Types from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async () => {
  const pro = await AsyncStorage.getItem('Vote');
  const data = JSON.parse(pro);
  return data;
};
export const setStorage = async products => {
  return await AsyncStorage.setItem('Vote', JSON.stringify(products));
};

export const handlerAddToCart = (cartState, newProduct) => {
  const checkExists = cartState.some(element => {
    if (element.id == newProduct.id) {
      return true;
    }

    return false;
  });
  if (checkExists == false) {
    return [...cartState, newProduct];
  } else {
    let newCart = cartState.map(eachCart => {
      if (eachCart.id == newProduct.id) {
        return {...eachCart, amount: eachCart.amount + 1};
      } else {
        return {...eachCart};
      }
    });
    return [...newCart];
  }
};

export const inceaseToCart = (cartState, newProduct) => {
  let newCart = cartState.map(eachCart => {
    if (eachCart.id == newProduct.id) {
      return {...eachCart, amount: eachCart.amount + 1};
    } else {
      return {...eachCart};
    }
  });
  return [...newCart];
};

export const deceaseToCart = (cartState, newProduct) => {
  let newCart = cartState.map(eachCart => {
    if (eachCart.id == newProduct.id) {
      return {...eachCart, amount: eachCart.amount - 1};

      // }
    } else {
      return {...eachCart};
    }
  });
  return [...newCart];
};

export const updateToCart = (cartState, newProduct) => {
  let newCart = cartState.map(eachCart => {
    if (eachCart.id == newProduct.id) {
      return {...eachCart, amount: newProduct.amount};
    } else {
      return {...eachCart};
    }
  });
  return [...newCart];
};

function cartItems(state = [], action) {
  switch (action.type) {
    case Types.LOAD_PRODUCT:
      return [...action.payload];
    case Types.ADD_PRODUCT:
      const newProduct = {
        id: action.payload.id,
        url: action.payload.url,
        name: action.payload.name,
        size: action.payload.size,
        price: action.payload.price,
        amount: action.payload.amount,
      };

      getStorage()
        .then(data => {
          const cart = [...data];
          const newCart = handlerAddToCart(cart, newProduct);
          setStorage(newCart);
          // console.log(cart);
        })
        .catch(err => console.log('err   ' + err.message));

      const cartState = [...state];
      const newCartState = handlerAddToCart(cartState, newProduct);

      return newCartState;

    case Types.REMOVE_PRODUCT:
      getStorage()
        .then(data => {
          setStorage(
            state.filter(cartItems => cartItems.id != action.payload.id),
          );
        })
        .catch(err => console.log('err   ' + err.message));
      return state.filter(cartItems => cartItems.id != action.payload.id);

    case Types.INCREASE_PRODUCT:
      const newProduct2 = {
        id: action.payload.id,
        url: action.payload.url,
        name: action.payload.name,
        size: action.payload.size,
        price: action.payload.price,
        amount: action.payload.amount,
      };
      getStorage()
        .then(data => {
          const cart = [...data];
          const newCart = inceaseToCart(cart, newProduct2);
          setStorage(newCart);
        })
        .catch(err => console.log('err   ' + err.message));

      const carts = [...state];
      const increaseStates = inceaseToCart(carts, newProduct2);

      return increaseStates;

    case Types.DECREASE_PRODUCT:
      const newProduct3 = {
        id: action.payload.id,
        url: action.payload.url,
        name: action.payload.name,
        size: action.payload.size,
        price: action.payload.price,
        amount: action.payload.amount,
      };
      getStorage()
        .then(data => {
          if (newProduct3.amount == 1) {
            state.filter(cartItems => cartItems.id != action.payload.id);
          }
          const cart = [...data];
          const newCart = deceaseToCart(cart, newProduct3);
          setStorage(newCart);
        })
        .catch(err => console.log('err   ' + err.message));

      if (newProduct3.amount == 1) {
        return state.filter(cartItems => cartItems.id != action.payload.id);
      } else {
        const carts3 = [...state];
        const increaseStates3 = deceaseToCart(carts3, newProduct3);
        return increaseStates3;
      }

    case Types.SETAMOUNT_PRODUCT:
      const newProduct4 = {
        id: action.payload.id,
        url: action.payload.url,
        name: action.payload.name,
        size: action.payload.size,
        price: action.payload.price,
        amount: action.payload.amount * 1,
      };

      getStorage()
        .then(data => {
          const cart = [...data];
          const newCart = updateToCart(cart, newProduct4);
          setStorage(newCart);
        })
        .catch(err => console.log('err   ' + err.message));

      const carts4 = [...state];
      const increaseStates4 = updateToCart(carts4, newProduct4);
      return increaseStates4;
  }
  return state;
}

export default cartItems;
