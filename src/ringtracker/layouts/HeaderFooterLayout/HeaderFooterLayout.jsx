import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './HeaderFooterLayout.scss';

export default class HeaderFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="header-footer-layout">
        <Header />
        <div className="pt50"></div>
        <div className="pt50"></div>
        <div className="pt0"></div>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
