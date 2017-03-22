<template>
  <div class="list-controls">
    <a href="javascript:void(0);" v-on:click="setListType(0)" :class="[listType ? '' : 'active']" class="button btn-switch-list-type view-list"><i class="icon">view_stream</i></a>
    <a href="javascript:void(0);" v-on:click="setListType(1)" :class="[listType ? 'active' : '']" class="button btn-switch-list-type view-grid"><i class="icon">view_module</i></a>
    <a href="javascript:void(0);" v-on:click="importMusic" class="button btn-import-music"><i class="icon">add</i></a>
  </div>
</template>
<script>
import fileImporter from '@/helpers/fileImporter'

export default {
  name: 'list-controls',
  computed: {
    listType () {
      return this.$store.state.status.listType
    }
  },
  methods: {
    setListType (listType) {
      this.$store.dispatch('setListType', listType)
    },
    importMusic () {
      fileImporter.selectLocalFiles()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.list-controls{
  position: absolute;
  height: 50px;
  top: 0;
  right: 20px;
}

.button{
  display: block;
  float: left;
  border: none;
  height: 30px;
  margin-top: 10px;
  font-size: 24px;
  line-height: 30px;
  text-decoration: none;
}

.btn-switch-list-type{
  width: 30px;
  margin-right: 1px;
  color: rgba(#000, .3);
  &.active,
  &:hover{
    color: rgba(#fff, .5);
  }
}

.btn-import-music{
  width: 30px;
  margin: 10px 0 0 10px;
  padding: 0;
  background-color: rgba(#fff, .1);
  border-radius: 50%;
  color: rgba(#fff, .5);
  font-size: 24px;
  &:hover{
    color: #fff;
    background-color: $color_primary;
  }
}
</style>
