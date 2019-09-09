import store from '../store/index'
import http from '../config/http'
import { UPDATE_PLAYING_ALBUM, UPDATE_PLAYING_SONG } from '../store/action/actions'
import { formatList } from '../util/audio'

class FM {
  getPersonalFM () {
    http.get('/personal_fm')
    .then(({data}) => {
      let playlist = {
        tracks: formatList(data.data)
      }
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
}

export default new FM()