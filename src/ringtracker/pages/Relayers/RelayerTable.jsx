import React from 'react'
import {Badge, Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import Currency from 'LoopringUI/components/Currency'
import {toFixed} from 'LoopringJS/common/formatter'



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
                <th className="">#</th>
                <th className="">Name</th>
                <th className="">Website</th>
                <th className="">Trades</th>
                <th className="">Volume</th>
                <th className="">Options</th>
              </tr>
              </thead>
              <tbody className="">
              {
                items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.relay}</td>
                      <td>
                        {item.webSite}
                      </td>
                      <td>
                        {item.trade}
                      </td>
                      <td>
                        <div><Currency/> {toFixed(item.volume,8)}</div>
                      </td>
                      <td>
                        <a onClick={routeActions.gotoPath.bind(this, `/relays/detail/${item.relay}`)}>View Detail</a>
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
        <ListPagination list={items}/>
      </div>
    )
  }


}

