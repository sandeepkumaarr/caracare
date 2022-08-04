import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import BottomTab from '../../components/BottomTab';
import {SVGIcon} from '../../components/SVGIcon';
import CenterView from '../CenterView';

storiesOf('BottomTab', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => (
    <BottomTab
      children={
        <>
          <TouchableOpacity>
            <SVGIcon
              type={'home'}
              height={`${moderateVerticalScale(40)}`}
              width={`${moderateScale(40)}`}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <SVGIcon
              type={'favourite'}
              height={`${moderateVerticalScale(40)}`}
              width={`${moderateScale(40)}`}
            />
          </TouchableOpacity>
        </>
      }
    />
  ));
