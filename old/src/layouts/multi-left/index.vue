<template>
  <el-container :class="isMiniLayout?'hx-aside-mini':''">
    <slider-menu :menus="menus" :multiExpand="multiExpand" @switch-menu="doSwitchMenu" />
    <el-container class="hx-body">
      <layout-navbar />
      <el-main>
        <layout-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SliderMenu from './slide-menu'
import LayoutMain from './main'
import LayoutNavbar from './navbar'
import { mapGetters } from 'vuex'
export default {
  name: 'multi-left-layout',
  props: {
    theme: String
  },
  data() {
    // var menus = this.$store.getters.permission.routers
    return {
      // menus: menus,
      multiExpand: true,
      isMiniLayout: false
    }
  },
  methods: {
    doSwitchMenu(isMini) {
      this.isMiniLayout = isMini
    }
  },
  computed: {
    ...mapGetters({
      menus: 'permission_Routers'
    })
  },
  components: {
    SliderMenu,
    LayoutMain,
    LayoutNavbar
  }
}
</script>


<style lang="scss">
@import "../scss/dark-blue";
</style>
