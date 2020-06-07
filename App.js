import React from 'react';
import Main from './components/MainComponent'

// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });

export default class App extends React.Component {
  render() {
    return (
      <Main />      
    );  
  }
}
