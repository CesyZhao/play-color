import { SET_USER_PROFILE } from './actions'

export const saveUserProfile = (user) => {
  return {
    type: SET_USER_PROFILE,
    user
  }
}