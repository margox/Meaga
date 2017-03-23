<template>
  <div
    class="drag-importer"
    :class="classNames"
  >
    <div class="drag-tip">
      <span>
        <i class="empty-icon icon">inbox</i><br/>
        Nothing in your playlist<br/>
        Drag mp3 files into this window to import them
      </span>
      <a v-on:click="importMusic()" class="btn-import" href="javascript:void(0);">click to import</a>
    </div>
  </div>
</template>
<script>
import fileImporter from '@/helpers/fileImporter'

export default {
  name: 'drag-importer',
  props: ['show'],
  data () {
    return {
      focus: false
    }
  },
  computed: {
    classNames () {
      return {
        'active': this.show,
        'focus': this.focus
      }
    }
  },
  methods: {
    importMusic () {
      fileImporter.selectLocalFiles()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.drag-importer{
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  visibility: hidden;
  opacity: 0;
  color: rgba(#fff, .3);
  user-select: none;
  &.active{
    visibility: visible;
    opacity: 1;
  }
}
.drag-tip{
  position: absolute;
  top: 45%;
  right: 0;
  left: 0;
  font-size: 16px;
  font-weight: lighter;
  line-height: 32px;
  text-align: center;
  text-transform: uppercase;
  transform: translate(0%, -50%);
}
.empty-icon{
  font-size: 64px;
  line-height: 80px;
}
.btn-import{
  display: block;
  width: 180px;
  height: 50px;
  margin: 30px auto 0 auto;
  background-color: $color_primary;
  border-radius: 3px;
  color: rgba(#fff, 1);
  font-size: 14px;
  font-weight: lighter;
  line-height: 50px;
  text-align: center;
  text-transform: uppercase;
  transition: .3s;
  &:hover{
    background-color: $color_primary - 30;
  }
}
</style>
