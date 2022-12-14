import {
  AllProps,
  backgroundColor,
  createRestyleComponent,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {
  getCharacters,
  searchAndFilterCharacters,
} from '../redux/actions/CharacterActions';
import {AppDispatch} from '../redux/store';
import {Theme} from '../themes/default';
import Box from './Box';
import {SVGIcon} from './SVGIcon';

const searchBarVariant = createVariant({themeKey: 'searchBarVariants'});
const SearchBarContainer = createRestyleComponent<
  VariantProps<Theme, 'searchBarVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([searchBarVariant], Box);

const restyleFunctions = [searchBarVariant as any, backgroundColor];

type searchBarProps = AllProps<Theme> &
  VariantProps<Theme, 'searchBarVariants'> & {
    clicked: boolean;
    setClicked: React.Dispatch<React.SetStateAction<boolean>>;
    searchPhrase: string;
    setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  };

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  ...rest
}: searchBarProps) => {
  const props = useRestyle([restyleFunctions], rest);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <SearchBarContainer {...props}>
      <Box
        paddingHorizontal={3}
        paddingVertical={Platform.OS === 'ios' ? 4 : 0}
        flexDirection={'row'}
        borderRadius={Math.round(moderateVerticalScale(15))}
        alignItems="center"
        width={'95%'}
        backgroundColor="bottomtabBackground"
        justifyContent={clicked ? 'space-around' : 'space-evenly'}>
        <SVGIcon
          type={'search'}
          height={`${moderateVerticalScale(20)}`}
          width={`${moderateScale(20)}`}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
          returnKeyType="search"
          onSubmitEditing={e =>
            dispatch(
              searchAndFilterCharacters({
                name: e.nativeEvent.text,
                status: null,
              }),
            )
          }
          clearTextOnFocus
        />
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              setSearchPhrase('');
              Keyboard.dismiss();
              setClicked(false);
            }}>
            <SVGIcon
              type={'cancel'}
              height={`${moderateVerticalScale(20)}`}
              width={`${moderateScale(20)}`}
            />
          </TouchableOpacity>
        )}
      </Box>
    </SearchBarContainer>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  input: {
    fontSize: Math.round(moderateScale(16)),
    marginLeft: Math.round(moderateScale(15)),
    width: '90%',
  },
});
