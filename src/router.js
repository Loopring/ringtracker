import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import RingTrackerRoutes from './ringtracker/routes';
import SocketProvider from 'modules/sockets/Provider';
import Locales from './modules/locales/container'

function RouterConfig({ history }) {
  return (
    <SocketProvider>
      <Locales>
        <Router history={history}>
          <div>
            <RingTrackerRoutes />
          </div>
        </Router>
      </Locales>
    </SocketProvider>
  )
}
export default RouterConfig;
