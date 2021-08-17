import request from '../http.js'
// 接口管理页面的相关接口
const routePrefix = '/admin/api/BlogManage'
export default {
  // 分页列表
  getPage(data) {
    return request.post(`${routePrefix}/getpage`, data)
  },
  getTagList(data) {
    return request.post(`${routePrefix}/GetTagList`, data)
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
  }
}
