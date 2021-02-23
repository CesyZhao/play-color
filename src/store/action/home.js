import { UPDATE_HOME_CONTENT } from './actions'

export const updateHomeContent = (content) => {
  return {
    type: UPDATE_HOME_CONTENT,
    content
  }
}