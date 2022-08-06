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
    <ImageBackground
      source={{uri: character.image}}
      resizeMode="cover"
      style={[
        styles.imageContainer,
        {width: isGrid ? windowWidth / 2 : windowWidth},
      ]}
      imageStyle={styles.backgroundImage}>
      <Card
        width={isGrid ? windowWidth / 2 : windowWidth}
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
            style={{
              backgroundColor: favouriteBackground,
              padding: moderateScale(5),
              borderRadius: 20,
              alignSelf: 'flex-end',
            }}>
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
          marginVertical={5}>
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
    </ImageBackground>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
  },
  backgroundImage: {
    borderRadius: Math.round(moderateVerticalScale(30)),
  },
});
