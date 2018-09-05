import React from 'react'
import { Badge,Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import {FillFm} from 'modules/fills/formatters'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'

export default function FillTable(props) {


  const {fills={items:[],loading:false}}=props // MOCK

  return (
    <div className="">
      <Spin spinning={fills.loading}>
        <div>
          <table className="table table-responsive fs14" >
            <thead className="border-none">
            <tr className="border-none">
              <th className="border-none">{intl.get('ring.ringIndex')}</th>
              <th className="border-none">{intl.get('common.market')}</th>
              <th className="border-none">{intl.get('common.side')}</th>
              <th className="border-none">{intl.get('common.amount')}</th>
              <th className="border-none">{intl.get('common.price')}</th>
              <th className="border-none">{intl.get('common.total')}</th>
              <th className="border-none">{intl.get('title.lrc_fee')}</th>
              <th className="border-none">{intl.get('title.created')}</th>
              <th className="border-none">{intl.get('title.options')}</th>
            </tr>
            </thead>
            <tbody className="">
            {
              fills && fills.items && fills.items.map((item,index)=>{
                const fillFm = new FillFm(item)
                const actions = {
                  goToRingDetail:()=>routeActions.gotoPath(`/rings/${item.ringIndex}?delegateAddress=${item.delegateAddress}`)
                }
                return (
                  <tr key={index}>
                    <td>{renders.ringIndex(fillFm,actions)}</td>
                    <td>{item.market}</td>
                    <td>{renders.side(fillFm)}</td>
                    <td>{fillFm.getAmount()}</td>
                    <td>{fillFm.getPrice()}</td>
                    <td>{fillFm.getTotal()}</td>
                    <td>{fillFm.getLRCFee()}</td>
                    <td>{fillFm.getCreateTime()}</td>
                    <td><a onClick={routeActions.gotoPath.bind(this,`/trades/${item.ringIndex}/${item.fillIndex}?d=${item.delegateAddress}`)}>{intl.get('options.view_detail')}</a></td>
                  </tr>
                )
              })
            }
            {
              fills && fills.items && fills.items.length === 0 &&
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
      return <div className="text-error">{intl.get('common.sell')}</div>
    }
    if (fm.fill.side === 'buy') {
      return <div className="text-success">{intl.get('common.buy')}</div>
    }
  },
}
