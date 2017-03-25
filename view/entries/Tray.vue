<template>
  <div class="tray-player">
    <template v-if="state.playlist">
      <div class="controls">
        <div class="play-controls">
          <a v-on:click="prev()" href="javascript:void(0);" class="button btn-prev"><i class="icon">skip_previous</i></a>
          <a v-if="state.tempStatus.playing" v-on:click="pause()" href="javascript:void(0);" class="button btn-play"><i class="icon">pause</i></a>
          <a v-else v-on:click="play()" href="javascript:void(0);" class="button btn-play"><i class="icon">play_arrow</i></a>
          <a v-on:click="next()" href="javascript:void(0);" class="button btn-next"><i class="icon">skip_next</i></a>
        </div>
      </div>
      <ul class="playlist">
        <li v-for="(song, index) in state.playlist" v-on:dblclick="play(song.id)" :class="{current: isCurrent(song.id)}">
          <div class="metas">
            <h3>{{song.name}}</h3>
            <h6>{{song.metas.artist}} / {{song.metas.album}}</h6>
          </div>
          <div class="operates">
            <template v-if="isCurrent(song.id)">
              <a v-if="state.tempStatus.playing" v-on:click="pause()" href="javascript:void(0);" class="button btn-play">
                <ProgressCircle size="tiny" :progress="progress"/>
                <i class="icon">pause</i>
              </a>
              <a v-else v-on:click="play()" href="javascript:void(0);" class="button btn-play">
                <ProgressCircle size="tiny" :progress="progress"/>
                <i class="icon">play_arrow</i>
              </a>
            </template>
            <template v-else>
              <a v-on:click="play(song.id)" href="javascript:void(0);" class="button btn-play"><i class="icon">play_arrow</i></a>
            </template>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
import { ipcRenderer, remote } from 'electron'
import ProgressCircle from '@/components/ProgressCircle'
const { communication } = remote.require('./config')

export default {
  name: 'tray-player',
  data () {
    return {
      state: {}
    }
  },
  computed: {
    progress () {
      return this.state.tempStatus.played / this.state.tempStatus.duration
    }
  },
  components: {
    ProgressCircle
  },
  methods: {
    isCurrent (id) {
      return id === this.state.status.current
    },
    play (id) {
      ipcRenderer.send(communication.trayChannel, {
        action: 'play',
        param: id
      })
    },
    pause () {
      ipcRenderer.send(communication.trayChannel, {
        action: 'pause'
      })
    },
    next () {
      ipcRenderer.send(communication.trayChannel, {
        action: 'next'
      })
    },
    prev () {
      ipcRenderer.send(communication.trayChannel, {
        action: 'prev'
      })
    }
  },
  created () {
    ipcRenderer.on(communication.trayChannel, (event, payload) => {
      this.state = payload
    })
  }
}
</script>
<style lang="scss">
@import '~scssbase';

html, body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.tray-player{
  position: absolute;
  top: 10px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.controls{
  height: 100px;
  background-color: rgba(#000, .5);
}
.play-controls{
  position: absolute;
  top: 20px;
  right: 0;
  left: 0;
  width: 160px;
  height: 50px;
  margin: 15px auto;
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
}

.playlist{
  height: 300px;
  margin: 0;
  padding: 0;
  overflow: auto;
  background-color: rgba(#000, .5);
  border-top: 1px solid rgba(#fff, .05);
  li{
    display: block;
    height: 50px;
    padding: 0 15px;
    background-clip: padding-box;
    transition: background linear .3s;
    &:nth-child(odd){
      background-color: rgba(#fff, .05);
    }
    &:hover{
      background-color: rgba(#fff, .2);
    }
    &.current{
      background-color: rgba($color_primary, .8);
      .metas{
        h6{
          opacity: 1;
        }
      }
      .operates{
        .btn-play{
          border: none;
          color: #fff;
          line-height: 30px;
        }
      }
    }
    .metas{
      float: left;
      max-width: 100px;
      margin-top: 10px;
      color: #fff;
      text-transform: capitalize;
      cursor: default;
      h3, h6{
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: capitalize;
        white-space: nowrap;
      }
      h3{
        height: 16px;
        overflow: hidden;
        opacity: .8;
        font-size: 12px;
        font-weight: bold;
        line-height: 16px;
      }
      h6{
        height: 12px;
        overflow: hidden;
        opacity: .4;
        font-size: 10px;
        font-weight: lighter;
        line-height: 12px;
      }
    }
    .operates{
      float: right;
      width: 30px;
      height: 30px;
      margin-top: 10px;
    }
    .btn-play{
      position: relative;
      display: block;
      width: 30px;
      height: 30px;
      border: 1px solid rgba(#fff, .1);
      border-radius: 50%;
      color: rgba(#fff, .5);
      font-size: 16px;
      line-height: 28px;
      text-align: center;
      &:hover{
        border-color: rgba(#fff, .2);
        color: rgba(#fff, .8);
      }
    }
  }
}
</style>
