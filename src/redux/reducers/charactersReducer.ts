import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  characterList,
  characterResponseInfo,
  Characters,
  CharacterDetails,
} from '../../types/characters';
import {getCharacters} from '../actions/CharacterActions';
import * as RootNavigation from '../../navigation/RootNavigation';
import routes from '../../navigation/routes';

export const CharactersInitialState: Characters = {
  charactersList: [],
  characterListLoading: false,
  characterListResponseInfo: {
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  },
  characterDetails: {
    character: {
      id: 0,
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      image: '',
      episode: [],
      url: '',
      created: '',
    },
    episode: [],
  },
};

export const CharactersSlice = createSlice({
  name: 'characters',
  initialState: CharactersInitialState,
  reducers: {
    setCharacterDetails: (
      state: {characterDetails: CharacterDetails},
      {
        payload,
      }: PayloadAction<{
        CharacterDetails: CharacterDetails;
        isFavourite: boolean;
      }>,
    ) => {
      state.characterDetails = payload.CharacterDetails;

      setTimeout(() => {
        RootNavigation.navigate(
          routes.CHARACTER_DETAILS_SCREEN as never,
          {
            isFavourite: payload.isFavourite,
          } as never,
        );
      }, 100);
    },
  },
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

export const {setCharacterDetails: setCharacterDetailsActionCreator} =
  CharactersSlice.actions;
