<template>
  <svg class="progress-circle">
    <circle class="circle" :cx="radius + 0.5" :cy="radius + 0.5" :r="radius" stroke-width="1"></circle>
    <circle class="played" :cx="radius + 0.5" :cy="radius + 0.5" :r="radius" stroke-width="1" :stroke-dasharray="dasharray"></circle>
  </svg>
</template>
<script>
const sizeRadius = {
  'small': 23,
  'medium': 29,
  'large': 99
}

export default {
  name: 'progress-circle',
  props: ['progress', 'size'],
  computed: {
    radius () {
      return (sizeRadius[this.size] || 23)
    },
    dasharray () {
      const circlePerimeter = 2 * 3.141592654 * this.radius
      return circlePerimeter * this.progress + ' ' + circlePerimeter
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.progress-circle{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  fill: none;
  transform: rotate(-89.5deg);
  line-height: 0;
  circle{
    display: block;
  }
  &:hover{
    .circle{
      stroke: rgba(#fff, .5);
    }
  }
  .circle{
    fill: none;
    stroke: rgba(#fff, .1);
  }
  .played{
    fill: none;
    stroke: $color_primary;
  }
}
</style>
