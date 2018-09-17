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
      <div className="container pl15 pr15">
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
              const actions = {
                goToRingDetail:(e)=>{
                  e.stopPropagation()
                  e.preventDefault()
                  routeActions.gotoPath(`/rings/${fill.ringIndex}?delegateAddress=${fill.delegateAddress}`)
                },
                goToTradeDetail:(e)=>{
                  routeActions.gotoPath(`/trades/${fill.ringIndex}/${fill.fillIndex}?d=${fill.delegateAddress}`)
                },
                goToEtherscan:(url, e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  window.open(url)
                },
                goToRelay:(relayName, e)=>{
                  e.stopPropagation()
                  e.preventDefault()
                  if(relayName) {
                    routeActions.gotoPath(`/relays/${relayName}`)
                  }
                }
              }
              const tokens = fill.market.split('-')
              return (
                <div key={index} className="ui segment pl20 pr20">
                  <MetaItem label={intl.get('trade.transaction_hash')} value={<a href={`https://etherscan.io/tx/${fill.txHash}`} target='_blank'>{fill.txHash}</a>} />
                  <MetaItem label={intl.get('ring.ringHash')} value={
                    <a className="fs13" onClick={actions.goToRingDetail}>
                      {fillFm.getRingHash()}
                    </a>
                  } />
                  <MetaItem label={intl.get('ring.ringIndex')} value={
                    <a className="fs13" onClick={actions.goToRingDetail}>
                      {fillFm.getRingIndex()}
                    </a>
                  } />
                  <MetaItem label={intl.get('ring.miner')} value={
                    <a className="fs13" onClick={actions.goToEtherscan.bind(this, `https://etherscan.io/address/${fill.Miner}`)}>
                      {fillFm.getMiner()}
                    </a>
                  } />
                  <MetaItem label={intl.get('trade.relay')} value={
                    <a className="fs13" onClick={actions.goToRelay.bind(this, fill.relay)}>
                      {fill.relay || 'Loopring'}
                    </a>
                  } />
                  <MetaItem label={intl.get('trade.order_hash')} value={fill.orderHash} />
                  <MetaItem label={intl.get('common.market')} value={fill.market} />
                  <MetaItem label={intl.get('common.side')} value={fill.side === 'sell' ? intl.get('common.sell') : intl.get('common.buy')} />
                  <MetaItem label={intl.get('common.buy')} value={fillFm.getBuy()} />
                  <MetaItem label={intl.get('common.sell')} value={fillFm.getSell()} />
                  <MetaItem label={intl.get('common.price')} value={`${fillFm.getPrice()} ${tokens[1]}`} />
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
