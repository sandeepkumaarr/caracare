export type Characters = {
  charactersList: Array<{}>;
};

export type FilterProps = 'Alive' | 'Dead' | 'unknown';

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
  gender: 'Male';
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
