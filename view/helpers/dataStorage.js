const localDataKey = 'vue-player-data'
const defaultData = {
  status: {
    index: 0,
    volume: 0.7,
    muted: false,
    visualizer: null,
    listType: 1,
    loopMode: 1
  },
  playlist: []
}

export default {

  getAppData () {

    let unparsedLocalData = localStorage.getItem(localDataKey)
    let parsedLocalData = unparsedLocalData ? JSON.parse(unparsedLocalData) : {}

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
