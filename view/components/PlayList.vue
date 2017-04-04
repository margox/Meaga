<template>
  <div class="play-list-wrap">
    <template v-if="menuIs('playlist') || menuIs('artist') || menuIs('album')">
      <ul v-if="list.items.length" class="play-list">
        <li v-for="(song, index) in list.items" v-on:contextmenu="handleRightClick(song.id)" v-on:dblclick="play(song.id)" :class="{current: isCurrent('song', song.id)}">
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
    </template>
    <template v-if="menuIs('artists')">
      <ul class="artist-list">
        <li v-for="(artist, index) in this.$store.getters.artists" v-on:dblclick="showSongsOfArtist(artist.name)" :class="{current: isCurrent('artist', artist.name)}">
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
        <li v-for="(album, index) in this.$store.getters.albums" v-on:dblclick="showSongsOfAlbum(album.name)" :class="{current: isCurrent('album', album.name)}">
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
      return this.$store.getters.currentDisplayList
    },
    player () {
      return player
    },
    progress () {
      return this.$store.getters.progress
    },
    ...mapState(['tempStatus', 'status'])
  },
  components: {
    PlayingBadge,
    DragImporter,
    ProgressCircle
  },
  mounted () {
    const { Menu, MenuItem } = window.electron.remote
    this.menu = new Menu()
    this.menu.append(new MenuItem({
      label: '播放该曲目',
      click: () => {
        this.play(this.rightClickedItemId)
      }
    }))
    this.menu.append(new MenuItem({
      label: '删除该曲目',
      click: () => {
        player.remove(this.rightClickedItemId)
      }
    }))
    this.menu.append(new MenuItem({
      label: '清空播放列表',
      click: () => {
        confirm('确认清空播放列表吗？这个操作不可撤销') && player.clear()
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
  overflow: auto;
  background-color: rgba(#000, .15);
  user-select: none;
}

.play-list,
.artist-list,
.album-list{
  display: block;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;

  li{
    position: relative;
    display: block;
    height: 50px;
    padding: 0;
    &:nth-child(odd){
      background-color: rgba(#000, .1);
    }
    &:hover{
      background-color: rgba(#000, .15);
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
