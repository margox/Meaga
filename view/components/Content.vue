<template>
  <div class="content">
    <Sidebar />
    <PlayList />
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
import PlayList from '@/components/PlayList'

export default {
  name: 'content',
  components: {
    Sidebar,
    PlayList
  }
}
</script>
<style lang="scss">
.content{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 79px;
  left: 0;
  padding: 30px 80px;
}
</style>
