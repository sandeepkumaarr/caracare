import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Card from './Card';
import Box from '../Box';
import Text from '../Text';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {SVGIcon} from '../SVGIcon';
import {characterList} from '../../types/characters';
import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';

type CharacterDetailCardProps = {
  character: characterList;
};

const CharacterDetailCard = ({character}: CharacterDetailCardProps) => {
  const [favourite, setfavourite] = useState(false);

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{uri: character.image}}
      resizeMode="cover"
      style={styles.imageContainer}>
      <Card variant={'characterDetailCard'}>
        <Box
          flexDirection={'row'}
          justifyContent="space-between"
          alignItems={'center'}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                routes.CHARACTERS_LIST_SCREEN as never,
                {} as never,
              )
            }>
            <SVGIcon
              type={'back'}
              height={`${moderateVerticalScale(40)}`}
              width={`${moderateScale(40)}`}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setfavourite(prev => !prev)}
            style={styles.favouriteContainer}>
            <SVGIcon
              type={favourite ? 'favourite-on' : 'favourite-off'}
              height={`${moderateVerticalScale(25)}`}
              width={`${moderateScale(25)}`}
            />
          </TouchableOpacity>
        </Box>

        <Box alignItems={'center'}>
          <Text variant={'charaterDetailHeader'} numberOfLines={1}>
            {character.name}
          </Text>
        </Box>

        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems="center"
          marginBottom={5}>
          <Box>
            <Text variant={'characterDetailBody'} numberOfLines={1}>
              {character.species}
            </Text>
          </Box>

          <Box flexDirection={'row'} alignItems="center">
            <Text variant={'characterDetailBody'} numberOfLines={1}>
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
      </Card>
    </ImageBackground>
  );
};

export default CharacterDetailCard;

const styles = StyleSheet.create({
  imageContainer: {
    height: Math.round(moderateVerticalScale(250)),
  },
  favouriteContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: moderateScale(5),
    borderRadius: 20,
  },
});
