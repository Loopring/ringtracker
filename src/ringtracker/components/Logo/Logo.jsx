import React, { Component } from 'react';

export default class Logo extends Component {
  render() {
    return (
      <div style={styles.container}>
        <img
          src={require('./images/logo-no-text.png')}
          style={styles.logoImg}
          alt="logo"
        />
        <a href="/" style={styles.logoText}>
          RingTracker
        </a>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  logoImg: {
    width: '40px',
  },
  logoText: {
    display: 'block',
    maxWidth: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginLeft: '10px',
    fontSize: '18px',
    // color: window.themeConfig && window.themeConfig.primaryColor,
    color: "#1c60ff",
    fontWeight: 'bold',
  },
};
