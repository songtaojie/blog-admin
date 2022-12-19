import request from '../http.js'
// 接口管理页面的相关接口
const routePrefix = '/admin/api/permission'
export default {
  // 分页列表
  getList() {
    return request.get(`${routePrefix}/getList`)
  },
  add(data) {
    return request.post(`${routePrefix}/add`, data)
  },
  getDetail(id) {
    return request.get(`${routePrefix}/get/${id}`)
  },
  update(data) {
    return request.post(`${routePrefix}/Update`, data)
  },
  del(id) {
    return request.del(`${routePrefix}/Delete/${id}`)
  },
  getRouters() {
    return request.get(`${routePrefix}/GetRouters`)
  },
  getUserMenuTree() {
    return request.get(`${routePrefix}/GetUserMenuTree`)
  }
}
