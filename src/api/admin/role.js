import request from '../http.js'
// 接口管理页面的相关接口
const routePrefix = '/admin/api/role'
export default {
  // 分页列表
  getPage(data) {
    return request.post(`${routePrefix}/getpage`, data)
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
  getSelectMenuList(roleId) {
    return request.get(`${routePrefix}/GetSelectMenuList/${roleId}`)
  },
  getList() {
    return request.get(`${routePrefix}/getList`)
  }
}
