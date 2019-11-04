import store from '../store/index'
import http from '../config/http'
import { formatList } from '../util/audio'
import toaster from '../util/toast'
import { updatePlayingSong, updatePlayingAlbum } from '../store/action/controller'

class FM {
  constructor () {
    this.currentAlbum = {}
    this.currentSong = {}
  }

  async getPersonalFM () {
    try {
      const { data } = await http.get('/personal_fm')
      let playlist = {
        tracks: formatList(data.data),
        id: 'personalFM',
        name: '私人 FM'
      }
      this.currentAlbum = playlist
      this.currentSong = playlist.tracks[0]
    } catch (error) {
      toaster.error('获取私人 FM 失败')
    }
  }

  async initFM () {
    if (store.getState().controller.playingAlbum.id === 'personalFM') return
    await this.getPersonalFM()
    store.dispatch(updatePlayingSong({ ...this.currentAlbum.tracks[0], fromId: 'personalFM', from: '私人 FM' }))
    store.dispatch(updatePlayingAlbum(this.currentAlbum))
  }

  getNewAlbumInfo () {
    return { playingAlbum: this.currentAlbum, song: this.currentSong }
  }
}

export default new FM()