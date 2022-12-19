import request from '../http.js'
// 接口管理页面的相关接口
const routePrefix = '/admin/api/home'
export default {
  // 分页列表
  getLineData(data) {
    return request.post(`${routePrefix}/GetLineData`, data)
  },
  // 获取日志分页数据
  getLogsPage(data) {
    return request.post(`${routePrefix}/GetLogsPage`, data)
  }
}
