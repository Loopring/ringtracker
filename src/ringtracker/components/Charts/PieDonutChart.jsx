import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import { DataView } from '@antv/data-set';
import Currency from 'LoopringUI/components/Currency'
import {toNumber, toFixed} from "LoopringJS/common/formatter";
import {getFormatNum} from 'modules/formatter/common'
import intl from 'react-intl-universal'

const { Html } = Guide;

export default class PieDonutChart extends Component {
  static displayName = 'PieDonutChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //[{name: "Loopring Relay", rate: 0.9984542761211505, value: 13793.684157923904}]
    const {datas, currencyDisplay = false} = this.props
    // const chartDatas = datas.map(item=>{
    //   return {...item, value:item.value * 100}
    // })
    const chartDatas = datas
    if(chartDatas.length === 0) {
      chartDatas.push({name: intl.get('common.list.no_data'), rate: 0, value: 0})
    }
    const dv = new DataView();
    dv.source(chartDatas).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    return (
      <Chart
        height={250}
        data={dv}
        scale={cols}
        padding={[10, 10, 20, 10]}
        forceFit
      >
        <Axis name="percent" />  
        <Coord type="theta" radius={0.9} innerRadius={0.6} />
        <Legend position="bottom" offsetY={-20} itemGap={3} />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Geom
          type="intervalStack"
          position="percent"
          color="name"
          tooltip={[
            'name*percent*value',
            (name, percent, value) => {
              const p = toFixed(toNumber(toFixed(percent, 2)) * 100, 0)
              percent = `${p}%`;
              value = `${getFormatNum(toFixed(value, 2))}(${percent})`
              if(currencyDisplay) value = `${Currency()}${value}`
              return {
                name: name,
                value: value,
              };
            },
          ]}
          style={{ lineWidth: 1, stroke: '#fff' }}
        />
         <Guide >
         <Html
         visible={false}
         position={['50%', '50%']}
         html={`<div class="fs16 color-black-1 text-center" style="width:10em">${this.props.title}</div>`}
         alignX="middle"
         alignY="middle"
         />
         </Guide>
      </Chart>
    );
  }
}


// html="<div style=&quot;color:#8c8c8c;font-size:12px;text-align: center;width: 10em;&quot;>行业<br><span style=&quot;color:#262626;font-size:20px&quot;>200</span></div>"
