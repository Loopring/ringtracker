import React, { Component } from 'react';
import TokenTable from './TokenTable';
import TokensOverview from './TokensOverview';
import {getAllTokens} from 'common/utils/relay'
import intl from "react-intl-universal";
import {Pagination} from "antd";
import settings from 'modules/storage/settings'

export default class TokenList extends Component {
  static displayName = 'TokenList';

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
    getAllTokens({pageIndex, pageSize:this.state.page.size, currency}).then(resp => {
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
      <div className="container pl15 pr15">
        <TokensOverview />
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black ">{intl.get('taps.tokens')}</div>
          </div>
          <div className="ui segment p20">
            <TokenTable tokens={{items:this.state.datas, loading:this.state.loading}}/>
            <Pagination className="fs14 s-small mt20 text-right mr0" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
              this.loadDatas(page)
            }} />
          </div>
        </div>
      </div>
    );
  }
}
