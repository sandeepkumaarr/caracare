import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Box,
  CharacterDetailCard,
  CharacterInformation,
  EpisodeCard,
} from '../components/Index';
import {useSelector} from 'react-redux';
import {State} from '../types/characters';

const CharacterDetailScreen = () => {
  const characterDetails = useSelector(
    (state: State) => state.Characters.characterDetails,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Box marginBottom={5}>
        <CharacterDetailCard character={characterDetails?.character} />
      </Box>

      <Box marginTop={10}>
        <CharacterInformation
          gender={characterDetails?.character?.gender}
          episode={characterDetails?.character?.episode}
          origin={characterDetails?.character?.origin}
        />
      </Box>

      <Box
        flexDirection={'row'}
        justifyContent="space-around"
        marginVertical={5}>
        {characterDetails?.episode.map(item => {
          return <EpisodeCard key={item.id} episodeItem={item} />;
        })}
      </Box>
    </SafeAreaView>
  );
};

export default CharacterDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFF',
  },
});
