import React, { Component } from 'react';
import './App.less';
import LeftBar from './Component/LeftBar/LeftBar.js';
import Controller from './Component/Controller/Controller'
import Login from './Component/Login/Login'

class App extends Component {
  render() {
    return (
      <div className="play-color">
        <header className="pc-header" />
        <LeftBar />
        <Controller />
        <Login />
      </div>
    );
  }
}

export default App;
