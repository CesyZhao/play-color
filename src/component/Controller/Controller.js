import React, { Component } from 'react'
import './Controller.less'
import VF from '../../asset/VF.png'

/**
 * 下方控制器，包括当前播放信息、音量等信息
 * */
class Controller extends Component{
  render() {
    return (
      <div className='pc-controller'>
        <div className='pc-controller-progress-bar'></div>
        <div className='pc-controller-contents'>
          <div className='pc-controller-cover'></div>
          <div className='pc-controller-info'>
            <div>See You Again</div>
            <div> Charile Puth </div>
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