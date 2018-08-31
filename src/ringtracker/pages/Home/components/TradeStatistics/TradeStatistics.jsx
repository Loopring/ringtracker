import React, { Component } from 'react';
import LineChart from 'ringtracker/components/Charts/LineChart';
import Head from './Head';
import intl from 'react-intl-universal'
import {getTrend} from 'common/utils/relay'
import settings from 'modules/storage/settings'
import {Spin} from "antd";

export default class TradeStatistics extends Component {
  static displayName = 'TradeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filter:{
        duration:'24h',
      },
      header:{},
      trends: [],
      loading:false
    };
  }

  loadData(duration) {
    this.setState({loading:true})
    const currency = settings.getCurrency()
    getTrend({currency, duration}).then(resp => {
      if(resp.result) {
        this.setState({
          header: {fees:resp.result.totalFee, trades:resp.result.totalTrade, volumes:resp.result.totalVolume},
          trends: resp.result.trends,
          loading:false
        })
      }
    })
  }

  componentDidMount() {
    this.loadData(this.state.filter.duration)
  }

  render() {
    const durationChange = (duration) => { //24h/7d/1m/1y
      this.setState({
        filter:{duration}
      })
      this.loadData(duration)
    }
    return (
      <div className="ui segments">
        <Spin spinning={this.state.loading}>
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold text-nowrap">{intl.get('common.trade')} {intl.get('common.overview')}</div>
            <div className="d-none d-sm-block">
              <div className="ui buttons basic mr10 ">
                <button className={this.state.filter.duration === '24h' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '24h')}>24H</button>
                <button className={this.state.filter.duration === '7d' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '7d')}>7D</button>
                <button className={this.state.filter.duration === '1m' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '1m')}>1M</button>
                <button className={this.state.filter.duration === '1y' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '1y')}>1Y</button>
                {false && <button className="ui button" onClick={durationChange.bind(this, '')}>All</button>}
              </div>
            </div>
          </div>
          <div className="ui segment p20">
            <Head data={this.state.header} />
            <LineChart trends={this.state.trends}/>
          </div>
        </Spin>
      </div>
    );
  }
}

