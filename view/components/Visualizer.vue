<template>
  <div class="visualizer" :class="{hide: hide}">
    <canvas width="1024" height="100" ref="canvas"></canvas>
  </div>
</template>
<script>
import visualizer from '@/helpers/visualizer'

export default {
  name: 'visualizer',
  mounted () {
    visualizer.initialize(window.player, this.$refs.canvas)
  },
  computed: {
    hide () {
      return !this.$store.state.status.visualize
    }
  }
}
</script>
<style lang="scss">

.visualizer{
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 1;
  width: 1024px;
  height: 100px;
  pointer-events: none;
  transform: translateX(-50%);
  &.hide{
    opacity: 0;
  }
  canvas{
    position: absolute;
    top: 0;
    left: 0;
    width: 1024px;
    height: 100px;
    background-color: transparent;
  }
}
</style>
