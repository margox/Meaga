<template>
  <div class="controls">
    <button v-on:click="handleClose" class="btn-close"></button>
    <button v-on:click="handleMinimize" class="btn-minimize"></button>
    <button class="btn-maxmize"></button>
  </div>
</template>
<script>

export default {
  name: 'traffic-lights',
  methods: {
    handleClose () {
      window.electron.remote.getCurrentWindow().close()
    },
    handleMinimize () {
      window.electron.remote.getCurrentWindow().minimize()
    }
  }
}
</script>
<style lang="scss" scoped>
.controls{
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  padding-left: 20px;
  button{
    float: left;
    width: 12px;
    height: 12px;
    margin: 19px 12px 0 0;
    padding: 0;
    border: none;
    border-radius: 50%;
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
      background-color: #ccc;
    }
  }
}
</style>
