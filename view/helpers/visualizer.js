import Vudio from 'vudio.js'

export default {

  initialize (audio, canvas) {

    if (window.visualizer) {
      return false
    }

    const visualizer = new Vudio(audio, canvas, {
      accuracy: 512,
      width: 1024,
      height: 160,
      waveform: {
        maxHeight: 160,
        minHeight: 0,
        spacing: 1,
        color: 'rgba(255,255,255,.3)',
        verticalAlign: 'bottom'
      }
    })
    window.visualizer = visualizer

    if (window.store.state.status.visualize) {
      visualizer.dance()
    }

    return visualizer

  }

}
