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
        <div className="container" style={styles.mainContent}>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  mainContent: {
    padding: '0 20px',
  },
};
