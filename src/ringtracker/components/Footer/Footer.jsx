import React from 'react';
import Logo from '../Logo';
export default () => {
  return (
    <div
      style={{
        lineHeight: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
      }}
      className="container pt20 pb20"
    >
      <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
        <Logo isDark />
      </div>
      <div
        style={{
          color: '#999',
          lineHeight: 1.5,
          fontSize: 12,
          textAlign: 'right',
        }}
      >
        Loopring Protocol © 2018
      </div>
    </div>
  );
};
