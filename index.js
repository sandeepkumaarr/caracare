/**
 * @format
 */

import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import {
  navigationRef,
  routeNameRef,
  isReadyRef,
} from './src/navigation/RootNavigation';
import {store} from './src/redux/store';

const Root = () => {
  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

enableScreens();
AppRegistry.registerComponent(appName, () => Root);
