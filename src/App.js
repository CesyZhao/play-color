import React, { Component } from 'react';
import './App.less';
import './theme/theme-default.less'
import LeftBar from './component/LeftBar/LeftBar.js';
import Controller from './component/Controller/Controller'
import Login from './component/Login/Login'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

class App extends Component {
  render() {
    return (
      <div className="play-color">
        <header className="pc-header" />
        <LeftBar />
        <Controller />
        <Login />
        <ToastContainer hideProgressBar/>
      </div>
    );
  }
}

export default App;
