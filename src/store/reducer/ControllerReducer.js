
import {UPDATE_PLAYING_SONG, UPDATE_PLAYING_LIST, UPDATE_PLAYING_MODE} from '../action/actions'
import _ from 'lodash'

const initState = {
  song: {},
  currentPlaingAlbum: {},
  history: {},
  currentPlaingHistory: {},
  mode: 'listCirculation'
}

export default function ControllerReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_PLAYING_SONG:
      return Object.assign({}, state, action)
    case UPDATE_PLAYING_LIST:
      return Object.assign({}, state, action)
    case UPDATE_PLAYING_MODE:
      return Object.assign({}, state, action)
    default: 
      return state
  }
}

function handleNextSongByCommand (command, state) {
  if (command === 'pre') return Object.assign({}, state, {song: _.nth(state.currentPlaingHistory, state.currentPlaingHistory.length - 2)})
  let nextSong
  if (state.mode === 'listCirculation') {
    nextSong = state.currentPlaingAlbum[state.currentPlaingAlbum.indexOf(state.song)]
  }
  return Object.assign({}, state, {song: nextSong})
}