import { SET_USER_PROFILE } from '../action/actions'

const initState = {}

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return Object.assign({}, state, action.user)
    default:
      return state
  }
}