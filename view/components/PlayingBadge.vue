<template>
  <div class="playing-badge" :class="{paused: !playing}">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>
<script>
export default {
  name: 'playing-badge',
  computed: {
    playing () {
      return this.$store.state.tempStatus.playing
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~scssinc';

.playing-badge{
  width: 18px;
  height: 14px;
  overflow: hidden;
}
.bar1,
.bar2,
.bar3{
  float: left;
  width: 1px;
  height: 14px;
  margin: 0 2px;
  background-color: $color_primary;
  animation: move 1s infinite;
}
.paused{
  .bar1,
  .bar2,
  .bar3{
    animation-play-state: paused;
  }
}
.bar1{
  animation-delay: 0;
}
.bar2{
  animation-delay: .2s;
}
.bar3{
  animation-delay: .4s;
}
@keyframes move {
  0%{
    transform: translateY(0);
  }
  50%{
    transform: translateY(12px);
  }
  100%{
    transform: translateY(0);
  }
}
</style>
