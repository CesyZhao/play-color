
import {UPDATE_PLAYING_SONG, UPDATE_PLAYING_LIST, UPDATE_PLAYING_MODE} from '../action/actions'
const initState = {
  song: {},
  list: {},
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