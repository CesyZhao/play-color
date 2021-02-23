import { UPDATE_HOME_CONTENT } from '../action/actions'

const initState = {

}

export default function homeReducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_HOME_CONTENT:
      return Object.assign({}, state, action.content)
    default:
      return state
  }
}