import React, { Component } from 'react';
import FillTable from '../Fills/FillTable';
import {getTrades, getTrend} from 'common/utils/relay'
import LineChart from 'ringtracker/components/Charts/LineChart'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import settings from 'modules/storage/settings'
import config from 'common/config'

export default class TokenDetail extends Component {
  static displayName = 'TokenDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      page:{
        total:0,
        size:10,
        current:1
      },
      header: {
        fees:0,
        trades:0,
        volumes:0
      },
      filter:{
        duration:'24h',
      },
      loadingTrend:false
    };
  }

  componentDidMount() {
    const {location} = this.props
    const params = location.pathname.split('/')
    const token = params.length === 3 ? params[2] : ''
    const tokenConfig = config.getTokenBySymbol(token)
    this.loadTrend(this.state.filter.duration, tokenConfig.address)
  }

  loadTrend(duration, token) {
    this.setState({loadingTrend:true})
    const currency = settings.getCurrency()
    getTrend({currency, duration, type:'token', keyword:token}).then(resp => {
      if(resp.result) {
        this.setState({
          header: {fees:resp.result.totalFee, trades:resp.result.totalTrade, volumes:resp.result.totalVolume},
          trends: resp.result.trends,
          loadingTrend:false
        })
      }
    })
  }

  render() {
    const {location} = this.props
    const params = location.pathname.split('/')
    const token = params.length === 3 ? params[2] : ''
    const tokenConfig = config.getTokenBySymbol(token)
    const durationChange = (duration) => { //24h/7d/1m/1y
      this.setState({
        filter:{duration}
      })
      this.loadTrend(duration, tokenConfig.address)
    }
    return (
      <div className="container pl15 pr15">
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black text-nowrap">{token} {intl.get('common.overview')}</div>
            <div className="d-none d-sm-block">
              <div className="ui buttons basic mr10 ">
                <button className={this.state.filter.duration === '24h' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '24h')}>24H</button>
                <button className={this.state.filter.duration === '7d' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '7d')}>7D</button>
                <button className={this.state.filter.duration === '1m' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '1m')}>1M</button>
                {false && <button className={this.state.filter.duration === '1y' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '1y')}>1Y</button>}
                {false && <button className="ui button" onClick={durationChange.bind(this, '')}>All</button>}
              </div>
            </div>
          </div>
          <div className="ui segment p20">
            <LineChart trends={this.state.trends} loading={this.state.loadingTrend}/>
          </div>
        </div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black ">{token} {intl.get('common.trades')}</div>
          </div>
          <div className="ui segment p20">
            <FillTable sourceType='token' source={tokenConfig.address} location={location}/>
          </div>
        </div>
      </div>
    );
  }
}
