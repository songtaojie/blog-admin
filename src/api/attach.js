import request from './http.js'
// 接口管理页面的相关接口
const routePrefix = '/api/attach'
export default {
  // 分页列表
  getMdTemplate() {
    return request.get(`${routePrefix}/GetMdTemplate`)
  }
}
