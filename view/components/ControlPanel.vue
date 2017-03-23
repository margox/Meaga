<template>
  <div class="control-panel">
    <div class="play-controls">
      <a v-on:click="prev()" href="javascript:void(0);" class="button btn-prev"><i class="icon">skip_previous</i></a>
      <a v-if="tempStatus.playing" v-on:click="pause()" href="javascript:void(0);" class="button btn-play"><i class="icon">pause</i></a>
      <a v-else v-on:click="play()" href="javascript:void(0);" class="button btn-play"><i class="icon">play_arrow</i></a>
      <a  v-on:click="next()" href="javascript:void(0);" class="button btn-next"><i class="icon">skip_next</i></a>
    </div>
    <div v-on:mousewheel="scrollVolume" class="volume-controls">
      <a v-on:click="toggleMute()" href="javascript:void(0);" class="small-button btn-mute"><i class="icon">{{volumeIcon}}</i></a>
      <div class="volume-bar-wrap">
        <div v-on:click="setVolume" class="volume-bar">
          <div class="current-volume" :style="{height: status.volume * 100 + '%'}"></div>
        </div>
      </div>
    </div>
    <a v-on:click="toggleVisualizer()" href="javascript:void(0);" :class="{off: !$store.state.status.visualize}" class="small-button btn-toggle-visualizer"><i class="icon">equalizer</i></a>
    <a v-on:click="setLoopMode()" href="javascript:void(0);" class="small-button btn-set-mode"><i class="icon">{{loopMode}}</i></a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import player from '@/player'

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
    ...mapState(['tempStatus', 'status', 'playlist'])
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
  left: 0;
  width: 100%;
  height: 80px;
}

.play-controls{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 160px;
  height: 50px;
  margin: 15px auto;
}
.button{
  float: left;
  display: block;
  padding: 0;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  text-align: center;
  transition: .3s;
}
.btn-next,
.btn-prev{
  width: 40px;
  height: 40px;
  margin: 5px 0;
  background-color: rgba(#fff, .1);
  color: rgba(#fff, .5);
  line-height: 40px;
  &:hover{
    background-color: rgba(#fff, .2);
    color: #fff;
  }
}
.btn-play{
  width: 50px;
  height: 50px;
  margin: 0 15px;
  background-color: $color_primary;
  color: rgba(#fff, 1);
  line-height: 50px;
  &:hover{
    background-color: $color_primary - 40;
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
  &:hover{
    background-color: rgba(#000, .2);
  }
}

.volume-controls{
  position: absolute;
  top: 0;
  right: 20px;
  width: 30px;
  height: 30px;
  margin-top: 25px;
  &:hover{
    .btn-mute{
      background-color: rgba(#000, .2);
    }
    .volume-bar-wrap{
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }
}
.volume-bar-wrap{
  position: absolute;
  top: -103px;
  left: 0;
  width: 30px;
  height: 104px;
  margin: 0;
  overflow: hidden;
  border: solid 12px rgba(#000, .2);
  opacity: 0;
  pointer-events: none;
  transition: .3s;
  transform: translateY(-10px);
}
.volume-bar{
  position: relative;
  width: 30px;
  height: 80px;
  background-color: rgba(#fff, .1);
}
.current-volume{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 6px;
  background-color: rgba(#fff, .5);
}
.btn-set-mode,
.btn-toggle-visualizer{
  position: absolute;
  top: 25px;
}
.btn-set-mode{
  right: 55px;
}
.btn-toggle-visualizer{
  right: 90px;
  &.off{
    color: rgba(#fff, .15);
  }
}
</style>
