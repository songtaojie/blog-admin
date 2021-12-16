import Vue from 'vue'
import VueRouter from 'vue-router'
// import modules from './modules/index'
import store from '../store'
import oidcUserManager from '../auth/oidcUserManager'
import { EnabledIDS4 } from '../common/constkey.js'
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


// const routes = routesCfg.routes
export const constRouterMap = [
  {
    path: '/',
    alias: '/welcome',
    name: 'welcome',
    component: () => import('@/views/welcome.vue'),
    meta: {
      requireAuth: true,
      title: '欢迎页',
      icon: 'el-icon-s-home'
    }
  },
  {
    name: 'usersetting',
    path: '/user/setting',
    component: () => import('@/views/user/setting.vue'),
    hidden: true,
    meta: {
      title: '个人设置',
      requireAuth: true
    }
  },
  {
    name: 'login',
    path: '/login/:redirect?',
    component: () => import('@/views/login.vue'),
    hidden: true,
    meta: {
      title: '登录',
      notab: true,
      requireAuth: false
    }
  },
  {
    name: 'callback',
    path: '/callback',
    component: () => import('@/views/callback.vue'),
    hidden: true,
    meta: {
      notab: true,
      requireAuth: false
    }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true,
    meta: {
      notab: true,
      requireAuth: false
    }
  }
  // 所有未定义路由，全部重定向到404页
  // {
  //   path: '*',
  //   redirect: '/404'
  // }
  // ...modules
]


const createRouter = () => new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes: constRouterMap
})

const router = createRouter()

/**
 * 登录页面跳转
 * @param {*} next
 */
export function signIn(next) {
  store.commit('CLEAR_AUTH')
  if (EnabledIDS4) {
    oidcUserManager.signIn()
      .catch(() => {
        console.info('The redirect login also failed!', 'color:red')
      })
  } else {
    var loginPath = {
      path: '/login',
      query: {
        redirect: router.path
      }
    }
    if (next) {
      next(loginPath)
    } else {
      router.push(loginPath)
    }
  }
}

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}


/**
 * 路由跳转前的钩子函数
 */
// window.tempRouter = router
// window.tempStore = store
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  // 不需要登录权限
  if (to.meta.requireAuth === false) {
    next()
  } else {
    if (store.getters.auth.isAuthenticated) {
      if (!store.getters.permission_IsAddRoute) {
        store.dispatch('GenerateRoutes').then((routes) => { // 根据roles权限生成可访问的路由表
          resetRouter()
          router.addRoutes(routes) // 动态添加可访问路由表
          store.commit('SET_ISADDROUTE', true)
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      } else {
        next()
      }
    } else {
      signIn(next)
    }
  }
})



export default router

export const loadView = (view) => { // 路由懒加载
  if (view.startsWith('/')) view = view.substring(1)
  return (resolve) => require([`@/views/${view}`], resolve)
}




