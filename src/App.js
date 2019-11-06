import React, { Component } from 'react';
import './App.less';
import './theme/theme-default.less'
import './asset/icon/iconfont.css'
import Menu from './component/Menu/Menu.js';
import Controller from './component/Controller/Controller'
import Login from './component/Login/Login'
import RouteContainer from './component/RouteContainer/RouteContainer'
import PlayingPanel from './component/PlayingPanel/PlayingPanel'
import Search from './component/Search/Search'
import WindowOperator from './component/WindowOperator/WindowOperator'
import Comment from './component/Comment/Comment'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import {BrowserRouter} from 'react-router-dom'
import http from './config/http'
import {connect} from 'react-redux'
import {SET_USER_PROFILE} from './store/action/actions'
import EventBus from './events'

@connect(({user}) => ({
  user
}))
class App extends Component {
  state = {
    showComment: false
  }
  componentDidMount() {
    http.get('/login/status')
    .then(({data}) => {
      if (!data.profile) {
        this.props.dispatch({type: SET_USER_PROFILE, user: {}})
      } else {
        http.get('/login/refresh')
      }
    })
    .catch(err => {
      this.props.dispatch({type: SET_USER_PROFILE, user: {}})
    })
    document.addEventListener('keydown', e => {
      const {ctrlKey, metaKey, key, shiftKey} = e
      const isControlOrCommand = ctrlKey || metaKey
      if (key === 'P' && isControlOrCommand && shiftKey) {
        EventBus.emit('toggleSearch', true)
      }
    })
    EventBus.on('toggleComment', () => {
      this.setState({
        showComment: !this.state.showComment
      })
    })
  }
  render() {
    const UA = navigator.userAgent.toLowerCase()
    return (
      <BrowserRouter>
        <div className="play-color">
          <header className="pc-header" />
          <Menu />
          <RouteContainer />
          <Controller />
          <Login />
          <ToastContainer hideProgressBar/>
          <PlayingPanel />
          <Search />
          <Comment showComment={ this.state.showComment } />
          {
            UA.includes('windows') &&
            <WindowOperator />
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
