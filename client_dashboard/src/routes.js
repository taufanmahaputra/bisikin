import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import App from './pages/App'
import Message from './pages/Message'

export default (store, history) => {
  const routes = () => {
    return <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
        <Switch>
          <Route exact path="/" render={() => (<div>Match</div>)} />
          <Route exact path='/wtf' render={() => (<div>h3h3</div>)} />
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