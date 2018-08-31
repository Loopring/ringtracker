import React from 'react'
import config from '../../../common/config'
import {Spin, Card} from 'antd'
import Fills from '../Fills'
import schema from '../../../modules/rings/schema';
import intl from 'react-intl-universal'
import {toBig} from "LoopringJS/common/formatter"
import {getFormatNum} from "../../../modules/formatter/common";
import TokenFormatter from '../../../modules/tokens/TokenFm'



export default class RingDetail extends React.Component {

  state = {
    item: {},
    loading: true
  };

  componentWillMount() {
    const {match} = this.props;
    const {id} = match.params;
    const reg = new RegExp("(^|&)delegateAddress=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    const r = this.props.location.search.substr(1).match(reg);  //匹配目标参数i
    const delegateAddress = r ? decodeURI(r[2]): config.getDelegateAddress();
    window.RELAY.ring.getRingMinedDetail({delegateAddress: delegateAddress, ringIndex: id})
      .then(res => {
        if (res.result) {
          this.setState({item: res.result, loading: false})
        } else {
          this.setState({loading: false})
        }
      })
  }
  render() {
    const {item, loading} = this.state;
    const fills = item.fills && item.fills.filter(fill =>config.getTokenByAddress(fill.tokenS) && config.getTokenByAddress(fill.tokenB)).map(fill => {
      const tokenS = config.getTokenByAddress(fill.tokenS).symbol
      const tokenB = config.getTokenByAddress(fill.tokenB).symbol
      return {...fill,tokenS,tokenB}
    });
    const getSplitFee = (splitFee) => {
      let totalSplitFee = '';
      if (splitFee) {
        for (let key in splitFee) {
          const tf = new TokenFormatter({symbol:key})
          const token = config.getTokenBySymbol(key);
          totalSplitFee = totalSplitFee !== '' ? totalSplitFee + " + " : totalSplitFee;

          totalSplitFee = totalSplitFee + tf.toPricisionFixed(tf.getUnitAmount(toBig(splitFee[key]))).concat(' ' + key)
        }
      }
      return totalSplitFee
    };

    const renders = {
      ringHash:(value,item,index)=><div className="text-truncate d-block" >{value}</div>,
      delegateAddress:(value,item,index)=> <a className="text-truncate d-block" target="_blank" href={`https://etherscan.io/address/${value}`}>{value}</a>,
      miner:(value,item,index)=> <a className="text-truncate d-block" style={{}} target="_blank" href={`https://etherscan.io/address/${value}`}>{value}</a>,
      txHash:(value,item,index)=> <a className="text-truncate d-block" style={{}} target="_blank" href={`https://etherscan.io/tx/${value}`}>{value}</a>,
      blockNumber:(value,item,index)=> <a className="text-truncate d-block" style={{}} target="_blank" href={`https://etherscan.io/block/${value}`}>{value}</a>,
      protocol:(value,item,index)=> <a className="text-truncate d-block" style={{}} target="_blank" href={`https://etherscan.io/address/${value}`}>{value}</a>,
      totalSplitFee:(value,item,index) => getSplitFee(value)
    }

    return (
      <div>
        <Card title={intl.get('ring_detail.ring_detail')}>
          {
            item.ringInfo && schema.map((field,index)=>
              <div className="row pb10" key={index}>
                <div className="col-2 color-grey-700">{field.title()}</div>
                <div className="col color-grey-700 text-left">
                  {renders[field.name] &&  renders[field.name](item.ringInfo[field.name],item.ringInfo)}
                  {!renders[field.name]&&  field.formatter && field.formatter(item.ringInfo[field.name])}
                  {!renders[field.name]&&  !field.formatter  && item.ringInfo[field.name]}
                </div>
              </div>
            )
          }
        </Card>
        <Card title={intl.get('ring_detail.fill_table')}>
          <Fills.FillTable fills = {{items:fills,loading:loading}}/>
        </Card>
      </div>
    )
  }

}
