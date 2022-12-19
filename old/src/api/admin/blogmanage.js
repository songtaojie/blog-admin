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
  },
  // 博客标签
  getTagPage(data) {
    return request.post(`${routePrefix}/GetTagPage`, data)
  },
  addorUpdateTag(data) {
    return request.post(`${routePrefix}/AddOrUpdateTag`, data)
  },
  getTagDetail(tagId) {
    return request.get(`${routePrefix}/getTagDetail/${tagId}`)
  },
  delTag(tagId) {
    return request.del(`${routePrefix}/DeleteTag/${tagId}`)
  },
  // 博客栏目
  getCategoryPage(data) {
    return request.post(`${routePrefix}/getCategoryPage`, data)
  },
  addorUpdateCategory(data) {
    return request.post(`${routePrefix}/AddOrUpdateCategory`, data)
  },
  getCategoryDetail(categoryId) {
    return request.get(`${routePrefix}/getCategoryDetail/${categoryId}`)
  },
  delCategory(categoryId) {
    return request.del(`${routePrefix}/DeleteCategory/${categoryId}`)
  }
}
