import { createStore, combineReducers } from 'redux'
import userReducer from './reducer/UserReducer'

const reducers = {
  user: userReducer
}

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store