import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import BottomTab from '../../components/BottomTab';
import SearchBar from '../../components/SearchBar';
import {SVGIcon} from '../../components/SVGIcon';
import CenterView from '../CenterView';

storiesOf('SearchBar', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () =>
    React.createElement(() => {
      const [clicked, setClicked] = useState(false);
      const [searchPhrase, setSearchPhrase] = useState('');

      return (
        <>
          <SearchBar
            clicked={clicked}
            setClicked={setClicked}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
          />
        </>
      );
    }),
  );
