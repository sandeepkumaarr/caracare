import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CharacterDetailScreen,
  CharactersListScreen,
  FavouritesScreen,
} from '../screens/Index';
import routes from './routes';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.CHARACTERS_LIST_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={routes.CHARACTERS_LIST_SCREEN}
        component={CharactersListScreen}
      />
      <Stack.Screen
        name={routes.CHARACTER_DETAILS_SCREEN}
        component={CharacterDetailScreen}
      />
      <Stack.Screen
        name={routes.FAVOURITES_SCREEN}
        component={FavouritesScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
