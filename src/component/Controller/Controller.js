import React, { Component } from 'react'
import './Controller.less'
import VF from '../../asset/VF.png'
import {connect} from 'react-redux'

/**
 * 下方控制器，包括当前播放信息、音量等信息
 * */
@connect(({controller}) => ({
  controller
}))
class Controller extends Component{
  render() {
    const song = this.props.controller
    console.log(song)
    return (
      <div className='pc-controller'>
        <div className='pc-controller-progress-bar'></div>
        <div className='pc-controller-contents'>
          <audio src={`http://music.163.com/song/media/outer/url?id=${song.id}.mp3`} autoPlay></audio>
          <div className='pc-controller-cover'>
            {
              song && <img src={song.album.picUrl} alt='playing-cover'></img>
            }
          </div>
          <div className='pc-controller-info'>
            {
              song && <div>{song.name}</div>
            }
            {
              song && <div> { song.artists.map(artist => artist.name).join('/') } </div>
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