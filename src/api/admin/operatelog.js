import request from '../http.js'
// 请求日志管理页面的相关接口
const routePrefix = '/admin/api/OperateLog'
export default {
  // 分页列表
  getPage(data) {
    return request.post(`${routePrefix}/getpage`, data)
  }
}
