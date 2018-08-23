import React from 'react'
import config from '../../../common/config'
import {Spin, Card} from 'antd'
import Fills from '../Fills'

export default class RingDetail extends React.Component {

  state = {
    item: {},
    loading: true
  };

  componentWillMount() {
    const {match} = this.props;
    const {id} = match.params;
    window.RELAY.ring.getRingMinedDetail({delegateAddress: config.getDelegateAddress(), ringIndex: id})
      .then(res => {
        if (res.result) {
          this.setState({item: res.result, loading: false})
        } else {
          this.setState({loading: false})
        }
      })

  }


  render() {
    const {item, loading} = this.state;

    return (
      <div>
        <Card title="Ring Information">
          TODO Chart
        </Card>
        <Card title="Trades of Ring">
          <Fills.FillTable fills = {{items:item.fills,loading:loading}}/>
        </Card>
      </div>
    )
  }

}
