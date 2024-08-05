import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import NavigationContainerScreen from './src/navigation/NavigationContainerScreen';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainerScreen />
    </Provider>
  );
};

export default App;
