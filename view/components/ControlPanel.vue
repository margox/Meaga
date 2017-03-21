<template>
  <div class="control-panel">
    <div class="play-controls">
      <a v-on:click="prev()" href="javascript:void(0);" class="button btn-prev"><i class="icon">skip_previous</i></a>
      <a v-if="tempStatus.playing" v-on:click="pause()" href="javascript:void(0);" class="button btn-play"><i class="icon">pause</i></a>
      <a v-else v-on:click="play()" href="javascript:void(0);" class="button btn-play"><i class="icon">play_arrow</i></a>
      <a  v-on:click="next()" href="javascript:void(0);" class="button btn-next"><i class="icon">skip_next</i></a>
    </div>
    <div class="volume-controls">
      <a v-on:mousewheel="scrollVolume" v-on:click="toggleMute()" href="javascript:void(0);" class="button btn-mute"><i class="icon">{{volumeIcon}}</i></a>
      <div v-on:click="changeVolume" class="volume-bar">
        <div class="current-volume" :style="{width: status.volume * 100 + '%'}"></div>
      </div>
    </div>
    <div class="mode-controls">
      <a v-on:click="changeLoopMode(3)" href="javascript:void(0);" class="button" :class="{active : loopMode.isShuffle}"><i class="icon">shuffle</i></a>
      <a v-on:click="changeLoopMode(1)" href="javascript:void(0);" class="button" :class="{active : loopMode.isList}"><i class="icon">repeat</i></a>
      <a v-on:click="changeLoopMode(2)" href="javascript:void(0);" class="button" :class="{active : loopMode.isSingle}"><i class="icon">repeat_one</i></a>
    </div>
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
    changeLoopMode (mode) {
      player.loopMode(mode)
    },
    toggleMute () {
      player.muted(!this.status.muted)
    },
    changeVolume (event) {
      const pos = event.currentTarget.getBoundingClientRect()
      player.volume((event.clientX - pos.left) / pos.width)
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
      return {
        isSingle: this.status.loopMode === 2,
        isList: this.status.loopMode === 1,
        isShuffle: this.status.loopMode === 3
      }
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
  overflow: hidden;
}

.button{
  float: left;
  display: block;
  padding: 0;
  border: none;
  text-align: center;
  text-decoration: none;
  transition: .3s;
}

.play-controls{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 160px;
  height: 50px;
  margin: 15px auto;
  .button{
    border-radius: 50%;
    font-size: 24px;
  }
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

.volume-controls{
  position: absolute;
  top: 0;
  right: 142px;
  height: 30px;
  margin-top: 25px;
}
.btn-mute{
  width: 30px;
  height: 30px;
  margin-right: 10px;
  color: rgba(#fff, .5);
  font-size: 20px;
  line-height: 30px;
  &:hover{
    color: $color_primary;
  }
}
.volume-bar{
  float: left;
  display: none;
  width: 80px;
  height: 6px;
  margin: 12px 0;
  overflow: hidden;
  background-color: rgba(#fff, .1);
  @include respond-to(sm) {
    display: block;
  }
}
.current-volume{
  height: 6px;
  background-color: rgba(#fff, .5);
}

.mode-controls{
  position: absolute;
  top: 0;
  right: 20px;
  height: 30px;
  margin-top: 25px;
  overflow: hidden;
  border-radius: 3px;
  .button{
    width: 30px;
    height: 30px;
    margin-right: 1px;
    background-color: rgba(#fff, .1);
    color: rgba(#000, .3);
    font-size: 18px;
    line-height: 30px;
    &:last-child{
      margin-right: 0;
    }
    &:hover{
      color: rgba(#fff, .5);
    }
    &.active{
      color: rgba(#fff, .5);
    }
  }
}
</style>
