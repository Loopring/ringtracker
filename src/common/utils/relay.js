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
  // return Promise.resolve({
  //   "jsonrpc": "2.0",
  //   "id": 64,
  //   "result": [{
  //     "id": 253,
  //     "protocol": "0xb1170dE31c7f72aB62535862C97F5209E356991b",
  //     "delegateAddress": "0x5567ee920f7E62274284985D793344351A00142B",
  //     "owner": "0x23635D3248A7237d2123E1DB410783a169d8E57b",
  //     "ringIndex": 187,
  //     "fillIndex": 0,
  //     "createTime": 1525096544,
  //     "ringHash": "0x33c99c1a3c81e9d6060f7de8711ff6e147b89b7ad1f6c3a454e36c6c311945e6",
  //     "txHash": "0x47e246eda577a46ec07fd109fae199d6e7d84b3beab53959b486dac0dbf4b18a",
  //     "orderHash": "0xfba08088dfb6b448fc1e06404c9847b9ce3c4bcd0c560c30e9501c940bfde8dc",
  //     "tokenS": "0xBeB6fdF4ef6CEb975157be43cBE0047B248a8922",
  //     "tokenB": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //     "amountS": "1992000000000000000000",
  //     "amountB": "249000000000000000",
  //     "LrcFee": "401497559999999999",
  //     "market": "ARP-WETH",
  //     "side": "sell",
  //     "Miner": "0x3ACDF3e3D8eC52a768083f718e763727b0210650",
  //     "WalletAddress": "0xb94065482Ad64d4c2b9252358D746B39e820A582",
  //     "LrcCal": 0,
  //     "TokenAmountCal": 0,
  //     "relayer": "loopring_relayer"
  //   }]
  // })
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
  // return Promise.resolve({
  //   "id":64,
  //   "jsonrpc": "2.0",
  //   "result": {
  //     data: [
  //       {
  //         "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //         "symbol": "WETH",
  //         "lastPrice": 2000,
  //         "trade": 1549,
  //         "volume": 1000000,
  //         "fee": 200
  //       },
  //       {
  //         "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //         "symbol": "LRC",
  //         "lastPrice": 21,
  //         "trade": 98123,
  //         "volume": 9800,
  //         "fee": 200
  //       },
  //       {
  //         "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //         "symbol": "0x",
  //         "lastPrice": 14,
  //         "trade": 761,
  //         "volume": 10,
  //         "fee": 200
  //       }
  //     ],
  //     "pageIndex": 1,
  //     "pageSize": 20,
  //     "total": 200
  //   }
  // })
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
