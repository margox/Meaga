<template>
  <div class="content">
    <PlayList />
  </div>
</template>
<script>
import PlayList from '@/components/PlayList'

export default {
  name: 'content',
  components: {
    PlayList
  }
}
</script>
<style lang="scss">
.content{
  position: absolute;
  z-index: 1;
  top: 50px;
  right: 0;
  bottom: 80px;
  left: 0;
  padding: 30px 80px;
}
</style>
