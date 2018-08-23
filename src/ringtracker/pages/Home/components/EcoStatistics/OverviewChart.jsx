import React, { Component } from 'react';
import PieDonutChart from './PieDonutChart';
import intl from 'react-intl-universal'

export default class OverviewChart extends Component {
  static displayName = 'OverviewChart';

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
          <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('common.ecosystem')} {intl.get('common.overview')}</div>
          <div className="d-none d-sm-block">
            <div className="ui buttons basic mr10">
              <button className="ui button">{intl.get('overview.volume')}</button>
              <button className="ui button">{intl.get('overview.trades')}</button>
              <button className="ui button">{intl.get('overview.fees')}</button>
            </div>
            <div className="ui buttons basic mr10">
              <button className="ui button">24H</button>
              <button className="ui button">7D</button>
              <button className="ui button">1M</button>
              <button className="ui button">1Y</button>
              <button className="ui button">All</button>
            </div>
          </div>
        </div>
        <div className="ui segment p20">
          <div className="row ml0 mr0">
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('taps.tokens')}</div>
              <PieDonutChart />
            </div>
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('taps.relays')}</div>
              <PieDonutChart />
            </div>
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('taps.dexs')}</div>
              <PieDonutChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {};
