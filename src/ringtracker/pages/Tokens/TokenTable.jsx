import React, { Component } from 'react';
import { Badge,Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import {getFormatNum} from 'modules/formatter/common'
import Currency from 'LoopringUI/components/Currency'
import {toFixed} from 'LoopringJS/common/formatter'

export default class TokenTable extends Component {

  render() {
    const {tokens={items:[],loading:false}}= this.props // MOCK

    return (
      <div className="">
        <Spin spinning={tokens.loading}>
          <div>
            <table className="table table-responsive fs14" >
              <thead className="">
              <tr className="">
                {false && <th className="">#</th>}
                <th className="">{intl.get('title.token')}</th>
                <th className="">{intl.get('title.last_price')}</th>
                <th className="">{intl.get('title.trades')}</th>
                <th className="">{intl.get('title.volume')}</th>
                <th className="">{intl.get('title.options')}</th>
              </tr>
              </thead>
              <tbody className="">
              {
                tokens.items.map((item,index)=>{
                  return (
                    <tr key={index}>
                      {false && <td>{index+1}</td>}
                      <td>
                        <a onClick={routeActions.gotoPath.bind(this,`/tokens/${item.symbol}`)}>{item.symbol}</a>
                      </td>
                      <td>
                        <Currency/>{getFormatNum(item.lastPrice)}
                      </td>
                      <td>
                        {getFormatNum(item.trade)}
                      </td>
                      <td>
                        <div><Currency/>{getFormatNum(toFixed(item.volume, 2))}</div>
                        <div className="color-black-2 fs12">{getFormatNum(item.volume)} {item.symbol}</div>
                      </td>
                      <td>
                        <a onClick={routeActions.gotoPath.bind(this,`/tokens/${item.symbol}`)}>{intl.get('options.view_detail')}</a>
                      </td>
                    </tr>
                  )
                })
              }
              {
                tokens && tokens.items && tokens.items.length === 0 &&
                <tr><td colSpan='100'><div className="text-center">{intl.get('common.list.no_data')}</div></td></tr>
              }
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
    )
  }
}
