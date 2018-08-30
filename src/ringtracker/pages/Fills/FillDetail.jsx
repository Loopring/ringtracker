import React, { Component } from 'react';
import { MetaList,MetaItem } from 'LoopringUI/components/DetailPage';
import routeActions from 'common/utils/routeActions'
import {getTradeDetails} from 'common/utils/relay'
import {toNumber} from "LoopringJS/common/formatter";
import commonFm from "modules/formatter/common";

export default class FillDetail extends Component {
  static displayName = 'FillDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      fill:{}
    };
  }

  componentDidMount() {
    const {location} = this.props
    const params = location.pathname.split('/')
    let ringIndex = 0, fillIndex = 0, delegateAddress = ''
    if(params.length > 2) {
      ringIndex = toNumber(params[2])
      if(params.length === 4) {
        fillIndex = toNumber(params[3])
      }
    }
    if(location.search) {
      const arr = location.search.substring(1).split('=')
      if(arr.length === 2 && arr[0] === 'd'){
        delegateAddress = arr[1]
      }
    }
    this.loadData(ringIndex, fillIndex, delegateAddress)
  }

  loadData(ringIndex, fillIndex, delegateAddress) {
    getTradeDetails({delegateAddress, ringIndex, fillIndex}).then(resp => {
      if(resp.result) {
        this.setState({fill:resp.result[0]})
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">Trade Detail</div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={routeActions.goBack.bind(this)}>Go Back</button>
            </div>
          </div>
          <div className="ui segment pl20 pr20">
            <MetaItem label="Transaction Hash" value={this.state.fill.txHash} />
            <MetaItem label="Order Hash" value={this.state.fill.orderHash} />
            <MetaItem label="Date" value={this.state.fill.createTime && commonFm.getFormatTime(toNumber(this.state.fill.createTime) * 1e3,'YYYY-MM-DD HH:mm:ss')} />
            <MetaItem label="Relayer" value={this.state.fill.relay} />
            {false && <MetaItem label="Status" value="Success" />}
          </div>
        </div>
      </div>
    );
  }
}
