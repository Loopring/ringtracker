import React from 'react';
import Logo from '../Logo';
export default () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center pb15 pt15 pl10 pr10">
        <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
          <Logo isDark />
        </div>
        <div
          style={{
            color: '#999',
            lineHeight: 1.5,
            fontSize: 12,
          }}
        >
          Loopring Protocol © 2018
        </div>
      </div>
    </div>
  );
};
