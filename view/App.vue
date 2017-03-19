<template>
  <div id="app">
    <PlayerHead />
    <PlayerList />
    <PlayerFoot />
  </div>
</template>
<script>
import electron from 'electron'
import dataStorage from '@/helpers/dataStorage'
import PlayerHead from '@/components/Header'
import PlayerList from '@/components/Content'
import PlayerFoot from '@/components/Footer'

const remoteFunctions = electron.remote.require('./functions')

// setting global objects
window.electron = electron
window.remoteFunctions = remoteFunctions

export default {
  name: 'app',
  components: {
    PlayerHead,
    PlayerList,
    PlayerFoot
  },
  created () {
    this.$store.dispatch('sync', dataStorage.getAppData())
    this.$store.subscribe((mutation, state) => {
      dataStorage.saveAppData(state)
    })
  }
}
</script>
<style lang="scss">
@import '~scssbase';
#app {
  height: 100%;
}
</style>
