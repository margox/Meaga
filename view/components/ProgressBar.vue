<template>
  <div
    v-on:mousedown="handleMouseDown"
    v-on:mouseup="handleMouseUp"
    v-on:mousemove="handleMouseMove"
    class="progress-bar">
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
  data () {
    return {
      clientRect: {},
      dragStartX: 0,
      dragProgress: 0,
      draging: false
    }
  },
  computed: {
    progress () {
      return this.draging ? this.dragProgress * 100 : this.$store.getters.progress * 100
    }
  },
  methods: {
    setProgress (event) {
      const pos = event.currentTarget.getBoundingClientRect()
      player.progress((event.clientX - pos.left) / pos.width)
    },
    handleMouseDown (event) {
      this.draging = true
      this.clientRect = event.currentTarget.getBoundingClientRect()
      this.dragProgress = (event.clientX - this.clientRect.left) / this.clientRect.width
      this.dragStartX = this.progress
    },
    handleMouseMove (event) {
      if (this.draging) {
        let progress = (event.clientX - this.clientRect.left) / this.clientRect.width
        this.dragProgress = progress < 0 ? 0 : (progress > 1 ? 1 : progress)
      }
    },
    handleMouseUp (event) {
      player.progress(this.dragProgress)
      setTimeout(() => {
        this.draging = false
      }, 50)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.progress-bar{
  position: absolute;
  z-index: 2;
  top: 20px;
  right: 175px;
  left: 170px;
  height: 40px;
}
.total{
  height: 6px;
  margin-top: 17px;
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
  top: 14px;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: #d8d8d8;
  border: none;
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
