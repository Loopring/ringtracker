import React, { Component } from 'react';
import FillTable from './FillTable';
import {getTrades} from 'common/utils/relay'
import intl from 'react-intl-universal'
import {toNumber} from "LoopringJS/common/formatter";

export default class FillList extends Component {
  static displayName = 'FillList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      pageIndex:1
    };
  }

  componentDidMount() {
    const {location} = this.props
    if(location.search) {
      const arr = location.search.substring(1).split('=')
      if(arr.length === 2 && arr[0] === 'page'){
        this.setState({pageIndex : arr[1]})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const location = nextProps.location
    if(location.search) {
      const arr = location.search.substring(1).split('=')
      if(arr.length === 2 && arr[0] === 'page'){
        this.setState({pageIndex : toNumber(arr[1])})
      }
    }
  }

  render() {
    return (
      <div className="container pl15 pr15">
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black ">{intl.get('common.recent_trades')}</div>
          </div>
          <div className="ui segment p20">
            <FillTable sourceType='trades' pageIndex={this.state.pageIndex} location={this.props.location}/>
          </div>
        </div>
      </div>
    );
  }
}
