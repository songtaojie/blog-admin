import request from '../http.js'
import utils from '../../common/index.js'
import store from '../../store'

function authorizeSuccess(res) {
  store.commit('UPDATE_AUTH', res.data)
}
function logoutSuccess() {
  window.localStorage.clear()
  window.sessionStorage.clear()
  store.commit('CLEAR_AUTH')
}

export function authorize(form) {
  if (utils.isEmptyObject(form)) throw new Error('empty authorize parameters ')
  return new Promise((resolve, reject) => {
    request.post('/oauth2/authorize', form)
      .then((res) => {
        if (res && res.succeeded) {
          authorizeSuccess(res)
          resolve(res)
        } else {
          request.ajaxError(res)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    request.post('/oauth2/logout')
      .then((res) => {
        if (res && res.succeeded) {
          logoutSuccess()
          resolve(res)
        } else {
          request.ajaxError(res)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}

// 接口管理页面的相关接口
export default {
  /**
   * 授权
   * @param {*} data {UserName:'',PassWord:'',Remember:true}
   * @returns token
   */
  authorize,
  logout
}