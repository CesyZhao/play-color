import { SET_USER_PROFILE } from './actions'

function saveUserProfile (user) {
  return {
    type: SET_USER_PROFILE,
    payload: user
  }
}