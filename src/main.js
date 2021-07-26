import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routers'
import store from './store'
import Layouts from '@/layouts/index'
import Cookies from 'js-cookie'
import Permission from './directive/permission/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 我的css
import './scss/root.scss'

import api from './api/http.js'
// import { axiosplugin } from './api/http.js'
Vue.prototype.$api = api

Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Layouts)
Vue.use(Permission)
Cookies.set('test', '123123213')
Vue.config.productionTip = false

// md编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

const vue = new Vue({
  store,
  router,
  render: (h) => h(App)
})
vue.$mount('#app')
export default vue
