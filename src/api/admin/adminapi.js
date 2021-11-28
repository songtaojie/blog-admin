import request from '../http.js'
// 接口管理页面的相关接口
const friendLinkPrefix = '/admin/api/FriendLink'
// 接口管理页面的相关接口
const noticePrefix = '/admin/api/notice'
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
  },
  notice:{
    // 分页列表
    getPage(data) {
      return request.post(`${noticePrefix}/getpage`, data)
    },
    add(data) {
      return request.post(`${noticePrefix}/add`, data)
    },
    getDetail(id) {
      return request.get(`${noticePrefix}/get/${id}`)
    },
    update(data) {
      return request.post(`${noticePrefix}/Update`, data)
    },
    del(id) {
      return request.del(`${noticePrefix}/Delete/${id}`)
    }
  }
}
