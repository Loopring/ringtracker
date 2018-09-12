import React, { Component } from 'react';
import intl from 'react-intl-universal'
import Currency from 'LoopringUI/components/Currency'
import {FormatAmount} from 'modules/formatter/FormatNumber'
import {getFormatNum} from 'modules/formatter/common'
import settings from 'modules/storage/settings'
import {toBig, toFixed} from 'LoopringJS/common/formatter'

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
    const currency = settings.getCurrency()
    const precision = (currency === 'ETH' || currency === 'BTC') ? 4 : 2

    return (
      <div className="row pt15 pb15">
        <div className="col">
          <div className="text-center">
            <div className="fs18 color-black-1"><Currency/>{data.volumes ? getFormatNum(toFixed(toBig(data.volumes), precision)) : 0}</div>
            <div className="fs16 color-black-2">{intl.get('overview.volume')}</div>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="fs18 color-black-1">{data.trades ? getFormatNum(toFixed(toBig(data.trades), 0)) : 0}</div>
            <div className="fs16 color-black-2">{intl.get('overview.trades')}</div>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="fs18 color-black-1"><Currency/>{data.fees ? getFormatNum(toFixed(toBig(data.fees), precision)) : 0}</div>
            <div className="fs16 color-black-2">{intl.get('overview.fees')}</div>
          </div>
        </div>
      </div>
    );
  }
}

