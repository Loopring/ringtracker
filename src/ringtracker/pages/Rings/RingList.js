import React from 'react'
import RingTable from './RingTable'


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


    return (
      <div className="ui segments">
        <div className="ui segment d-flex justify-content-between align-items-center">
          <div className="ml10 mr10 fs18 color-black font-weight-bold">Rings</div>
        </div>
        <div className="ui segment p20">
          <RingTable items={items} loading={loading} page={page} pageChange={this.pageChange}/>
        </div>
      </div>
    )
  }
}
