import request from '../http.js'
// 接口管理页面的相关接口
const routePrefix = '/admin/api/user'
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
  changePwd(data) {
    return request.get(`${routePrefix}/ChangePwd`, data)
  },
  changeMyPwd(data) {
    return request.get(`${routePrefix}/ChangeMyPwd`, data)
  },
  checkUserName(username) {
    return request.get(`${routePrefix}/CheckUserName/${username}`)
  },
  checkEmail(email) {
    return request.get(`${routePrefix}/CheckEmail/${email}`)
  }
}
