<template>
  <div class="loading" :class="[{ show }, className]">
    <i class="circle-red"></i>
    <i class="circle-blue"></i>
    <i class="circle-green"></i>
    <i class="circle-orange"></i>
  </div>
</template>
<script>
export default {
  name: 'circle-loading',
  props: ['show', 'className']
}
</script>
<style lang="scss">
@import '~scssbase';

.loading{
  position: relative;
  opacity: 0;
  transition: opacity .5s;
  &.show{
    opacity: 1;
  }
}
.circle-red,
.circle-blue,
.circle-green,
.circle-orange{
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid;
  border-radius: 50%;
  opacity: .8;
  animation: rotate 2s infinite linear;
}
.circle-red{
  border-color: #e74c3c;
  transform-origin: 48% 48%;
  animation-delay: 0;
}
.circle-blue{
  border-color: #3488db;
  transform-origin: 48% 52%;
  animation-delay: .2s;
}
.circle-green{
  border-color: #f39c12;
  transform-origin: 52% 48%;
  animation-delay: .4s;
}
.circle-orange{
  border-color: $color_primary;
  transform-origin: 52% 52%;
  animation-delay: .6s;
}
@keyframes rotate{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
