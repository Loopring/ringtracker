//const config = require('./config.json');
import fetch from 'dva/fetch';
import storage from 'modules/storage/projects'


function getTokenBySymbol(symbol){
  if(!symbol){ return {} }
  return getTokens().find(token=>token.symbol.toLowerCase()===symbol.toLowerCase()) || {}
}

function getTokenByAddress(address){
  if(!address){ return {} }
  return getTokens().find(token=>token.address.toLowerCase()===address.toLowerCase())
}

function getTokens(){
  const configs = storage.getConfigs() || {}
  return configs.tokens || []
}

function getWalletAddress() {
  const configs = storage.getConfigs() || {}
  return configs.walletAddress
}

function getDelegateAddress() {
  const configs = storage.getConfigs() || {}
  return configs.delegateAddress;
}

function getProtocolAddress() {
  const configs = storage.getConfigs() || {}
  return configs.contracts[0].address
}

export default {
  getTokenBySymbol,
  getTokenByAddress,
  getTokens,
  getWalletAddress,
  getDelegateAddress,
  getProtocolAddress
}
