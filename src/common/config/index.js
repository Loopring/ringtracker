//const config = require('./config.json');
import fetch from 'dva/fetch';
import storage from 'modules/storage'

const data = require('./data')
const {configs} = data

function getTokenBySymbol(symbol){
  if(!symbol){ return {} }
  return getTokens().find(token=>token.symbol.toLowerCase()===symbol.toLowerCase()) || {}
}

function getTokenByAddress(address){
  if(!address){ return {} }
  return getTokens().find(token=>token.address.toLowerCase()===address.toLowerCase())
}

function getTokens(){
  return storage.settings.getTokensConfig() || []
}

function getMarkets() {
  return storage.settings.getMarketsConfig() || []
}

function getMarketBySymbol(tokenx, tokeny) {
  if (tokenx && tokeny) {
    return getMarkets().find(market=> {
        return (market.tokenx === tokenx && market.tokeny === tokeny) || (market.tokenx === tokeny && market.tokeny === tokenx)
      }
    ) || {
      "pricePrecision": 8
    }
  }else{
    return {
      "pricePrecision": 8
    }
  }
}

function getMarketByPair(pair) {
  if (pair) {
    const pairArr = pair.split('-')
    if(pairArr && pairArr.length === 2) {
      return getMarketBySymbol(pairArr[0], pairArr[1])
    }
  }
}

function getWalletAddress() {
  return configs.walletAddress
}

function getDelegateAddress() {
  return configs.delegateAddress;
}

function getProtocolAddress() {
  return configs.contracts[0].address
}

export default {
  getTokenBySymbol,
  getTokenByAddress,
  getTokens,
  getWalletAddress,
  getDelegateAddress,
  getProtocolAddress,
  getMarkets,
  getMarketBySymbol,
  getMarketByPair
}
