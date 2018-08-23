import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import headerMenuConfig from '../../menuConfig';
import HeaderMenu from './HeaderMenu';
import Logo from '../Logo';
import './Header.scss';
const { SubMenu, Item: MenuItem } = Menu

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
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
