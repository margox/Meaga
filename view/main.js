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

// TODO
// 1. 播放列表排序功能
// 2. 播放列表多选操作功能
// 3. 播放界面 + 歌词功能
// 4. 菜单栏和快捷键支持 (DONE)
// 5. 顶栏小图标+挂件功能 (DONE)
// 6. 从网络获取封面图片和歌曲图片
// 7. Dock图标右键功能
// 8. 列表搜索功能 (NEXT)
// 9. 尝试支持热更新

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
