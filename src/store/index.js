import { createStore, combineReducers } from 'redux'
import userReducer from './reducer/UserReducer'

const reducers = {
  user: userReducer
}

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer)

export default store