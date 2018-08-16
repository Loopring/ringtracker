import React from 'react'
import { Badge,Spin} from 'antd'
import ListPagination from 'LoopringUI/components/ListPagination'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'

export default function TokenTable(props) {
  
  const {tokens={items:[],loading:false}}=props // MOCK

  return (
    <div className="">
        <ListPagination list={tokens}/>
        <Spin spinning={tokens.loading}>
          <div>
            <table className="table table-responsive fs14" >
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
                  [1,1,1,1].map((item,index)=>{
                    return (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>Circulr</td>
                        <td>
                          https://circulr.loopring.io
                        </td>
                        <td>
                          1549
                        </td>
                        <td>
                          <div>¥11,308,229.88</div>
                        </td>
                        <td>
                          <a onClick={routeActions.gotoPath.bind(this,'/relayers/detail')}>View Detail</a>
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
        <ListPagination list={tokens}/>
  </div>
  )
}

