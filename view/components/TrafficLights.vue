<template>
  <div v-if="show" class="controls">
    <button v-on:click="handleClose" class="btn-close"></button>
    <button v-on:click="handleMinimize" class="btn-minimize"></button>
    <button v-on:click="handleFullScreen(true)" class="btn-maxmize"></button>
  </div>
  <div v-else class="controls">
    <button class="btn-void"></button>
    <button class="btn-void"></button>
    <button v-on:click="handleFullScreen(false)" class="btn-maxmize"></button>
  </div>
</template>
<script>

export default {
  name: 'traffic-lights',
  computed: {
    show () {
      return !this.$store.state.tempStatus.isFullScreen
    }
  },
  methods: {
    handleClose () {
      window.electron.remote.getCurrentWindow().close()
    },
    handleMinimize () {
      window.electron.remote.getCurrentWindow().minimize()
    },
    handleFullScreen (flag) {
      window.electron.remote.getCurrentWindow().setFullScreen(flag)
    }
  }
}
</script>
<style lang="scss" scoped>
.controls{
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 60px;
  padding-left: 20px;
  background-color: rgba(#000, .2);
  box-shadow: inset 0 -.5px 0 rgba(#000, .2), 0 1px 3px rgba(#000, .1);
  button{
    float: left;
    width: 12px;
    height: 12px;
    margin: 24px 12px 0 0;
    padding: 0;
    border: none;
    border-radius: 50%;
    &::before{
      display: none;
      width: 6px;
      height: 6px;
      margin: 3px;
      background-color: rgba(#000, .6);
      border-radius: 3px;
      content: '';
    }
    &:hover::before{
      display: block;
    }
  }
  .btn-close{
    background-color: #f0213b;
    &:hover{
      background-color: #f0213b - 20;
    }
  }
  .btn-minimize{
    background-color: #f6a623;
    &:hover{
      background-color: #f6a623 - 20;
    }
  }
  .btn-maxmize{
    background-color: #7ed321;
    &:hover{
      background-color: #7ed321 - 20;
    }
  }
  .btn-void{
    background-color: #888;
  }
}
</style>
