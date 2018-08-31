import React, { Component } from 'react';
import FillTable from './FillTable';
import {getTrades} from 'common/utils/relay'
import intl from 'react-intl-universal'
import {Pagination} from "antd";
import settings from 'modules/storage/settings'

export default class FillList extends Component {
  static displayName = 'FillList';

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
      loading:false
    };
  }

  componentDidMount() {
    this.loadDatas(1)
  }

  loadDatas(pageIndex) {
    this.setState({loading:true})
    const currency = settings.getCurrency()
    getTrades({
      pageIndex,
      pageSize:this.state.page.size,
      currency
    }).then(resp => {
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

  render() {
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('common.recent_trades')}</div>
            <div className="ui buttons basic mr10">
              <button className="ui button"></button>
            </div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items:this.state.trades,loading:this.state.loading}}/>
            <Pagination className="fs14 s-small mt30 text-right mr50" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
              this.loadDatas(page)
            }} />
          </div>
        </div>
      </div>
    );
  }
}
