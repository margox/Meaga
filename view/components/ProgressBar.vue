<template>
  <div class="progress-bar">
    <div class="progress-played"></div>
  </div>
</template>
<script>
export default{
  name: 'progress-bar'
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
    background-color: rgba(#000, .5);
    border-top-width: 0;
  }
}
.progress-played{
  width: 0%;
  height: 100%;
  background-color: rgba($color_primary, .6);
}
</style>
