<template>
  <div class="footer">
    <SongMetas />
    <ControlPanel />
  </div>
</template>
<script>
import SongMetas from '@/components/SongMetas'
import ControlPanel from '@/components/ControlPanel'

export default {
  name: 'footer',
  components: {
    SongMetas,
    ControlPanel
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
  background-color: rgba(#000, .4);
  box-shadow: inset 0 .5px 0 rgba(#000, .8);
  user-select: none;
}
</style>
