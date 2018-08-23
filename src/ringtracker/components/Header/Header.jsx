import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu,Input,Select } from 'antd';
import headerMenuConfig from '../../menuConfig';
import HeaderMenu from './HeaderMenu';
import Logo from '../Logo';
import './Header.scss';
const { SubMenu, Item: MenuItem } = Menu
const Search = Input.Search;

@withRouter
export default class Header extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <div className="zb-b-b pt5 pb5">
          <div className="container">
            <div className="row align-items-center ml0 mr0 no-gutters">
              <div className="col-auto color-black-3">
                <a href="https://loopring.org" target="_blank" className="fs14 mr15 color-black-2">Loopring Fund</a>
                <a href="https://loopring.io" target="_blank" className="fs14 mr15 color-black-2">Loopring Dex</a>
                <a href="https://loopring.io" target="_blank" className="fs14 mr15 color-black-2">Loopring Wallet</a>
              </div>
              <div className="col-auto">
              </div>
              <div className="col">
              </div>
              <div className="col-auto pl5">
                <Select size="" defaultValue="USD" onChange={()=>{}}>
                  <Select.Option value="usd">USD</Select.Option>
                  <Select.Option value="cny">CNY</Select.Option>
                  <Select.Option value="eth">ETH</Select.Option>
                  <Select.Option value="btc">BTC</Select.Option>
                </Select>
              </div>
              <div className="col-auto pl5">
                <Select size="" defaultValue="en" onChange={()=>{}}>
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="ch">中文</Select.Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="header-content">
          <div className="container ">
            <div className="row align-items-center ml0 mr0 no-gutters">
              <div className="col-auto">
                <Logo isDark />
              </div>
              <div className="col-auto">
                <HeaderMenu menus={headerMenuConfig} />
              </div>
              <div className="col">

              </div>
              <div className="col-auto">
                <Search style={{ width: 320 }} onSearch={value => console.log(value)} enterButton={false} placeholder="Address, TxHash, OrderHash, RingHash" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
