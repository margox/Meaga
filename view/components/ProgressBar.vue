<template>
  <div v-on:click="setProgress" class="progress-bar">
    <div class="progress-played" :style="{width: progress + '%'}"></div>
  </div>
</template>
<script>
import player from '@/player'

export default{
  name: 'progress-bar',
  computed: {
    progress () {
      return this.$store.getters.progress * 100
    }
  },
  methods: {
    setProgress (event) {
      const pos = event.currentTarget.getBoundingClientRect()
      player.progress((event.clientX - pos.left) / pos.width)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.progress-bar{
  position: absolute;
  top: -8px;
  right: 0;
  left: 0;
  height: 8px;
  border-top: solid 7px transparent;
  &:hover{
    background-color: rgba(#000, .3);
    border-top-width: 0;
  }
}
.progress-played{
  width: 0%;
  height: 100%;
  background-color: rgba($color_primary, .6);
}
</style>
