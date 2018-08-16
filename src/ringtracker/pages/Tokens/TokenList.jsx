import React, { Component } from 'react';
import TokenTable from './TokenTable';

export default class TokenList extends Component {
  static displayName = 'TokenList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div class="ui segments">
          <div class="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">Listed Tokens</div>
            <div class="ui buttons basic mr10">
              <button class="ui button">Apply To List</button>
            </div>
          </div>
          <div class="ui segment p20">
            <TokenTable />
          </div>
        </div>
    );
  }
}
