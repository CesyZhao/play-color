import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './Reducer/UserReducer'
import controllerReducer from './Reducer/ControllerReducer'

const reducers = {
  user: userReducer,
  controller: controllerReducer
}
const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers(reducers)

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const persistor = persistStore(store)
export default store