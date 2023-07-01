import {configureStore} from '@reduxjs/toolkit';
import storeItems from './Reducer';

const store = configureStore({reducer: storeItems});

export default store;
