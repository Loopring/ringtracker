import React, {Component} from 'react';
import FillTable from '../Fills/FillTable';
import {getTrades} from "../../../common/utils/relay";
import settings from 'modules/storage/settings'
import routeActions from 'common/utils/routeActions'

export default class DexDetail extends Component {

  state = {
    loading: true,
    fills: [],
    pageIndex: 1,
    pageSize: 20
  };

  componentWillMount() {
    const {pageIndex, pageSize} = this.state;
    const currency = settings.getCurrency();
    const dex = this.props.match.params.id;
    getTrades({pageIndex:pageIndex, pageSize, currency, type: 'dex', keyword: dex}).then(res => {
      if (res.error) {
        this.setState({loading: false})
      } else {
        this.setState({loading: false,fills:res.result.data})
      }
    })
  }


  render() {
    const {fills, loading} = this.state;
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">LoopringRelay Overview</div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={()=>routeActions.goBack()}>Go Back</button>
            </div>
          </div>
          <div className="ui segment p20">
            Todo
          </div>
        </div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">LoopringRelay Trades</div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items: fills, loading: loading}}/>
          </div>
        </div>
      </div>
    );
  }
}
