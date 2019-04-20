import React from "react"
import ReactDOM from "react-dom"
import { applyMiddleware, createStore, combineReducers, compose } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"

import Routes from './routes'

const history = createBrowserHistory()
const reducer = {
  router: connectRouter(history),
}

const store = createStore(
  combineReducers(reducer), // root reducer with router state
  // preloadedState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // ... other middlewares ...
    ),
  ),
)

const App = Routes(store, history)
ReactDOM.render(<App/>, document.getElementById('root'))