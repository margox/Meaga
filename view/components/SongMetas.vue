<template>
  <div v-if="current.src" class="song-metas">
    <div class="cover">
      <img :src="current.metas.cover" />
    </div>
    <div class="titles">
      <h3>{{current.name}}</h3>
      <h6>{{current.metas.artist}} / {{current.metas.album}}</h6>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'song-meta',
  computed: {
    current () {
      return this.playlist[this.status.index] || {}
    },
    ...mapState(['tempStatus', 'status', 'playlist'])
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.song-metas{
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  height: 80px;
  overflow: hidden;
}
.cover{
  float: left;
  width: 40px;
  height: 40px;
  margin: 20px 10px 0 20px;
  img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.titles{
  width: 120px;
  height: 32px;
  overflow: hidden;
  float: left;
  margin-top: 25px;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
  h3{
    color: rgba(#fff, .8);
    font-size: 14px;
    font-weight: bold;
    line-height: 15px;
  }
  h6{
    margin-top: 2px;
    color: rgba(#fff, .4);
    font-size: 12px;
    font-weight: lighter;
    line-height: 15px;
  }
}
</style>
