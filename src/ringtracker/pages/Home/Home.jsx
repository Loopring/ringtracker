import React, { Component } from 'react';
import TradeStatistics from './components/TradeStatistics';
import EcoStatistics from './components/EcoStatistics';
import Overview from './components/Overview';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="">
        <Overview />
        <TradeStatistics />
        <EcoStatistics />
      </div>
    );
  }
}
