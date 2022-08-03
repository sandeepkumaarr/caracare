import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import Navigator from './src/navigation/Navigator';

import theme from './src/themes/default';

// import {NativeModules} from 'react-native';
// NativeModules.DevSettings.setIsDebuggingRemotely(false);

const App = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </>
  );
};

export default App;
