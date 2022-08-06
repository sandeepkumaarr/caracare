import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {CharacterInformation} from '../../components/Index';
import CenterView from '../CenterView';

storiesOf('CharacterInformation', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => (
    <CharacterInformation
      gender={'Male'}
      episode={[
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ]}
      origin={{
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      }}
    />
  ));
