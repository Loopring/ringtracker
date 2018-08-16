import React, { Component } from 'react';

export default class Head extends Component {
  static displayName = 'Head';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div className="row">
        <div className="col">
          <div className="text-center">
            <div className="fs24 color-black font-weight-bold">{data.visits}</div>
            <div className="fs14 color-black-1">Volume</div>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="fs24 color-black font-weight-bold">{data.unique_users}</div>
            <div className="fs14 color-black-1">Trades</div>
          </div>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="fs24 color-black font-weight-bold">{data.click}</div>
            <div className="fs14 color-black-1">Fees</div>
          </div>
        </div>
      </div>
    );
  }
}

