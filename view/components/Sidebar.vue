<template>
  <div class="sidebar">
    <TrafficLights />
    <h5 class="caption">Musics</h5>
    <a v-on:click="showPlaylist(1)" :class="{current: isCurrent('playlist', 1)}" class="item" href="javascript:void(0);">
      <i class="icon">headset</i>
      <span>All Songs</span>
      <div v-if="isPlaying('playlist', 1)" class="badge"><PlayingBadge /></div>
    </a>
    <a v-on:click="showPlaylist(3)" :class="{current: isCurrent('playlist', 3)}" class="item" href="javascript:void(0);">
      <i class="icon">favorite</i>
      <span>Favorites</span>
      <div v-if="isPlaying('playlist', 3)" class="badge"><PlayingBadge /></div>
    </a>
    <a v-on:click="showArtists()" :class="{current: isCurrent('artists') || isCurrent('artist')}" class="item" href="javascript:void(0);">
      <i class="icon">face</i>
      <span>Artists</span>
      <div v-if="isPlaying('artist')" class="badge"><PlayingBadge /></div>
    </a>
    <a v-on:click="showAlbums()" :class="{current: isCurrent('albums') || isCurrent('album')}" class="item" href="javascript:void(0);">
      <i class="icon">album</i>
      <span>Albums</span>
      <div v-if="isPlaying('album')" class="badge"><PlayingBadge /></div>
    </a>
    <!-- <h5 class="caption">Playlists</h5>
    <a v-on:click="showPlaylist(2)" :class="{current: isCurrent('playlist', 2)}" class="item" href="javascript:void(0);">
      <i class="icon">menu</i>
      <span>Default</span>
      <div v-if="isPlaying('playlist', 2)" class="badge"><PlayingBadge /></div>
    </a> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PlayingBadge from '@/components/PlayingBadge'
import TrafficLights from '@/components/TrafficLights'

export default {
  name: 'sidebar',
  data () {
    return {
      defaultFilters: {
        favorite: false,
        artils: null,
        album: null,
        keyword: null
      }
    }
  },
  computed: {
    ...mapState(['status', 'filters'])
  },
  methods: {
    isCurrent (type, value) {
      if (value) {
        return this.status.currentMenu.type === type && this.status.currentMenu.value === value
      } else {
        return this.status.currentMenu.type === type
      }
    },
    isPlaying (type, value) {
      if (value) {
        return this.status.currentPlaylist.type === type && this.status.currentPlaylist.value === value
      } else {
        return this.status.currentPlaylist.type === type
      }
    },
    showPlaylist (value) {
      let type = 'playlist'
      this.$store.dispatch('setCurrentMenu', { type, value })
    },
    showArtists () {
      this.$store.dispatch('setCurrentMenu', {
        type: 'artists'
      })
    },
    showAlbums () {
      this.$store.dispatch('setCurrentMenu', {
        type: 'albums'
      })
    }
  },
  components: {
    PlayingBadge,
    TrafficLights
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.sidebar{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  padding: 60px 0 0 0;
  overflow: hidden;
  box-shadow: inset -.5px 0 0 rgba(#000, .4);
}
.caption{
  margin: 25px 0 15px 0;
  padding: 0 20px;
  color: rgba(#fff, .25);
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
  & + .item{
    // box-shadow: inset 0 .5px 0 rgba(#000, .2), inset 0 -.5px 0 rgba(#000, .2);
  }
}
.item{
  display: block;
  height: 40px;
  padding: 0 20px;
  color: rgba(#fff, .45);
  line-height: 40px;
  // box-shadow: inset 0 -.5px 0 rgba(#000, .2);
  &:hover{
    background-color: rgba(#000, .05);
  }
  &.current{
    // background-color: rgba(#000, .1);
    color: $color_primary;
  }
  i{
    float: left;
    font-size: 16px;
  }
  span{
    float: left;
    padding-left: 10px;
    font-size: 12px;
  }
  .badge{
    display: block;
    float: right;
    margin-top: 13px;
  }
}
</style>
