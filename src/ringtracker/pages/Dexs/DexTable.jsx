import React from 'react'
import { Badge,Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import {getFormatNum} from 'modules/formatter/common'
import Currency from 'LoopringUI/components/Currency'
import {toBig,toFixed} from 'LoopringJS/common/formatter'

export default function TokenTable(props) {
  
  const {dexs={items:[],loading:false}}=props // MOCK
  return (
    <div className="">
        <Spin spinning={dexs.loading}>
          <div>
            <table className="table table-responsive fs14" >
              <thead className="">
                  <tr className="">
                    {false && <th className="">#</th>}
                      <th className="">{intl.get("dex.name")}</th>
                      <th className="">{intl.get("dex.website")}</th>
                      <th className="">{intl.get("dex.trades")}</th>
                      <th className="">{intl.get("dex.volume")}</th>
                      <th className="">{intl.get("dex.options")}</th>
                  </tr>
              </thead>
              <tbody className="">
                {
                  dexs.items.map((item,index)=>{
                    return (
                      <tr key={index}>
                        {false && <td>{index+1}</td>}
                        <td>
                          <a onClick={routeActions.gotoPath.bind(this,`/dexs/${item.dex}`)}>{item.dex}</a>
                        </td>
                        <td>
                          {item.website}
                        </td>
                        <td>
                          {getFormatNum(item.trade)}
                        </td>
                        <td>
                          <div><Currency/>{getFormatNum(toFixed(item.volume, 2))}</div>
                        </td>
                        <td>
                          <a onClick={routeActions.gotoPath.bind(this,`/dexs/${item.dex}`)}>View Detail</a>
                        </td>
                     </tr>
                    )
                  })
                }
                {
                  dexs && dexs.items && dexs.items.length === 0 &&
                  <tr><td colSpan='100'><div className="text-center">{intl.get('common.list.no_data')}</div></td></tr>
                }
              </tbody>
            </table>
          </div>
        </Spin>
  </div>
  )
}

