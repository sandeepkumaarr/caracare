import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from './Card';
import Text from '../Text';
import Box from '../Box';
import {SVGIcon} from '../SVGIcon';
import {characterList, episode} from '../../types/characters';
import theme from '../../themes/default';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {getEpisodes} from '../../redux/actions/CharacterActions';
import {unwrapResult} from '@reduxjs/toolkit';
import {getLastItem} from '../../utils/commonfunctions';
import {setCharacterDetailsActionCreator} from '../../redux/reducers/charactersReducer';

type CharacterCard = {
  character: characterList;
  isGrid: boolean;
  favouriteKeys: Array<number>;
  RemoveItems?: Function;
};
const windowWidth = Dimensions.get('window').width;

const CharacterCard = ({
  character,
  isGrid,
  favouriteKeys,
  RemoveItems,
}: CharacterCard) => {
  const {favouriteBackground} = theme?.colors || {};
  const [episodeDetails, setEpisodeDetails] = useState<Array<episode>>([]);
  const isFavourite = favouriteKeys?.find(item => item === character.id)
    ? true
    : false;
  const [favourite, setfavourite] = useState(isFavourite);

  const dispatch = useDispatch<AppDispatch>();

  const Header = () => {
    return (
      <Box alignItems={'center'} marginTop={5}>
        <Text variant={'buttonText'} numberOfLines={1}>
          {character.name}
        </Text>
      </Box>
    );
  };

  useEffect(() => {
    let episodeIds = [];
    if (character && character?.episode.length > 0) {
      let firstId = getLastItem(character?.episode[0]);
      let lastId;

      episodeIds.push(Number(firstId));

      if (character?.episode.length > 1) {
        lastId = getLastItem(character?.episode[character?.episode.length - 1]);
        episodeIds.push(Number(lastId));
      }
    }

    if (episodeIds.length > 0) {
      dispatch(getEpisodes(episodeIds))
        .then(unwrapResult)
        .then(result => {
          let isArrayItems = Array.isArray(result);
          if (isArrayItems) {
            setEpisodeDetails([...result]);
          } else {
            setEpisodeDetails([result]);
          }
        });
    }

    return () => {
      null;
    };
  }, []);

  const SaveOrRemoveFavourites = async (value: characterList) => {
    if (!favourite) {
      await AsyncStorage.setItem(value?.id?.toString(), JSON.stringify(value));
    } else {
      await AsyncStorage.removeItem(value?.id?.toString());
      if (RemoveItems) RemoveItems(value?.id);
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        dispatch(
          setCharacterDetailsActionCreator({
            CharacterDetails: {character: character, episode: episodeDetails},
            isFavourite: favourite,
          }),
        )
      }
      style={{
        flex: 1,
        marginVertical: Math.round(moderateVerticalScale(8)),
      }}>
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
            onPress={() => {
              SaveOrRemoveFavourites(character);
              setfavourite(prev => !prev);
            }}
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
                {episodeDetails[0]?.name}
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
    </TouchableOpacity>
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
