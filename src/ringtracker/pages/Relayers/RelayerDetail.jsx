import React, {Component} from 'react';
import FillTable from '../Fills/FillTable';
import {getTrades, getTrend} from "../../../common/utils/relay";
import settings from 'modules/storage/settings'
import routeActions from 'common/utils/routeActions'
import intl from "react-intl-universal";
import LineChart from 'ringtracker/components/Charts/LineChart'
import {Pagination} from "antd";

export default class RelayerDetail extends Component {

  state = {
    loadingFills: false,
    loadingTrend: false,
    filter:{
      duration:'24h',
    },
    trades:[],
    fills: [],
    page:{
      total:0,
      size:10,
      current:1
    },
  };

  componentWillMount() {
    this.loadTrades(this.state.page.current)
    this.loadTrend(this.state.filter.duration)
  }

  loadTrades(pageIndex) {
    this.setState({loadingFills:true})
    const currency = settings.getCurrency();
    const relay = this.props.match.params.relay;
    getTrades({pageIndex, pageSize:this.state.page.size, currency, type: 'relay', keyword: relay}).then(res => {
      if (res.result) {
        this.setState({
          loadingFills: false,
          fills:res.result.data,
          page:{ //pageIndex, pageSize, total
            total: Math.ceil(res.result.total / res.result.pageSize),
            size:10,
            current:res.result.pageIndex
          },
        })
      } else {
        this.setState({loadingFills: false})
      }
    })
  }

  loadTrend(duration) {
    this.setState({loadingTrend:true})
    const currency = settings.getCurrency()
    const relay = this.props.match.params.relay;
    getTrend({currency, duration, type:'relay', keyword:relay}).then(resp => {
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
    const {fills, loadingFills, loadingTrend} = this.state;
    const relay = this.props.match.params.relay;
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
            <div className="ml10 mr10 fs18 color-black font-weight-bold text-nowrap">{relay} {intl.get('common.trade')} {intl.get('common.overview')}</div>
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
            <LineChart trends={this.state.trends} loading={loadingTrend}/>
          </div>
        </div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{relay} {intl.get('common.trades')}</div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items: fills, loading: loadingFills}}/>
            <Pagination className="fs14 s-small mt30 text-right mr50" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
              this.loadTrades(page)
            }} />
          </div>
        </div>
      </div>
    );
  }
}
