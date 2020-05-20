import React, { useState } from 'react';
import { AppNavigation } from './src/navigation/AppNavigation'
import { Provider } from 'react-redux';
import { AppLoading } from "expo";
import { bootstrap } from './src/bootstrap';
import store from './src/store'

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if(!isReady) {
    console.log('Ready');
    return (
      <AppLoading 
        startAsync={bootstrap}
        onError={(error) => console.log(error)}
        onFinish={() => setIsReady(true)}
      />
    )
    
    
  }
  return <Provider store={store}><AppNavigation/></Provider>
}
