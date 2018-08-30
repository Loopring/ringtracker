import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import intl from 'react-intl-universal'

export default class LineChart extends Component {
  static displayName = 'LineChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {trends} = this.props
    const newTrends = trends.map(item=> {
      item.date = item.date * 1000
      return item
    })
    const ds = new DataSet();
    const dv = ds.createView().source(newTrends);
    dv.transform({
      type: 'fold',
      fields: ['volume', 'trade', 'fee'], // 展开字段集
      key: 'types', // key字段
      value: 'value', // value字段
    });
    const scale = {
      date: {
        type: 'time'
      },
      value: {
        alias: ''
      },
    }
    return (
      <Chart
        height={350}
        data={dv}
        scale={scale}
        forceFit
        padding={[30, 30, 30, 60]}
      >
        <Axis name="date" />
        <Axis name="value" label={{ formatter: (val) => `${val}` }} />
        <Tooltip crosshairs={{ type: 'y' }} itemTpl={`<li>{name}: {value}</li>`}/>
        <Legend position="top" itemFormatter={(val) => intl.get(`overview.${val}`)}/>
        <Geom
          type="line"
          position="date*value"
          size={2}
          color="types"
        />
      </Chart>
    );
  }
}
