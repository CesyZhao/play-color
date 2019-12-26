import { SET_USER_PROFILE, SET_USER_FAVORITES } from '../action/actions'

const initState = {}

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return Object.assign({}, state, action.user)
    case SET_USER_FAVORITES:
      return Object.assign({}, state, {favorites: action.favorites })
    default:
      return state
  }
}