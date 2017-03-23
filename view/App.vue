<template>
  <div id="app">
    <PlayerHead />
    <PlayerBody />
    <PlayerFoot />
    <Visualizer />
  </div>
</template>
<script>
import player from '@/player'
import dataStorage from '@/helpers/dataStorage'
import fileImporter from '@/helpers/fileImporter'
import PlayerHead from '@/components/Header'
import PlayerBody from '@/components/Content'
import PlayerFoot from '@/components/Footer'
import Visualizer from '@/components/Visualizer'

const electron = window.require('electron')
const remoteFunctions = electron.remote.require('./functions')

// setting global objects
window.electron = electron
window.remoteFunctions = remoteFunctions

export default {
  name: 'app',
  components: {
    PlayerHead,
    PlayerBody,
    PlayerFoot,
    Visualizer
  },
  created () {

    this.$store.dispatch('sync', dataStorage.getAppData())
    this.$store.subscribe((mutation, state) => {
      const { status, playlist } = state
      dataStorage.saveAppData({ status, playlist })
    })

    player.initialize()
    fileImporter.initialize()

  }
}
</script>
<style lang="scss">
@import '~scssbase';
#app {
  height: 100%;
  opacity: 0;
  transition: transform .4s, opacity .4s;
  transform: translateY(10px);
  &.loaded {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
