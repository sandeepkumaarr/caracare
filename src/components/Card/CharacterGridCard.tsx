import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Card from './Card';
import Text from '../Text';
import Box from '../Box';
import {SVGIcon} from '../SVGIcon';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {characterList} from '../../types/characters';

type CharacterGridCard = {
  character: characterList;
};
const windowWidth = Dimensions.get('window').width;

const CharacterGridCard = ({character}: CharacterGridCard) => {
  const [favourite, setfavourite] = useState(false);

  return (
    <ImageBackground
      source={{uri: character.image}}
      resizeMode="cover"
      style={styles.imageContainer}
      imageStyle={styles.backgroundImage}>
      <Card variant={'CharacterGridCard'}>
        <Box alignItems={'flex-end'}>
          <TouchableOpacity onPress={() => setfavourite(prev => !prev)}>
            <SVGIcon
              type={favourite ? 'favourite-on' : 'favourite-off'}
              height={`${moderateVerticalScale(25)}`}
              width={`${moderateScale(25)}`}
            />
          </TouchableOpacity>
        </Box>

        <Box alignItems={'center'} marginTop={5}>
          <Text variant={'buttonText'} numberOfLines={1}>
            {character.name}
          </Text>
        </Box>

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

        <Box marginTop={12}>
          <Box>
            <Text variant={'buttonText'} textAlign="left" numberOfLines={1}>
              First Seen in:
            </Text>
          </Box>
          <Box>
            <Text variant={'defaultBody'} numberOfLines={2}>
              {character?.location?.name}
            </Text>
          </Box>
        </Box>

        <Box marginVertical={4}>
          <Box>
            <Text variant={'buttonText'} textAlign="left" numberOfLines={1}>
              Origin Location:
            </Text>
          </Box>
          <Box>
            <Text variant={'defaultBody'} numberOfLines={2}>
              {character?.origin?.name}
            </Text>
          </Box>
        </Box>
      </Card>
    </ImageBackground>
  );
};

export default CharacterGridCard;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    width: windowWidth / 2,
  },
  backgroundImage: {
    borderRadius: Math.round(moderateVerticalScale(30)),
  },
});
