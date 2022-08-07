import {createAsyncThunk} from '@reduxjs/toolkit';
import {getcharactersParams} from '../../types/characters';
import api from '../api';

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async (data: {}, {rejectWithValue}) => {
    try {
      let {data: Response} = await api.fetchGet('/character');

      return Response;
    } catch (err) {
      return rejectWithValue('Unable to fetch equipment data');
    }
  },
);

export const lazyLoadCharacters = createAsyncThunk(
  'characters/lazyLoadCharacters',
  async (params: {page: number}, {rejectWithValue}) => {
    try {
      let {data: Response} = await api.fetchGetParams('/character', params);

      return Response;
    } catch (err) {
      return rejectWithValue('Unable to fetch equipment data');
    }
  },
);

export const getEpisodes = createAsyncThunk(
  'characters/getEpisodes',
  async (data: Array<number>, {rejectWithValue}) => {
    try {
      let {data: Response} = await api.fetchGet(`/episode/${data}`);

      return Response;
    } catch (err) {
      return rejectWithValue('Unable to fetch equipment data');
    }
  },
);
