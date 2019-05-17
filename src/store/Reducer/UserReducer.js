import { SAVE_USER_PROFILE } from '../action/actions'

const initState = {
  userProfile: null
}

export default function UserReducer (state = initState, action) {
  switch (action.type) {
    case SAVE_USER_PROFILE:
      return Object.assign(state, action.user)
    default:
      return state
  }
}