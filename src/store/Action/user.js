import { SAVE_USER_PROFILE } from './actions'

function saveUserProfile (user) {
  return {
    type: SAVE_USER_PROFILE,
    payload: user
  }
}