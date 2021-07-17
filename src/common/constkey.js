/**
 * 登录的地址
 */
export const LOGIN_API = '/oauth2/authorize'
/**
 * 刷新token的api
 */
export const REFRESH_TOKEN_API = '/oauth2/refreshtoken'
/**
 * 存储在sessionstorage中的token的key
 */
export const TOKEN_KEY = 'HX.LOCALSTORAGE.ACCESSTOKEN'
/**
 * token的前缀
 */
export const TOKEN_TYPE = 'Bearer '
/**
 * 权限存储的key
 */
export const AUTH_KEY = 'HX.LOCALSTORAGE.AUTH'

/**
 * 是否使用IdentityServer
 */
export const EnabledIDS4 = process.env.VUE_APP_Enabled_IDS4 === true || process.env.VUE_APP_Enabled_IDS4 === 'true'

/**
 * 刷新时间
 */
export const RefreshTime = 'HX.REFRESHTIME'


