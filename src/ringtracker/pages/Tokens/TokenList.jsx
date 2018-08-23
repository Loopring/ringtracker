import React, { Component } from 'react';
import TokenTable from './TokenTable';
import TokensOverview from './TokensOverview';
import {getAllTokens} from 'common/utils/relay'
import intl from "react-intl-universal";

export default class TokenList extends Component {
  static displayName = 'TokenList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {datas:[],loading:false};
  }

  componentDidMount() {
    this.setState({loading:true})
    getAllTokens({}).then(resp => {
      if(resp.result) {
        this.setState({datas:resp.result.data, loading:false})
      }
    })
  }

  render() {
    return (
      <div>
        <TokensOverview />
        <div className="ui segments">
          <div className="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">{intl.get('taps.tokens')}</div>
            <div className="ui buttons basic mr10">
              <button className="ui button">Apply To List</button>
            </div>
          </div>
          <div className="ui segment p20">
            <TokenTable tokens={{items:this.state.datas, loading:this.state.loading}}/>
          </div>
        </div>
      </div>
    );
  }
}
