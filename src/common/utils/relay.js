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
