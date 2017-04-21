<template>
  <div class="control-panel">
    <div class="play-controls">
      <a v-on:click="prev()" href="javascript:void(0);" class="button btn-prev"><i class="icon">skip_previous</i></a>
      <a v-if="tempStatus.playing" v-on:click="pause()" href="javascript:void(0);" class="button btn-play"><i class="icon">pause</i></a>
      <a v-else v-on:click="play()" href="javascript:void(0);" class="button btn-play"><i class="icon">play_arrow</i></a>
      <a  v-on:click="next()" href="javascript:void(0);" class="button btn-next"><i class="icon">skip_next</i></a>
    </div>
    <ProgressBar />
    <a v-on:click="toggleFavorite()" href="javascript:void(0);" class="small-button btn-toggle-favorite">
      <i v-if="currentSong.favorite" class="icon active">favorite</i>
      <i v-else class="icon">favorite_border</i>
    </a>
    <div v-on:mousewheel="scrollVolume" class="volume-controls">
      <a v-on:click="toggleMute()" href="javascript:void(0);" class="small-button btn-mute"><i class="icon">{{volumeIcon}}</i></a>
      <div class="volume-bar-wrap">
        <div v-on:click="setVolume" class="volume-bar">
          <div class="current-volume" :style="{height: status.volume * 100 + '%'}"></div>
        </div>
      </div>
    </div>
    <!-- <a v-on:click="toggleVisualizer()" href="javascript:void(0);" :class="{off: !$store.state.status.visualize}" class="small-button btn-toggle-visualizer"><i class="icon">equalizer</i></a> -->
    <a v-on:click="setLoopMode()" href="javascript:void(0);" class="small-button btn-set-mode"><i class="icon">{{loopMode}}</i></a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import player from '@/player'
import ProgressBar from '@/components/ProgressBar'

export default {
  name: 'control-panel',
  methods: {
    play () {
      player.play()
    },
    pause () {
      player.pause()
    },
    prev () {
      player.prev()
    },
    next () {
      player.next()
    },
    setLoopMode () {
      let { loopMode } = this.status
      player.loopMode(loopMode < 3 ? loopMode + 1 : 1)
    },
    toggleFavorite () {
      this.$store.dispatch('setFavorite', {
        id: this.currentSong.id,
        favorite: !this.currentSong.favorite
      })
    },
    toggleVisualizer () {
      this.$store.state.status.visualize ? player.pauseVisualizer() : player.danceVisualizer()
    },
    toggleMute () {
      player.muted(!this.status.muted)
    },
    setVolume (event) {
      const pos = event.currentTarget.getBoundingClientRect()
      player.volume((pos.top + pos.height - event.clientY) / pos.height)
    },
    scrollVolume (event) {
      let volume = player.volume() * 1000000
      if (event.deltaY < 0) {
        volume < 1000000 && (volume += 50000)
      } else {
        volume > 0 && (volume -= 50000)
      }
      volume > 1000000 && (volume = 1000000)
      volume < 0 && (volume = 0)
      player.volume(volume / 1000000)
    }
  },
  computed: {
    volumeIcon () {
      const { muted, volume } = this.status
      if (muted || volume === 0) {
        return 'volume_off'
      } else if (volume < 0.05) {
        return 'volume_mute'
      } else if (volume < 0.6) {
        return 'volume_down'
      } else {
        return 'volume_up'
      }
    },
    loopMode () {
      return ['repeat', 'repeat_one', 'shuffle'][this.status.loopMode - 1]
    },
    currentSong () {
      return this.$store.getters.currentSong
    },
    ...mapState(['tempStatus', 'status', 'playlist'])
  },
  components: {
    ProgressBar
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.control-panel{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 220px;
  height: 80px;
}

.play-controls{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 166px;
  height: 80px;
}
.button{
  float: left;
  display: block;
  width: 42px;
  height: 42px;
  margin: 19px 10px 0 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: rgba(#fff, .1);
  color: rgba(#fff, .5);
  font-size: 20px;
  line-height: 42px;
  text-align: center;
  transition: .3s;
  &:hover{
    background-color: rgba(#fff, .2);
    color: #fff;
  }
}

.small-button{
  display: block;
  width: 30px;
  height: 30px;
  color: rgba(#fff, .5);
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}

.volume-controls{
  position: absolute;
  top: 0;
  right: 20px;
  width: 30px;
  height: 30px;
  margin-top: 25px;
  &:hover{
    .volume-bar-wrap{
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }
}
.btn-mute{
  position: relative;
  z-index: 2;
}
.volume-bar-wrap{
  position: absolute;
  z-index: 0;
  top: -100px;
  left: 0;
  width: 30px;
  height: 134px;
  margin: 0;
  overflow: hidden;
  background-color: rgba(#000, .4);
  border-radius: 3px 3px 0 0;
  box-shadow: inset 0 0 0 .5px rgba(#000, .6);
  opacity: 0;
  pointer-events: none;
  transition: .3s;
  transform: translateY(-10px);
}
.volume-bar{
  position: relative;
  width: 6px;
  height: 80px;
  margin: 12px;
  background-color: rgba(#fff, .1);
  border-radius: 3px;
}
.current-volume{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 6px;
  background-color: $color_primary;
  border-radius: 3px;
}
.btn-set-mode,
.btn-toggle-favorite,
.btn-toggle-visualizer{
  position: absolute;
  top: 25px;
}
.btn-set-mode{
  right: 55px;
}
.btn-toggle-favorite{
  right: 90px;
  .active{
    color: #e74c3c;
  }
}
.btn-toggle-visualizer{
  right: 90px;
  &.off{
    color: rgba(#fff, .15);
  }
}
</style>
