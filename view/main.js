// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import Store from '@/store'

// Vue.config.productionTip = false
const store = Store(Vue)
window.store = store

// TODO
// 0. 操作依据由index改为id (DONE)
// 1. 播放列表排序功能跟
// 2. 播放列表多选操作功能
// 3. 播放界面 + 歌词功能
// 4. 快捷键支持
// 5. 顶栏小图标+挂件功能
// 6. 从网络获取封面图片和歌曲图片
// ...

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
