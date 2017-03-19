<template>
  <div class="control-panel">
    <div class="play-controls">
      <a href="javascript:void(0);" class="button btn-prev"><i class="icon">skip_previous</i></a>
      <a href="javascript:void(0);" class="button btn-play"><i class="icon">play_arrow</i></a>
      <a href="javascript:void(0);" class="button btn-next"><i class="icon">skip_next</i></a>
    </div>
    <div class="volume-controls">
      <a href="javascript:void(0);" class="button btn-mute"><i class="icon">volume_up</i></a>
      <div class="volume-bar">
        <div class="current-volume"></div>
      </div>
    </div>
    <div class="mode-controls">
      <a href="javascript:void(0);" class="button active"><i class="icon">shuffle</i></a>
      <a href="javascript:void(0);" class="button "><i class="icon">repeat</i></a>
      <a href="javascript:void(0);" class="button "><i class="icon">repeat_one</i></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'control-panel'
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
  right: 132px;
  height: 30px;
  margin-top: 25px;
}
.btn-mute{
  width: 30px;
  height: 30px;
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
  margin: 12px 10px;
  overflow: hidden;
  background-color: rgba(#fff, .1);
  @include respond-to(sm) {
    display: block;
  }
}
.current-volume{
  width: 30%;
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
