import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import Routes from './routes'

import { reducer as appReducer } from './reducer/app'
import { reducer as notifReducer } from './reducer/notif'

import authSaga from './sagas/auth'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const reducer = {
  router: connectRouter(history),
  form: formReducer,
  app: appReducer,
  notif: notifReducer
}
const reducers = combineReducers(reducer)

const persistConfig = {
  key: 'root',
  storage
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

sagaMiddleware.run(authSaga)

const App = Routes(store, persistor, history)
ReactDOM.render(<App/>, document.getElementById('root'))