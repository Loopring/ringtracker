import React, { Component } from 'react';
import PieDonutChart from './PieDonutChart';

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
          <div className="ml10 mr10 fs18 color-black font-weight-bold">Ecosystem Overview</div>
          <div className="d-none d-sm-block">
            <div className="ui buttons basic mr10">
              <button className="ui button">Volume</button>
              <button className="ui button">Trades</button>
              <button className="ui button">Fees</button>
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
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">Tokens</div>
              <PieDonutChart />
            </div>
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">Relayers</div>
              <PieDonutChart />
            </div>
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">DEXs</div>
              <PieDonutChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {};
