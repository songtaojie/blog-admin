import axios from 'axios'
import { isEmpty } from '../../common/index'
import store from '../../store'
const CancelToken = axios.CancelToken
export default class MyUploadAdapter {
  constructor(loader, url, t) {
    // Save Loader instance to update upload progress.
    this.loader = loader
    this.url = url
    this.t = t
  }

  async upload() {
    var that = this
    const file = await this.loader.file
    const t = this.t
    const url = this.url
    if (isEmpty(url)) return
    const data = new FormData()
    const genericError = `${t('Cannot upload file:')} ${file.name}.`
    data.append('file', file)
    data.append('makeThumbnail', true)
    data.append('makeLetterWater', true)
    if (isEmpty(this.url)) return
    var accessToken = store.getters.auth.access_token
    var expired = store.getters.auth.expired
    // 设置token
    var token = ''
    if (accessToken && !expired) {
      token = `Bearer ${accessToken}`
    }
    return new Promise((resolve, reject) => {
      axios.post(url, data, {
        'Content-Type': 'multipart/form-data',
        'Authorization': token,
        cancelToken: new CancelToken(function executor(c) {
          that.cancel = c
          // console.log(c)
          // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
        })
      })
        .then(res => {
          debugger
          if (res && res.successed) {
            resolve({
              default: res.url
            })
          }
          else {
            return reject(res && res.message ? res.message : genericError)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  abort() {
    if (this.cancel) {
      this.cancel()
    }
  }
}