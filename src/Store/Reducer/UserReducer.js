import { GET_USER_INFO } from '../Action/actions'

const initState = {
  userInfo: null
}

export default function UserReducer (state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return state
    default:
      return state
  }
}