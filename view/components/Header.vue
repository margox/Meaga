<template>
  <div class="header">
    <div class="topbar">
      <TrafficLights />
      <span class="caption">Meaga</span>
      <ListControls />
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
  height: 60px;
  overflow: hidden;
  background-color: rgba(#000, .4);
  box-shadow: inset 0 -.5px 0 rgba(#000, .8);
  user-select: none;
}
.topbar{
  height: 60px;
  text-align: center;
  -webkit-app-region: drag;
}
.caption{
  color: rgba(#fff, .8);
  font-size: 12px;
  font-weight: bolder;
  letter-spacing: 1px;
  line-height: 60px;
  text-transform: uppercase;
}
</style>
