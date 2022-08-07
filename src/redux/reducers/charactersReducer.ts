import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  characterList,
  characterResponseInfo,
  Characters,
} from '../../types/characters';
import {getCharacters} from '../actions/CharacterActions';

export const CharactersInitialState: Characters = {
  charactersList: [],
  characterListLoading: false,
  characterListResponseInfo: {
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  },
};

export const CharactersSlice = createSlice({
  name: 'characters',
  initialState: CharactersInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCharacters.pending, (state, {payload}) => {
      state.characterListLoading = true;
    });

    builder.addCase(
      getCharacters.fulfilled,
      (
        state: {
          characterListLoading: boolean;
          charactersList: Array<characterList>;
          characterListResponseInfo: characterResponseInfo;
        },
        {
          payload,
        }: PayloadAction<{
          Response: {
            info: characterResponseInfo;
            results: Array<characterList>;
          };
          isReset: boolean;
        }>,
      ) => {
        state.characterListLoading = false;

        state.charactersList = [...payload?.Response?.results];

        // if (payload?.isReset) {
        //   state.charactersList = [...payload?.Response?.results];
        // } else {
        //   state.charactersList = [
        //     ...state.charactersList,
        //     ...payload?.Response?.results,
        //   ];
        // }

        state.characterListResponseInfo = payload?.Response?.info;
      },
    );

    builder.addCase(getCharacters.rejected, (state, {payload}) => {
      state.characterListLoading = false;
    });
  },
});

export const {} = CharactersSlice.actions;
