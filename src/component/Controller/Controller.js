import React, { Component } from 'react'
import './Controller.less'
import {connect} from 'react-redux'
import _ from 'lodash'
import toaster from '../../util/toast'
import eventBus from '../../events'
import { formatDuration } from '../../util/audio'
import { updatePlayingMode, nextSong, prevSong } from '../../store/action/controller'
/**
 * 下方控制器，包括当前播放信息、音量等信息
 * */
@connect(({controller}) => ({
  controller
}))
class Controller extends Component{

  state = {
    playing: false,
    currentTime: 0
  }

  componentDidMount () {
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
  }

  handleMusicReady = (e) => {
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

  changeMode = () => {
    const modeList = ['listCirculation', 'singleCirculation', 'shuffle']
    const { mode } = this.props.controller
    let modeIndex = modeList.indexOf(mode)
    const nextModeIndex = ++modeIndex < modeList.length ? modeIndex : 0
    const nextMode = modeList[nextModeIndex]
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
    toaster.error('Bad audio!', this.next)
  }

  next = () => {
    this.props.dispatch(nextSong())
  }

  prev = () => {
    this.props.dispatch(prevSong())
  }

  showCurrentSong = (id) => {
    eventBus.emit('togglePlayingPanel', id)
  }

  render() {
    const { song, mode } = this.props.controller
    const hasSong = !_.isEmpty(song)
    return (
      <div className='pc-controller'>
        <div className='pc-controller-progress-bar' style={{width: `${(this.state.currentTime * 1000 / song.duration) * 100}%`}}></div>
        <div className='pc-controller-contents'>
          {
            hasSong &&  <audio id="audio" crossOrigin="anonymous" ref='audio' src={`http://music.163.com/song/media/outer/url?id=${song.id}.mp3`} onError={this.handleError} onEnded={this.handlePlayEnded} onPlay={this.handleMusicReady} onPlaying={this.handlePlaying} autoPlay></audio>
          }
          <div className='pc-controller-cover-wrapper'>
            <div className='pc-controller-cover' onClick={() => this.showCurrentSong(song.id)}>
              {
                hasSong && <img src={song.album.picUrl} alt='playing-cover'></img>
              }
            </div>
            <div className='pc-controller-info'>
              {
                hasSong && <div>{song.name}</div>
              }
              {
                hasSong && <div> { song.artists.map(artist => artist.name).join('/') } </div>
              }
            </div>
          </div>
          <div className='pc-controller-ops'>
            <i className='iconfont icon-ios-rewind' onClick={ this.prev }></i>
            <i onClick={this.togglePlaying} className={`iconfont ${this.state.playing ? 'icon-ios-pause' : 'icon-iosplay'}`}></i>
            <i className='iconfont icon-ios-fastforward' onClick={ this.next }></i>
          </div>
          <div className='pc-controller-controls'>
            <span className="pc-controller-time">
              { ` ${ formatDuration(this.state.currentTime * 1000) } / ${ formatDuration(song.duration) } ` }
            </span>
            <i className='iconfont icon-iosheartoutline'></i>
            <i onClick={this.changeMode} className={`iconfont icon-${mode}`}></i>
            <span className="pc-controller-comments">
              3万 热评
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Controller