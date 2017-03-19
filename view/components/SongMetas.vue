<template>
  <div class="song-metas">
    <div class="cover">
      <img src="/static/pic-1.png" />
    </div>
    <div class="titles">
      <h3>{{title}}</h3>
      <h6>{{artist}} / {{album}}</h6>
    </div>
  </div>
</template>
<script>
export default {
  name: 'song-meta',
  data () {
    return {
      title: 'Controls',
      artist: 'John Smith',
      album: '叶惠美'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.song-metas{
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  height: 80px;
  overflow: hidden;
}
.cover{
  float: left;
  width: 40px;
  height: 40px;
  margin: 20px 10px 0 20px;
  img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.titles{
  height: 30px;
  overflow: hidden;
  float: left;
  margin-top: 26px;
  text-transform: capitalize;
  h3{
    color: rgba(#fff, .8);
    font-size: 14px;
    font-weight: bold;
    line-height: 15px;
  }
  h6{
    color: rgba(#fff, .4);
    font-size: 12px;
    font-weight: lighter;
    line-height: 15px;
  }
}
</style>
