<template>
  <div class="header">
    <div class="top-bar">
      <TrafficLights />
      <ListControls />
      <SearchForm />
    </div>
  </div>
</template>
<script>
import SearchForm from '@/components/SearchForm'
import ListControls from '@/components/ListControls'
import TrafficLights from '@/components/TrafficLights'

export default {
  name: 'header',
  data () {
    return {
      appName: window.remoteConfig.packageInfo.name
    }
  },
  components: {
    SearchForm,
    ListControls,
    TrafficLights
  }
}
</script>
<style lang="scss" scoped>
@import "~scssinc";

.header{
  position: relative;
  z-index: 2;
  height: 50px;
  overflow: hidden;
  background-color: rgba(#000, .45);
  border-bottom: 1px solid rgba(#000, .05);
  box-shadow: 0 2px 4px rgba(#000, .1);
}
.top-bar{
  height: 50px;
  text-align: center;
  -webkit-app-region: drag;
}
</style>
