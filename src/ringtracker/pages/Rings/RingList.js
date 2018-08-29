import React from 'react'
import {Table} from 'antd'
import {Link} from 'dva/router';
import schema from '../../../modules/rings/schema';
import config from '../../../common/config'

export default class RingList extends React.Component {


  state = {
    items: [],
    loading: true

  };

  componentWillMount() {
    window.RELAY.ring.getRings({}).then(res => {
      if (res.result) {
        this.setState({items: res.result.data, loading: false})
      } else {
        this.setState({loading: false})
      }
    })
  }

  render() {
    const {items,loading} = this.state

    const renders = {
      ringIndex: (value, item, index) => <Link className="text-truncate d-block" style={{maxWidth: '150px'}}
                                              to={`/rings/${value}`}>{value}</Link>,
      miner: (value, item, index) => <Link className="text-truncate d-block" style={{maxWidth: '150px'}}
                                           to={`/miner/detail/${value}`}>{value}</Link>,
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
      schema.filter(ele=> ele.name !=="ringHash" && ele.name !== "txHash" && ele.name !== "protocol" && ele.name !== "delegateAddress" && ele.name !== "totalSplitFee")
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
        <div className="">
          <Table {...tableProps}/>
        </div>
      </div>
    )
  }
}
