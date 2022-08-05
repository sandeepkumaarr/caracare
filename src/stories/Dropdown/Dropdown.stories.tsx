import {storiesOf} from '@storybook/react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {Box, Dropdown, Text} from '../../components/Index';
import {FilterProps} from '../../types/characters';
import CenterView from '../CenterView';

storiesOf('Dropdown', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () =>
    React.createElement(() => {
      const [selectedFilterItem, setSelectedFilterItem] =
        useState<FilterProps>('unknown');
      const [showDropdown, setshowDropdown] = useState(false);

      return (
        <>
          <Box alignItems={'center'}>
            <Dropdown
              showDropdown={showDropdown}
              setshowDropdown={setshowDropdown}
              width={Math.round(moderateScale(80))}
              zIndex={100}
              children={
                <>
                  <TouchableOpacity
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.3,
                      paddingVertical: Math.round(moderateScale(5)),
                      paddingHorizontal: Math.round(moderateScale(5)),
                    }}
                    onPress={() => {
                      setSelectedFilterItem('Alive');
                      setshowDropdown(false);
                    }}>
                    <Text variant={'dropDownText'}>Alive</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.3,
                      paddingVertical: Math.round(moderateScale(5)),
                      paddingHorizontal: Math.round(moderateScale(5)),
                    }}
                    onPress={() => {
                      setSelectedFilterItem('Dead');
                      setshowDropdown(false);
                    }}>
                    <Text variant={'dropDownText'}>Dead</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingVertical: Math.round(moderateScale(5)),
                      paddingHorizontal: Math.round(moderateScale(5)),
                    }}
                    onPress={() => {
                      setSelectedFilterItem('unknown');
                      setshowDropdown(false);
                    }}>
                    <Text variant={'dropDownText'}>unknown</Text>
                  </TouchableOpacity>
                </>
              }
            />
          </Box>
        </>
      );
    }),
  );
