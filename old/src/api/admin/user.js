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
  getCurrentUserInfo() {
    return request.get(`${routePrefix}/GetCurrentUserInfo`)
  },
  update(data) {
    return request.post(`${routePrefix}/Update`, data)
  },
  updateMyInfo(data) {
    return request.post(`${routePrefix}/UpdateMyInfo`, data)
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
  },
  assignRole(data) {
    return request.post(`${routePrefix}/AssignRole`, data)
  },
  getRoleById(userId) {
    return request.get(`${routePrefix}/GetRoleById/${userId}`)
  }
}
