import React, { Component } from 'react';
import FillTable from '../Fills/FillTable';

export default class TokenDetail extends Component {
  static displayName = 'TokenDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div class="ui segments">
          <div class="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">WETH Overview</div>
            <div class="ui buttons basic mr10">
              <button class="ui button">Go Back</button>
            </div>
          </div>
          <div class="ui segment p20">
            Todo
          </div>
        </div>
        <div class="ui segments">
          <div class="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">WETH Trades</div>
          </div>
          <div class="ui segment p20">
            <FillTable />
          </div>
        </div>
      </div>
    );
  }
}
