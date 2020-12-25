import React, { Component } from 'react'
import './Controller.less'
import {connect} from 'react-redux'
import _ from 'lodash'
import toaster from '../../util/toast'
import eventBus from '../../events'
import { formatDuration } from '../../util/audio'
import { updatePlayingMode, nextSong, prevSong, updatePlayingAlbum, updateHeartbeatAlbum } from '../../store/action/controller'
import { likeSong } from '../../store/action/user'
import { Link } from 'react-router-dom'
import api from '../../config/api'
import { formatList } from '../../util/audio'
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
    currentTime: 0
  }

  componentDidMount() {
    const electron = window.require('electron')
    const {ipcRenderer} = electron
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

  handleMusicReady = () => {
    this.setState({playing: true})
  }

  handlePlayEnded = () => {
    this.next()
  }

  togglePlaying = () => {
    const audio = this.refs.audio
    if (!audio.paused) {
      audio.pause()
      this.setState({playing: false})
      return
    }
    audio.play()
    this.setState({playing: true})
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
        console.log(data)
      } catch (error) {
        console.log(error)
        nextMode = 'listCirculation'
        toaster.error('无法切换至心动模式')
      }
    }
    this.props.dispatch(updatePlayingMode(nextMode))
  }

  handlePlaying = (e) => {
    const audio = e.target
    setInterval(() => {
      this.setState({
        currentTime: audio.currentTime
      })
    }, 1000)
  }

  handleError = () => {
    this.setState({playing: false})
    toaster.error('Bad audio!', () => {
      if (this.state.playing) return
      this.next()
    })
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
    const { song, mode } = this.props.controller
    let { favorites } = this.props.user
    _.isEmpty(favorites) && (favorites = new Map())
    const hasSong = !_.isEmpty(song)
    return (
      hasSong &&
      <div className="pc-controller">
        <div className="pc-controller-progress-bar" style={{width: `${(this.state.currentTime * 1000 / song.duration) * 100}%`}}></div>
        <div className="pc-controller-cover" onClick={() => this.showCurrentSong(song.id)}>
          {
            hasSong && <img alt="playing-cover" src={song.album.picUrl.replace('100y100', '965y965')}></img>
          }
        </div>
        <div className="pc-controller-contents">
          {
            hasSong && <audio crossOrigin="anonymous" id="audio" onEnded={this.handlePlayEnded} onError={this.handleError} onPlay={this.handleMusicReady} onPlaying={this.handlePlaying} ref="audio" src={`http://music.163.com/song/media/outer/url?id=${song.id}.mp3`}></audio>
          }
          <div className="pc-controller-cover-wrapper">
            <div className="pc-controller-info">
              {
                hasSong && <div>{song.name}</div>
              }
              {
                hasSong && <div>
                      <div> {song.artists.map(artist => artist.name).join('/')} </div>
                      <span className="pc-controller-time">
                        {` ${formatDuration(this.state.currentTime * 1000)} / ${formatDuration(song.duration)} `}
                      </span>
                    </div>
              }
            </div>
          </div>
          <div className="pc-controller-ops">
            <i className="iconfont icon-ios-rewind" onClick={this.prev}></i>
            <i className={`iconfont ${this.state.playing ? 'icon-ios-pause' : 'icon-iosplay'}`} onClick={this.togglePlaying}></i>
            <i className="iconfont icon-ios-fastforward" onClick={this.next}></i>
          </div>
          <div className="pc-controller-controls">
            <i className={`iconfont ${favorites.get(song.id) ? 'icon-iosheart' : 'icon-iosheartoutline'}`} onClick={() => this.likeSong(song)}></i>
            <i className={`iconfont icon-ios-${mode}`} onClick={this.changeMode}></i>
            <Link to="/comment">
              <i className="iconfont icon-aui-icon-comment"></i>
            </Link>
            {/* <span className="pc-controller-comments">
              3万 热评
            </span> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Controller