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

export async function overview() {
  let body = {};
  body.method = 'getAmount';
  body.params = [{}];
  // return request({
  //   method: 'post',
  //   body
  // })
  return Promise.resolve({
    "id":64,
    "jsonrpc": "2.0",
    "result": {
      "trades": 120,
      "tokens": 160,
      "relayers": 69,
      "dexs": 85,
      "rings": 85
    }
  })
}

/**
 * 首页趋势图，可根据时间过滤，包含（volumn，trades，fees）
 * @param duration: 24h/7d/1m/1y, 默认24h
 * @param currency: "ETH/BTC/CNY/USDT"
 * @param token
 * @param relay
 * @param dex
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: {time: number, volume: number, trade: number, fee: number}[], volumeAmount: number, tradesAmount: number, feesAmount: number}}>}
 */
export async function getTrend(duration, currency, token, relay, dex) {
  const params = [{duration, currency, token, relay, dex}];
  let body = {};
  body.method = 'getTrend';
  body.params = params;
  // return request({
  //   method: 'post',
  //   body
  // })
  return Promise.resolve({
    "id":64,
    "jsonrpc": "2.0",
    "result": {
      data: [
        {
          "time": 1524142497,
          "volume": 100,
          "trade": 100,
          "fee": 100
        }
      ],
      "volumeAmount": 10000,
      "tradesAmount": 10000,
      "feesAmount": 200
    }
  })
}

/**
 * 展示tokens、relayers、dexs三个饼图，可根据指标和日期过滤
 * @param duration: 24h/7d/1m/1y, 默认24h
 * @param indicator: 不传默认三个都返回，volume/trade/fee
 * @param type: 不传默认三个都返回， token/relayer/dex
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: *[]}}>}
 */
export async function getEcosystemTrend(duration, indicator, type) {
  const params = [{duration, indicator, type}];
  let body = {};
  body.method = 'getEcosystemTrend';
  body.params = params;
  // return request({
  //   method: 'post',
  //   body
  // })
  return Promise.resolve({
    "id": 64,
    "jsonrpc": "2.0",
    "result": {
      "data": [{
        "type": "token",
        "indicator": [{
          "name": "volume",
          "data": [{
            "name": "WETH",
            "value": 32.4
          },
            {
              "name": "ETH",
              "value": 50
            }
          ]
        }, {
          "name": "trade",
          "data": [{
            "name": "WETH",
            "value": 32.4
          },
            {
              "name": "ETH",
              "value": 50
            }
          ]
        }, {
          "name": "fee",
          "data": [{
            "name": "WETH",
            "value": 32.4
          },
            {
              "name": "ETH",
              "value": 50
            }
          ]
        }]
      },
        {
          "type": "relayer",
          "indicator": [{
            "name": "volume",
            "data": [{
              "name": "WETH",
              "value": 32.4
            },
              {
                "name": "ETH",
                "value": 50
              }
            ]
          }, {
            "name": "trade",
            "data": [{
              "name": "WETH",
              "value": 32.4
            },
              {
                "name": "ETH",
                "value": 50
              }
            ]
          }, {
            "name": "fee",
            "data": [{
              "name": "WETH",
              "value": 32.4
            },
              {
                "name": "ETH",
                "value": 50
              }
            ]
          }]
        },
        {
          "type": "dex",
          "indicator": [{
            "name": "volume",
            "data": [{
              "name": "WETH",
              "value": 32.4
            },
              {
                "name": "ETH",
                "value": 50
              }
            ]
          }, {
            "name": "trade",
            "data": [{
              "name": "WETH",
              "value": 32.4
            },
              {
                "name": "ETH",
                "value": 50
              }
            ]
          }, {
            "name": "fee",
            "data": [{
              "name": "WETH",
              "value": 32.4
            },
              {
                "name": "ETH",
                "value": 50
              }
            ]
          }]
        }
      ]
    }
  })
}

/**
 * 查询trades
 * @param pageIndex
 * @param pageSize
 * @param currency: "ETH/BTC/CNY/USDT"
 * @param token: symbol
 * @param relay: relayerId
 * @param dex: dexId
 * @param ringHash
 * @param keyword: orderHash / txHash / ringHash / ownerAddress / walletAddress / relayAddress
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: {protocol: string, owner: string, ringIndex: number, createTime: number, ringHash: string, txHash: string, orderHash: string, amountS: string, amountB: string, tokenS: string, tokenB: string, lrcReward: string, lrcFee: string, splitS: string, splitB: string, market: string}[], pageIndex: number, pageSize: number, total: number}}>}
 */
export async function getTrades(pageIndex = 1, pageSize = 20, currency, token, relay, dex, ringHash, keyword) {
  const params = [{pageIndex, pageSize, currency, token, relay, dex, ringHash, keyword}];
  let body = {};
  body.method = 'getTrades';
  body.params = params;
  // return request({
  //   method: 'post',
  //   body
  // })
  return Promise.resolve({
    "id":64,
    "jsonrpc": "2.0",
    "result": {
      "data" : [
        {
          "protocol":"0x4c44d51CF0d35172fCe9d69e2beAC728de980E9D",
          "owner":"0x66727f5DE8Fbd651Dc375BB926B16545DeD71EC9",
          "ringIndex":100,
          "createTime":1512631182,
          "ringHash":"0x2794f8e4d2940a2695c7ecc68e10e4f479b809601fa1d07f5b4ce03feec289d5",
          "txHash":"0x2794f8e4d2940a2695c7ecc68e10e4f479b809601fa1d07f5b4ce03feec289d5",
          "orderHash":"0x2794f8e4d2940a2695c7ecc68e10e4f479b809601fa1d07f5b4ce03feec289d5",
          "amountS":"0xde0b6b3a7640000",
          "amountB":"0xde0b6b3a7640001",
          "tokenS":"WETH",
          "tokenB":"COSS",
          "lrcReward":"0xde0b6b3a7640000",
          "lrcFee":"0xde0b6b3a7640000",
          "splitS":"0xde0b6b3a7640000",
          "splitB":"0x0",
          "market":"LRC-WETH"
        }
      ],
      "pageIndex" : 1,
      "pageSize" : 20,
      "total" : 212
    }
  })
}

/**
 * 获得所有tokens的交易记录列表，可以按照交易量、交易额和手续费排序
 * @param pageIndex
 * @param pageSize
 * @param sort: 不传默认volume，volume/trade/fee
 * @returns {Promise<{id: number, jsonrpc: string, result: {data: {protocol: string, owner: string, ringIndex: number, createTime: number, ringHash: string, txHash: string, orderHash: string, amountS: string, amountB: string, tokenS: string, tokenB: string, lrcReward: string, lrcFee: string, splitS: string, splitB: string, market: string}[], pageIndex: number, pageSize: number, total: number}}>}
 */
export async function getAllTokens(pageIndex = 1, pageSize = 20, sort) {
  const params = [{pageIndex, pageSize, sort}];
  let body = {};
  body.method = 'getAllTokens';
  body.params = params;
  // return request({
  //   method: 'post',
  //   body
  // })
  return Promise.resolve({
    "id":64,
    "jsonrpc": "2.0",
    "result": {
      data: [
        {
          "token": "WETH",
          "lastPrice": 2000,
          "trade": 1549,
          "legalVolume": 1000000,
          "tokenVolume": 500,
          "fee": 200
        },
        {
          "token": "WETH",
          "lastPrice": 2000,
          "trade": 1549,
          "legalVolume": 1000000,
          "tokenVolume": 500,
          "fee": 200
        }
      ],
      "pageIndex": 1,
      "pageSize": 20,
      "total": 200
    }
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
