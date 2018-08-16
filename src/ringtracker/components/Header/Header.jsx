import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import headerMenuConfig from '../../menuConfig';
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
          <div className="container d-flex align-items-center">
            <Logo isDark />
            <Menu
              className="header-navbar-menu"
              onClick={this.handleNavClick}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              mode="horizontal"
            >
              {headerMenuConfig &&
                headerMenuConfig.length > 0 &&
                headerMenuConfig.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubMenu
                        triggerType="click"
                        key={index}
                        title={
                          <span>
                            <span>{nav.name}</span>
                          </span>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.external) {
                            if (item.newWindow) {
                              linkProps.target = '_blank';
                            }

                            linkProps.href = item.path;
                            return (
                              <MenuItem key={item.path}>
                                <a {...linkProps}>
                                  <span>{item.name}</span>
                                </a>
                              </MenuItem>
                            );
                          }
                          linkProps.to = item.path;
                          return (
                            <MenuItem key={item.path}>
                              <Link {...linkProps}>
                                <span>{item.name}</span>
                              </Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                  const linkProps = {};
                  if (nav.external) {
                    if (nav.newWindow) {
                      linkProps.target = '_blank';
                    }
                    linkProps.href = nav.path;
                    return (
                      <MenuItem key={nav.path}>
                        <a {...linkProps} className="pt15 pb15">
                          <span>
                            {nav.name}
                          </span>
                        </a>
                      </MenuItem>
                    );
                  }
                  linkProps.to = nav.path;
                  return (
                    <MenuItem key={nav.path}>
                      <Link {...linkProps} className="pt10 pb10">
                        <span>
                          {nav.name}
                        </span>
                      </Link>
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
