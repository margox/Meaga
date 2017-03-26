<template>
  <div class="header">
    <div class="top-bar">
      <TrafficLights />
      <ListControls />
      <span class="app-caption">{{appName}}</span>
    </div>
  </div>
</template>
<script>
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
  background-color: rgba(#000, .45);
  border-bottom: 1px solid rgba(#000, .05);
  box-shadow: 0 2px 4px rgba(#000, .1);
}
.top-bar{
  height: 50px;
  text-align: center;
  -webkit-app-region: drag;
}
.app-caption{
  color: rgba(#fff, .8);
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 50px;
  text-transform: uppercase;
  cursor: default;
  user-select: none;
}
</style>
