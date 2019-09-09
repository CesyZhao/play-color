import store from '../store/index'
import http from '../config/http'
import { UPDATE_PLAYING_ALBUM, UPDATE_PLAYING_SONG } from '../store/action/actions'
import { formatList } from '../util/audio'

class FM {
  constructor () {
    this.currentAlbum = {}
    this.currentSong = {}
  }

  getPersonalFM () {
    http.get('/personal_fm')
    .then(({data}) => {
      let playlist = {
        tracks: formatList(data.data),
        id: 'personalFM',
        name: '私人 FM'
      }
      this.currentAlbum = playlist
      this.currentSong = playlist.tracks[0]
      store.dispatch({
        type: UPDATE_PLAYING_SONG,
        song: { ...playlist.tracks[0], fromId: 'personalFM', from: '私人 FM' }
      })
      store.dispatch({
        type: UPDATE_PLAYING_ALBUM,
        playingAlbum: playlist
      })
    })
  }

  getNewAlbumInfo () {
    return { playgingAlbum: this.currentAlbum, song: this.currentSong }
  }
}

export default new FM()