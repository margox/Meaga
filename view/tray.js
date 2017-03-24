// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Tray from '@/entries/Tray'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Tray/>',
  components: { Tray }
})
