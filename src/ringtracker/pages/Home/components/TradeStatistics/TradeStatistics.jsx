import React, { Component } from 'react';
import LineChart from './LineChart';
import Head from './Head';
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
      <div class="ui segments">
        <div class="ui segment d-flex justify-content-between align-items-center">
          <div className="ml10 mr10 fs18 color-black font-weight-bold">Trade Statistics</div>
          <div class="ui buttons basic mr10">
            <button class="ui button">24H</button>
            <button class="ui button">7D</button>
            <button class="ui button">1M</button>
            <button class="ui button">1Y</button>
            <button class="ui button">All</button>
          </div>
        </div>
        <div class="ui segment p20">
          <Head data={MOCK_DATA.threeMonths} />
          <LineChart />
        </div>
      </div>
    );
  }
}

