import React, { Component } from 'react';
import { MetaList,MetaItem } from 'LoopringUI/components/DetailPage';
import routeActions from 'common/utils/routeActions'
import {getTradeDetails} from 'common/utils/relay'
import {toNumber} from "LoopringJS/common/formatter";
import commonFm from "modules/formatter/common";
import FillTable from "./FillTable";
import config from 'common/config'
import intl from 'react-intl-universal'
import {FillFm} from 'modules/fills/formatters'

export default class FillDetail extends Component {
  static displayName = 'FillDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      fills:[]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.readFromParam(nextProps.location)
  }

  componentDidMount() {
    this.readFromParam(this.props.location)
  }

  readFromParam(location) {
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
        this.setState({fills:resp.result})
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black ">{intl.get('trade.title')}</div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={routeActions.goBack.bind(this)}>{intl.get('options.goback')}</button>
            </div>
          </div>
          {
            this.state.fills && this.state.fills.length === 1 &&
            this.state.fills.map((fill, index) => {
              const protocolInfo = config.getProtocolInfo({protocolAddress:fill.protocol}) || {}
              const fillFm = new FillFm(fill)
              return (
                <div key={index} className="ui segment pl20 pr20">
                  <MetaItem label={"Type"} value={"P2P"} />
                  <MetaItem label={intl.get('trade.transaction_hash')} value={<a href={`https://etherscan.io/tx/${fill.txHash}`} target='_blank'>{fill.txHash}</a>} />
                  <MetaItem label={"Ring"} value={
                    <a className="fs13" onClick={()=>{}}>
                      0x8b327e5e60a7b387b850734cb3be412832ce81426069d42f5e8318212f316afb
                    </a>
                  } />
                  {
                    false && 
                    <MetaItem label={intl.get('ring.ringIndex')} value={<a href={`#/rings/${fill.ringIndex}?delegateAddress=${fill.delegateAddress}`}>{fill.ringIndex}</a>} />
                  }
                  <MetaItem label={"Miner"} value={
                    <a className="fs13" onClick={()=>{}}>
                     0x8b327e5e60a7b387b850734cb3be412832ce81426069d42f5e8318212f316afb
                    </a>
                  } />
                  <MetaItem label={"Relayer"} value={
                    <a className="fs13" onClick={()=>{}}>
                     Loopring
                    </a>
                  } />
                  <MetaItem label={intl.get('trade.order_hash')} value={fill.orderHash} />
                  <MetaItem label={intl.get('common.market')} value={fill.market} />
                  <MetaItem label={intl.get('common.side')} value={fill.side === 'sell' ? intl.get('common.sell') : intl.get('common.buy')} />
                  <MetaItem label={intl.get('common.amount')} value={fillFm.getAmount()} />
                  <MetaItem label={intl.get('common.price')} value={fillFm.getPrice()} />
                  <MetaItem label={intl.get('common.total')} value={fillFm.getTotal()} />
                  <MetaItem label={intl.get('title.lrc_fee')} value={fillFm.getLRCFee()} />
                  <MetaItem label={intl.get('trade.protocol_version')} value={protocolInfo.version ? `${protocolInfo.version}[${intl.get('protocol.state_'+protocolInfo.state)}]` : intl.get('protocol.unknown')} />
                  <MetaItem label={intl.get('trade.date')} value={fill.createTime && commonFm.getFormatTime(toNumber(fill.createTime) * 1e3,'YYYY-MM-DD HH:mm:ss')} />
                </div>
              )
            })
          }
          {
            this.state.fills && this.state.fills.length > 1 &&
            <FillTable fills={{items:this.state.fills,loading:false}}/>
          }
        </div>
      </div>
    );
  }
}
