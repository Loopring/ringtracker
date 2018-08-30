import React, {Component} from 'react';
import RelayerTable from './RelayerTable';
import RelayersOverview from './RelayersOverview';
import settings from 'modules/storage/settings'
import {getAllRelayers} from "../../../common/utils/relay";


export default class RelayerList extends Component {

  state = {
    loading: true,
    items: [],
  };

  componentDidMount() {
    const currency = settings.getCurrency()
    getAllRelayers({currency}).then(res => {
      if (!res.error) {
        this.setState({loading: false,items:res.result.data})
      } else {
        this.setState({loading: false})
      }
    })

  }

  render() {
    const {loading, items} = this.state;
    return (
      <div>
        <RelayersOverview/>
        <div class="ui segments">
          <div class="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">Relayers</div>
            <div class="ui buttons basic mr10">
              <button class="ui button"></button>
            </div>
          </div>
          <div class="ui segment p20">
            <RelayerTable data={{loading, items}}/>
          </div>
        </div>
      </div>
    );
  }
}
