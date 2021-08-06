import { constRouterMap, loadView } from '@/routers'
import utils from '@/common'
import permissionApi from '@/api/admin/permission'
import Welcome from '@/views/welcome.vue'
import Layout from '@/views/layout/index.vue'

// // sessionStorage 存储数组对象的方法
function saveCacheRouter(key, data) {
  window.sessionStorage.setItem(key, JSON.stringify(data))
}
// sessionStorage 获取数组对象的方法
function getCacheRouter(key) {
  return JSON.parse(window.sessionStorage.getItem(key))
}

// 遍历后台传来的路由字符串，转换为组件对象
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  // 注意这里的 asyncRouterMap 是一个数组
  const accessedRouters = asyncRouterMap.filter(route => {
    if (!utils.isEmpty(route.path)) {
      if (route.path === '/') {// Layout组件特殊处理
        route.component = Welcome
      } else if(route.path === '-') {
        route.component = Layout
      }
      else {
        var nameArray = route.path.split('/').filter(item => item.length > 0)
        route.name = nameArray.join('_')
        if (!utils.isEmpty(route.component)) {
          try {
            route.component = loadView(route.component.replace('/:id', ''))
          } catch (e) {
            try {
              route.component = loadView(`${route.component.replace('/:id', '')}.vue`)
            } catch (error) {
              console.info(`%c 当前路由 ${route.component.replace('/:id', '')}.vue 不存在，因此如法导入组件，请检查接口数据和组件是否匹配，并重新登录，清空缓存!`, 'color:red')
            }
          }
        } else if (route.children && route.children.length > 0) {
          route.component = Layout
        }
      }
      if (route.children && route.children.length > 0) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
    return false
  })

  return accessedRouters
}
/**
 * 递归过滤异过滤按钮权限
 *
 */
const permission = {
  state: {
    isAddRoute: false,
    routers: [],
    buttons: []
  },
  getters: {
    permission_Routers: (state, getters) => {
      var routes = state.routers
      if (utils.isEmpty(routes) || routes.length <= 0) {
        var cacheRouterKey = `hx:router:${getters.user.userId}`
        var routeList = getCacheRouter(cacheRouterKey)
        if (!utils.isEmpty(routeList) && routeList.length >= 0) {
          routes = constRouterMap.concat(routeList)
        }
      }
      return routes || []
    },
    permission_Buttons: (state, getters) => {
      var buttons = state.buttons
      if (utils.isEmpty(buttons) || buttons.length <= 0) {
        var cacheButtonKey = `hx:permission:${getters.user.userId}`
        var buttonList = getCacheRouter(cacheButtonKey)
        if (!utils.isEmpty(buttonList) && buttonList.length >= 0) {
          buttons = buttonList
        }
      }
      return buttons || []
    },
    permission_IsAddRoute: state => state.isAddRoute
  },
  mutations: {
    SET_ISADDROUTE(state, isAddRoute) {
      state.isAddRoute = isAddRoute
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    },
    SET_BUTTONS: (state, buttons) => {
      state.buttons = buttons
    },
    CLEAR_ROUTERS: (state) => {
      state.isAddRoute = false
      state.routers = []
    }
  },
  actions: {
    GenerateRoutes({ commit, getters }) {
      return new Promise((resolve, reject) => {
        var cacheRouterKey = `hx:router:${getters.user.userId}`
        var cacheButtonKey = `hx:permission:${getters.user.userId}`
        var routeList = getCacheRouter(cacheRouterKey)
        var buttonList = getCacheRouter(cacheButtonKey)
        // 如果缓存中没有，则从数据库中获取
        if (utils.isEmpty(routeList) || routeList.length <= 0) {
          permissionApi.getRouters().then((res) => {
            if (res.succeeded) {
              console.info('%c get routers from api succeed!', 'color:green')
              // 后台拿到路由
              routeList = res.data.routers
              if (routeList && routeList.length > 0) {
                saveCacheRouter(cacheRouterKey, routeList) // 存储路由到sessionStorage
                routeList = filterAsyncRouter(routeList) // 过滤路由
                var routes = constRouterMap.concat(routeList)
                commit('SET_ROUTERS', routes)
              }
              // button
              buttonList = res.data.buttons
              if (buttonList && buttonList.length > 0) {
                saveCacheRouter(cacheButtonKey, buttonList) // 存储按钮到sessionStorage
                commit('SET_BUTTONS', buttonList)
              }
              resolve(routeList)
            } else {
              reject(res.data.message)
            }
          }).catch(err => {
            reject(err)
          })
        } else {
          // 从sessionStorage拿到了路由
          console.info('%c get routers from sessionStorage succeed!', 'color:green')
          routeList = filterAsyncRouter(routeList) // 过滤路由
          resolve(routeList)
        }
      })
    }
  }
}

export default permission
