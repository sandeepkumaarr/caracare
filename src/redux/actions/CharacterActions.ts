import {createAsyncThunk} from '@reduxjs/toolkit';
import {getcharactersParams} from '../../types/characters';
import api from '../api';

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async (data: getcharactersParams, {rejectWithValue}) => {
    let params = {
      name: data?.name,
      status: data?.status,
    };

    let resetValue =
      (data?.name || data?.status) && !data.isLazyLoading ? true : false;

    try {
      let {data: Response} = await api.fetchGetParams('/character', params);

      return {Response: Response, isReset: resetValue};
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
