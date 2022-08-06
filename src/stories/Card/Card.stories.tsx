import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import {
  Card,
  CharacterCard,
  CharacterDetailCard,
  EpisodeCard,
} from '../../components/Index';
import CenterView from '../CenterView';

storiesOf('Card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () =>
    React.createElement(() => {
      return (
        <Card>
          <Text>Test item</Text>
        </Card>
      );
    }),
  )
  .add('CharacterGridCard', () =>
    React.createElement(() => {
      return (
        <CharacterCard
          character={{
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth (C-137)',
              url: 'https://rickandmortyapi.com/api/location/1',
            },
            location: {
              name: 'Citadel of Ricks',
              url: 'https://rickandmortyapi.com/api/location/3',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z',
          }}
          isGrid={true}
        />
      );
    }),
  )
  .add('CharacterListCard', () =>
    React.createElement(() => {
      return (
        <CharacterCard
          character={{
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth (C-137)',
              url: 'https://rickandmortyapi.com/api/location/1',
            },
            location: {
              name: 'Citadel of Ricks',
              url: 'https://rickandmortyapi.com/api/location/3',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z',
          }}
          isGrid={false}
        />
      );
    }),
  )
  .add('CharacterDetailCard', () =>
    React.createElement(() => {
      return (
        <CharacterDetailCard
          character={{
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth (C-137)',
              url: 'https://rickandmortyapi.com/api/location/1',
            },
            location: {
              name: 'Citadel of Ricks',
              url: 'https://rickandmortyapi.com/api/location/3',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z',
          }}
        />
      );
    }),
  )
  .add('EpisodeCard', () =>
    React.createElement(() => {
      return (
        <EpisodeCard
          episodeItem={{
            id: 1,
            name: 'Pilot',
            air_date: 'December 2, 2013',
            episode: 'S01E01',
            characters: [
              'https://rickandmortyapi.com/api/character/1',
              'https://rickandmortyapi.com/api/character/2',
              'https://rickandmortyapi.com/api/character/35',
              'https://rickandmortyapi.com/api/character/38',
              'https://rickandmortyapi.com/api/character/62',
              'https://rickandmortyapi.com/api/character/92',
              'https://rickandmortyapi.com/api/character/127',
              'https://rickandmortyapi.com/api/character/144',
              'https://rickandmortyapi.com/api/character/158',
              'https://rickandmortyapi.com/api/character/175',
              'https://rickandmortyapi.com/api/character/179',
              'https://rickandmortyapi.com/api/character/181',
              'https://rickandmortyapi.com/api/character/239',
              'https://rickandmortyapi.com/api/character/249',
              'https://rickandmortyapi.com/api/character/271',
              'https://rickandmortyapi.com/api/character/338',
              'https://rickandmortyapi.com/api/character/394',
              'https://rickandmortyapi.com/api/character/395',
              'https://rickandmortyapi.com/api/character/435',
            ],
            url: 'https://rickandmortyapi.com/api/episode/1',
            created: '2017-11-10T12:56:33.798Z',
          }}
        />
      );
    }),
  );
