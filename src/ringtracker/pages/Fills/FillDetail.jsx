import React, { Component } from 'react';
import { MetaList,MetaItem } from 'LoopringUI/components/DetailPage';

export default class FillDetail extends Component {
  static displayName = 'FillDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div class="ui segments">
          <div class="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">Trade Detail</div>
            <div class="ui buttons basic mr10">
              <button class="ui button">Go Back</button>
            </div>
          </div>
          <div class="ui segment pl20 pr20">
            <MetaItem label="Transaction Hash" value="0x5d6ba9f8c6d98210d5ebd43b883043d3c4f5824be65f61374f6053896fbd3bae" />
            <MetaItem label="Order Hash" value="0xadcd1b55d82187bdd95393187f566aa8ca6a109a78187f98dcbfdc374351d3f7" />
            <MetaItem label="Date" value="2018-08-16 10:00:00" />
            <MetaItem label="Relayer" value="LoopringDEX" />
            <MetaItem label="Status" value="Success" />
          </div>
        </div>
      </div>
    );
  }
}
