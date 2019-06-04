import React, { Component } from 'react'
import './Controller.less'
import VF from '../../asset/VF.png'
import {connect} from 'react-redux'
import _ from 'lodash'

/**
 * 下方控制器，包括当前播放信息、音量等信息
 * */
@connect(({controller}) => ({
  controller
}))
class Controller extends Component{

  state = {
    progress: 0
  }

  handlePlaying = (e) => {
    const audio = e.target
    setInterval(() => {
      this.setState({
        progress: audio.currentTime / audio.duration 
      })
    }, 1000)
  }

  render() {
    const { song } = this.props.controller
    const hasSong = !_.isEmpty(song)
    return (
      <div className='pc-controller'>
        <div className='pc-controller-progress-bar' style={{width: `${this.state.progress * 100}%`}}></div>
        <div className='pc-controller-contents'>
          <audio src={`http://music.163.com/song/media/outer/url?id=${song.id}.mp3`} onPlaying={this.handlePlaying} autoPlay></audio>
          <div className='pc-controller-cover'>
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
            <i className='iconfont icon-bofangqi-xiayiji-copy'></i>
            <i className='iconfont icon-bofangqi-bofang'></i>
            <i className='iconfont icon-bofangqi-xiayiji'></i>
            <div className='pc-controller-volune'>
              <div className='pc-controller-volune-inner'></div>  
            </div>
          </div>
          <img className='pc-controller-VF' src={VF} alt='VF' />
          <div className='pc-controller-ops'>
            <i className='iconfont icon-zhuifanshu'></i>
            <i className='iconfont icon-xunhuanbofang'></i>
          </div>
        </div>
      </div>
    )
  }
}

export default Controller