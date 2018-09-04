import React from 'react'
import config from '../../../common/config'
import {Card} from 'antd'
import Fills from '../Fills'
import schema from '../../../modules/rings/schema';
import intl from 'react-intl-universal'
import {toBig} from "LoopringJS/common/formatter"
import TokenFormatter from '../../../modules/tokens/TokenFm'
import {MetaItem} from 'LoopringUI/components/DetailPage';
import async from 'async'
import RingTable from './RingTable'

export default class RingDetail extends React.Component {

  state = {
    item: {},
    items: [],
    loading: true
  };


  loadData = (props) => {
    const {match} = props;
    const {id} = match.params;
    const reg = new RegExp("(^|&)delegateAddress=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    const r = props.location.search.substr(1).match(reg);  //匹配目标参数i
    if (r) {
      const delegateAddress = decodeURI(r[2])
      window.RELAY.ring.getRingMinedDetail({delegateAddress: delegateAddress, ringIndex: id})
        .then(res => {
          if (res.result) {
            this.setState({item: res.result, loading: false,items:[]})
          } else {
            this.setState({loading: false,items:[],item:{}})
          }
        })
    } else {
      const items = [];
      async.each(config.getContracts(), (contract, callback) => {
        if (contract.delegateAddress) {
          window.RELAY.ring.getRingMinedDetail({delegateAddress: contract.delegateAddress, ringIndex: id})
            .then(res => {
              if (res.result) {
                items.push(res.result.ringInfo)
              }
              callback();
            })
        }
      }, (err) => {
        if (items.length > 1) {
          this.setState({items, loading: false, item: {}})
        } else if (items.length === 1) {
          this.setState({items: [], loading: false, item: items[0]})
        } else {
          this.setState({items: [], loading: false, item: {}})
        }
      })
    }
  }


  componentWillReceiveProps(newProps) {
    if(this.props !== newProps){
      console.log('receive new props')
      this.loadData(newProps)
    }
  }
  componentWillMount(){
    this.loadData(this.props)
  }

  render() {
    const {item, loading, items} = this.state;
    const fills = items.length > 1 && item.fills && item.fills.filter(fill => config.getTokenByAddress(fill.tokenS) && config.getTokenByAddress(fill.tokenB)).map(fill => {
      const tokenS = config.getTokenByAddress(fill.tokenS).symbol
      const tokenB = config.getTokenByAddress(fill.tokenB).symbol
      return {...fill, tokenS, tokenB}
    });
    const getSplitFee = (splitFee) => {
      let totalSplitFee = '';
      if (splitFee) {
        for (let key in splitFee) {
          const tf = new TokenFormatter({symbol: key})
          totalSplitFee = totalSplitFee !== '' ? totalSplitFee + " + " : totalSplitFee;

          totalSplitFee = totalSplitFee + tf.toPricisionFixed(tf.getUnitAmount(toBig(splitFee[key]))).concat(' ' + key)
        }
      }
      return totalSplitFee
    };

    const renders = {
      ringHash: (value, item, index) => <div className="text-truncate d-block">{value}</div>,
      delegateAddress: (value, item, index) => <a className="text-truncate d-block" target="_blank"
                                                  href={`https://etherscan.io/address/${value}`}>{value}</a>,
      miner: (value, item, index) => <a className="text-truncate d-block" style={{}} target="_blank"
                                        href={`https://etherscan.io/address/${value}`}>{value}</a>,
      txHash: (value, item, index) => <a className="text-truncate d-block" style={{}} target="_blank"
                                         href={`https://etherscan.io/tx/${value}`}>{value}</a>,
      blockNumber: (value, item, index) => <a className="text-truncate d-block" style={{}} target="_blank"
                                              href={`https://etherscan.io/block/${value}`}>{value}</a>,
      protocol: (value, item, index) => <a className="text-truncate d-block" style={{}} target="_blank"
                                           href={`https://etherscan.io/address/${value}`}>{value}</a>,
      totalSplitFee: (value, item, index) => getSplitFee(value)
    };

    const getValue = (field) => {
      if (renders[field.name]) {
        return renders[field.name](item.ringInfo[field.name], item.ringInfo)
      } else if (!renders[field.name] && field.formatter) {
        return field.formatter(item.ringInfo[field.name])
      } else {
        return item.ringInfo[field.name]
      }
    };
    return (
      <div>
        {items.length === 0 && <div>
          <Card title={intl.get('ring_detail.ring_detail')}>
            {
              item.ringInfo && schema.map((field, index) =>
                <MetaItem key={index} label={field.title()} value={getValue(field)}/>
              )
            }
          </Card>
          <Card title={intl.get('ring_detail.fill_table')}>
            <Fills.FillTable fills={{items: fills, loading: loading}}/>
          </Card>
        </div>}
        {
          items.length > 1 && <div>
            <RingTable items={items} loading={loading} pagination={false}/>
          </div>
        }

      </div>
    )
  }

}
