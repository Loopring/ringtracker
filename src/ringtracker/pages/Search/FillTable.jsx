import React from 'react'
import { Badge,Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import {FillFm} from 'modules/fills/formatters'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'

export default function ListMyFills(props) {
  console.log('ListMyFills render',props.fills)
  
  const {fills={items:[],loading:false}}=props // MOCK

  return (
    <div className="">
        <Spin spinning={fills.loading}>
          <div>
            <table className="table table-responsive fs14" >
              <thead className="border-none">
              <tr className="border-none">
                <th className="border-none">{intl.get('ring.txHash')}</th>
                <th className="border-none">{intl.get('common.market')}</th>
                <th className="border-none">{intl.get('common.side')}</th>
                <th className="border-none">{intl.get('common.buy')}</th>
                <th className="border-none">{intl.get('common.sell')}</th>
                <th className="border-none">{intl.get('common.price')}</th>
                <th className="border-none">{intl.get('title.lrc_fee')}</th>
                <th className="border-none">{intl.get('ring.miner')}</th>
                <th className="border-none">{intl.get('trade.relay')}</th>
                <th className="border-none">{intl.get('ring.title')}</th>
                <th className="border-none">{intl.get('common.time')}</th>
                {
                  false &&
                  <th className="border-none">{intl.get('title.options')}</th>
                }
              </tr>
              </thead>
              <tbody className="">
              {
                fills.items && fills.items.map((item,index)=>{
                  const fillFm = new FillFm(item)
                  const actions = {
                    goToRingDetail:(e)=>{
                      e.stopPropagation()
                      e.preventDefault()
                      routeActions.gotoPath(`/rings/${item.ringIndex}?delegateAddress=${item.delegateAddress}`)
                    },
                    goToTradeDetail:(e)=>{
                      routeActions.gotoPath(`/trades/${item.ringIndex}/${item.fillIndex}?d=${item.delegateAddress}`)
                    },
                    goToEtherscan:(url, e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      window.open(url)
                    },
                    goToRelay:(relayName, e)=>{
                      e.stopPropagation()
                      e.preventDefault()
                      if(relayName) {
                        routeActions.gotoPath(`/relays/${relayName}`)
                      }
                    }
                  }
                  const tokens = item.market.split('-')
                  return (
                    <tr key={index} onClick={actions.goToTradeDetail} className="cursor-pointer">
                      <td className="text-nowrap">
                        <a className="fs13" onClick={actions.goToEtherscan.bind(this, `https://etherscan.io/tx/${item.txHash}`)}>
                          {fillFm.getShortTxHash()}
                        </a>
                      </td>
                      <td className="text-nowrap">{item.market}</td>
                      <td className="text-nowrap">{renders.side(fillFm)}</td>
                      <td className="text-nowrap">{fillFm.getBuy()}</td>
                      <td className="text-nowrap">{fillFm.getSell()}</td>
                      <td className="text-nowrap">{`${fillFm.getPrice()} ${tokens[1]}`}</td>
                      <td className="text-nowrap">{fillFm.getLRCFee()}</td>
                      <td className="text-nowrap">
                        <a className="fs13" onClick={actions.goToEtherscan.bind(this, `https://etherscan.io/address/${item.Miner}`)}>
                          {fillFm.getShortMiner()}
                        </a>
                      </td>
                      <td className="text-nowrap">
                        <a className="fs13" onClick={actions.goToRelay.bind(this, item.relay)}>
                          {item.relay || 'Loopring'}
                        </a>
                      </td>
                      <td className="text-nowrap">
                        <a className="fs13" onClick={actions.goToRingDetail}>
                          {fillFm.getRingIndex()}
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
                fills.items && fills.items.length === 0 &&
                <tr><td colSpan='100'><div className="text-center">{intl.get('common.list.no_data')}</div></td></tr>
              }
              </tbody>
            </table>
          </div>
        </Spin>
      {false && <ListPagination list={fills}/>}
  </div>
  )
}
  const renders = {
    ringIndex: (fm,actions) => {
      return (
          <a className="text-truncate text-left color-blue-500" onClick={actions && actions.goToRingDetail}>
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

