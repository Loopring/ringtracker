import React, {Component} from 'react';
import RelayerTable from './RelayerTable';
import RelayersOverview from './RelayersOverview';
import settings from 'modules/storage/settings'
import {getAllRelayers} from "../../../common/utils/relay";
import {Pagination} from "antd";

export default class RelayerList extends Component {

  state = {
    loading: false,
    items: [],
    page:{
      total:0,
      size:10,
      current:1
    },
  };

  componentDidMount() {
    this.loadDatas(1)
  }

  loadDatas(pageIndex) {
    this.setState({loading: true})
    const currency = settings.getCurrency()
    getAllRelayers({currency, pageIndex, pageSize:this.state.page.size}).then(res => {
      if (!res.error) {
        this.setState({
          loading: false,
          items:res.result.data,
          page:{ //pageIndex, pageSize, total
            total: Math.ceil(res.result.total / res.result.pageSize),
            size:10,
            current:res.result.pageIndex
          },
        })
      } else {
        this.setState({loading: false})
      }
    })
  }

  render() {
    const {loading, items} = this.state;
    return (
      <div>
        <RelayersOverview/>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">Relayers</div>
            <div className="ui buttons basic mr10">
              <button className="ui button"></button>
            </div>
          </div>
          <div className="ui segment p20">
            <RelayerTable data={{loading, items}}/>
            <Pagination className="fs14 s-small mt30 text-right mr50" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
              this.loadDatas(page)
            }} />
          </div>
        </div>
      </div>
    );
  }
}
