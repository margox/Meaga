<template>
  <div id="app">
    <PlayerBody />
    <PlayerFoot />
    <Visualizer />
  </div>
</template>
<script>
import player from '@/player'
import appMenu from '@/helpers/appMenu'
import connecter from '@/helpers/connecter'
import dataStorage from '@/helpers/dataStorage'
import fileImporter from '@/helpers/fileImporter'
import PlayerBody from '@/components/Content'
import PlayerFoot from '@/components/Footer'
import Visualizer from '@/components/Visualizer'

export default {
  name: 'app',
  components: {
    PlayerBody,
    PlayerFoot,
    Visualizer
  },
  created () {

    this.$store.dispatch('sync', dataStorage.getAppData())
    this.$store.subscribe((mutation, state) => {
      dataStorage.saveAppData(state)
      // window.platform === 'darwin' && connecter.syncAppState(state.status, state.tempStatus, this.$store.getters.currentPlaylist)
    })

    player.initialize()
    fileImporter.initialize()

    if (window.platform === 'darwin') {
      appMenu.initialize()
      connecter.initialize()
    }

  }
}
</script>
<style lang="scss">
@import '~scssbase';

#app {
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  overflow: hidden;
  background-color: $color_background;
  box-shadow: inset 0 0 0 .5px rgba(#000, .4);
  opacity: 0;
  transition: transform .4s, opacity .4s;
  transform: translateY(10px);
  &.loaded {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
