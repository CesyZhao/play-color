import http from '../../config/http'

import { UPDATE_PLAYING_SONG } from './actions'

export const updatePlayingSong = (song) => (dispatch) => {
  const res = http.get(`/comment/music?id=${song.id}`)
  console.log(res)
  dispatch( {
    type: UPDATE_PLAYING_SONG,
    song
  } )
}