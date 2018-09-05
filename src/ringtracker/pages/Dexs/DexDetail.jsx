import React, {Component} from 'react';
import FillTable from '../Fills/FillTable';
import {getTrades, getTrend} from "../../../common/utils/relay";
import settings from 'modules/storage/settings'
import routeActions from 'common/utils/routeActions'
import LineChart from 'ringtracker/components/Charts/LineChart'
import intl from "react-intl-universal";

export default class DexDetail extends Component {

  state = {
    loadingTrend: false,
    header: {
      fees:0,
      trades:0,
      volumes:0
    },
    filter:{
      duration:'24h',
    },
    page:{
      total:0,
      size:10,
      current:1
    },
  };

  componentWillMount() {
    this.loadTrend(this.state.filter.duration)
  }

  loadTrend(duration) {
    this.setState({loadingTrend:true})
    const currency = settings.getCurrency()
    const dex = this.props.match.params.dex;
    getTrend({currency, duration, type:'dex', keyword:dex}).then(resp => {
      if(resp.result) {
        this.setState({
          header: {fees:resp.result.totalFee, trades:resp.result.totalTrade, volumes:resp.result.totalVolume},
          trends: resp.result.trends,
          loadingTrend: false
        })
      } else {
        this.setState({loadingTrend:false})
      }
    })
  }

  render() {
    const durationChange = (duration) => { //24h/7d/1m/1y
      this.setState({
        filter:{duration}
      })
      this.loadTrend(duration)
    }
    const {location} = this.props
    const {loadingTrend} = this.state;
    const dex = this.props.match.params.dex;
    return (
      <div>
        <div className="ui segments">
          {false && <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">LoopringRelay Overview</div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={()=>routeActions.goBack()}>Go Back</button>
            </div>
          </div>}
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold text-nowrap">{dex} {intl.get('common.trade')} {intl.get('common.overview')}</div>
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
            <LineChart trends={this.state.trends} loading={loadingTrend}/>
          </div>
        </div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{dex} {intl.get('common.trades')}</div>
          </div>
          <div className="ui segment p20">
            <FillTable sourceType='dex' source={dex} location={location}/>
          </div>
        </div>
      </div>
    );
  }
}
