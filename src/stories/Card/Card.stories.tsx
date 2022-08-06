import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import {Card, CharacterGridCard} from '../../components/Index';
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
        <CharacterGridCard
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
  );
