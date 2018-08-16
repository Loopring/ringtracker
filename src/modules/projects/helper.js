import request, {id} from 'LoopringJS/common/request';
import moment from 'moment'
import storage from 'modules/storage/projects'
import {toNumber, toBig} from 'LoopringJS/common/formatter'
import config from '../../common/config'
import {configs} from 'common/config/data'
import { Button, notification } from 'antd';

const isArray = (obj)=>{
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export function getProjects() {
  const now = moment()
  const cacheProjects = storage.getProjects()
  if(cacheProjects) {
    const lastRequest = storage.getLastRequestTime()
    if(lastRequest) {
      if(now.unix() > toNumber(lastRequest) + 30) {
        return loadProjects()
      }
    }
    return new Promise(function(resolve,reject){
      resolve(cacheProjects);
    })
  } else {
    return loadProjects()
  }
}

export const sortProjects = (projects) => {
  const now = moment()
  const status = projects.filter(item=>item.id > 0).map((item,index) => {
    if (item.start_time <= now.unix() && item.end_time >= now.unix()) { // effective
      item.status = 1
    } else if (item.start_time > now.unix()) { //not open
      item.status = 2
    } else { // overdue
      item.status = 3
    }
    return item
  })
  return status.sort(sorter)
}

export function getProject(projectId) {
  return getProjects().then(projects=>{
    const sorted = sortProjects(projects)
    return sorted.find(project => project.id === toNumber(projectId))
  })
}

const sorter = (a,b) => {
  if(a.status > b.status) {
    return 1
  } else if (a.status === b.status) {
    if(a.start_time > b.start_time) {
      return 1
    } else if(a.start_time === b.start_time) {
      return 0
    } else {
      return -1
    }
  } else {
    return -1
  }
}

function loadProjects() {
  const now = moment()
  let projects = []
  let notOverdue = []
  return getRemoteConfig().then(res=>{
    console.log('load token config', res)
    if(res) {
      storage.setConfigs(res);
      window.CONFIGS = res
      // const url = `${configs.dataServerUrl}/dtdgProject?start_time_lte=${now.unix()}&end_time_gte=${now.unix()}&_sort=created_at:asc`
      return request(
        `${configs.dataServerUrl}/dtdgProject?_sort=created_at:asc&_limit=30`, {
          method: 'get',
        })
    } else {
      return Promise.resolve({});
    }
  }).then(resp => {
    console.log('load projects', resp)
    if(resp && isArray(resp)) {
      projects = resp.map(project => {
        project.tokenB = config.getTokenBySymbol(project.token_b)
        project.tokenS = config.getTokenBySymbol(project.token_s)
        project.amountB = toBig(project.amount_b).times('1e'+project.tokenB.digits).toString(10);
        project.amountS = toBig(project.amount_s).times('1e'+project.tokenS.digits).toString(10);
        project.dealtAmountB = 0
        project.dealtAmountS = 0
        return project
      })
      notOverdue = projects.filter(project => project.end_time >= now.unix())
      return Promise.all(notOverdue.map(project => {
        const hashes = project.dtdgorders.filter(item=>item.state === 1).map(item => item.order_hash)
        if(hashes && hashes.length > 0) {
          return getOrdersByHash(hashes)
        } else {
          return Promise.resolve({});
        }
      }))
    }
  }).then(orders => {
    console.log('load orders', orders)
    if(orders && orders.length >0){
      orders.map((order,index) => {
        let dealtAmountS = toBig(0), dealtAmountB = toBig(0);
        const project = notOverdue[index]
        const projectOrders = []
        if(order.result) {
          order.result.forEach(o => {
            //TODO
            //if(o.originalOrder.tokenB.toLowerCase() === project.token_b.toLowerCase() && o.originalOrder.tokenS.toLowerCase() === project.token_s.toLowerCase()) {
            dealtAmountS = dealtAmountS.plus(o.dealtAmountS)
            dealtAmountB = dealtAmountB.plus(o.dealtAmountB)
            projectOrders.push(o)
            //}
          })
        }
        project.dealtAmountS = dealtAmountS.toString(10);
        project.dealtAmountB = dealtAmountB.toString(10);
        project.orders = projectOrders
      })
    }
    storage.setLastRequestTime(now.unix())
    storage.setProjects(projects)
    return projects
  }).catch(error=> {
    console.log(error)
    notification['error']({
      message: '读取数据失败',
      description: '从服务器获取数据失败，请稍后刷新页面重试',
    });
  });
}

export function getOrdersByHash(hashes) {
  if(!hashes || hashes.length === 0){
    return Promise.resolve(new Response(1001, 'Invalid argument hashes'));
  }
  const body = {};
  body.method = 'loopring_getOrdersByHashes';
  body.params = [{'orderHashes':hashes}];
  body.id = id();
  body.jsonrpc = '2.0';
  return request(configs.relayServerUrl, {
    method: 'post',
    body
  });
}

function getRemoteConfig() {
  return request(configs.configServerUrl, {
    method:'get',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
  })
}
