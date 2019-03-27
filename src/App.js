import React, { Component } from 'react';
import './App.less';
import LeftBar from './Component/LeftBar/LeftBar.js';
import Controller from './Component/Controller/Controller'

class App extends Component {
  render() {
    return (
      <div className="play-color">
        <header className="pl-header" />
        <LeftBar />
        <Controller />
      </div>
    );
  }
}

export default App;
