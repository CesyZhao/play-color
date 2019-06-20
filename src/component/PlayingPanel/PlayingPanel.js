import React, {Component} from 'react'
import './PlayingPanel.less'
import eventBus from '../../events'

class PlayingPanel extends Component{

  state = {
    showPlayingPanel: false,
    currentSongId: null
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  componentDidMount() {
    eventBus.on('togglePlayingPanel', () => {
      this.setState(prevState => ({
        showPlayingPanel: !prevState.showPlayingPanel
      }), this.initVisualization())
    })
  }

  initVisualization = () => {
    let wrap = document.getElementById("wrap")
    console.log(wrap, '----------')
    let cxt = wrap.getContext("2d")
    //获取API
    let AudioContext = window.AudioContext || window.webkitAudioContext
    let context = new AudioContext()
    console.log(context)
    //加载媒体
    let audio = new Audio('http://music.163.com/song/media/outer/url?id=1367452194.mp3')
    //创建节点
    let source = context.createMediaElementSource(audio)
    let analyser = context.createAnalyser()
    //连接：source → analyser → destination
    source.connect(analyser)
    analyser.connect(context.destination)
    audio.play()
    //创建数据
    let output = new Uint8Array(180) 
    let du = 2//角度
    let potInt = { x: 200, y: 200 }//起始坐标
    let R = 150//半径
    let W = 4 //宽
    // console.log(analyser.getByteFrequencyData(output))

    function drawSpectrum() {
        // console.log(analyser.getByteFrequencyData(output))
        analyser.getByteFrequencyData(output)//获取频域数据
        console.log(output)
        cxt.clearRect(0, 0, wrap.width, wrap.height)
        //画线条
        let Rv
        for (let i = 0; i < 180; i++) {
            let value = output[i] / 10//<===获取数据 
            cxt.beginPath()
            cxt.lineWidth = W
            cxt.moveTo(( Math.sin((i * du) / 180 * Math.PI) * R + potInt.y),-Math.cos((i * du) / 180 * Math.PI) * R + potInt.x)//从圆边开始
            Rv = (R + value)
            cxt.lineTo( ( Math.sin((i * du) / 180 * Math.PI) * Rv + potInt.y),-Math.cos((i * du) / 180 * Math.PI) * Rv + potInt.x)
            cxt.strokeStyle = "#9B30FF"
            cxt.shadowBlur = 20
            cxt.shadowColor = '#9B30FF'
            cxt.stroke()
        } 
        cxt.fill()
        //请求下一帧
        requestAnimationFrame(drawSpectrum)
    }

    drawSpectrum()
  }

  render() {
    return (
      <div className="pc-current-song-wrapper">
        <span className="test">11111</span>
        <canvas id="wrap" height="600" width="600"></canvas>
      </div>
    )
  }
}

export default PlayingPanel