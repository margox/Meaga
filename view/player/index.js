export default {

  initialize () {

    if (window.player_core) {
      return false
    }

    const { store } = window
    const __player__ = new Audio()

    __player__.autoBuffer = true
    __player__.autoPlay = false
    window.player_core = __player__

    this.volume(store.state.status.volume)
    this.muted(store.state.status.muted)
    this.current(store.state.status.currentSongId)

    this.setTempStatus({
      ready: true
    })

    this.syncStatus()

  },

  syncStatus () {

    const { player_core } = window

    player_core.addEventListener('loadedmetadata', () => {
      this.setTempStatus({
        duration: player_core.duration
      })
    })

    player_core.addEventListener('play', () => {
      this.setTempStatus({
        playing: true
      })
    })

    player_core.addEventListener('pause', () => {
      this.setTempStatus({
        playing: false
      })
    })

    player_core.addEventListener('ended', () => {
      this.setTempStatus({
        playing: false
      })
      this.next(true)
    })

    player_core.addEventListener('error', () => {
      this.setTempStatus({
        playing: false
      })
      this.next(true)
    })

    player_core.addEventListener('timeupdate', () => {
      this.setTempStatus({
        played: player_core.currentTime
      })
    })

  },

  setTempStatus (status) {
    window.store.dispatch('setTempStatus', status)
  },

  current (id, play = false) {

    const { player_core, store } = window
    const currentSong = store.state.songs.find((item) => item.id === id)

    if (currentSong) {
      player_core.currentTime = 0
      setTimeout(() => {
        player_core.src = currentSong.src
        play && player_core.play()
        store.dispatch('setCurrentSongId', id)
      }, 0)
    } else {
      return store.state.status.currentSongId
    }

  },

  next (isAuto) {

    const { store } = window
    const { status } = store.state
    const { currentSongId, loopMode } = status
    const { items } = store.getters.currentPlaylist

    if (currentSongId === -1 || items.length <= 0) {
      return false
    }

    const currentIndex = items.findIndex((item) => item.id === currentSongId)

    let nextIndex = currentIndex

    if (loopMode === 1) {
      nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
    } else if (loopMode === 2) {
      nextIndex = isAuto ? currentIndex : (currentIndex === items.length - 1 ? 0 : currentIndex + 1)
    } else {
      nextIndex = this.getRandomIndex()
    }

    this.play(items[nextIndex].id)

  },

  prev () {

    const { store } = window
    const { status } = store.state
    const { currentSongId, loopMode } = status
    const { items } = store.getters.currentPlaylist

    if (currentSongId === -1 || items.length <= 0) {
      return false
    }

    const currentIndex = items.findIndex((item) => item.id === currentSongId)

    let prevIndex = currentIndex

    if (loopMode === 1) {
      prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    } else if (loopMode === 2) {
      prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    } else {
      prevIndex = this.getRandomIndex()
    }

    this.play(items[prevIndex].id)

  },

  play (id) {

    const { status } = window.store.state
    const { items } = window.store.getters.currentPlaylist

    if (id) {
      this.current(id, true)
    } else if (status.currentSongId !== -1 && items.length > 0) {
      window.player_core.play()
    }

  },

  pause () {
    window.player_core.pause()
  },

  toggle () {
    const { store } = window
    store.state.tempStatus.playing ? this.pause() : this.play()
  },

  stop () {

    const { store } = window

    this.pause()
    this.pauseVisualizer()
    store.dispatch('setCurrentSongId', -1)

  },

  remove (id) {

    const { store } = window
    const { status } = store.state
    const { items } = window.store.getters.currentPlaylist

    if (id === status.currentSongId) {
      items.length < 2 ? this.stop() : this.next(true)
    } else {
      store.dispatch('removeSong', id)
    }

  },

  clear () {
    window.store.dispatch('clear')
    this.stop()
  },

  volume (volume = -1) {

    const { player_core, store } = window

    if (volume >= 0) {
      volume = Math.min(1, volume)
      store.dispatch('setVolume', volume)
      player_core.volume = volume
    }

    return player_core.volume

  },

  muted (muted) {

    const { player_core, store } = window

    if (muted !== undefined) {
      player_core.muted = !!muted
      store.dispatch('setMuted', muted)
    }

    return player_core.muted

  },

  toggleMuted () {

    const { store } = window
    this.muted(!store.state.status.muted)

  },

  danceVisualizer () {
    window.visualizer && window.visualizer.dance()
    window.store.dispatch('visualize', true)
  },

  pauseVisualizer () {
    window.visualizer && window.visualizer.pause()
    window.store.dispatch('visualize', false)
  },

  loopMode (mode = -1) {

    const { store } = window

    if (mode > 0) {
      store.dispatch('setLoopMode', Math.min(3, Math.ceil(mode)))
    }

    return store.state.status.loopMode

  },

  progress (progress = -1) {

    const { player_core } = window

    if (progress >= 0) {
      player_core.currentTime = player_core.duration * Math.min(1, progress)
    }

    return player_core.currentTime / player_core.duration

  },

  getRandomIndex () {
    return Math.floor(Math.random() * window.store.getters.currentPlaylist.items.length)
  }

}
