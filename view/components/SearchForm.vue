<template>
  <div class="search-form">
    <input type="text" placeholder="搜索列表"/>
    <i class="icon">search</i>
  </div>
</template>
<script>
export default {
  name: 'search-form'
}
</script>
<style lang="scss">
@import "~scssinc";

.search-form{
  position: relative;
  display: none;
  width: 180px;
  height: 30px;
  margin: 10px auto;
  overflow: hidden; 
  -webkit-app-region: no-drag;
  i{
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 30px;
    color: rgba(#fff, .3);
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
  input{
    width: 100%;
    height: 30px;
    padding: 0 35px 0 15px;
    background-color: rgba(#fff, .1);
    border: none;
    border-radius: 20px;
    color: rgba(#fff, .6);
    font-size: 14px;
  } 
}
</style>
