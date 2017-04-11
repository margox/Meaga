// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import electron from 'electron'
import App from '@/entries/App'
import Store from '@/store'

const store = Store(Vue)
const remoteConfig = electron.remote.require('./config')
const remoteFunctions = electron.remote.require('./functions')

// setting global objects
window.store = store
window.electron = electron
window.remoteConfig = remoteConfig
window.remoteFunctions = remoteFunctions
window.platform = window.process.platform

document.fonts.ready.then(() => {
  setTimeout(() => {
    document.querySelector('#app').classList.add('loaded')
  }, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
