import React from 'react';
import settings from 'modules/storage/settings'

const Currency = ()=>{
  const currency = settings.getCurrency()
  switch(currency) {
    case 'ETH':
      return 'Ξ';
    case 'BTC':
      return 'Ƀ';
    case 'USD':
      return '$';
    case 'CNY':
      return '¥';
    default:
      return ''
  }
}
export default Currency
