import React, { Component } from 'react';
import './App.less';
import './theme/theme-default.less'
import './asset/icon/iconfont.css'
import Leftbar from './component/Leftbar/Leftbar.js';
import Controller from './component/Controller/Controller'
import Login from './component/Login/Login'
import RouteContainer from './component/RouteContainer/RouteContainer'
import PlayingPanel from './component/PlayingPanel/PlayingPanel'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import {BrowserRouter} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="play-color">
          <header className="pc-header" />
          <Leftbar />
          <RouteContainer />
          <Controller />
          <Login />
          <ToastContainer hideProgressBar/>
          <PlayingPanel />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
