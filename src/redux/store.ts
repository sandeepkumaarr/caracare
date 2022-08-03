import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {CharactersSlice} from './reducers/charactersReducer';

const reducer = combineReducers({
  Characters: CharactersSlice.reducer,
});

export default configureStore({
  reducer,
  devTools: true,
});
