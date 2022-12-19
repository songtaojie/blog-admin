import { isEmpty, formHex } from '../../common'
import { AUTH_KEY } from '../../common/constkey'
let stateData = {
  isAuthenticated: false,
  access_token: null,
  expires_in: null, // token过期时间
  expires_at: null, // token在哪个时间点过期
  expired: true, // token是否过期
  userId: null,
  userName: null,
  nickName: null,
  avatarUrl: null,
  isUseMdEdit: false
}

if (!isEmpty(localStorage.getItem(AUTH_KEY))) {
  stateData = formHex(localStorage.getItem(AUTH_KEY), true)
}
const cacheState = Object.assign(stateData)
const auth = {
  state: cacheState,
  getters: {
    auth: state => {
      return {
        isAuthenticated: state.isAuthenticated && !state.expired,
        access_token: state.access_token,
        expires_in: state.expires_in,
        expires_at: state.expires_at,
        expired: state.expired
      }
    },
    user: state => {
      return {
        userId: state.userId,
        userName: state.userName,
        nickName: state.nickName,
        avatarUrl: state.avatarUrl,
        isUseMdEdit: state.isUseMdEdit
      }
    }
  },
  mutations: {
    UPDATE_AUTH(state, payload) {
      Object.assign(state, {
        isAuthenticated: true,
        access_token: payload.accessToken
      })
      this.commit('UPDATE_EXPIRES', payload.expiresIn)
    },
    UPDATE_USER(state, payload) {
      Object.assign(state, {
        userId: payload.userId,
        userName: payload.userName,
        nickName: payload.nickName,
        avatarUrl: payload.avatarUrl,
        isUseMdEdit: payload.isUseMdEdit
      })
    },
    UPDATE_TOKEN(state, accessToken) {
      state.access_token = accessToken
    },
    /**
     * 更新编辑器
     * @param {*} state 状态
     * @param {*} isUseMdEdit true：使用md编辑器，false：使用ckeditor编辑器
     */
    UPDATE_EDITOR(state, isUseMdEdit) {
      state.isUseMdEdit = isUseMdEdit
    },
    UPDATE_EXPIRES(state, expiresIn) {
      state.expires_in = expiresIn
      var expiresInInt = window.parseInt(expiresIn)
      if (typeof expiresInInt === 'number' && expiresInInt > 0) {
        var now = Date.now()
        state.expires_at = now + expiresInInt * 1000
      }
      if (state.expires_in !== null) {
        state.expired = state.expires_in <= 0
      }
    },
    CLEAR_AUTH(state) {
      Object.assign(state, {
        isAuthenticated: false,
        access_token: null,
        expires_in: null, // token过期时间,秒
        expires_at: null, // token在哪个时间点过期
        expired: true, // token是否过期
        userId: null,
        userName: null,
        nickName: null,
        avatarUrl: null,
        isUseMdEdit: false
      })
    }
  },
  actions: {
  }
}
export default auth