import React from 'react';
import { Route, Switch,Redirect} from 'dva/router';
import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import Home from './pages/Home';
import Tokens from './pages/Tokens';
import Fills from './pages/Fills';
import Relayers from './pages/Relayers';
import NotFound from './pages/NotFound';
import './start.js';

export default class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {match,location} = this.props;
    // const {url} = match;
    const url = ""
    return (
      <HeaderFooterLayout>
        <Switch>
          <Route path={`/`} exact component={Home} />
          <Route path={`/home`} exact component={Home} />
          <Route path={`/trades`}  exact component={Fills.FillList} />
          <Route path={`/trades/:ringIndex/:fillIndex`} exact component={Fills.FillDetail} />
          <Route path={`/tokens`}  exact component={Tokens.TokenList} />
          <Route path={`/tokens/:token`} exact component={Tokens.TokenDetail} />
          <Route path={`/relayers`}  exact component={Relayers.RelayerList} />
          <Route path={`/relayers/detail`} exact component={Relayers.RelayerDetail} />
          <Route path={`*`}  component={NotFound} />
        </Switch>
      </HeaderFooterLayout>
    );
  }
}

