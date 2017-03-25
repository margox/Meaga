export default {

  initialize () {

    if (window.player) {
      return false
    }

    const { store } = window
    const player = new Audio()

    player.autoBuffer = true
    player.autoPlay = false
    window.player = player

    this.volume(store.state.status.volume)
    this.muted(store.state.status.muted)
    this.current(store.state.status.current)

    this.setTempStatus({
      ready: true
    })

    this.syncStatus()

  },

  syncStatus () {

    const { player } = window

    player.addEventListener('loadedmetadata', () => {
      this.setTempStatus({
        duration: player.duration
      })
    })

    player.addEventListener('play', () => {
      this.setTempStatus({
        playing: true
      })
    })

    player.addEventListener('pause', () => {
      this.setTempStatus({
        playing: false
      })
    })

    player.addEventListener('ended', () => {
      this.setTempStatus({
        playing: false
      })
      this.next(true)
    })

    player.addEventListener('error', () => {
      this.setTempStatus({
        playing: false
      })
      this.next(true)
    })

    player.addEventListener('timeupdate', () => {
      this.setTempStatus({
        played: player.currentTime
      })
    })

  },

  setTempStatus (status) {
    window.store.dispatch('setTempStatus', status)
  },

  current (current, play = false) {

    const { player, store } = window
    const currentSong = store.state.playlist.find((item) => item.id === current)

    if (currentSong) {
      player.currentTime = 0
      setTimeout(() => {
        player.src = currentSong.src
        play && player.play()
        store.dispatch('setCurrent', current)
      }, 100)
    } else {
      return store.state.status.current
    }

  },

  next (isAuto) {

    const { store } = window
    const { playlist, status } = store.state
    const { current, loopMode } = status

    if (status.current === -1 || playlist.length <= 0) {
      return false
    }

    const currentIndex = playlist.findIndex((item) => item.id === current)

    let nextIndex = currentIndex

    if (loopMode === 1) {
      nextIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1
    } else if (loopMode === 2) {
      nextIndex = isAuto ? currentIndex : (currentIndex === playlist.length - 1 ? 0 : currentIndex + 1)
    } else {
      nextIndex = this.getRandomIndex()
    }

    this.play(playlist[nextIndex].id)

  },

  prev () {

    const { store } = window
    const { playlist, status } = store.state
    const { current, loopMode } = status

    if (status.current === -1 || playlist.length <= 0) {
      return false
    }

    const currentIndex = playlist.findIndex((item) => item.id === current)

    let prevIndex = currentIndex

    if (loopMode === 1) {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    } else if (loopMode === 2) {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    } else {
      prevIndex = this.getRandomIndex()
    }

    this.play(playlist[prevIndex].id)

  },

  play (id) {

    const { status, playlist } = window.store.state

    if (id) {
      this.current(id, true)
    } else if (status.current !== -1 && playlist.length > 0) {
      window.player.play()
    }

  },

  pause () {
    window.player.pause()
  },

  toggle () {
    const { store } = window
    store.state.tempStatus.playing ? this.pause() : this.play()
  },

  stop () {

    const { store } = window

    this.pause()
    this.pauseVisualizer()
    store.dispatch('setCurrent', -1)

  },

  remove (id) {

    const { store } = window
    const { status, playlist } = store.state

    if (id === status.current) {
      playlist.length < 2 ? this.stop() : this.next(true)
    } else {
      store.dispatch('removeSong', id)
    }

  },

  clear () {
    window.store.dispatch('clear')
    this.stop()
  },

  volume (volume = -1) {

    const { player, store } = window

    if (volume >= 0) {
      volume = Math.min(1, volume)
      store.dispatch('setVolume', volume)
      player.volume = volume
    }

    return player.volume

  },

  muted (muted) {

    const { player, store } = window

    if (muted !== undefined) {
      player.muted = !!muted
      store.dispatch('setMuted', muted)
    }

    return player.muted

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

    const { player } = window

    if (progress >= 0) {
      player.currentTime = player.duration * Math.min(1, progress)
    }

    return player.currentTime / player.duration

  },

  getRandomIndex () {
    return Math.floor(Math.random() * window.store.state.playlist.length)
  }

}
