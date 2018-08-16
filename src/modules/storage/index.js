import settings from './settings'
import tokens from './tokens'
import transactions from './transactions'
import markets from './markets'
import projects from './projects'

const setLocalStorageVersion = (version) => {
  localStorage.dataVersion = version
}

const getLocalStorageVersion = () => {
  return localStorage.dataVersion || 0
}

const clearLocalStorage = () => {
  localStorage.clear();
}

export default {
  settings,
  tokens,
  transactions,
  markets,
  projects,
  setLocalStorageVersion,
  getLocalStorageVersion,
  clearLocalStorage
}
