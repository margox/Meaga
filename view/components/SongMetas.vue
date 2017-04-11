<template>
  <div v-if="currentSong.src" class="song-metas">
    <div class="cover" :class="{paused: !playing}">
      <img :src="currentSong.metas.cover" />
    </div>
    <div class="titles">
      <h3>{{currentSong.name}}</h3>
      <h6>{{currentSong.metas.artist}} / {{currentSong.metas.album}}</h6>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'song-meta',
  computed: {
    playing () {
      return this.$store.state.tempStatus.playing
    },
    currentSong () {
      return this.$store.getters.currentSong
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
  width: 200px;
  height: 80px;
  padding-right: 20px;
  overflow: hidden;
  box-shadow: inset -.5px 0 0 rgba(#000, .4);
}
.cover{
  position: relative;
  float: left;
  width: 50px;
  height: 50px;
  margin: 15px 0 0 10px;
  overflow: hidden;
  animation: spin linear 4s infinite;
  &.paused{
    animation-play-state: paused;
  }
  &::before{
    position: absolute;
    top: 18px;
    left: 18px;
    width: 14px;
    height: 14px;
    background-color: #121212;
    border-radius: 50%;
    content: '';
  }
  img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: solid 2px #121212;
  }
}
@keyframes spin{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.titles{
  height: 32px;
  margin-top: 25px;
  margin-left: 70px;
  overflow: hidden;
  h3, h6{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  h3{
    color: $color_primary;
    font-size: 12px;
    font-weight: bold;
    line-height: 15px;
    text-transform: uppercase;
  }
  h6{
    margin-top: 2px;
    color: rgba(#fff, .8);
    font-size: 10px;
    font-weight: normal;
    line-height: 15px;
    text-transform: capitalize;
  }
}
</style>
