import React, { Component } from 'react';
import PieDonutChart from './PieDonutChart';
import intl from 'react-intl-universal'
import {getEcosystemTrend} from 'common/utils/relay'
import settings from 'modules/storage/settings'

export default class OverviewChart extends Component {
  static displayName = 'OverviewChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filter:{
        duration:'7d',
        indicator:'volume'
      },
      datas: {
        'token':[],
        'relay':[],
        'dex':[],
      }
    };
  }

  loadData(duration, indicator) {
    const currency = settings.getCurrency()
    getEcosystemTrend({duration, indicator, currency}).then(resp => {
      if(resp.result) { // [{type:'token',indicator:[{name: "volume", data: Array(0)}]},{type:'relay',indicator:[]},{type:'dex',indicator:[]}]
        const datas = {}
        resp.result.forEach(item=> datas[item.type] = item.indicator[0].data)
        this.setState({datas})
      }
    })
  }

  componentDidMount() {
    this.loadData('7d', 'volume')
  }

  render() {
    const durationChange = (duration) => { //24h/7d/1m/1y
      this.setState({
        filter:{
          ...this.state.filter,
          duration
        }
      })
      this.loadData(duration, this.state.filter.indicator)
    }
    const indicatorChange = (indicator) => { //volume/trade/fee
      this.setState({
        filter:{
          ...this.state.filter,
          indicator
        }
      })
      this.loadData(this.state.filter.duration, indicator)
    }
    return (
      <div className="ui segments">
        <div className="ui segment d-flex justify-content-between align-items-center">
          <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('common.ecosystem')} {intl.get('common.overview')}</div>
          <div className="d-none d-sm-block">
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={indicatorChange.bind(this, 'volume')}>{intl.get('overview.volume')}</button>
              <button className="ui button" onClick={indicatorChange.bind(this, 'trade')}>{intl.get('overview.trades')}</button>
              <button className="ui button" onClick={indicatorChange.bind(this, 'fee')}>{intl.get('overview.fees')}</button>
            </div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={durationChange.bind(this, '24h')}>24H</button>
              <button className="ui button" onClick={durationChange.bind(this, '7d')}>7D</button>
              <button className="ui button" onClick={durationChange.bind(this, '1m')}>1M</button>
              <button className="ui button" onClick={durationChange.bind(this, '1y')}>1Y</button>
              {false && <button className="ui button" onClick={durationChange.bind(this, 'volume')}>All</button>}
            </div>
          </div>
        </div>
        <div className="ui segment p20">
          <div className="row ml0 mr0">
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('taps.tokens')}</div>
              <PieDonutChart datas={this.state.datas.token}/>
            </div>
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('taps.relays')}</div>
              <PieDonutChart datas={this.state.datas.relay}/>
            </div>
            <div className="col-md-4">
              <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('taps.dexs')}</div>
              <PieDonutChart datas={this.state.datas.dex}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {};
