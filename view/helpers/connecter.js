import player from '@/player'

export default {

  initialize () {

    window.electron.ipcRenderer.on(window.remoteConfig.communication.mainChannel, (event, payload) => {
      switch (payload.action) {
        case 'play':
          player.play(payload.param)
          break
        case 'pause':
          player.pause()
          break
        case 'next':
          player.next()
          break
        case 'prev':
          player.prev()
          break
        case 'enter-full-screen':
          window.store.dispatch('setTempStatus', {
            isFullScreen: true
          })
          break
        case 'leave-full-screen':
          window.store.dispatch('setTempStatus', {
            isFullScreen: false
          })
          break
      }
    })

  },

  syncAppState (state) {
    window.electron.ipcRenderer.send(window.remoteConfig.communication.mainChannel, state)
  }

}
