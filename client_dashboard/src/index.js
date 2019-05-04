import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { jwtExpired } from './actions/app'

import Routes from './routes'

import { reducer as appReducer } from './reducer/app'
import { reducer as notifReducer } from './reducer/notif'
import { reducer as messageReducer }from './reducer/message'

import appSaga from './sagas'
import authSaga from './sagas/auth'
import messageSaga from './sagas/message'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const reducer = {
  router: connectRouter(history),
  form: formReducer,
  app: appReducer,
  message: messageReducer,
  notif: notifReducer
}
const reducers = combineReducers(reducer)

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router', 'form'],
  stateReconciler: hardSet
}
const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history) // for dispatching history actions
    )
  )
)

const persistor = persistStore(store)

sagaMiddleware.run(appSaga)
sagaMiddleware.run(authSaga)
sagaMiddleware.run(messageSaga)

const App = Routes(store, persistor, history)
ReactDOM.render(<App/>, document.getElementById('root'))

// axios interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  store.dispatch(jwtExpired())
  return Promise.reject(error);
});