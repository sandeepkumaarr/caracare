import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import Card from './Card';
import Text from '../Text';
import Box from '../Box';
import {SVGIcon} from '../SVGIcon';
import {characterList} from '../../types/characters';
import theme from '../../themes/default';

type CharacterCard = {
  character: characterList;
  isGrid: boolean;
};
const windowWidth = Dimensions.get('window').width;

const CharacterCard = ({character, isGrid}: CharacterCard) => {
  const [favourite, setfavourite] = useState(false);
  const {favouriteBackground} = theme?.colors || {};

  const Header = () => {
    return (
      <Box alignItems={'center'} marginTop={5}>
        <Text variant={'buttonText'} numberOfLines={1}>
          {character.name}
        </Text>
      </Box>
    );
  };

  return (
    <Box flex={1} marginVertical={3}>
      <FastImage
        style={[
          styles.image,
          {
            width: isGrid ? windowWidth / 2.2 : windowWidth - 25,
            height: isGrid
              ? Math.round(moderateVerticalScale(windowWidth > 700 ? 310 : 260))
              : Math.round(
                  moderateVerticalScale(windowWidth > 700 ? 200 : 180),
                ),
          },
        ]}
        source={{
          uri: character.image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Card
        width={isGrid ? windowWidth / 2.2 : windowWidth - 25}
        height={
          isGrid
            ? Math.round(moderateVerticalScale(windowWidth > 700 ? 310 : 260))
            : Math.round(moderateVerticalScale(windowWidth > 700 ? 200 : 180))
        }
        variant={'CharacterCard'}>
        <Box
          flexDirection={'row'}
          justifyContent={isGrid ? 'flex-end' : 'space-evenly'}>
          {!isGrid ? (
            <Box flex={1}>
              <Header />
            </Box>
          ) : null}

          <TouchableOpacity
            onPress={() => setfavourite(prev => !prev)}
            style={[
              styles.favouritebtn,
              {
                backgroundColor: favouriteBackground,
              },
            ]}>
            <SVGIcon
              type={favourite ? 'favourite-on' : 'favourite-off'}
              height={`${moderateVerticalScale(25)}`}
              width={`${moderateScale(25)}`}
            />
          </TouchableOpacity>
        </Box>

        {isGrid ? <Header /> : null}

        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems="center"
          marginTop={5}>
          <Box>
            <Text variant={'defaultBody'} numberOfLines={1}>
              {character.species}
            </Text>
          </Box>

          <Box flexDirection={'row'} alignItems="center">
            <Text variant={'defaultBody'} numberOfLines={1}>
              {character.status}
            </Text>
            <SVGIcon
              type={
                character.status === 'Alive'
                  ? 'dot_green'
                  : character.status === 'Dead'
                  ? 'dot_red'
                  : 'dot_unknown'
              }
              height={`${moderateVerticalScale(20)}`}
              width={`${moderateScale(20)}`}
            />
          </Box>
        </Box>

        <Box
          flexDirection={isGrid ? 'column' : 'row'}
          justifyContent={'space-between'}
          alignItems={isGrid ? 'flex-start' : 'center'}
          marginTop={8}>
          <Box>
            <Box>
              <Text variant={'buttonText'} textAlign="left" numberOfLines={1}>
                First Seen in:
              </Text>
            </Box>
            <Box maxWidth={windowWidth / 2.5}>
              <Text variant={'defaultBody'} numberOfLines={2}>
                {character?.location?.name}
              </Text>
            </Box>
          </Box>

          <Box marginTop={isGrid ? 5 : 0}>
            <Box>
              <Text variant={'buttonText'} textAlign="left" numberOfLines={1}>
                Origin Location:
              </Text>
            </Box>
            <Box maxWidth={windowWidth / 2.5}>
              <Text variant={'defaultBody'} numberOfLines={2}>
                {character?.origin?.name}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  image: {
    borderRadius: Math.round(moderateVerticalScale(30)),
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  favouritebtn: {
    padding: Math.round(moderateScale(5)),
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
});
