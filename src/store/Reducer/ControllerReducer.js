
import {UPDATE_PLAYING} from '../action/actions'
const initState = {}

export default function ControllerReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_PLAYING:
      return Object.assign({}, state, action.song)
    default: 
      return state
  }
}