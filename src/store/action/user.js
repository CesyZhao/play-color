import { SET_USER_PROFILE, SET_USER_FAVORITES, UPDATE_USER_FAVORITES, LOGOUT } from './actions'
import api from '../../config/api'
import toaster from '../../util/toast'

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
    type: UPDATE_USER_FAVORITES,
    id,
    like
  }
}

export const doLogout = () => {
  return async dispatch => {
    try {
      await api.user.logout()
      dispatch({
        type: LOGOUT
      })
    } catch(e) {
      toaster.error('退出登录失败')
    }
  }
}