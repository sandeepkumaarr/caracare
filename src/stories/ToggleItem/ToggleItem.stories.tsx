import {storiesOf} from '@storybook/react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {ToggleItem} from '../../components/Index';
import {SVGIcon} from '../../components/SVGIcon';
import CenterView from '../CenterView';

storiesOf('ToggleItem', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () =>
    React.createElement(() => {
      const [toggle, settoggle] = useState(false);

      return (
        <TouchableOpacity onPress={() => settoggle(prev => !prev)}>
          <ToggleItem
            toggleComponent={
              <SVGIcon
                type={'grid'}
                height={`${moderateVerticalScale(40)}`}
                width={`${moderateScale(40)}`}
              />
            }
            toggledComponent={
              <SVGIcon
                type={'list'}
                height={`${moderateVerticalScale(30)}`}
                width={`${moderateScale(40)}`}
              />
            }
            toggle={toggle}
          />
        </TouchableOpacity>
      );
    }),
  );
