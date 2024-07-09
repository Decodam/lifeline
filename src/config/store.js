import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import languageReducer from './languageSlice';

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    language: languageReducer,
  },
});
