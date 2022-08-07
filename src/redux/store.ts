import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {CharactersSlice} from './reducers/charactersReducer';

const reducer = combineReducers({
  Characters: CharactersSlice.reducer,
});

export const store = configureStore({
  reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
