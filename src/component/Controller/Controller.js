import React, { Component } from 'react'
import './Controller.less'
import {connect} from 'react-redux'
import _ from 'lodash'
import toaster from '../../util/toast'
import eventBus from '../../events'
import { formatDuration } from '../../util/audio'
import { updatePlayingMode, nextSong, prevSong, updatePlayingAlbum, updateHeartbeatAlbum, updatePlayingStatus } from '../../store/action/controller'
import { likeSong } from '../../store/action/user'
// import { Link } from 'react-router-dom'
import api from '../../config/api'
import { formatList } from '../../util/audio'
import Player from './Player'
/**
 * 下方控制器，包括当前播放信息、音量等信息
 * */
const PLAYING_MODES = ['listCirculation', 'singleCirculation', 'shuffle']
@connect(({controller, user}) => ({
  controller,
  user
}))
class Controller extends Component{

  state = {
    playing: false,
    currentTime: 0,
    showVolume: false,
    player: null
  }

  componentDidMount() {
    this.bindEvents()
    const { audio = {} } = this.refs
    audio.volume = this.state.volume
    this.updatePlayingSongUrl(this.props.controller.song)
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    nextProp.controller &&
    nextProp.controller.song.id !== this.props.controller.song.id &&
    this.updatePlayingSongUrl(nextProp.controller.song)
  }

  updatePlayingSongUrl = async (song) => {
    this.props.controller.playing && this.props.dispatch(updatePlayingStatus())
    let url
    try {
      const { data } = await api.song.getSongUrl({ id: song.id })
      const { data: realData } = data
      const [urlObj] = realData
      url = urlObj.url
    } catch (error) {
      url = `http://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    }
    Player.playSong({ url, volume: this.props.controller.volume})
    this.updateCurrentTime()
  }

  updateCurrentTime = () => {
    setInterval(() => {
      const currentTime = Player.getCurrentTime()
      this.setState({
        currentTime
      })
    }, 1000)
  }

  bindEvents = () => {
    const electron = window.require('electron')
    const { ipcRenderer } = electron
    const events = ['next', 'prev', 'togglePlaying']
    for (const event of events) {
      ipcRenderer.on(event, () => {
        this[event]()
      })
      eventBus.on(event, () => {
        this[event]()
      })
    }
    eventBus.on('likeSong', this.likeSong)
    eventBus.on('changeMode', this.changeMode)
  }

  toggleVolume = () => {
    this.setState({ showVolume: !this.state.showVolume })
  }

  handleVolumeChange = (e) => {
    const { pageX, currentTarget } = e
    const rect = currentTarget.getBoundingClientRect()
    const { left } = rect
    const offset = pageX - left
    const volume = offset / currentTarget.clientWidth
    Player.setVolume(+volume.toFixed(1))
  }

  changeMode = async (targetMode) => {
    const { controller, user } = this.props
    const { song } = controller
    const { id } = song
    const status = user.favorites.get(id)
    const modeList = status ? [...PLAYING_MODES, 'heartbeat'] : PLAYING_MODES
    const { mode } = this.props.controller
    let modeIndex = modeList.indexOf(mode)
    const nextModeIndex = ++modeIndex < modeList.length ? modeIndex : 0
    let nextMode = typeof targetMode === 'string' ? targetMode : modeList[nextModeIndex]
    // TODO 从心动模式切回列表循环时需要更新列表至切换到心动模式之前的列表
    if (nextMode === 'heartbeat') {
      try {
        const { playingAlbum } = controller
        const index = playingAlbum.tracks.indexOf(song) + 1
        const nextSong = playingAlbum.tracks[index]
        const { data } = await api.song.getHeartbeatList({ id: song.id, pid: playingAlbum.id, sid: nextSong.id })
        const list = formatList(data.data.map(song => song.songInfo))
        this.props.dispatch(updateHeartbeatAlbum({ tracks: list, id: 0, name: '心动模式' }))
      } catch (error) {
        nextMode = 'listCirculation'
        toaster.error('无法切换至心动模式')
      }
    }
    this.props.dispatch(updatePlayingMode(nextMode))
  }

  handleError = () => {
    this.setState({playing: false})
    toaster.error('Bad audio!', () => {
      if (this.state.playing) return
      this.next()
    })
  }

  togglePlaying = () => {
    this.props.controller.playing ? Player.pause() : Player.play()
  }

  next = () => {
    this.props.dispatch(nextSong())
  }

  prev = () => {
    this.props.dispatch(prevSong())
  }

  likeSong = async (song) => {
    const { id } = song
    const status = !this.props.user.favorites.get(id)
    try {
      const { data } = await api.user.likeSong({id, status})
      console.log(data)
      if (data.code === 200) {
        this.props.dispatch(likeSong(id, status))
      }
      const { controller } = this.props
      const { playingAlbum } = controller
      eventBus.emit('add-like-song', song, status)
      if (data.playlistId === playingAlbum.id) {
        if (status) {
          playingAlbum.tracks.push(song)
        } else {
          _.remove(playingAlbum.tracks, (song) => {
            return song.id === id
          })
        }
        this.props.dispatch(updatePlayingAlbum(playingAlbum))
      }
    } catch (error) {
      console.log(error)
      toaster.error('操作失败')
    }
  }

  showCurrentSong = (id) => {
    eventBus.emit('togglePlayingPanel', id)
  }

  render() {
    const { song, mode, playing, volume } = this.props.controller
    let { favorites } = this.props.user
    _.isEmpty(favorites) && (favorites = new Map())
    const hasSong = !_.isEmpty(song)
    return (
      <div className="pc-controller">
        <div className="pc-controller-progress-bar" style={{width: `${(this.state.currentTime * 1000 / song.duration) * 100}%`}}></div>
        <div className="pc-controller-cover">
          {
            hasSong && <img alt="playing-cover" src={song.album.picUrl.replace('100y100', '965y965')}></img>
          }
        </div>
        <div className="pc-controller-contents">
          {
            hasSong &&
            <React.Fragment>
              {/* <audio autoPlay crossOrigin="anonymous" id="audio" onEnded={this.handlePlayEnded} onError={this.handleError} onPlay={this.handleMusicReady} onPlaying={this.handlePlaying} ref="audio" src={this.state.playingUrl}></audio> */}
              <div className="pc-controller-cover-wrapper">
                <div className="pc-controller-info">
                  <div>{song.name}</div>
                  <div>
                    <div> {song.artists.map(artist => artist.name).join('/')} </div>
                    <span className="pc-controller-time">
                      {` ${formatDuration(this.state.currentTime * 1000)} / ${formatDuration(song.duration)} `}
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
          <div className="pc-controller-ops">
            <i className="iconfont icon-ios-rewind" onClick={this.prev}></i>
            <i className={`iconfont ${playing ? 'icon-ios-pause' : 'icon-iosplay'}`} onClick={playing ? Player.pause : Player.play}></i>
            <i className="iconfont icon-ios-fastforward" onClick={this.next}></i>
          </div>
          {
            hasSong &&
            <div className="pc-controller-controls">
              <div onClick={this.handleVolumeChange} className="pc-controller-volume">
                <div className="pc-controller-volume-inner" style={{ width: `${volume * 100}%` }}></div>
              </div>
              <i className={`iconfont ${favorites.get(song.id) ? 'icon-heart1' : 'icon-heart'}`} onClick={() => this.likeSong(song)}></i>
              <i className={`iconfont icon-ios-${mode}`} onClick={this.changeMode}></i>
              <i className="iconfont icon-expand-o" onClick={() => this.showCurrentSong(song.id)}></i>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Controller