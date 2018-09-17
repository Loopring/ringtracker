import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import intl from 'react-intl-universal'
import {Spin} from "antd";
import Currency from 'LoopringUI/components/Currency'
import {getFormatNum} from 'modules/formatter/common'
import {simpleShortInteger} from 'modules/formatter/FormatNumber'
import {toNumber, toFixed} from "LoopringJS/common/formatter";

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
    }).transform({
      type: 'rename',
      map: {
        trade: trade
      }
    }).transform({
      type: 'rename',
      map: {
        fee: fee
      }
    }).transform({
      type: 'map',
      callback(row) {
        row[volume] = toNumber(toFixed(row[volume], 2))
        row[fee] = toNumber(toFixed(row[fee], 2))
        return row;
      }
    });
    const scale = {
      date: {
        type: 'time'
      },
      [volume]: {
        type: 'linear',
        tickCount:6
      },
      [trade]: {
        type: 'linear',
        tickCount:6
      },
      [fee]: {
        type: 'linear',
        tickCount:6
      },
    }
    const formatNum = (number) => {
      return getFormatNum(number)
    }
    const shortNum = (number) => {

    }
    return (
      <Spin spinning={loading}>
        {trends &&
        <Chart
          height={350}
          data={dv}
          scale={scale}
          forceFit
          padding={[30, 140, 60, 60]}
        >
          <Axis
            name={volume}
            label={{
              offset: 0, // 距离坐标轴距离
              textStyle: {
                //textAlign: 'end', // 文本对齐方向，可取值为： start center end
                fontSize: '12', // 文本大小
                fontWeight: 'bold', // 文本粗细
                fill: '#009e73', // 文本的颜色
                textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
              },
              formatter: (val) => `${Currency()}${simpleShortInteger(val, 0)}`
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
            tickLine={{
              type: 'timeCat', // 声明该数据的类型
            }}
          />
          <Axis
            name={trade}
            label={{
              textStyle: {
                //textAlign: 'end', // 文本对齐方向，可取值为： start center end
                fontSize: '12', // 文本大小
                fontWeight: 'bold', // 文本粗细
                fill: '#ff9f00', // 文本的颜色
                textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
              },
              formatter: (val) => `${simpleShortInteger(val, 0)}`
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
            tickLine={{
              type: 'timeCat', // 声明该数据的类型
            }}
          />
          <Axis
            name={fee}
            label={{
              offset: 80,
              textStyle: {
                //textAlign: 'end', // 文本对齐方向，可取值为： start center end
                fontSize: '12', // 文本大小
                fontWeight: 'bold', // 文本粗细
                fill: '#56b4e9', // 文本的颜色
                textBaseline: 'bottom' // 文本基准线，可取 top middle bottom，默认为middle
              },
              formatter: (val) => `${Currency()}${simpleShortInteger(val, 0)}`
            }}
            position={'right'}
            title={{
              offset: 130,
              textStyle: {
                fontSize: 12, // 文本大小
                fontWeight: 'bold', // 文本粗细
                textAlign: 'center', // 文本对齐方式
                fill: '#56b4e9', // 文本颜色
              }
            }}
            line={null}
            tickLine={{
              type: 'timeCat', // 声明该数据的类型
            }}
          />
          <Tooltip
            crosshairs={{type: 'line'}}
            itemTpl={'<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}:{value}</li>'}
          />
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

