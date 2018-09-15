import React, {Component} from 'react';
import {Badge, Pagination, Spin,Button} from 'antd'
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
    console.log('this.state.fills',this.state.fills)
    return (
      <div className="">
        <Spin spinning={this.state.loadingFills}>
          <div>
            <table className="table table-responsive fs14" >
              <thead className="border-none">
              <tr className="border-none">
                <th className="border-none">{intl.get('ring.txHash')}</th>
                <th className="border-none">Type</th>
                <th className="border-none">{intl.get('common.market')}</th>
                <th className="border-none">{intl.get('common.side')}</th>
                <th className="border-none">{intl.get('common.amount')}</th>
                <th className="border-none">{intl.get('common.price')}</th>
                <th className="border-none">{intl.get('common.total')}</th>
                <th className="border-none">{intl.get('title.lrc_fee')}</th>
                <th className="border-none">Miner</th>
                <th className="border-none">Relayer</th>
                <th className="border-none">Ring</th>
                <th className="border-none">{intl.get('common.time')}</th>
                {
                  false &&
                  <th className="border-none">{intl.get('title.options')}</th>
                }
                
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
                      <td className="text-nowrap">
                        <a className="fs13" onClick={routeActions.gotoPath.bind(this,`/trades/${item.ringIndex}/${item.fillIndex}?d=${item.delegateAddress}`)}>
                          0x327e...3f6afb
                        </a>
                      </td>
                      <td className="text-nowrap">P2P</td>
                      <td className="text-nowrap">{item.market}</td>
                      <td className="text-nowrap">{renders.side(fillFm)}</td>
                      <td className="text-nowrap">{fillFm.getAmount()}</td>
                      <td className="text-nowrap">{fillFm.getPrice()}</td>
                      <td className="text-nowrap">{fillFm.getTotal()}</td>
                      <td className="text-nowrap">{fillFm.getLRCFee()}</td>
                      <td className="text-nowrap">
                        <a className="fs13" onClick={routeActions.gotoPath.bind(this,`/trades/${item.ringIndex}/${item.fillIndex}?d=${item.delegateAddress}`)}>
                          0x327e...3f6afb
                        </a>
                      </td>
                      <td className="text-nowrap">
                        <a className="fs13" onClick={()=>{}}>
                          {fillFm.relay || 'Loopring'}
                        </a>
                      </td>
                      <td className="text-nowrap">
                        <a className="fs13" onClick={routeActions.gotoPath.bind(this,`/trades/${item.ringIndex}/${item.fillIndex}?d=${item.delegateAddress}`)}>
                          0x327e...3f6afb
                        </a>
                      </td>
                      <td className="text-nowrap">{fillFm.getCreateTime()}</td>
                      {
                        false &&
                        <td className="text-nowrap">
                          <a className="fs13 rounded bg-primary-3 text-primary pl10 pr10 pt5 pb5 text-center" onClick={routeActions.gotoPath.bind(this,`/trades/${item.ringIndex}/${item.fillIndex}?d=${item.delegateAddress}`)}>{intl.get('options.view_detail')}</a>
                        </td>
                      }
                      
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
        <Pagination className="fs14 s-small mt20 text-right mr0" total={this.state.page.total} current={this.state.page.current} onChange={(page)=>{
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
      return <div className="color-white bg-error rounded text-center pl10 pr10 pt5 pb5">{intl.get('common.sell')}</div>
    }
    if (fm.fill.side === 'buy') {
      return <div className="color-white bg-success rounded text-center pl10 pr10 pt5 pb5">{intl.get('common.buy')}</div>
    }
  },
}

