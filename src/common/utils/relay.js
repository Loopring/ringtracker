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
