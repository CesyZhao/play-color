
import {UPDATE_PLAYING_SONG} from '../action/actions'
const initState = {
  song: {},
  list: {}
}

export default function ControllerReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_PLAYING_SONG:
      return Object.assign({}, state, action)
    default: 
      return state
  }
}