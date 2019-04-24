import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import App from './pages/App'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Message from './pages/Message'

export default (store, history) => {
  const routes = () => {
    return <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={RegisterPage} />
          {/*<Route exact path='/message' component={Message} />*/}
          <Route component={App}>
            <Route path='/message' component={Message}/>
          </Route>
        </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  }

  return routes
}