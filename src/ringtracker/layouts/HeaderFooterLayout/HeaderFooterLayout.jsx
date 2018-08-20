import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './HeaderFooterLayout.scss';

export default class HeaderFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="">
        <Header />
        <div className="pt50"></div>
        <div className="pt30"></div>
        <div className="container pl10 pr10">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  mainContent: {
    
  },
};
