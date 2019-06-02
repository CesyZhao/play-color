
import {UPDATE_PLAYING_SONG} from '../Action/actions'
const initState = {}

export default function ControllerReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_PLAYING_SONG:
      return Object.assign({}, state, action.song)
    default: 
      return state
  }
}