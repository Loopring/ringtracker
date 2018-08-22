/* eslint global-require: 0 */
import React, { Component } from 'react';
import routeActions from 'common/utils/routeActions'
import {overview} from 'common/utils/relay'
import {FormatAmount} from 'modules/formatter/FormatNumber'

const navigation = [
  {
    title: 'Trades',
    color: '#37D1AB',
    count: '12,000',
    path:'/trades',
  },
  {
    title: 'Tokens',
    color: '#ffa001',
    count: '160',
    path:'/tokens',
  },
  {
    title: 'Relays',
    color: '#42C0EA',
    count: '15',
    path:'/relayers',
  },
  {
    title: 'DEXs',
    color: '#5798F2',
    count: '5',
    path:'/dexs',
  },
  {
    title: 'Rings',
    color: '#5798F2',
    count: '8,500',
    path:'/rings',
  },
];

export default class OverviewBoard extends Component {
  static displayName = 'OverviewBoard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {datas:[]};
  }

  componentDidMount() {
    overview().then(resp => {
      const arr = new Array()
      if(resp.result) {
        arr.push({title: 'Trades', count:resp.result.trades, path:'/trades'})
        arr.push({title: 'Tokens', count:resp.result.tokens, path:'/tokens'})
        arr.push({title: 'Relays', count:resp.result.relayers, path:'/relayers'})
        arr.push({title: 'DEXs', count:resp.result.dexs, path:'/dexs'})
        arr.push({title: 'Rings', count:resp.result.rings, path:'/rings'})
        this.setState({datas:arr})
      }
    })
  }

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <div className="ml10 mr10 fs18 color-black font-weight-bold">OverView</div>
        </div>
        <div className="ui horizontal segments bg-white row">
          {this.state.datas.map((item, index) => {
            return (
              <div key={index} className="ui segment col-auto p15">
                  <div className="text-center" style={{}}>
                    <div className="fs30 font-weight-bold color-black text-nowrap" style={{}}>{FormatAmount({value:item.count, precision:0})}</div>
                    <div className="fs16 color-black-1 text-nowrap" style={{}}>{item.title}</div>
                    <div className="">
                      <a className="mt5 fs12" onClick={routeActions.gotoPath.bind(this,item.path)}>View All</a>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

