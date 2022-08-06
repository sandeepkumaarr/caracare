import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Box from './Box';
import Text from './Text';

const windowWidth = Dimensions.get('window').width;

type CharacterInformationProps = {
  gender: string;
  episode: Array<string>;
  origin: {
    name: string;
    url: string;
  };
};

const CharacterInformation = ({
  gender,
  episode,
  origin,
}: CharacterInformationProps) => {
  return (
    <Box paddingHorizontal={10}>
      <Box flexDirection={'row'} justifyContent="space-between">
        <Box maxWidth={windowWidth / 2.5} alignItems="center">
          <Text numberOfLines={1} variant={'buttonText'}>
            Gender
          </Text>
          <Text variant={'defaultBody'} numberOfLines={1} marginVertical={2}>
            {gender}
          </Text>
        </Box>

        <Box maxWidth={windowWidth / 2} alignItems="center">
          <Text numberOfLines={1} variant={'buttonText'}>
            Number Of Episodes
          </Text>
          <Text variant={'defaultBody'} numberOfLines={1} marginVertical={2}>
            {episode?.length}
          </Text>
        </Box>
      </Box>
      <Box paddingVertical={5}>
        <Text numberOfLines={1} variant={'buttonText'} textAlign="left">
          Origin and last known locations
        </Text>
        <Text variant={'defaultBody'} numberOfLines={1} marginVertical={2}>
          {origin?.name}
        </Text>
      </Box>
    </Box>
  );
};

export default CharacterInformation;

const styles = StyleSheet.create({});
