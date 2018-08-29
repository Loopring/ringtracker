import React, { Component } from 'react';
import intl from 'react-intl-universal'
import Currency from 'LoopringUI/components/Currency'
import {FormatAmount} from 'modules/formatter/FormatNumber'

export default class Head extends Component {
  static displayName = 'Head';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div className="row">
        <div className="col">
          <div className="text-center">
            <div className="fs24 color-black font-weight-bold"><Currency/><FormatAmount value={data.volumes} precision={2} /></div>
            <div className="fs14 color-black-1">{intl.get('overview.volume')}</div>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="fs24 color-black font-weight-bold"><FormatAmount value={data.trades} precision={0} /></div>
            <div className="fs14 color-black-1">{intl.get('overview.trades')}</div>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="fs24 color-black font-weight-bold"><Currency/><FormatAmount value={data.fees} precision={2} /></div>
            <div className="fs14 color-black-1">{intl.get('overview.fees')}</div>
          </div>
        </div>
      </div>
    );
  }
}

