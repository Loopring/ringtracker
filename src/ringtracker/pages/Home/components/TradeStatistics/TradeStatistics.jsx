import React, { Component } from 'react';
import LineChart from './LineChart';
import Head from './Head';
import intl from 'react-intl-universal'
import {getTrend} from 'common/utils/relay'
import settings from 'modules/storage/settings'

export default class TradeStatistics extends Component {
  static displayName = 'TradeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filter:{
        duration:'',
      },
      header:{},
      trends: {}
    };
  }

  loadData(duration) {
    const currency = settings.getCurrency()
    getTrend({currency, duration}).then(resp => {
      if(resp.result) {
        this.setState({
          header: {fees:resp.result.totalFee, trades:resp.result.totalTrade, volumes:resp.result.totalVolume},
          trends: resp.result.trends
        })
      }
    })
  }

  componentDidMount() {
    this.loadData('24h')
  }

  render() {
    const ducationChange = (duration) => { //24h/7d/1m/1y
      this.setState({
        filter:{duration}
      })
      this.loadData(duration)
    }
    return (
      <div className="ui segments">
        <div className="ui segment d-flex justify-content-between align-items-center">
          <div className="ml10 mr10 fs18 color-black font-weight-bold text-nowrap">{intl.get('common.trade')} {intl.get('common.overview')}</div>
          <div className="d-none d-sm-block">
            <div className="ui buttons basic mr10 ">
              <button className="ui button" onClick={ducationChange.bind(this, '24h')}>24H</button>
              <button className="ui button" onClick={ducationChange.bind(this, '7d')}>7D</button>
              <button className="ui button" onClick={ducationChange.bind(this, '1m')}>1M</button>
              <button className="ui button" onClick={ducationChange.bind(this, '1y')}>1Y</button>
              {false && <button className="ui button" onClick={ducationChange.bind(this, '')}>All</button>}
            </div>
          </div>
        </div>
        <div className="ui segment p20">
          <Head data={this.state.header} />
          <LineChart />
        </div>
      </div>
    );
  }
}

