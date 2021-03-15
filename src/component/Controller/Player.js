import { Howl, Howler } from 'howler'
import store from '../../store'
import toaster from '../../util/toast'
import {nextSong, prevSong, updatePlayingStatus} from '../../store/action/controller'
const BYTE_ARRAY_LENGTH = 4096
export default class Player {
  static instance = null
  static analyser = null
  static dataArray = null
  static playSong(url) {
    Howler.unload()
    Player.instance = new Howl({
      src: [url],
      format: ['mp3'],
      onplayerror: Player.handlePlayError,
      onend: Player.next,
      onload: Player.play
    })
  }
  static play() {
    Player.instance.play()
    Player.createAnalyser()
    store.dispatch(updatePlayingStatus())
  }
  static pause() {
    Player.instance.pause()
    store.dispatch(updatePlayingStatus())
  }
  static next() {
    store.dispatch(nextSong())
  }
  static prev() {
    store.dispatch(prevSong())
  }
  static handlePlayError() {
    toaster.error('Bad audio!', () => {
      Player.play()
      this.next()
    })
  }
  static getCurrentTime() {
    return Player.instance.seek()
  }
  static createAnalyser() {
    const ctx = Howler.ctx
    let analyser = ctx.createAnalyser()
    Howler.masterGain.connect(analyser)
    analyser.connect(Howler.ctx.destination)
    analyser.fftSize = BYTE_ARRAY_LENGTH
    analyser.minDecibels = -90
    analyser.maxDecibels = -10
    analyser.smoothingTimeConstant = 0.85
    const bufferLength = analyser.frequencyBinCount
    Player.analyser = analyser
    Player.dataArray = new Uint8Array(bufferLength)
  }
  static getAudioData() {
    Player.analyser.getByteFrequencyData(Player.dataArray)
    return Player.dataArray
  }
}
