/* eslint global-require: 0 */
import React, { Component } from 'react';
import routeActions from 'common/utils/routeActions'
import {overview} from 'common/utils/relay'
import {FormatAmount} from 'modules/formatter/FormatNumber'
import Currency from 'LoopringUI/components/Currency'
import intl from 'react-intl-universal'
import {Spin} from "antd";

export default class OverviewBoard extends Component {
  static displayName = 'OverviewBoard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      datas:[
        {title: intl.get('taps.trades'), count:0, path:'/trades', type:'trades'},
        {title: intl.get('taps.tokens'), count:0, path:'/tokens', type:'tokens'},
        {title: intl.get('taps.relays'), count:0, path:'/relays', type:'relays'},
        {title: intl.get('taps.dexs'), count:0, path:'/dexs', type:'dexs'},
        {title: intl.get('taps.rings'), count:0, path:'/rings', type:'rings'},
      ],
      loading:false
    };
  }

  componentDidMount() {
    this.setState({loading:true})
    overview().then(resp => {
      const arr = new Array()
      if(resp.result) {
        const new_datas =this.state.datas.map((item,index)=>{
          switch (item.type) {
            case "trades":
              return {...item,count:resp.result.trades}
              break;
            case "tokens":
              return {...item,count:resp.result.tokens}
              break;
            case "relays":
              return {...item,count:resp.result.relays}
              break;
            case "dexs":
              return {...item,count:resp.result.dexs}
              break;
            case "rings":
              return {...item,count:resp.result.rings}
              break;
          }
        })
        this.setState({datas:new_datas, loading:false})
      }
    })
  }

  render() {
    return (
      <div className="ui segments">
        <Spin spinning={this.state.loading}>
          <div className="ui segment p10">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('common.overview')}</div>
          </div>
          <div className="ui horizontal segments bg-white ">
            {this.state.datas.map((item, index) => {
              return (
                <div key={index} className="ui segment p15">
                  <div className="text-center" style={{}}>
                    <div className="fs30 font-weight-bold color-black text-nowrap" style={{}}>
                      {FormatAmount({value:item.count, precision:0})}
                    </div>
                    <div className="fs16 color-black-1 text-nowrap" style={{}}>{item.title}</div>
                    <div className="">
                      <a className="mt5 fs12" onClick={routeActions.gotoPath.bind(this,item.path)}>{intl.get('common.viewall')}</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    );
  }
}

