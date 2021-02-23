import { SET_USER_PROFILE, SET_USER_FAVORITES, UPDATE_USER_FAVORITES } from '../action/actions'

const initState = {}

function updateUserFavorites(state, action) {
  const favorites = state.favorites
  favorites.set(action.id, action.like)
  return Object.assign({}, state, { favorites })
}

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return Object.assign({}, state, action.user)
    case SET_USER_FAVORITES:
      return Object.assign({}, state, {favorites: action.favorites })
    case UPDATE_USER_FAVORITES:
      return updateUserFavorites(state, action)
    default:
      return state
  }
}