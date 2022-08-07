import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  characterList,
  characterResponseInfo,
  Characters,
  CharacterDetails,
} from '../../types/characters';
import {
  getCharacters,
  lazyLoadCharacters,
  searchAndFilterCharacters,
} from '../actions/CharacterActions';
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
  characterListLazyLoading: false,
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
          info: characterResponseInfo;
          results: Array<characterList>;
        }>,
      ) => {
        state.characterListLoading = false;
        state.charactersList = [...payload?.results];
        state.characterListResponseInfo = payload?.info;
      },
    );

    builder.addCase(getCharacters.rejected, (state, {payload}) => {
      state.characterListLoading = false;
    });

    builder.addCase(lazyLoadCharacters.pending, (state, {payload}) => {
      state.characterListLazyLoading = true;
    });

    builder.addCase(
      lazyLoadCharacters.fulfilled,
      (
        state: {
          characterListLazyLoading: boolean;
          charactersList: Array<characterList>;
          characterListResponseInfo: characterResponseInfo;
        },
        {
          payload,
        }: PayloadAction<{
          info: characterResponseInfo;
          results: Array<characterList>;
        }>,
      ) => {
        state.characterListLazyLoading = false;
        state.charactersList = [...state.charactersList, ...payload?.results];
        state.characterListResponseInfo = payload?.info;
      },
    );

    builder.addCase(lazyLoadCharacters.rejected, (state, {payload}) => {
      state.characterListLazyLoading = false;
    });

    builder.addCase(searchAndFilterCharacters.pending, (state, {payload}) => {
      state.characterListLoading = true;
    });

    builder.addCase(
      searchAndFilterCharacters.fulfilled,
      (
        state: {
          characterListLoading: boolean;
          charactersList: Array<characterList>;
          characterListResponseInfo: characterResponseInfo;
        },
        {
          payload,
        }: PayloadAction<{
          info: characterResponseInfo;
          results: Array<characterList>;
        }>,
      ) => {
        state.characterListLoading = false;
        state.charactersList = [...payload?.results];
        state.characterListResponseInfo = payload?.info;
      },
    );

    builder.addCase(searchAndFilterCharacters.rejected, (state, {payload}) => {
      state.characterListLoading = false;
    });
  },
});

export const {setCharacterDetails: setCharacterDetailsActionCreator} =
  CharactersSlice.actions;
