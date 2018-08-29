import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import { DataView } from '@antv/data-set';

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
    const {datas} = this.props
    const chartDatas = datas.map(item=>{
      return {...item, value:item.value * 100}
    })
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
        <Coord type="theta" radius={0.9} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend position="bottom" offsetY={-50} itemGap={3} />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Guide>
          <Html
            position={['50%', '50%']}
            html="<div style=&quot;color:#8c8c8c;font-size:12px;text-align: center;width: 10em;&quot;>行业<br><span style=&quot;color:#262626;font-size:20px&quot;>200</span></div>"
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color="name"
          tooltip={[
            'name*percent',
            (name, percent) => {
              percent = `${percent * 100}%`;
              return {
                name: name,
                value: percent,
              };
            },
          ]}
          style={{ lineWidth: 1, stroke: '#fff' }}
        />
      </Chart>
    );
  }
}
