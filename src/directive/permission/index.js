import store from '@/store'
import { isEmpty } from '../../common'
const install = function (Vue) {
  Vue.directive('permission', {
    inserted(el, binding) {
      function hasPermission(value) {
        if (isEmpty(value)) return false
        // 此处permission_btn代表vuex中储存的按钮菜单数据
        const list = store.getters.permission_Buttons || []
        var index = list.findIndex(r => r.toLocaleLowerCase() === value.toLocaleLowerCase())
        if (index >= 0) return true
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
