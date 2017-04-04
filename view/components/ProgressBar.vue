<template>
  <div v-on:click="setProgress" class="progress-bar">
    <div class="total">
      <div class="played" :style="{width: progress + '%'}"></div>
    </div>
    <button class="handle" :style="{left: progress + '%'}"></button>
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
  z-index: 2;
  top: 37px;
  right: 175px;
  left: 170px;
  height: 6px;
}
.total{
  height: 6px;
  overflow: hidden;
  background-color: rgba(#fff, .05);
  border-radius: 3px;
}
.played{
  width: 0%;
  height: 6px;
  background-color: $color_primary;
}
.handle{
  position: absolute;
  top: -3px;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: #d8d8d8;
  border: none;
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
