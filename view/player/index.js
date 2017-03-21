export default {

  initialize () {

    if (window.player) {
      return false
    }

    const store = window.store
    const player = new Audio()

    player.autoBuffer = true
    player.autoPlay = false
    window.player = player

    this.volume(store.state.status.volume)
    this.muted(store.state.status.muted)
    this.index(store.state.status.index)

    this.setTempStatus({
      ready: true
    })

    this.syncStatus()

  },

  syncStatus () {

    const player = window.player

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

  index (index, play = false) {

    const store = window.store
    const player = window.player

    if (index >= 0 && store.state.playlist[index]) {
      player.currentTime = 0
      setTimeout(() => {
        player.src = store.state.playlist[index].src
        play && player.play()
        store.dispatch('changeIndex', index)
      }, 100)
    }

    return store.state.status.index

  },

  next (isAuto) {

    const store = window.store
    const { playlist, status } = store.state
    const { index, loopMode } = status

    let nextIndex = index

    if (loopMode === 1) {
      nextIndex = index === playlist.length - 1 ? 0 : index + 1
    } else if (loopMode === 2) {
      nextIndex = isAuto ? index : (index === playlist.length - 1 ? 0 : index + 1)
    } else {
      nextIndex = this.getRandomIndex()
    }

    this.play(nextIndex)

  },

  prev () {

    const store = window.store
    const { playlist, status } = store.state
    const { index, loopMode } = status

    let prevIndex = index

    if (loopMode === 1) {
      prevIndex = index === 0 ? playlist.length - 1 : index - 1
    } else if (loopMode === 2) {
      prevIndex = index === 0 ? playlist.length - 1 : index - 1
    } else {
      prevIndex = this.getRandomIndex()
    }

    this.play(prevIndex)

  },

  play (index = -1) {
    index >= 0 ? this.index(index, true) : window.player.play()
  },

  pause () {
    window.player.pause()
  },

  volume (volume = -1) {

    const store = window.store
    const player = window.player

    if (volume >= 0) {
      volume = Math.min(1, volume)
      store.dispatch('changeVolume', volume)
      player.volume = volume
    }

    return player.volume

  },

  muted (muted) {

    const store = window.store
    const player = window.player

    if (muted !== undefined) {
      player.muted = !!muted
      store.dispatch('setMuted', muted)
    }

    return player.muted

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

    const store = window.store

    if (mode > 0) {
      store.dispatch('changeLoopMode', Math.min(3, Math.ceil(mode)))
    }

    return store.state.status.loopMode

  },

  progress (progress = -1) {

    const player = window.player

    if (progress >= 0) {
      player.currentTime = player.duration * Math.min(1, progress)
    }

    return player.currentTime / player.duration

  },

  getRandomIndex () {
    return Math.floor(Math.random() * window.store.state.playlist.length)
  }

}
