const setLastRequestTime = (unitTimestamp)=>{
  localStorage.lastRequestTime = unitTimestamp
}

const getLastRequestTime = ()=>{
  return localStorage.lastRequestTime
}

const setProjects = (projects)=>{
  localStorage.projects = JSON.stringify(projects)
}

const getProjects = ()=>{
  if(localStorage.projects){
    return JSON.parse(localStorage.projects)
  }else{
    return null
  }
}

const setConfigs = (configs)=>{
  localStorage.configs = JSON.stringify(configs)
}

const getConfigs = ()=>{
  if(localStorage.configs){
    return JSON.parse(localStorage.configs)
  }else{
    return null
  }
}

export default {
  setLastRequestTime,
  getLastRequestTime,
  setProjects,
  getProjects,
  setConfigs,
  getConfigs
}
