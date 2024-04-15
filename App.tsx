/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigation from './src/RootNavigation';
import {store} from './redux/store/store';
import {Provider} from 'react-redux';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
