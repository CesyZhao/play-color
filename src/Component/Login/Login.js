import React, {Component} from 'react'
import './Login.less'
import propTypes from 'prop-types'

let WAVE_HEIGHT = 40 //波浪变化高度

let SCALE = 0.5 // 绘制速率

let CYCLE = 360 / SCALE

let TIME = 0

class Login extends Component {

  static propTypes = {
    show: propTypes.bool.isRequired
  }

  static defaultProps = {
    show: false
  }

  initCanvas = () => {
    const c = this.refs.canvas
    console.log(c.style)
    const width = 260
    const height = 200
    const ctx = c.getContext("2d")
    c.width = width
    c.height = height
    window.requestAnimationFrame(() => {
      this.draw(ctx, width, height)
    })
  }

  draw = (ctx, width, height) => {

    ctx.clearRect(0, 0, width, height)

    TIME = (TIME + 1) % CYCLE
    let angle = SCALE * TIME // 当前正弦角度
    let dAngle = 60 // 两个波峰相差的角度

    ctx.beginPath()
    ctx.moveTo(0, height * 0.5 + distance(WAVE_HEIGHT, angle, 0))
    ctx.bezierCurveTo(
      width * 0.4,
      height * 0.5 + distance(WAVE_HEIGHT, angle, dAngle),
      width * 0.6,
      height * 0.5 + distance(WAVE_HEIGHT, angle, 2 * dAngle),
      width,
      height * 0.5 + distance(WAVE_HEIGHT, angle, 3 * dAngle)
    )
    ctx.strokeStyle = "#57E1E7"
    ctx.shadowColor = '#57E1E7'
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, height * 0.5 + distance(WAVE_HEIGHT, angle, -30))
    ctx.bezierCurveTo(
      width * 0.3,
      height * 0.5 + distance(WAVE_HEIGHT, angle, dAngle - 30),
      width * 0.7,
      height * 0.5 + distance(WAVE_HEIGHT, angle, 2 * dAngle - 30),
      width,
      height * 0.5 + distance(WAVE_HEIGHT, angle, 3 * dAngle - 30)
    )
    ctx.strokeStyle = "#7BA3FF"
    ctx.shadowBlur = 20
    ctx.shadowColor = '#7BA3FF'
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, height * 0.5 + distance(WAVE_HEIGHT, angle, -60))
    ctx.bezierCurveTo(
      width * 0.6,
      height * 0.5 + distance(WAVE_HEIGHT, angle, dAngle - 60),
      width * 0.8,
      height * 0.5 + distance(WAVE_HEIGHT, angle, 2 * dAngle - 60),
      width,
      height * 0.5 + distance(WAVE_HEIGHT, angle, 3 * dAngle - 60)
    )
    ctx.strokeStyle = "#9B30FF"
    ctx.shadowBlur = 20
    ctx.shadowColor = '#9B30FF'
    ctx.stroke()

    function distance(height, currAngle, diffAngle) {
      return height * Math.cos((((currAngle - diffAngle) % 360) * Math.PI) / 180)
    }

    window.requestAnimationFrame(() => {
      this.draw(ctx, width, height)
    })
  }

  componentDidMount() {
    this.props.show && this.initCanvas()
  }

  render() {
    return (
      this.props.show &&
      <div className='pc-login'>
        <canvas className='pc-login-canvas' ref='canvas' />
        <div className='pc-login-form-wrapper'>
          <form>
            <input type="text" placeholder="请输入手机号"/>
            <input type="password" placeholder="请输入密码"/>
            <button>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login