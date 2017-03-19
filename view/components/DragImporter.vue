<template>
  <div
    class="drag-importer"
    :class="classNames"
    v-on:click="importMusic"
  >
    <span><i class="empty-icon icon">inbox</i><br/>No Items in your playlist<br/>Drag audio(.mp3) files here to import them</span>
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
<style lang="scss">
@import "~scssinc";

.drag-importer{
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  visibility: hidden;
  border: dashed 2px currentColor;
  opacity: 0;
  color: rgba(#fff, .3);
  user-select: none;
  cursor: pointer;
  &.active{
    visibility: visible;
    opacity: 1;
  }
  &.focus{
    color: rgba($color_primary, .5);
  }
  &:hover{
    color: rgba(#fff, .5);
  }
  span{
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    pointer-events: none;
    font-size: 18px;
    font-weight: bold;
    line-height: 32px;
    text-align: center;
    text-transform: uppercase;
    transform: translate(0%, -50%);
  }
}
.empty-icon{
  font-size: 64px;
  line-height: 80px;
}
</style>
