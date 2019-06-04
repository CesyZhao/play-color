
import {UPDATE_PLAYING_SONG, UPDATE_PLAYING_LIST} from '../action/actions'
const initState = {
  song: {},
  list: {}
}

export default function ControllerReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_PLAYING_SONG:
      return Object.assign({}, state, action)
    case UPDATE_PLAYING_LIST:
      return Object.assign({}, state, action)
    default: 
      return state
  }
}