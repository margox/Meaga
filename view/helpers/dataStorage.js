import { defaultState } from '@/store'
const localDataKey = 'vue-player-data'

export default {

  getAppData () {

    let unparsedLocalData = localStorage.getItem(localDataKey)
    let parsedLocalData = unparsedLocalData ? JSON.parse(unparsedLocalData) : {}

    return { ...defaultState, ...parsedLocalData }

  },

  setAppData (name, value) {

    if (arguments.length === 1) {
      let appData = { ...arguments[0] }
      delete appData.tempStatus
      delete appData.filters
      localStorage.setItem(localDataKey, JSON.stringify(appData))
    } else {
      let localData = this.getAppData()
      localData[arguments[0]] = arguments[1]
      localStorage.setItem(localDataKey, JSON.stringify(localData))
    }

  }

}
