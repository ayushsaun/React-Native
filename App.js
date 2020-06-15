import React from 'react';
import Main from './components/MainComponent'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent'

const { persistor , store } = ConfigureStore();

// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate 
          loading = {<Loading />}
          persistor={persistor}
        >
          <Main />
        </PersistGate>
      </Provider>      
    );  
  }
}
