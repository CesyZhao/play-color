import React, { Component } from 'react'
import './Controller.less'
import VF from '../../asset/VF.png'
import {connect} from 'react-redux'
import _ from 'lodash'
import {UPDATE_PLAYING_MODE, NEXT_SONG, PREV_SONG} from '../../store/action/actions'
import toaster from '../../util/toast'
import eventBus from '../../events'
/**
 * 下方控制器，包括当前播放信息、音量等信息
 * */
@connect(({controller}) => ({
  controller
}))
class Controller extends Component{

  state = {
    progress: 0,
    playing: false
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
    this.props.dispatch({type: UPDATE_PLAYING_MODE, mode: nextMode})
  }

  handlePlaying = (e) => {
    const audio = e.target
    setInterval(() => {
      this.setState({
        progress: audio.currentTime / audio.duration 
      })
    }, 1000)
  }

  handleError = () => {
    this.setState({playing: false})
    toaster.error('Bad audio!', this.next)
  }

  next = () => {
    this.props.dispatch({type: NEXT_SONG})
  }

  prev = () => {
    this.props.dispatch({type: PREV_SONG})
  }

  showCurrentSong = (id) => {
    eventBus.emit('togglePlayingPanel', id)
  }

  render() {
    const { song, mode } = this.props.controller
    const hasSong = !_.isEmpty(song)
    return (
      <div className='pc-controller'>
        <div className='pc-controller-progress-bar' style={{width: `${this.state.progress * 100}%`}}></div>
        <div className='pc-controller-contents'>
          {
            hasSong &&  <audio id="audio" crossOrigin="anonymous" ref='audio' src={`http://music.163.com/song/media/outer/url?id=${song.id}.mp3`} onError={this.handleError} onEnded={this.handlePlayEnded} onPlay={this.handleMusicReady} onPlaying={this.handlePlaying} autoPlay></audio>
          }
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
          <div className='pc-controller-controls'>
            <i className='iconfont icon-yinliang'></i>
            <div className='pc-controller-volune'>
              <div className='pc-controller-volune-inner'></div>  
            </div>
            <i className='iconfont icon-bofangqi-xiayiji-copy' onClick={ this.prev }></i>
            <i onClick={this.togglePlaying} className={`iconfont ${this.state.playing ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'}`}></i>
            <i className='iconfont icon-bofangqi-xiayiji' onClick={ this.next }></i>
          </div>
          <img className='pc-controller-VF' src={VF} alt='VF' />
          <div className='pc-controller-ops'>
            <i className='iconfont icon-zhuifanshu'></i>
            <i onClick={this.changeMode} className={`iconfont icon-${mode}`}></i>
          </div>
        </div>
      </div>
    )
  }
}

export default Controller