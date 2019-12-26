import { SET_USER_PROFILE, SET_USER_FAVORITES } from './actions'

export const saveUserProfile = (user) => {
  return {
    type: SET_USER_PROFILE,
    user
  }
}

export const saveUserFavorites = (idList) => {
  return {
    type: SET_USER_FAVORITES,
    favorites: idList
  }
}