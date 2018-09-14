import React, {Component} from 'react';
import {Badge, Pagination, Spin} from 'antd'
import {FillFm} from 'modules/fills/formatters'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import {getTrades} from "../../../common/utils/relay";
import settings from 'modules/storage/settings'
import {toNumber} from "LoopringJS/common/formatter";

export default class ListMyFills extends Component {
  state = {
    loadingFills: false,
    filter:{
      duration:'24h',
    },
    fills: [],
    page:{
      total:0,
      size:10,
      current:1
    },
  };

  componentDidMount() {
    this.loadTrades(1)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pageIndex) {
      this.loadTrades(toNumber(nextProps.pageIndex))
    } else {
      this.loadTrades(1)
    }
  }

  loadTrades(pageIndex) {
    this.setState({loadingFills:true})
    const {sourceType, source} = this.props
    const currency = settings.getCurrency();
    const params = {pageIndex, pageSize:this.state.page.size, currency}
    if(sourceType && sourceType !== 'trades' && source) {
      params.type = sourceType
      params.keyword = source
    }
    getTrades(params).then(res => {
      if (res.result) {
        this.setState({
          loadingFills: false,
          fills:res.result.data,
          page:{ //pageIndex, pageSize, total
            total: res.result.total,
            size:10,
            current:res.result.pageIndex
          },
        })
      } else {
        this.setState({loadingFills: false})
      }
    })
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
    const {location} = this.props;
    return (
      <div className="">
        <Spin spinning={this.state.loadingFills}>
          <div>
            <table className="table table-responsive fs14" >
              <thead className="border-none">
              <tr className="border-none">
                
                <th className="border-none">{intl.get('common.market')}</th>
                <th className="border-none">{intl.get('common.side')}</th>
                <th className="border-none">{intl.get('common.amount')}</th>
                <th className="border-none">{intl.get('common.price')}</th>
                <th className="border-none">{intl.get('common.total')}</th>
                <th className="border-none">{intl.get('title.lrc_fee')}</th>
                <th className="border-none">{intl.get('title.created')}</th>
                <th className="border-none">{intl.get('ring.ringIndex')}</th>
                <th className="border-none">{intl.get('title.options')}</th>
              </tr>
              </thead>
              <tbody className="">
              {
                this.state.fills && this.state.fills.map((item,index)=>{
                  const fillFm = new FillFm(item)
                  const actions = {
                    goToRingDetail:()=>routeActions.gotoPath(`/rings/${item.ringIndex}?delegateAddress=${item.delegateAddress}`)
                  }
                  return (
                    <tr key={index}>
                      <td>{item.market}</td>
                      <td>{renders.side(fillFm)}</td>
                      <td>{fillFm.getAmount()}</td>
                      <td>{fillFm.getPrice()}</td>
                      <td>{fillFm.getTotal()}</td>
                      <td>{fillFm.getLRCFee()}</td>
                      <td>{fillFm.getCreateTime()}</td>
                      <td>{renders.ringIndex(fillFm,actions)}</td>
                      <td><a onClick={routeActions.gotoPath.bind(this,`/trades/${item.ringIndex}/${item.fillIndex}?d=${item.delegateAddress}`)}>{intl.get('options.view_detail')}</a></td>
                    </tr>
                  )
                })
              }
              {
                this.state.fills && this.state.fills.length === 0 &&
                <tr><td colSpan='100'><div className="text-center">{intl.get('common.list.no_data')}</div></td></tr>
              }
              </tbody>
            </table>
          </div>
        </Spin>
        <Pagination className="fs14 s-small mt30 text-right mr50" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
          if(location.pathname.split('/').length === 2) {
            routeActions.gotoPath(`${location.pathname}?page=${page}`)
          } else {
            this.loadTrades(page)
          }
        }} />
      </div>
    )
  }
}

const renders = {
  ringIndex: (fm,actions) => {
    return (
        <a className="text-truncate text-left" onClick={actions && actions.goToRingDetail}>
          {fm.fill.ringIndex}
          <span hidden>{fm.fill.ringHash}</span>
        </a>
    )
  },
  side: (fm) => {
    if (fm.fill.side === 'sell') {
      return <div className="text-error">{intl.get('common.sell')}</div>
    }
    if (fm.fill.side === 'buy') {
      return <div className="text-success">{intl.get('common.buy')}</div>
    }
  },
}

