import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import intl from 'react-intl-universal'
import {Spin} from "antd";
import Currency from 'LoopringUI/components/Currency'

export default class LineChart extends Component {
  static displayName = 'LineChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {trends, loading} = this.props
    const newTrends = trends ? trends.map(item=> {
      item.date = item.date * 1000
      return item
    }) : []
    const ds = new DataSet();
    const dv = ds.createView().source(newTrends);
    // dv.transform({
    //   type: 'fold',
    //   fields: ['volume', 'trade', 'fee'], // 展开字段集
    //   key: 'types', // key字段
    //   value: 'value', // value字段
    // });
    const volume = `${intl.get('overview.volume')}(${Currency()})`
    const trade = intl.get('overview.trade')
    const fee = `${intl.get('overview.fee')}(${Currency()})`
    dv.transform({
      type: 'rename',
      map: {
        volume: volume
      }
    });
    dv.transform({
      type: 'rename',
      map: {
        trade: trade
      }
    });
    dv.transform({
      type: 'rename',
      map: {
        fee: fee
      }
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
      <Spin spinning={loading}>
        {trends &&
        <Chart
          height={350}
          data={dv}
          scale={scale}
          forceFit
          padding={[30, 120, 60, 60]}
        >
          <Axis name="date"/>
          <Axis name={volume}
                label={{
                  offset: 0, // 距离坐标轴距离
                  textStyle: {
                    //textAlign: 'end', // 文本对齐方向，可取值为： start center end
                    fontSize: '12', // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    fill: '#009e73', // 文本的颜色
                    textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
                  },
                  formatter: (val) => `${val}`
                }}
                position={'left'}
                title={{
                  textStyle: {
                    fontSize: 12, // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    textAlign: 'center', // 文本对齐方式
                    fill: '#009e73', // 文本颜色
                  },
                }}
                line={null}
          />
          <Axis name={trade}
                label={{
                  textStyle: {
                    //textAlign: 'end', // 文本对齐方向，可取值为： start center end
                    fontSize: '12', // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    fill: '#ff9f00', // 文本的颜色
                    textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
                  },
                  formatter: (val) => `${val}`
                }}
                position={'right'}
                title={{
                  textStyle: {
                    fontSize: 12, // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    textAlign: 'center', // 文本对齐方式
                    fill: '#ff9f00', // 文本颜色
                  },
                }}
                line={null}
                tickPixelInterval={30}
          />
          <Axis name={fee}
                label={{
                  offset: 80,
                  textStyle: {
                    //textAlign: 'end', // 文本对齐方向，可取值为： start center end
                    fontSize: '12', // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    fill: '#56b4e9', // 文本的颜色
                    textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
                  },
                  formatter: (val) => `${val}`
                }}
                position={'right'}
                title={{
                  offset: 100,
                  textStyle: {
                    fontSize: 12, // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    textAlign: 'center', // 文本对齐方式
                    fill: '#56b4e9', // 文本颜色
                  }
                }}
                line={null}
                tickPixelInterval={30}
          />
          <Tooltip crosshairs={{type: 'y'}} />
          <Legend position="bottom" offsetY={0} />
          <Geom
            type="line"
            position={`date*${volume}`}
            size={2}
            color={'#009e73'}
          />
          <Geom
            type="line"
            position={`date*${trade}`}
            size={2}
            color={'#ff9f00'}
          />
          <Geom
            type="line"
            position={`date*${fee}`}
            size={2}
            color={'#56b4e9'}
          />
        </Chart>
        }
      </Spin>
    );
  }
}

