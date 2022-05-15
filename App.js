import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RouteNavigator from './src/routes/RouteNavigator';

const App = () =>{
  return(
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
}

export default App;
