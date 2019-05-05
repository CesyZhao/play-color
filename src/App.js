import React, { Component } from 'react';
import './App.less';
import LeftBar from './component/LeftBar/LeftBar.js';
import Controller from './component/Controller/Controller'
import Login from './component/Login/Login'

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
