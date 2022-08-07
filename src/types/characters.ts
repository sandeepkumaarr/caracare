export type Characters = {
  charactersList: Array<characterList>;
  characterListLoading: boolean;
  characterListResponseInfo: characterResponseInfo;
  characterDetails: CharacterDetails;
  characterListLazyLoading: boolean;
};

export type FilterProps = 'Alive' | 'Dead' | 'unknown' | null;

type origin = {
  name: string;
  url: string;
};

export type characterList = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: origin;
  location: origin;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
};

export type episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
  url: string;
  created: string;
};

export type characterResponseInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type getcharactersParams = {
  name?: string;
  status?: string;
  isLazyLoading: boolean;
};

export type State = {
  Characters: Characters;
};

export type CharacterDetails = {
  character: characterList;
  episode: Array<episode>;
};
