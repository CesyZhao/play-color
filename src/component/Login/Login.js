import React, {Component} from 'react'
import './Login.less'
import EventBus from '../../events'
import {CSSTransition} from 'react-transition-group'
import http from '../../config/http'
import toaster from '../../util/toast'
import { connect } from 'react-redux'
import { SAVE_USER_PROFILE } from '../../store/Action/actions'

let WAVE_HEIGHT = 40 //波浪变化高度

let SCALE = 0.5 // 绘制速率

let CYCLE = 360 / SCALE

@connect()
class Login extends Component {

  state = {
    show: false,
    login: false,
    username: '',
    password: ''
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  initCanvas = () => {
    let TIME = 0
    const c = this.refs.canvas
    const width = 260
    const height = 200
    const ctx = c.getContext("2d")
    c.width = width
    c.height = height
    window.requestAnimationFrame(() => {
      this.draw(ctx, width, height, TIME)
    })
  }

  draw = (ctx, width, height, TIME) => {

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
      this.draw(ctx, width, height, TIME)
    })
  }

  login = async (e) => {
    e.preventDefault()
    const phone = this.refs.phone.value
    const password = this.refs.password.value
    try {
      this.setState({login: true})
      let res = await http.get('/login/cellphone', {params: {phone, password}} )
      let { profile } = res.data
      const {dispatch} = this.props
      dispatch({
        type: SAVE_USER_PROFILE,
        user: {profile}
      })

    } catch (error) {
      toaster.error('Failed to login')
    }
    this.setState({login: false, show: false})
  }

  componentDidMount() {
    EventBus.on('toggleLogin', async () => {
      await this.setStateAsync({
        show: !this.state.show
      })
      this.state.show && this.initCanvas()
    })
  }

  render() {
    return (
      <CSSTransition in={this.state.show} timeout={600} unmountOnExit classNames="pc-login" >
        <div className='pc-login'>
          <canvas className='pc-login-canvas' ref='canvas' />
          <div className='pc-login-form-wrapper'>
            <form>
              <input type="text" placeholder="请输入手机号" ref="phone" />
              <input type="password" placeholder="请输入密码" ref="password"/>
              <button  onClick={this.login} className={this.state.login ? 'pc-login-button-loading' : ''}>
                {
                  !this.state.login ?
                    'Login'
                    : <div className='pc-login-spin'></div>
                }
              </button>
            </form>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default Login
