import React, { Component } from 'react';
import FillTable from '../Fills/FillTable';
import {getTrades, getTrend} from 'common/utils/relay'
import LineChart from 'ringtracker/components/Charts/LineChart'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import settings from 'modules/storage/settings'
import {Pagination} from "antd-mobile";

export default class TokenDetail extends Component {
  static displayName = 'TokenDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      trades:[],
      page:{
        total:0,
        size:10,
        current:1
      },
      filter:{
        duration:'24h',
      },
      loading:false
    };
  }

  componentDidMount() {
    const {location} = this.props
    const params = location.pathname.split('/')
    const token = params.length === 3 ? params[2] : ''
    this.loadTrades(1)
    this.loadTrend(this.state.filter.duration, token)
  }

  loadTrades(pageIndex) {
    this.setState({loading:true})
    const currency = settings.getCurrency()
    getTrades({currency, pageIndex, pageSize:this.state.page.size}).then(resp => {
      if(resp.result) {
        this.setState({
          trades:resp.result.data,
          page:{ //pageIndex, pageSize, total
            total: Math.ceil(resp.result.total / resp.result.pageSize),
            size:10,
            current:resp.result.pageIndex
          },
          loading:false
        })
      }
    })
  }

  loadTrend(duration, token) {
    const currency = settings.getCurrency()
    getTrend({currency, duration, type:'token', keyword:token}).then(resp => {
      if(resp.result) {
        this.setState({
          header: {fees:resp.result.totalFee, trades:resp.result.totalTrade, volumes:resp.result.totalVolume},
          trends: resp.result.trends
        })
      }
    })
  }

  render() {
    const {location} = this.props
    const params = location.pathname.split('/')
    const token = params.length === 3 ? params[2] : ''
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{token} {intl.get('common.overview')}</div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={routeActions.goBack.bind(this)}>{intl.get('common.goback')}</button>
            </div>
          </div>
          <div className="ui segment p20">
            <LineChart trends={this.state.trends}/>
          </div>
        </div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{token} {intl.get('common.trades')}</div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items:this.state.trades,loading:this.state.loading}}/>
            <Pagination className="fs14 s-small" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
              this.loadDatas(page)
            }} />
          </div>
        </div>
      </div>
    );
  }
}
