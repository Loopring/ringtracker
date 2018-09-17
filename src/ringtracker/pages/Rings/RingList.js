import React from 'react'
import RingTable from './RingTable'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'

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
    const reg = new RegExp("(^|&)page=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    const r = this.props.location.search.substr(1).match(reg);  //匹配目标参数i
    let pageIndex= this.state.page.current
    if(r){
      pageIndex = Number(decodeURI(r[2]))
    }
    window.RELAY.ring.getRings({pageIndex, pageSize: this.state.page.size,status:2}).then(res => {
      if (res.result) {
        this.setState({items: res.result.data, loading: false, page:{...this.state.page,total:res.result.total,current:pageIndex}})
      } else {
        this.setState({loading: false,page:{...this.state.page,current:pageIndex}})
      }
    })
  }

  pageChange = (pageIndex) => {
    routeActions.gotoPath(`/rings?page=${pageIndex}`);
    const {page} = this.state;
    this.setState({loading:true});
    window.RELAY.ring.getRings({pageIndex: pageIndex, pageSize: page.size,status:2}).then(res => {
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
      <div className="container pl15 pr15">
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black ">{intl.get('taps.rings')}</div>
          </div>
          <div className="ui segment p20">
            <RingTable items={items} loading={loading} page={page} pageChange={this.pageChange}/>
          </div>
        </div>
      </div>
      
    )
  }
}
