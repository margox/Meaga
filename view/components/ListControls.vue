<template>
  <div class="list-controls">
    <h5 class="caption">{{playlist.name}}<small>{{playlist.items.length}} items</small></h5>
    <a href="javascript:void(0);" v-on:click="importMusic" class="button btn-import-music"><i class="icon">add</i></a>
    <div class="filter">
      <i class="icon">search</i>
      <input @keyup.enter="applyFilter" type="text" max-length="10" class="filter-key">
    </div>
  </div>
</template>
<script>
import fileImporter from '@/helpers/fileImporter'

export default {
  name: 'list-controls',
  computed: {
    playlist () {
      return this.$store.getters.currentDisplayList
    },
    listType () {
      return this.$store.state.status.listType
    }
  },
  methods: {
    applyFilter (e) {
      this.$store.dispatch('applyFilter', {
        keyword: e.currentTarget.value.toLowerCase()
      })
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
  right: 0;
  left: 0;
}

.caption{
  float: left;
  margin-top: 20px;
  margin-left: 20px;
  color: rgba(#fff, .6);
  font-size: 18px;
  font-weight: normal;
  text-transform: uppercase;
  small{
    padding-left: 10px;
    color: rgba(#fff, .3);
    font-size: 12px;
  }
}
.filter{
  position: relative;
  float: right;
  width: 160px;
  height: 30px;
  margin-top: 18px;
  border-radius: 15px;
  i{
    position: absolute;
    top: 0;
    left: 5px;
    width: 30px;
    height: 30px;
    color: rgba(#000, .4);
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    pointer-events: none;
  }
  input{
    width: 160px;
    height: 30px;
    padding: 0 20px 0 35px;
    background-color: rgba(#fff, .2);
    border: none;
    border-radius: 15px;
    color: rgba(#000, .4);
    font-size: 14px;
    -webkit-app-region: no-drag;
    &:focus{
      background-color: rgba(#fff, .3);
    }
  }
}

.btn-import-music{
  float: right;
  width: 30px;
  margin: 20px 10px 0 20px;
  padding: 0;
  color: rgba(#fff, .5);
  font-size: 24px;
  &:hover{
    color: #fff;
  }
}
</style>
