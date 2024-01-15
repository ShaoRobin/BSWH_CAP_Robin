import React from 'react';

import AppContainer from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import Store from './src/redux'

const App = () => {

  return (
    <Provider store={Store.store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
