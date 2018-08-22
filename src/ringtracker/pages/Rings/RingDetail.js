import React from 'react'
import config from '../../../common/config'
import {Spin,Card} from 'antd'

export default class RingDetail extends React.Component {

  state = {
    item: null,
    loading: true
  };

  componentWillMount() {
    const {match} = this.props;
    const {id} = match.params;
    window.RELAY.ring.getRingMinedDetail({protocolAddress: config.getProtocolAddress(), ringIndex: id})
      .then(res => {
        if (res.result) {
          this.setState({item: res.result.data, loading: false})
        } else {
          this.setState({loading: false})
        }
      })

  }


  render() {
    const {item, loading} = this.state

    return (
      <Spin spinning={loading}>
        <Card title="Ring Information">
          TODO Chart
        </Card>
        <Card title="Trades of Ring" loading={loading}>
          {
            [].map((field,index)=>
              <div className="row pb10" key={index}>
                <div className="col-1 color-grey-700">{field.title}</div>
                <div className="col color-grey-700 text-left">

                </div>
              </div>
            )
          }
        </Card>

      </Spin>
    )
  }

}
