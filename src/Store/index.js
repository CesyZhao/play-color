import { createStore, combineReducers } from 'redux'
import userReducer from './Reducer/UserReducer'

const reducers = {
  user: userReducer
}

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer)