import React from 'react'
import {Link} from 'dva/router';
import schema from '../../../modules/rings/schema';
import {Table, Pagination} from 'antd'


export default class RingTable extends React.Component {

  render() {
    const {items, loading, pagination = true, page, pageChange} = this.props;
    const renders = {
      ringIndex: (value, item, index) => <Link className="text-truncate d-block" style={{maxWidth: '150px'}}
                                               to={`/rings/${value}?delegateAddress=${item.delegateAddress}`}>{value}</Link>,
      miner: (value, item, index) => <a className="text-truncate d-block" style={{maxWidth: '150px'}} target="_blank"
                                           href={`https://etherscan.io/address/${value}`}>{value}</a>,
      feeRecipient: (value, item, index) => <a className="text-truncate d-block" style={{maxWidth: '150px'}}
                                               target="_blank"
                                               href={`https://etherscan.io/address/${value}`}>{value}</a>,
      txHash: (value, item, index) => <a className="text-truncate d-block" style={{maxWidth: '150px'}} target="_blank"
                                         href={`https://etherscan.io/tx/${value}`}>{value}</a>,
      blockNumber: (value, item, index) => <a className="text-truncate d-block" style={{maxWidth: '150px'}}
                                              target="_blank" href={`https://etherscan.io/block/${value}`}>{value}</a>,
      protocol: (value, item, index) => <a className="text-truncate d-block" style={{maxWidth: '150px'}} target="_blank"
                                           href={`https://etherscan.io/address/${value}`}>{value}</a>,
    };
    const columns =
      schema.filter(ele => ele.name !== "ringHash" && ele.name !== "blockNumber" && ele.name !== "protocol" && ele.name !== "delegateAddress" && ele.name !== "totalSplitFee")
        .map(field => {
          return {
            title: field.title(),
            dataIndex: field.name,
            render: renders[field.name] || field.formatter,
            className: 'text-nowrap'
          }
        })
    const tableProps = {
      dataSource: items,
      columns: columns,
      pagination: false,
      scroll: {x: 1000},
      bordered: false,
      loading,
      rowKey: record => record.id,
    }

    return (
      <div>
        <Table {...tableProps}/>
        {pagination &&
        <Pagination className="fs14 s-small mt30 text-right mr50" total={page.total} current={page.current}
                    onChange={(page) => pageChange(page)}/>}
      </div>
    )


  }


}
