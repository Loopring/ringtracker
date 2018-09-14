import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
const { SubMenu, Item: MenuItem } = Menu

@withRouter
export default class Header extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    const prefix = `/${pathname.split('/')[1]}`
    return (
      <Menu
        className="header-navbar-menu"
        onClick={()=>{}}
        selectedKeys={[prefix]}
        defaultSelectedKeys={[pathname]}
        mode="horizontal"
      >
        {this.props.menus &&
          this.props.menus.length > 0 &&
          this.props.menus.map((nav, index) => {
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
                  <a {...linkProps} className="fs16">
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
                <Link {...linkProps} className="fs16">
                  <span>
                    {nav.name}
                  </span>
                </Link>
              </MenuItem>
            );
          })}
      </Menu>
    );
  }
}
