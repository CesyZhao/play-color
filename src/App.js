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
import { HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveUserProfile, saveUserFavorites } from './store/action/user'
import EventBus from './events'
import api from './config/api'

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
    this.props.user.profile && this.getUserFavorites()
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
    EventBus.on('content-loaded', () => {
      this.setState({
        showToolbar: true
      })
    })
  }

  refreshLoginStatus = async () => {
    try {
      const { data } = await api.user.getLoginStatus()
      data.profile ? api.user.refreshLoginStatus() : this.props.dispatch(saveUserProfile({}))
    } catch (error) {
      this.props.dispatch(saveUserProfile({}))
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

  handleHistory = (index) => {
    window.history.go(index)
    console.log(this.props.history)
  }


  render() {
    const UA = navigator.userAgent.toLowerCase()
    return (
      <HashRouter>
        <div className="play-color">
          <header className="pc-header" >
            {
              this.state.showToolbar &&
              <div className="pc-tool-bar">
                <div className="pc-tool-bar-tools">
                  <i className="iconfont icon-fanhui" onClick={() => this.handleHistory(-1)} />
                  <i className="iconfont icon-gengduo" onClick={() => this.handleHistory(1)} />
                </div>
              </div>
            }
          </header>
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
      </HashRouter>
    );
  }
}

export default App;
