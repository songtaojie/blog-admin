import request from '../http.js'
// 接口管理页面的相关接口
const friendLinkPrefix = '/admin/api/FriendLinkManage'
// 接口管理页面的相关接口
const noticePrefix = '/admin/api/noticeManage'
// 首页横幅相关接口
const bannerPrefix = '/admin/api/BannerManage'
export const friendLinkApi = {
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

export const noticeApi = {
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

export const bannerApi = {
  // 分页列表
  getPage(data) {
    return request.post(`${bannerPrefix}/getpage`, data)
  },
  add(data) {
    return request.post(`${bannerPrefix}/add`, data)
  },
  getDetail(id) {
    return request.get(`${bannerPrefix}/get/${id}`)
  },
  update(data) {
    return request.post(`${bannerPrefix}/Update`, data)
  },
  del(id) {
    return request.del(`${bannerPrefix}/Delete/${id}`)
  }
}
// 首页横幅相关接口
const timelinePrefix = '/admin/api/timelineManage'
export const timelineApi = {
  // 分页列表
  getPage(data) {
    return request.post(`${timelinePrefix}/getpage`, data)
  },
  add(data) {
    return request.post(`${timelinePrefix}/add`, data)
  },
  getDetail(id) {
    return request.get(`${timelinePrefix}/get/${id}`)
  },
  update(data) {
    return request.post(`${timelinePrefix}/Update`, data)
  },
  del(id) {
    return request.del(`${timelinePrefix}/Delete/${id}`)
  }
}
export default {
  friendLink: friendLinkApi,
  notice: noticeApi,
  banner: bannerApi,
  timeline: timelineApi
}
