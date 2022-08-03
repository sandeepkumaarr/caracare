import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Characters} from '../../types/characters';

export const CharactersInitialState: Characters = {
  charactersList: [],
};

export const CharactersSlice = createSlice({
  name: 'characters',
  initialState: CharactersInitialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = CharactersSlice.actions;
