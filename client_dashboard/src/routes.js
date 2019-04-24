import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'

import App from './pages/App'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Message from './pages/Message'

export default (store, persistor, history) => {
  const routes = () => {
    return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/signup' component={RegisterPage} />
              {/*<Route exact path='/message' component={Message} />*/}
              {/*<Route component={App}>*/}
                <Route path='/dashboard' component={Message}/>
              {/*</Route>*/}
            </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  }

  return routes
}