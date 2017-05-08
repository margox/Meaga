<template>
  <div class="play-list-wrap">
    <ListControls />
    <template v-if="menuIs('playlist') || menuIs('artist') || menuIs('album')">
      <ul v-if="list.length" class="play-list">
        <li v-for="(song, index) in list" v-on:contextmenu="handleRightClick(song.id)" v-on:dblclick="play(song.id)" :class="{current: isCurrent('song', song.id)}">
          <div class="metas">
            <span v-if="isCurrent('song', song.id)" class="bagde"><PlayingBadge /></span>
            <span v-else class="index">{{index + 1}}</span>
            <span class="name">{{song.name}}</span>
            <span class="artist">{{song.metas.artist}}</span>
            <span class="album">{{song.metas.album}}</span>
          </div>
          <div class="operates">
            <a href="javascript:void(0);" v-on:click="toggleFavorite(song.id, !song.favorite)">
              <i v-if="song.favorite" class="icon active">favorite</i>
              <i v-else class="icon">favorite_border</i>
            </a>
          </div>
        </li>
      </ul>
      <template v-if="menuIs('playlist') && !list.length && !this.filters.keyword">
        <DragImporter />
      </template>
    </template>
    <template v-if="menuIs('artists')">
      <ul class="artist-list">
        <li v-for="(artist, index) in artists" v-on:dblclick="showSongsOfArtist(artist.name)" :class="{current: isCurrent('artist', artist.name)}">
          <div class="metas">
            <span v-if="isCurrent('artist', artist.name)" class="bagde"><PlayingBadge /></span>
            <span v-else class="index">{{index + 1}}</span>
            <span class="name">{{artist.name}}</span>
            <span class="count">歌曲: {{artist.count}}</span>
          </div>
        </li>
      </ul>
    </template>
    <template v-if="menuIs('albums')">
      <ul class="album-list">
        <li v-for="(album, index) in albums" v-on:dblclick="showSongsOfAlbum(album.name)" :class="{current: isCurrent('album', album.name)}">
          <div class="metas">
            <span v-if="isCurrent('album', album.name)" class="bagde"><PlayingBadge /></span>
            <span v-else class="index">{{index + 1}}</span>
            <span class="name">{{album.name}}</span>
            <span class="count">歌曲: {{album.count}}</span>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import player from '@/player'
import PlayingBadge from '@/components/PlayingBadge'
import DragImporter from '@/components/DragImporter'
import ListControls from '@/components/ListControls'
import ProgressCircle from '@/components/ProgressCircle'

export default {
  name: 'play-list',
  methods: {
    menuIs (value) {
      return this.status.currentMenu.type === value
    },
    play (id) {
      this.$store.dispatch('setCurrentPlaylist', this.status.currentMenu)
      player.play(id)
    },
    isCurrent (type, value) {
      if (type === 'song') {
        return value === this.status.currentSongId && this.status.currentMenu.type === this.status.currentPlaylist.type && this.status.currentMenu.value === this.status.currentPlaylist.value
      } else {
        return value === this.status.currentPlaylist.value && type === this.status.currentPlaylist.type
      }
    },
    showSongsOfArtist (value) {
      this.$store.dispatch('setCurrentMenu', { type: 'artist', value })
    },
    showSongsOfAlbum (value) {
      this.$store.dispatch('setCurrentMenu', { type: 'album', value })
    },
    handleRightClick (id) {
      this.rightClickedItemId = id
      this.menu.popup()
    },
    toggleFavorite (id, favorite) {
      this.$store.dispatch('setFavorite', { id, favorite })
    }
  },
  computed: {
    list () {
      let { keyword } = this.filters
      let { currentDisplayList } = this.$store.getters
      return keyword ? currentDisplayList.items.filter(item => {
        return item.name.toLowerCase().indexOf(keyword) > -1 ||
          item.metas.artist.toLowerCase().indexOf(keyword) > -1 ||
          item.metas.album.toLowerCase().indexOf(keyword) > -1
      }) : currentDisplayList.items
    },
    artists () {
      let { keyword } = this.filters
      let { artists } = this.$store.getters
      return keyword ? artists.filter(item => item.name.toLowerCase().indexOf(keyword) > -1) : artists
    },
    albums () {
      let { keyword } = this.filters
      let { albums } = this.$store.getters
      return keyword ? albums.filter(item => item.name.toLowerCase().indexOf(keyword) > -1) : albums
    },
    player () {
      return player
    },
    progress () {
      return this.$store.getters.progress
    },
    ...mapState(['tempStatus', 'status', 'filters'])
  },
  components: {
    PlayingBadge,
    DragImporter,
    ListControls,
    ProgressCircle
  },
  mounted () {
    const { Menu, MenuItem } = window.electron.remote
    this.menu = new Menu()
    this.menu.append(new MenuItem({
      label: 'Play',
      click: () => {
        this.play(this.rightClickedItemId)
      }
    }))
    this.menu.append(new MenuItem({
      label: 'Remove',
      click: () => {
        player.remove(this.rightClickedItemId)
      }
    }))
    this.menu.append(new MenuItem({
      label: 'Clear Songs',
      click: () => {
        confirm('Sure to remove all of the songs?') && player.clear()
      }
    }))
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.play-list-wrap{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 200px;
  padding-top: 60px;
  overflow: auto;
  user-select: none;
}

.play-list,
.artist-list,
.album-list{
  display: block;
  height: 100%;
  margin: 0;
  padding: 0 0 10px 0;
  overflow: auto;

  li{
    position: relative;
    display: block;
    height: 50px;
    padding: 0;
    // box-shadow: inset 0 -.5px 0 rgba(#000, .2);
    &:nth-child(even){
      background-color: rgba(#000, .05);
    }
    &:hover{
      background-color: rgba(#fff, .03);
    }
    &.current{
      background-color: rgba(#fff, .05);
    }
    &.current .metas span{
      color: $color_primary;
    }
    .metas{
      height: 50px;
      text-transform: capitalize;
      cursor: default;
      span{
        height: 50px;
        display: block;
        float: left;
        overflow: hidden;
        color: rgba(#fff, .45);
        font-size: 12px;
        line-height: 50px;
        text-overflow: ellipsis;
        text-transform: capitalize;
        white-space: nowrap;
      }
      .bagde{
        width: 50px;
        > div{
          margin: 18px 0 0 16px;
        }
      }
      .index{
        width: 50px;
        font-weight: bold;
        text-align: center;
      }
      .name{
        width: 35%;
        padding-right: 20px;
      }
      .artist,
      .album{
        width: 25%;
        padding-right: 20px;
      }
    }
    .operates{
      position: absolute;
      top: 0;
      right: 0;
      height: 50px;
      a{
        display: block;
        width: 50px;
        height: 50px;
        color: rgba(#fff, .5);
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        .active{
          color: #e74c3c;
        }
      }
    }
  }
}

.artist-list,
.album-list{
  li .metas{
    .name{
      width: 70%;
      font-weight: bold;
    }
    .count{
      width: 15%;
      font-weight: bold;
    }
  }
}
</style>
