import React, { Component } from 'react';
import FillTable from './FillTable';
import {getTrades} from 'common/utils/relay'
import intl from 'react-intl-universal'

export default class FillList extends Component {
  static displayName = 'FillList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('common.recent_trades')}</div>
          </div>
          <div className="ui segment p20">
            <FillTable sourceType='trades'/>
          </div>
        </div>
      </div>
    );
  }
}
