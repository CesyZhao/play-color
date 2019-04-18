import React, {Component} from 'react'
import './Login.less'

let WAVE_HEIGHT = 40 //波浪变化高度

let SCALE = 0.5 // 绘制速率

let CYCLE = 360 / SCALE

let TIME = 0

class Login extends Component {

  initCanvas = () => {

    const c = this.refs.canvas
    console.log(c.style)
    const width = 240

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

    ctx.strokeStyle = "#ff0000"

    ctx.shadowColor = '#ff0000'

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

    ctx.strokeStyle = "#35c8e6"

    ctx.shadowBlur = 20

    ctx.shadowColor = '#35c8e6'

    ctx.stroke()



    function distance(height, currAngle, diffAngle) {

      return height * Math.cos((((currAngle - diffAngle) % 360) * Math.PI) / 180)

    }



    // animate

    window.requestAnimationFrame(() => {

      this.draw(ctx, width, height)

    })

  }

  componentDidMount() {
    this.initCanvas()
  }

  render() {
    return (
      <div className='pc-login'>
        <canvas className='pc-login-canvas' ref='canvas'></canvas>
        <div className='pc-login-form-wrapper'>
          <form>
            <input type="text"/>
            <input type="password"/>
            <button>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login