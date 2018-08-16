/* eslint global-require: 0 */
import React, { Component } from 'react';

const navigation = [
  // {
  //   img: require('./images/TB1wdncx1SSBuNjy0FlXXbBpVXa-200-200.png'),
  //   title: 'Volume',
  //   color: '#f8623b',
  //   count: '30',
  // },
  {
    title: 'Trades',
    color: '#37D1AB',
    count: '120',
  },
  {
    title: 'Tokens',
    color: '#ffa001',
    count: '160',
  },
  {
    title: 'Relayers',
    color: '#42C0EA',
    count: '69',
  },
  {
    title: 'DEXs',
    color: '#5798F2',
    count: '85',
  },
  {
    title: 'Rings',
    color: '#5798F2',
    count: '85',
  },

  // {
  //   img: require('./images/TB1IQ2_xYGYBuNjy0FoXXciBFXa-200-200.png'),
  //   title: '已批改作业',
  //   color: '#B277C9',
  //   count: '93',
  // },
  // {
  //   img: require('./images/TB1o2c3x4GYBuNjy0FnXXX5lpXa-200-200.png'),
  //   title: '已批阅试卷',
  //   color: '#475F93',
  //   count: '185',
  // },
  // {
  //   img: require('./images/TB1wQD_xYGYBuNjy0FoXXciBFXa-200-200.png'),
  //   title: '已评分实训',
  //   color: '#EF83C4',
  //   count: '235',
  // },
];

export default class OverviewBoard extends Component {
  static displayName = 'OverviewBoard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="ui segments">
        <div class="ui segment">
          <div className="ml10 mr10 fs18 color-black font-weight-bold">OverView</div>
        </div>
        <div class="ui horizontal segments bg-white">
          {navigation.map((item, index) => {
            return (
              <div class="ui segment m10">
                  <div className="text-center" style={{}}>
                    <div className="fs30 font-weight-bold color-black" style={{}}>{item.count}</div>
                    <div className="fs16 color-black-1" style={{}}>{item.title}</div>
                    <div className="">
                      <a className="mt5 fs12">View All</a>
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

