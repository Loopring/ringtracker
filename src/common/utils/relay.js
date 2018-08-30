import request from './request'

export async function getTokens() {
  let body = {};
  body.method = 'loopring_getLooprSupportedTokens';
  body.params = [{}];
  return request({
    method: 'post',
    body
  })
}

export async function getMarkets() {
  let body = {};
  body.method = 'loopring_getLooprSupportedMarket';
  body.params = [{}];
  return request({
    method: 'post',
    body
  })
}

export async function overview() {
  let body = {};
  body.method = 'loopring_getAmount';
  body.params = [{}];
  return request({
    method: 'post',
    body
  })
}

/**
 * 首页趋势图，可根据时间过滤，包含（volumn，trades，fees）
 * @param duration: 24h/7d/1m/1y, 默认24h
 * @param currency: "ETH/BTC/CNY/USDT"
 * @param type: token/relay/dex/ring  默认统计全部
 * @param keyword: 如果上一个type指定了，keyword必填，比如指定了token，就要传递某一个token的address
 * @param len: 默认是50个，如果duration选择的是1m，就默认12
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: {time: number, volume: number, trade: number, fee: number}[], volumeAmount: number, tradesAmount: number, feesAmount: number}}>}
 */
export async function getTrend({duration='24h', currency, type, keyword, len=50}) {
  const params = [{duration, currency, type, keyword, len}];
  let body = {};
  body.method = 'loopring_getTrend';
  body.params = params;
  return request({
    method: 'post',
    body
  })
}

/**
 * 展示tokens、relayers、dexs三个饼图，可根据指标和日期过滤
 * @param duration: 24h/7d/1m/1y, 默认24h
 * @param indicator: 不传默认三个都返回，volume/trade/fee
 * @param type: 不传默认三个都返回， token/relay/dex
 * @param currency: "ETH/BTC/CNY/USDT"
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: *[]}}>}
 */
export async function getEcosystemTrend({duration='24h', indicator, type, currency}) {
  const params = [{duration, indicator, type, currency}];
  let body = {};
  body.method = 'loopring_getEcosystemTrend';
  body.params = params;
  return request({
    method: 'post',
    body
  })
}

/**
 * 查询trades
 * @param pageIndex
 * @param pageSize
 * @param currency: "ETH/BTC/CNY/USD"
 * @param type: 不传默认显示所有trades， token/relay/dex/ring
 * @param keyword: 如果上一个type指定了，keyword必填，比如指定了token，就要传递给我某一个token的address
 * @param search: orderHash / txHash / ringHash / ownerAddress / walletAddress / relayAddress
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: {protocol: string, owner: string, ringIndex: number, createTime: number, ringHash: string, txHash: string, orderHash: string, amountS: string, amountB: string, tokenS: string, tokenB: string, lrcReward: string, lrcFee: string, splitS: string, splitB: string, market: string}[], pageIndex: number, pageSize: number, total: number}}>}
 */
export async function getTrades({pageIndex = 1, pageSize = 20, currency, type, keyword, search}) {
  const params = [{pageIndex, pageSize, currency, type, keyword, search}];
  let body = {};
  body.method = 'loopring_getTrades';
  body.params = params;
  return request({
    method: 'post',
    body
  })
}

/**
 * 查询某一条trade的明细
 * @param delegateAddress
 * @param ringIndex
 * @param fillIndex
 * @returns {Promise<{jsonrpc: string, id: number, result: {id: number, protocol: string, delegateAddress: string, owner: string, ringIndex: number, fillIndex: number, createTime: number, ringHash: string, txHash: string, orderHash: string, tokenS: string, tokenB: string, amountS: string, amountB: string, LrcFee: string, market: string, side: string, Miner: string, WalletAddress: string, LrcCal: number, TokenAmountCal: number, relayer: string}[]}>}
 */
export async function getTradeDetails({delegateAddress, ringIndex, fillIndex}) {
  const params = [{delegateAddress, ringIndex, fillIndex}];
  let body = {};
  body.method = 'loopring_getTradeDetails';
  body.params = params;
  return request({
    method: 'post',
    body
  })
}

/**
 * 获得所有tokens的交易记录列表，可以按照交易量、交易额和手续费排序
 * @param pageIndex
 * @param pageSize
 * @param currency: 默认是USDT, "ETH/CNY/USDT"
 * @param sort: 不传默认volume，volume/trade/fee
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: {protocol: string, owner: string, ringIndex: number, createTime: number, ringHash: string, txHash: string, orderHash: string, amountS: string, amountB: string, tokenS: string, tokenB: string, lrcReward: string, lrcFee: string, splitS: string, splitB: string, market: string}[], pageIndex: number, pageSize: number, total: number}}>}
 */
export async function getAllTokens({pageIndex = 1, pageSize = 20, currency, sort}) {
  const params = [{pageIndex, pageSize, currency, sort}];
  let body = {};
  body.method = 'loopring_getAllTokens';
  body.params = params;
  return request({
    method: 'post',
    body
  })
}

// -------------------------- li start ---------------------------

export function getAllRelayers(params) {
  let body = {};
  body.method = 'loopring_getAllRelayers';
  body.params = [{...params}];
  return request({
    method: 'post',
    body
  })
}

export function getRelayerDetail(params) {
  let body = {};
  body.method = 'loopring_getRelayerDetail';
  body.params = [{...params}];
  return request({
    method: 'post',
    body
  })
}


export function getAllDexs(params) {
  let body = {};
  body.method = 'loopring_getAllDexs';
  body.params = [{...params}];
  return request({
    method: 'post',
    body
  })
}


export function getDexDetail(params) {
  let body = {};
  body.method = 'loopring_getDexDetail';
  body.params = [{...params}];
  return request({
    method: 'post',
    body
  })
}

export function getAllRings(params) {
  let body = {};
  body.method = 'loopring_getAllRings';
  body.params = [{...params}];
  return request({
    method: 'post',
    body
  })
}

export function getRingDetail(params) {
  let body = {};
  body.method = 'loopring_getRingDetail';
  body.params = [{...params}];
  return request({
    method: 'post',
    body
  })
}
