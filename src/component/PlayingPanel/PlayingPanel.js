/* eslint-disable no-redeclare */
import React, {Component} from 'react'
import './PlayingPanel.less'
import eventBus from '../../events'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import Lyric from './Lyric/Lyric'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const CANVAS_WIDTH = 690
const CANVAS_HEIGHT = 340
const BYTE_ARRAY_LENGTH = 4096
@connect(({controller, user}) => ({
  controller,
  user
}))
class PlayingPanel extends Component{

  state = {
    showPlayingPanel: false,
    source: null,
    analyser: null,
    animation: null,
    mode: '歌曲模式',
    progress: 0
  }

  componentDidMount() {
    eventBus.on('togglePlayingPanel', () => {
      this.setState(prevState => ({
        showPlayingPanel: !prevState.showPlayingPanel
      }), () => {
        this.state.showPlayingPanel ? this.initVisualizor() : this.destroyVisualizor()
      })
    })
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  destroyVisualizor = () => {
    cancelAnimationFrame(this.state.animation)
  }

  source = null
  analyser = null
  animation = null
  cxt = null
  wrap = null
  output = null
  initAudio = () => {
    if (!this.source) {
      //获取API
      let AudioContext = window.AudioContext || window.webkitAudioContext
      let context = new AudioContext()
      //加载媒体
      // let audio = new Audio('http://music.163.com/song/media/outer/url?id=1367452194.mp3')
      let audio = document.getElementById('audio')
      //创建节点
      this.source = context.createMediaElementSource(audio)
      this.analyser = context.createAnalyser()
      //连接：source → analyser → destination
      this.source.connect(this.analyser)
      this.analyser.connect(context.destination)
      this.analyser.fftSize = BYTE_ARRAY_LENGTH
      this.output = new Uint8Array(BYTE_ARRAY_LENGTH)
    }
  }

  draw = () => {
    requestAnimationFrame(this.draw)
    this.analyser.getByteFrequencyData(this.output)//获取频域数据
    const { cxt, wrap, gradient, output } = this
    const { width, height } = wrap
    cxt.clearRect(0, 0, width, height)

    //左填充
    cxt.beginPath()
    cxt.moveTo(0, height - 200)
    var x = 0
    for (let i = 1; i < 42; i++) {
      console.log(output[i])
      let lineHeight = output[i] / 256 * height / 3
      if (i < 5) {
        cxt.lineTo(x, height - output[i] / 256 * height / 2 - 200)
      } else if (i > 40) {
        cxt.lineTo(x - 13, height - 200)
      } else {
        cxt.lineTo(x, height - lineHeight - 200)
      }
      x += 17.5
    }
    cxt.fillStyle = gradient
    cxt.fill()
    cxt.closePath()




    //左线条
    cxt.beginPath()
    cxt.moveTo(0, height - 200)
    var x = 0
    for (let i = 1; i < 42; i++) {
      let lineHeight = output[i] / 256 * height / 3
      if (i < 5) {
        cxt.lineTo(x, height - output[i] / 256 * height / 2 - 210 - Math.floor(Math.random() * 30))
      } else if (i > 40) {
        cxt.lineTo(x - 13, height - 220)
      } else {
        cxt.lineTo(x, height - lineHeight - 210 - Math.floor(Math.random() * 30))
      }
      x += 17.5
    }
    cxt.strokeStyle = gradient
    cxt.stroke()
    cxt.closePath()

    cxt.clearRect(0, height - 300, 690, 101)

    //右填充
    // cxt.beginPath()
    // cxt.fillStyle = gradientRight
    // cxt.moveTo(width, height - 200)
    // var x = width
    // for (let i = 1; i < 42; i++) {
    //   let lineHeight = output[i] / 256 * height / 3
    //   if (i < 5) {
    //     cxt.lineTo(x, height - output[i] / 256 * height / 2 - 200)
    //   } else if (i > 40) {
    //     cxt.lineTo(x + 12, height - 200)
    //   } else {
    //     cxt.lineTo(x, height - lineHeight - 200)
    //   }
    //   x -= 17.5
    // }
    // cxt.fill()
    // cxt.closePath()

    //右线条
    // cxt.beginPath()
    // cxt.moveTo(width, height - 200)
    // var x = width
    // for (let i = 1; i < 42; i++) {
    //   let lineHeight = output[i] / 256 * height / 3
    //   if (i < 5) {
    //     cxt.lineTo(x, height - output[i] / 256 * height / 2 - 210 - Math.floor(Math.random() * 30))
    //   } else if (i > 40) {
    //     cxt.lineTo(x + 12, height - 200)
    //   } else {
    //     cxt.lineTo(x, height - lineHeight - 210 - Math.floor(Math.random() * 30))
    //   }
    //   x -= 17.5
    // }
    // cxt.strokeStyle = gradientRight
    // cxt.stroke()
    // cxt.closePath()

    // cxt.clearRect(width - 690, height - 300, 690, 100)

  }

   initVisualizor = async () => {
    let wrap = document.getElementById('wrap')
    let cxt = wrap.getContext('2d')
    this.cxt = cxt
    this.wrap = wrap
    const screenHeight = document.body.clientHeight, screenWidth = document.body.clientWidth
    const { width, height }= wrap
    const scaleX = (screenWidth/width).toPrecision(5),
		scaleY = (screenHeight/height).toPrecision(5)
		wrap.style = 'transform-origin:0% 0%; transform:scale('+scaleX+','+scaleY+') translateY(-18%);'
    let gradient = cxt.createLinearGradient(0, 100, 480, 100)
		gradient.addColorStop('0', '#f500d8')
    gradient.addColorStop('1.0', '#ceaf11')
    this.gradient = gradient
    // let gradientRight = cxt.createLinearGradient(886, 100, 1366, 100)
    // gradientRight.addColorStop('0', '#0ee7f7')
    // gradientRight.addColorStop('1.0', '#2ce672')
    this.initAudio()
    this.draw()
  }

  handleModeSwitch = (mode) => {
    this.setState({mode})
  }

  dismiss = () => {
    this.setState({showPlayingPanel: false})
  }

  handleNext = () => {
    eventBus.emit('next')
  }

  getFromUrl = (song) => {
    const map = {
      findMusic: '/'
    }
    let url = map[song.fromId] || `/album/${song.fromId}`
    return url
  }

  likeSong = (song) => {
    eventBus.emit('likeSong', song)
  }

  render() {
    const { song } = this.props.controller
    let { favorites } = this.props.user
    _.isEmpty(favorites) && (favorites = new Map())
    return (
      !_.isEmpty(song) &&
      <CSSTransition in={this.state.showPlayingPanel} timeout={300} unmountOnExit classNames="pc-playing-panel">
        <div className="pc-playing-panel">
          <div className={`pc-current-song-wrapper ${this.state.mode === '歌词模式' && 'lyricMode'}`}>
            <div className="iconfont icon-fanhui icon-dismiss" onClick={this.dismiss}></div>
            <div className="pc-visualizor-wrapper">
              <canvas id="wrap" width={CANVAS_WIDTH * 2} height={CANVAS_HEIGHT * 2} />
              <div className="img-wrapper">
                <div className="img" >
                  <img src={song.album.picUrl.replace('100y100', '200y200')} alt="ablum"/>
                </div>
              </div>
              <div className="pc-playing-panel-toolbar">
                {
                  // this.state.mode === '歌词模式' &&
                  <Lyric songId={song.id}></Lyric>
                }
                <i className={`iconfont ${favorites.get(song.id) ? 'icon-iosheart' : 'icon-iosheartoutline'}`} onClick={() => this.likeSong(song)}></i>
                <i className="iconfont icon-ios-fastforward" onClick={this.handleNext}></i>
                <Link to="/comment" onClick={this.dismiss}><i className="iconfont icon-aui-icon-comment"></i></Link>
              </div>
              <div className="pc-playing-panel-info">
                <Link to={this.getFromUrl(song)} onClick={this.dismiss}> 来源: {song.from} </Link>
              </div>
            </div>
          </div>
          <div className="pc-playing-panel-blur-cover">
            <img src={song.album.picUrl} alt="ablum"></img>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default PlayingPanel