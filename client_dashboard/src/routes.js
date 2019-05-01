import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'

import App from './pages/App'
import Layout from './components/Layout'
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
              {/*<Route component={App}>*/}
                {/*<Route path='/dashboard' component={Layout}/>*/}
              {/*</Route>*/}
              <Layout/>
            </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  }

  return routes
}