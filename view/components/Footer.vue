<template>
  <div v-on:dblclick="toggleVisualizer" class="footer">
    <SongMetas />
    <ProgressBar />
    <ControlPanel />
  </div>
</template>
<script>
import player from '@/player'
import SongMetas from '@/components/SongMetas'
import ProgressBar from '@/components/ProgressBar'
import ControlPanel from '@/components/ControlPanel'

export default {
  name: 'footer',
  components: {
    SongMetas,
    ProgressBar,
    ControlPanel
  },
  methods: {
    toggleVisualizer () {
      this.$store.state.status.visualize ? player.pauseVisualizer() : player.danceVisualizer()
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  height: 80px;
  background-color: rgba(#000, .2);
  user-select: none;
}
</style>
