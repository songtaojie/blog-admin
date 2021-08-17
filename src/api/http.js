import axios from 'axios'
import QS from 'qs'
import utils from '../common'
import { REFRESH_TOKEN_API, EnabledIDS4 } from '../common/constkey.js'
import { signIn } from '../routers'
import store from '../store'
import { flushExpires } from '../store'
import Vue from 'vue'

// 设置环境切换时的接口url前缀
axios.defaults.baseURL = process.env.VUE_APP_BASE_API

// if (process.env.NODE_ENV === 'development') {
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://localhost:44354/'
// } else if (process.env.NODE_ENV === 'debug') {
//   axios.defaults.baseURL = 'https://localhost:44354/'
// }
// 设置请求超时
axios.defaults.timeout = 30000
axios.defaults.withCredentials = true
// 设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
/**
 * 提示
 * @param {String} msg 提示消息
 */
const toast = function (msg) {
  Vue.prototype.$message({
    message: msg,
    type: 'error'
  })
}

/**
 * 登陆成功以后的设置
 * @param {*} res 响应数据
 */
function loginSuccess(res) {
  store.commit('UPDATE_AUTH', res.data)
}


/**
 * 参数过滤
 * @param {*} o 参数
 */
function filterNull(o) {
  for (var key in o) {
    if (utils.isEmpty(o[key])) {
      delete o[key]
    }
    if (utils.isString(o[key])) {
      o[key] = o[key].trim()
    } else if (utils.isObject(o[key])) {
      o[key] = filterNull(o[key])
    } else if (utils.isArray(o[key])) {
      o[key] = filterNull(o[key])
    }
  }

  return o
}

/**
 * get请求
 * @param {String} url 请求的api
 * @param {Object} params 传递的参数
 */
export function get(url, params) {
  if (!utils.isEmpty(params)) {
    params = filterNull(params)
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * post请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时传递的参数
 */
export function post(url, data, cfg) {
  if (!utils.isEmpty(data)) {
    data = filterNull(data)
  }
  // cfg = cfg || {}
  return new Promise((resolve, reject) => {
    // var d = QS.stringify(data)
    axios
      .post(url, data, cfg)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        // if (err.isAxiosError && err.message === 'Network Error') {
        //   toast('请求出错，服务器异常')
        // }
        reject(err)
      })
  })
}
/**
 * put请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时传递的参数
 */
export function put(url, params) {
  if (!utils.isEmpty(params)) {
    params = filterNull(params)
  }

  return new Promise((resolve, reject) => {
    axios
      .put(url, QS.stringify(params))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * put请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时传递的参数
 */
export function del(url, params) {
  if (!utils.isEmpty(params)) {
    params = filterNull(params)
  }
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 异常的处理方式
 * @param {*} err axios异常对象
 */
export function ajaxError(err) {
  if (err) {
    let r
    let msg
    if (err.isAxiosError) {
      r = err.response
      if (utils.isEmptyObject(r) && err.message === 'Network Error') {
        msg = '请求出错，服务器异常'
      }
    } else {
      r = err
    }
    if (r) {
      var result = r.data
      if (result && result.hasOwnProperty('succeeded')) {
        if (!result.succeeded) {
          msg = result.message || r.statusText || err.message
        }
      } else {
        msg = r.statusText
      }
    }
    toast(msg || '服务器忙，请稍后重试!')
  }
}

axios.interceptors.request.use(
  (req) => {
    if (!utils.isEmpty(req.url)) {
      req.url = req.url.toLocaleLowerCase()
    }
    var accessToken = store.getters.auth.access_token
    var expired = store.getters.auth.expired
    // 设置token
    if (accessToken && !expired) {
      req.headers.Authorization = `Bearer ${accessToken}`
    }
    flushExpires()

    return req
  },
  (e) => {
    return Promise.reject(e)
  }
)
function handle401Error(config) {
  if (!EnabledIDS4) {
    if (!store.getters.auth.expired) {
      var token = store.getters.auth.access_token
      var data = QS.stringify({ token })
      axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: REFRESH_TOKEN_API,
        data: data
      }).then((res) => {
        if (res && res.succeeded) {
          loginSuccess(res)
          config.__isRetryRequest = true
          config.headers.Authorization = `${res.data.token_type} ${res.data.access_token}`

          return axios(config)
        }
        // 刷新token失败 清除token信息并跳转到登录页面
        signIn()
      })
    } else {
      signIn()
    }
  } else {
    signIn()
  }
}
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  (res) => {
    // 对响应数据做些事
    if (res.data.succeeded === false) {
      if (res.data.statusCode === 401) {
        res.isHandleError = true
        handle401Error(res.config)
      } else if (res.data.statusCode === 403) {
        res.isHandleError = true
        toast(res.data.message || '您没有该操作的权限!')
      } else if (res.data.statusCode !== 99991) {
        res.isHandleError = true
        ajaxError(res)
      }
      return Promise.reject(res)
    }
    // 判断token是否过期，如果过期还响应成功，说明是从缓存中获取的，这时刷新下token
    // var tokenExpired = res.headers['token-expired']
    // var isRefreshApi = res.config.url.indexOf(REFRESH_TOKEN_API.toLocaleLowerCase()) >= 0
    // var isRetryRequest = res.config.__isRetryRequest
    // debugger
    // if ((tokenExpired === 'true' || tokenExpired === true) && !isRefreshApi && !isRetryRequest) {
    //   handle401Error(res.config)
    // }
    return res.data
  },
  (e) => {
    var res = e.response || {}
    var data = res.data || {}
    switch (res && res.status) {
      case 401:
        handle401Error(e.config)
        break
      case 403:
        toast(data.message || '您没有该操作的权限!')
        break
      case 500:
        toast(data.message || '服务器异常!')
        break
      default:
        break
    }

    return Promise.reject(e)
  }
)

export default {
  get,
  post,
  put,
  del,
  ajaxError
}
