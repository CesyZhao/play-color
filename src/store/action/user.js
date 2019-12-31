import { SET_USER_PROFILE, SET_USER_FAVORITES, LIKE_SONG, UNLIKE_SONG } from './actions'

export const saveUserProfile = (user) => {
  return {
    type: SET_USER_PROFILE,
    user
  }
}

export const saveUserFavorites = (favorites) => {
  return {
    type: SET_USER_FAVORITES,
    favorites
  }
}

export const likeSong = (id, like) => {
  return {
    type: like ? LIKE_SONG : UNLIKE_SONG,
    id
  }
}