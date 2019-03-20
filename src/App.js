import React, { Component } from 'react';
import './App.less';
import LeftBar from './Component/LeftBar/LeftBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <LeftBar />
      </div>
    );
  }
}

export default App;
