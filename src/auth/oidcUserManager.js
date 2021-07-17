import Oidc from 'oidc-client'
import axios from 'axios'
import { TOKEN_TYPE} from '../common/constkey.js'

Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.DEBUG
const authority = process.env.VUE_APP_Authority
class OidcUserManager extends Oidc.UserManager {
  constructor() {
    super({
      // userStore: new Oidc.WebStorageStateStore({store:window.localStorage}),
      // userStore: new Oidc.WebStorageStateStore(),
      authority: authority,
      client_id: 'blogadminjs',
      redirect_uri: `${window.location.origin}/callback`,
      response_type: 'id_token token',
      scope: 'blog.core.api openid profile roles',
      post_logout_redirect_uri:  `${window.location.origin}`
      // silent_redirect_uri: `${window.location.origin}/silent`,
      // accessTokenExpiringNotificationTime: 10, // 访问令牌过期前的秒数，以引发accessTokenExpiring事件,默认60s
      // automaticSilentRenew: true, // 指示是否应该在访问令牌过期之前自动尝试更新它。尝试的结果是引发accesstokenexpires事件
      // filterProtocolClaims: true, // OIDC协议声明应该从配置文件中删除吗
      // loadUserInfo :true // 控制是否从user info端点加载了额外的身份数据，以便填充用户的profile
    })
  }

  async signIn() {
   return await this.signinRedirect()
  }

  async signOut() {
    return this.signoutRedirect().then(function (resp) {
      console.log('signed out', resp)
    }).catch(function (err) {
      console.log(err)
    })
  }

  // 获取登录用户的Profile
  getProfile () {
    const self = this
    return new Promise((resolve, reject) => {
      self.getUser().then(function (user) {
        if (user === null) {
          self.signIn()
          return resolve(null)
        }
        return resolve(user.profile)
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
 // 获取登录用户的访问令牌
 getAcessToken() {
    const self = this
    return new Promise((resolve, reject) => {
      this.getUser().then(function (user) {
        if (user === null) {
          self.signIn()
          return resolve(null)
        }
        return resolve(user.access_token)
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
/**
 * 获取登录用户的角色
 * @returns 角色
 */
  getRole () {
    const self = this
    return new Promise((resolve, reject) => {
      this.getUser().then(function (user) {
        if (user === null) {
          self.signIn()
          return resolve(null)
        }
        return resolve(user.profile.role)
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
  // 手动更新令牌
  refreshToken () {
    const self = this
    return new Promise((resolve, reject) => {
      this.signinSilent().then(function (user) {
        if (user === null) {
          self.signIn(null)
        } else{
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
}

const oidcUserManager = new OidcUserManager()
// 事件
oidcUserManager.events.addUserLoaded(user => {
  console.log('New User Loaded：', user)
  console.log('Acess_token: ', user.access_token)
  axios.defaults.headers.common.Authorization = `${TOKEN_TYPE}${user.access_token}`
})
oidcUserManager.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments)
})
oidcUserManager.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments)
  oidcUserManager.signoutRedirect().then(function (resp) {
    console.log('signed out', resp)
  }).catch(function (err) {
    console.log(err)
  })
})

export default oidcUserManager
