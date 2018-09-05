import React, { Component } from 'react';
import DexTable from './DexTable';
import DexOverview from './DexsOverview';
import intl from 'react-intl-universal'
import {Pagination} from "antd";
import settings from 'modules/storage/settings'
import {getAllDexs} from 'common/utils/relay'

export default class DexList extends Component {
  static displayName = 'DexList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      datas:[],
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
    getAllDexs({pageIndex, pageSize:this.state.page.size, currency}).then(resp => {
      if(resp.result) {
        this.setState({
          datas:resp.result.data,
          page:{ //pageIndex, pageSize, total
            total: resp.result.total,
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
        <DexOverview />
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('dexs.title')}</div>
          </div>
          <div className="ui segment p20">
            <DexTable dexs={{items:this.state.datas, loading:this.state.loading}}/>
            <Pagination className="fs14 s-small mt30 text-right mr50" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
              this.loadDatas(page)
            }} />
          </div>
        </div>
      </div>
    );
  }
}
