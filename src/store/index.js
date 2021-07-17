import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import tab from './modules/tab.js'
import permission from './modules/permission.js'
import { AUTH_KEY, TOKEN_KEY } from '../common/constkey.js'
Vue.use(Vuex)
const sessionStoragePlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    localStorage.setItem(AUTH_KEY, JSON.stringify(state.auth))
    localStorage.setItem(TOKEN_KEY, state.auth.access_token)
    if (mutation.type === 'CLEAR_AUTH') {
      localStorage.removeItem(AUTH_KEY)
      localStorage.removeItem(TOKEN_KEY)
    }
  })
}
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
  modules: {
    auth,
    tab,
    permission
  },
  plugins: [sessionStoragePlugin]
})
export default store

/**
 * 刷新token的过期时间
 */
export const flushExpires = () => {
  const nowtime = Date.now()
  const expiresAtTime = window.parseInt(store.getters.auth.expires_at)
  const expiresInTime = window.parseInt(store.getters.auth.expires_in)
  const refreshCount = 1 * 60 // 滑动系数,1分钟
  // 如果没有过期则在原有的过期时间上延长一分钟
  if (nowtime <= expiresAtTime) {
    store.commit('UPDATE_EXPIRES', expiresInTime + refreshCount)
  }
  else {
    store.commit('UPDATE_EXPIRES', -1)
  }
}