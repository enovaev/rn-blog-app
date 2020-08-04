import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigation from './src/navigation/AppNavigation';
import { bootstrap } from './src/bootstrap';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}