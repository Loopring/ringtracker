import React from 'react'
import {Table} from 'antd'
import {Link} from 'dva/router';
import schema from '../../../modules/rings/schema';
import config from '../../../common/config'
import {Pagination} from 'antd'


export default class RingList extends React.Component {


  state = {
    items: [],
    loading: true,
    page: {
      total: 0,
      size: 10,
      current: 1
    },
  };

  componentWillMount() {
    window.RELAY.ring.getRings({pageIndex: this.state.page.current, pageSize: this.state.page.size}).then(res => {
      if (res.result) {
        this.setState({items: res.result.data, loading: false, page:{...this.state.page,total:res.result.total}})
      } else {
        this.setState({loading: false})
      }
    })
  }


  pageChange = (pageIndex) => {
    const {page} = this.state;
    this.setState({loading:true});
    window.RELAY.ring.getRings({pageIndex: pageIndex, pageSize: page.size}).then(res => {
      if (res.result) {
        this.setState({items: res.result.data, loading: false, page:{...page,total:res.result.total,current:pageIndex}})
      } else {
        this.setState({loading: false})
      }
    })
  };


  render() {
    const {items, loading,page} = this.state

    const renders = {
      ringIndex: (value, item, index) => <Link className="text-truncate d-block" style={{maxWidth: '150px'}}
                                               to={`/rings/${value}?delegateAddress=${item.delegateAddress}`}>{value}</Link>,
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
      schema.filter(ele => ele.name !== "ringHash" && ele.name !== "txHash" && ele.name !== "protocol" && ele.name !== "delegateAddress" && ele.name !== "totalSplitFee")
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
          <Pagination className="fs14 s-small mt30 text-right mr50" total={page.total} current={page.current}
                      onChange={(page) => {
                        this.pageChange(page)
                      }}/>
        </div>
      </div>
    )
  }
}
