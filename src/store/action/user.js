import { SET_USER_PROFILE, SET_USER_FAVORITES } from './actions'

export const saveUserProfile = (user) => {
  return {
    type: SET_USER_PROFILE,
    user
  }
}

export const saveUserFavorites = (favorites) => {
  console.log(favorites, '+++++++++++++')
  return {
    type: SET_USER_FAVORITES,
    favorites
  }
}