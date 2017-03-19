const localDataKey = 'vue-player-data'
const defaultData = {
  'status': {
    'index': 0,
    'volume': 0.7,
    'list-type': 1,
    'loop-mode': 1
  },
  'playlist': []
}

export default {

  getAppData () {

    // get data from localStorage
    let unparsedLocalData = localStorage.getItem(localDataKey)

    // parse string data
    let parsedLocalData = unparsedLocalData ? JSON.parse(unparsedLocalData) : {}

    // mix with default data
    return { ...defaultData, ...parsedLocalData }

  },

  getPlaylist () {
    return this.getAppData().playlist
  },

  getAppStatus () {
    return this.getAppData().status
  },

  saveAppData (name, value) {
    if (arguments.length === 1) {
      localStorage.setItem(localDataKey, JSON.stringify(arguments[0]))
    } else {
      let localData = this.getAppData()
      localData[arguments[0]] = arguments[1]
      localStorage.setItem(localDataKey, JSON.stringify(localData))
    }

  },

  savePlaylist (playlist) {
    this.saveAppData('playlist', playlist)
  },

  saveAppStatus (name, value) {

    let localData = this.getAppData()
    localData.status[name] = value
    localStorage.setItem(localDataKey, JSON.stringify(localData))

  }

}
