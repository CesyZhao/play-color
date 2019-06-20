import React, {Component} from 'react'
import './PlayingPanel.less'
import eventBus from '../../events'
import _ from 'lodash'

class PlayingPanel extends Component{

  state = {
    showPlayingPanel: false,
    currentSongId: null,
    source: null,
    analyser: null
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
      }), () => {
        this.state.showPlayingPanel ? this.initVisualizor() : this.destoryVisualizor()
      })
    })
  }

  // componentDidUpdate () {
  //   this.state.showPlayingPanel && this.initVisualizor()
  // }

  destoryVisualizor = () => {
    // this.state.source.disconnect()
    // this.state.analyser.disconnect()
  }

   initVisualizor = async() => {
    let wrap = document.getElementById("wrap")
    let cxt = wrap.getContext("2d")
     //获取API
    let AudioContext = window.AudioContext || window.webkitAudioContext
    let context = new AudioContext()
    if (!this.state.source) {
      //加载媒体
      // let audio = new Audio('http://music.163.com/song/media/outer/url?id=1367452194.mp3')
      let audio = document.getElementById('audio')
      //创建节点
      // let source = context.createMediaElementSource(audio)
      // let analyser = context.createAnalyser()
      await this.setStateAsync({
        source: context.createMediaElementSource(audio),
        analyser: context.createAnalyser()
      })
        //连接：source → analyser → destination
      this.state.source.connect(this.state.analyser)
      this.state.analyser.connect(context.destination)
    }
    // audio.play()
    //创建数据
    let output = new Uint8Array(200) 
    let du = 2//角度
    let potInt = { x: 256, y: 256 }//起始坐标
    let R = 150//半径
    let W = 2//宽
    // console.log(analyser.getByteFrequencyData(output))
    cxt.strokeStyle = '#7BA3FF'
    cxt.shadowBlur = 30
    cxt.shadowColor = '#9B30FF'
    const self = this
    function drawSpectrum() {
        // console.log(analyser.getByteFrequencyData(output))
        self.state.analyser.getByteFrequencyData(output)//获取频域数据
        cxt.clearRect(0, 0, wrap.width, wrap.height)
        //画线条
        let Rv1, Rv2
        for (let i = 0; i < 200; i++) {
            // if (i % 2 === 0) continue
            let value = output[i] / 10//<===获取数据 
            cxt.beginPath()
            cxt.lineWidth = W
            // Rv1 = (R - 1)
            // cxt.moveTo(( Math.sin((i * du) / 180 * Math.PI) * R + potInt.y), -Math.cos((i * du) / 180 * Math.PI) * R + potInt.x)
            // cxt.lineTo(( Math.sin((i * du) / 180 * Math.PI) * Rv1 + potInt.y), -Math.cos((i * du) / 180 * Math.PI) * Rv1 + potInt.x)

            Rv2 = R + value * 1.3
            cxt.moveTo(( Math.sin((i * du) / 180 * Math.PI) * R + potInt.y),-Math.cos((i * du) / 180 * Math.PI) * R + potInt.x)
            cxt.lineTo( ( Math.sin((i * du) / 180 * Math.PI) * Rv2 + potInt.y),-Math.cos((i * du) / 180 * Math.PI) * Rv2 + potInt.x)
            cxt.stroke()
        } 
        //请求下一帧
        requestAnimationFrame(drawSpectrum)
    }

    drawSpectrum()
  }

  render() {
    return (
      this.state.showPlayingPanel &&
      <div className="pc-current-song-wrapper">
        <canvas id="wrap" width="512" height="512"></canvas>
      </div>
    )
  }
}

export default PlayingPanel