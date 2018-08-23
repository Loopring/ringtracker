import React, { Component } from 'react';
import FillTable from '../Fills/FillTable';
import {getTrades} from 'common/utils/relay'
import LineChart from './TokensOverview/LineChart'
import routeActions from 'common/utils/routeActions'

export default class TokenDetail extends Component {
  static displayName = 'TokenDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {trades:[],loading:false};
  }

  componentDidMount() {
    this.setState({loading:true})
    getTrades({currency:'USD'}).then(resp => {
      if(resp.result) {
        this.setState({trades:resp.result.data,loading:false})
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">WETH Overview</div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={routeActions.goBack.bind(this)}>Go Back</button>
            </div>
          </div>
          <div className="ui segment p20">
            <LineChart />
          </div>
        </div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">WETH Trades</div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items:this.state.trades,loading:this.state.loading}}/>
          </div>
        </div>
      </div>
    );
  }
}
