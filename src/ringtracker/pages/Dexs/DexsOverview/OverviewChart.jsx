import React, { Component } from 'react';
import PieDonutChart from 'ringtracker/components/Charts/PieDonutChart';
import settings from 'modules/storage/settings'
import {getEcosystemTrend} from 'common/utils/relay'
import intl from 'react-intl-universal'
import {Spin} from "antd";

export default class OverviewChart extends Component {
  static displayName = 'OverviewChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filter:{
        duration:'7d',
      },
      datas: {
        'fee':[],
        'trade':[],
        'volume':[],
      },
      loading:false
    };
  }

  componentDidMount() {
    this.loadData(this.state.filter.duration)
  }

  loadData(duration) {
    this.setState({loading:true})
    const currency = settings.getCurrency()
    getEcosystemTrend({duration, type:'dex', currency}).then(resp => {
      if(resp.result) { // [{type:'token',indicator:[{name: "volume", data: Array(0)}]},{type:'relay',indicator:[]},{type:'dex',indicator:[]}]
        const datas = {}
        resp.result[0].indicator.forEach(item=> datas[item.name] = item.data)
        this.setState({datas, loading:false})
      }
    })
  }

  render() {
    const durationChange = (duration) => { //24h/7d/1m/1y
      this.setState({
        filter:{
          ...this.state.filter,
          duration
        }
      })
      this.loadData(duration)
    }
    return (
      <Spin spinning={this.state.loading}>
        <div className="ui segments">
            <div className="ui segment d-flex justify-content-between align-items-center">
              <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('dexs.overview')}</div>
              <div>
                <div className="ui buttons basic mr10">
                  <button className={this.state.filter.duration === '24h' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '24h')}>24H</button>
                  <button className={this.state.filter.duration === '7d' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '7d')}>7D</button>
                  <button className={this.state.filter.duration === '1m' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '1m')}>1M</button>
                  <button className={this.state.filter.duration === '1y' ? 'ui button active' : 'ui button'} onClick={durationChange.bind(this, '1y')}>1Y</button>
                  {false && <button className="ui button" onClick={durationChange.bind(this, 'volume')}>All</button>}
                </div>
              </div>
            </div>
            <div className="ui segment p20">
              <div className="row ml0 mr0">
                <div className="col-md-4">
                  <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('overview.volume')}</div>
                  <PieDonutChart datas={this.state.datas.volume}/>
                </div>
                <div className="col-md-4">
                  <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('overview.trades')}</div>
                  <PieDonutChart datas={this.state.datas.trade}/>
                </div>
                <div className="col-md-4">
                  <div className="text-center fs16 pb5 pt10 font-weight-bold color-black">{intl.get('overview.fees')}</div>
                  <PieDonutChart datas={this.state.datas.fee}/>
                </div>
              </div>
            </div>
        </div>
      </Spin>
    );
  }
}

const styles = {};
