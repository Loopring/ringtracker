import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu,Input,Select } from 'antd';
import headerMenuConfig from '../../menuConfig';
import HeaderMenu from './HeaderMenu';
import Logo from '../Logo';
import './Header.scss';
import settings from 'modules/storage/settings'
import routeActions from 'common/utils/routeActions'

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
    const currencyChange = (currenty) => {
      settings.setCurrency(currenty)
      window.location.reload()
    }
    const languageChange = (language) => {
      settings.setLanguage(language)
      window.location.reload()
    }
    return (
      <div className="header-container">
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
              <div className="col-auto" style={{padding:'7px 0px 8px'}}>
                  <div className="row align-items-center ml0 mr0 no-gutters mb5">
                    <div hidden className="col-auto color-black-3">
                      <a href="https://loopring.org" target="_blank" className="fs14 mr15 color-black-2">Loopring Fund</a>
                      <a href="https://loopring.io" target="_blank" className="fs14 mr15 color-black-2">Loopring Dex</a>
                      <a href="https://loopring.io" target="_blank" className="fs14 mr15 color-black-2">Loopring Wallet</a>
                    </div>
                    <div className="col">
                    </div>
                    <div className="col-auto pl5">
                      <Select size="" defaultValue={settings.getCurrency()} onChange={currencyChange}>
                        <Select.Option value="USD">$ USD</Select.Option>
                        <Select.Option value="CNY">¥ CNY</Select.Option>
                        <Select.Option value="ETH">Ξ ETH</Select.Option>
                        <Select.Option value="BTC">Ƀ BTC</Select.Option>
                      </Select>
                    </div>
                    <div className="col-auto pl5">
                      <Select size="" defaultValue={settings.getLanguage()} onChange={languageChange}>
                        <Select.Option value="en-US">English</Select.Option>
                        <Select.Option value="zh-CN">中文</Select.Option>
                      </Select>
                    </div>
                  </div>
                <Search style={{ width: 320 }} onSearch={value => routeActions.gotoPath(`/search/${value}`)} enterButton={true} placeholder="Address, TxHash, OrderHash, RingHash" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
