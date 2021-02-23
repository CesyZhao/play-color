import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducer/user'
import controllerReducer from './reducer/controller'
import homeReducer from './reducer/home'

const reducers = {
  user: userReducer,
  controller: controllerReducer,
  home: homeReducer
}
const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers(reducers)

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))

export const persistor = persistStore(store)
export default store