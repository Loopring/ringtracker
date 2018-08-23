import React, { Component } from 'react';
import FillTable from '../Fills/FillTable';
import {getTrades} from 'common/utils/relay'
import LineChart from './TokensOverview/LineChart'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'

export default class TokenDetail extends Component {
  static displayName = 'TokenDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {trades:[],loading:false};
  }

  componentDidMount() {
    this.setState({loading:true})
    getTrades({currency:'USD'}).then(resp => {
      if(resp.result) {
        this.setState({trades:resp.result.data,loading:false})
      }
    })
  }

  render() {
    const {location} = this.props
    const params = location.pathname.split('/')
    const token = params.length === 3 ? params[2] : ''
    return (
      <div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{token} {intl.get('common.overview')}</div>
            <div className="ui buttons basic mr10">
              <button className="ui button" onClick={routeActions.goBack.bind(this)}>{intl.get('common.goback')}</button>
            </div>
          </div>
          <div className="ui segment p20">
            <LineChart />
          </div>
        </div>
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{token} {intl.get('common.trades')}</div>
          </div>
          <div className="ui segment p20">
            <FillTable fills={{items:this.state.trades,loading:this.state.loading}}/>
          </div>
        </div>
      </div>
    );
  }
}
