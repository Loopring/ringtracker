import React, { Component } from 'react';
import LineChart from './LineChart';
import Head from './Head';
import intl from 'react-intl-universal'

const MOCK_DATA = {
  threeMonths: {
    visits: '4,677',
    unique_users: '3,621',
    ip: '5,690',
    click: '6,583',
  },
  halfYear: {
    visits: '6,688',
    unique_users: '8,339',
    ip: '7,989',
    click: '9,832',
  },
  nearlyYear: {
    visits: '10,323',
    unique_users: '9,262',
    ip: '12,639',
    click: '26,386',
  },
};
export default class TradeStatistics extends Component {
  static displayName = 'TradeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment d-flex justify-content-between align-items-center">
          <div className="ml10 mr10 fs18 color-black font-weight-bold text-nowrap">{intl.get('common.trade')} {intl.get('common.overview')}</div>
          <div className="d-none d-sm-block">
            <div className="ui buttons basic mr10 ">
              <button className="ui button">24H</button>
              <button className="ui button">7D</button>
              <button className="ui button">1M</button>
              <button className="ui button">1Y</button>
              <button className="ui button">All</button>
            </div>
          </div>
          
        </div>
        <div className="ui segment p20">
          <Head data={MOCK_DATA.threeMonths} />
          <LineChart />
        </div>
      </div>
    );
  }
}

