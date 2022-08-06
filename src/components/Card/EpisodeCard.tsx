import React from 'react';
import Card from './Card';
import Box from '../Box';
import Text from '../Text';
import {episode} from '../../types/characters';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

type EpisodeProps = {
  episodeItem: episode;
};

const EpisodeCard = ({episodeItem, ...rest}: EpisodeProps) => {
  const {episode, name, characters, created} = episodeItem;

  return (
    <Card variant={'episodeCard'}>
      <Box alignSelf={'flex-end'} marginVertical={5}>
        <Text numberOfLines={1} variant="defaultBody" fontWeight={'700'}>
          {episode}
        </Text>
      </Box>

      <Box marginVertical={5} alignItems="center">
        <Text variant={'episodeHeader'} numberOfLines={2}>
          {name}
        </Text>
      </Box>

      <Box
        flexDirection={'row'}
        justifyContent="space-between"
        marginVertical={5}>
        <Text numberOfLines={1} variant="defaultBody">
          {characters?.length}
        </Text>
        <Text numberOfLines={1} variant="defaultBody">
          {created
            ? dayjs(created, `DD/MM/YY, hh:mm`).format(`MMM D YYYY`)
            : '--'}
        </Text>
      </Box>
    </Card>
  );
};

export default EpisodeCard;
