import request from '../http.js'
// 接口管理页面的相关接口
const friendLinkPrefix = '/admin/api/FriendLink'
export default {
  friendLink: {
    // 分页列表
    getPage(data) {
      return request.post(`${friendLinkPrefix}/getpage`, data)
    },
    add(data) {
      return request.post(`${friendLinkPrefix}/add`, data)
    },
    getDetail(id) {
      return request.get(`${friendLinkPrefix}/get/${id}`)
    },
    update(data) {
      return request.post(`${friendLinkPrefix}/Update`, data)
    },
    del(id) {
      return request.del(`${friendLinkPrefix}/Delete/${id}`)
    }
  }
}
