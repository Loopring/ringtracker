import React from 'react'
import {Badge, Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import Currency from 'LoopringUI/components/Currency'
import {toFixed} from 'LoopringJS/common/formatter'
import {getFormatNum} from 'modules/formatter/common'

export default class TokenTable extends React.Component {

  render() {
    const {data = {items: [], loading: false}} = this.props
    const {items, loading} = data;
    return (
      <div className="">
        <Spin spinning={loading}>
          <div>
            <table className="table table-responsive fs14">
              <thead className="">
              <tr className="">
                <th className="">{intl.get("dex.name")}</th>
                <th className="">{intl.get("dex.website")}</th>
                <th className="">{intl.get("dex.trades")}</th>
                <th className="">{intl.get("dex.volume")}</th>
                <th className="">{intl.get("dex.options")}</th>
              </tr>
              </thead>
              <tbody className="">
              {
                items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a onClick={routeActions.gotoPath.bind(this, `/relays/${item.relay}`)}>{item.relay}</a>
                      </td>
                      <td>
                        {
                          item.webSite &&
                          <a href={item.webSite} target="_blank">{item.webSite}</a>
                        }
                      </td>
                      <td>
                        {item.trade}
                      </td>
                      <td>
                        <div><Currency/> {getFormatNum(toFixed(item.volume,8))}</div>
                      </td>
                      <td>
                        <a onClick={routeActions.gotoPath.bind(this, `/relays/${item.relay}`)}>{intl.get('options.view_detail')}</a>
                      </td>
                    </tr>
                  )
                })
              }
              {
                items && items.length === 0 &&
                <tr>
                  <td colSpan='100'>
                    <div className="text-center">{intl.get('common.list.no_data')}</div>
                  </td>
                </tr>
              }
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
    )
  }


}

