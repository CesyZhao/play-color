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
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveUserProfile, saveUserFavorites } from './store/action/user'
import EventBus from './events'
import api from './config/api'
import _ from 'lodash'

@connect(({ user }) => ({
  user
}))
class App extends Component {
  state = {
    showComment: false,
    menuDisplayed: false,
    showToolbar: false,
    timestamp: new Date().valueOf()
  }
  componentDidMount() {
    this.refreshLoginStatus()
    console.log(this.props.user.profile)
    !_.isEmpty(this.props.user.profile) && this.getUserFavorites()
    document.addEventListener('keydown', e => {
      const { ctrlKey, metaKey, key, shiftKey } = e
      const isControlOrCommand = ctrlKey || metaKey
      if (key === 'P' && isControlOrCommand && shiftKey) {
        EventBus.emit('toggleSearch', true)
      }
    })
    EventBus.on('getUserFavorites', this.getUserFavorites)
    EventBus.on('closeMenu', () => {
      this.setState({
        menuDisplayed: false
      })
    })
  }

  refreshLoginStatus = async () => {
    try {
      const { data } = await api.user.getLoginStatus()
      data.profile ? api.user.refreshLoginStatus() : this.props.dispatch(saveUserProfile({ profile: {} }))
    } catch (error) {
      this.props.dispatch(saveUserProfile({profile: {}}))
    }
  }

  getUserFavorites = async () => {
    const { userId } = this.props.user.profile
    try {
      const { data } = await api.user.getUserPlaylist({ uid: userId })
      const list = data.playlist[0]
      const { data: playlist } = await api.song.getPlayList({ id: list.id })
      console.log(playlist)
      const favorites = new Map()
      for (let song of playlist.playlist.tracks) {
        favorites.set(song.id + '', true)
      }
      this.props.dispatch(saveUserFavorites(favorites))
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const UA = navigator.userAgent.toLowerCase()
    return (
      <BrowserRouter>
        <div className="play-color">
          <div className="content-wrapper">
            <Menu />
            <RouteContainer />
          </div>
          <Controller />
          <Login />
          <ToastContainer hideProgressBar />
          <PlayingPanel />
          <Search />
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
