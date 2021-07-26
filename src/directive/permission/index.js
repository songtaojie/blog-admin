import store from '@/store'
const install = function (Vue) {
  Vue.directive('permission', {
    inserted(el, binding) {
      function hasPermission(value) {
        // 此处permission_btn代表vuex中储存的按钮菜单数据
        const list = store.getters.permission_btn
        for (const item of list) {
          if (item === value) {
            return true
          }
        }
        return false
      }
      if (!hasPermission(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
  )
}
export default install
