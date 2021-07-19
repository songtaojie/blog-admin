<template>
  <el-aside :style="isMiniLayout ?'width: 3.75rem;':'width: 14rem;'" class="hx-aside">
    <div class="hx-brand">
      <div class="hx-brand-logo">
        <!-- <a class="hx-brand-link" href="/">海·星の博客</a> -->
      </div>
      <button @click="doSwitchMenu" class="hx-brand-toggler hx-thin-toggler" type="button">
        <span class="hx-brand-toggler-icon"></span>
      </button>
    </div>
    <el-scrollbar class="hx-aside-scrollbar" wrap-class>
      <el-menu
        :collapse="isMiniLayout"
        :default-active="$route.path"
        :unique-opened="!multiExpand"
        active-text-color="#ffd04b"
        background-color="#3b3e47"
        class="hx-menu"
        router
        text-color="#fff"
      >
        <side-menu-item :base-path="route.path" :item="route" :key="index" v-for="(route, index) of menus"></side-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
// import routes from './multi-routes'
// import collapse from './collapse.js'
import { isEmptyObject } from '@/common'
import path from 'path'
import SideMenuItem from './side-menu-item'
export default {
  name: 'slider-menu',
  components: { SideMenuItem },
  props: {
    menus: { // 路由菜单
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    multiExpand: {
      type: Boolean,
      default: false
    }, // 多个子菜单是否可以同时展开，true是允许展开，false是不允许
    isMini: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMiniLayout: this.isMini,
      lastMenuOpenedIdx: -1,
      lastMiniMenuOpenedIdx: -1,
      routes: this.menus
    }
  },

  currentActived: null,
  methods: {
    doSwitchMenu() {
      this.isMiniLayout = !this.isMiniLayout
      this.$emit('switch-menu', this.isMiniLayout)
    },
    onNavClick(route, child) {
      const that = this
      let title = route.meta.title
      if (!isEmptyObject(child)) {
        title = child.meta.title
      }
      that.$store.commit('set_title', title)
    },
    popoverHide: function (id, idx) {
      this.$root.$emit('bv::hide::popover', id)
      if (this.lastMiniMenuOpenedIdx >= 0) {
        this.$set(this.isMiniMenuOpen, this.lastMiniMenuOpenedIdx, false)
      }
      this.$set(this.isMiniMenuOpen, idx, true)
      this.lastMiniMenuOpenedIdx = idx
    },
    pathJoin: function (...p) {
      return path.join(...p)
    }
  }
}
</script>
