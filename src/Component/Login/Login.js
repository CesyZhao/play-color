import React, {Component} from 'react'
import './Login.less'

const defaultSettings = {
  WAVE_HEIGHT: 200, //波浪变化高度
  SCALE : 0.5, // 绘制速率
  CYCLE : 360, // SCALE
  TIME : 0
}

class Login extends Component {
  render() {
    return (
      <div className='pc-login'>
        <canvas className='pc-login-canvas' ref='canvas'></canvas>
      </div>
    )
  }
}

export default Login