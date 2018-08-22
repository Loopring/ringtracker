import React, { Component } from 'react';
import FillTable from './FillTable';
import {getTrades} from 'common/utils/relay'

export default class FillList extends Component {
  static displayName = 'FillList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {trades:[]};
  }

  componentDidMount() {
    getTrades({currency:'USD'}).then(resp => {
      if(resp.result) {
        this.setState({trades:resp.result.data})
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">Recent Trades</div>
            <div className="ui buttons basic mr10">
              <button className="ui button"></button>
            </div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items:this.state.trades,loading:false}}/>
          </div>
        </div>
      </div>
    );
  }
}
