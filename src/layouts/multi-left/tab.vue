<template>
  <div class="hx-tabs-fix bg-white pt-2" v-if="showTab">
    <el-tabs :closable="allTabs.length > 1" @tab-click="tabClick" @tab-remove="removeTab" type="card" v-model="activeIndex">
      <el-tab-pane :key="'tab-' + index" :name="item.route" class="hx-tabs" v-for="(item, index) in allTabs">
        <span slot="label">
          <i :class="item.icon" v-if="!isEmpty(item.icon)"></i>
          {{item.title}}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { isEmpty } from '@/common/index'
export default {
  name: 'layout-tab',
  props: {
    showTab: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    isEmpty,
    tabClick(tab) {
      this.$router.push({ path: tab.name })
    },
    removeTab(targetName) {
      debugger
      const that = this
      const allTabs = that.allTabs
      let activeName = that.activeIndex
      if (activeName === targetName) {
        allTabs.forEach((tab, index) => {
          if (tab.route === targetName) {
            const nextTab = allTabs[index + 1] || allTabs[index - 1]
            if (nextTab) {
              activeName = nextTab.route
            }
          }
        })
        that.activeIndex = activeName
        that.$router.push({ path: activeName })
      }
      that.$store.commit('delete_tabs', targetName)
    }
  },
  watch: {
    $route(to) {
      debugger
      const that = this
      const path = to.path
      let flag = false // 判断集合中是否已经存在该路由下的tab页，如果存在直接切换即可
      // allTabs记录当前页面中已存在的tab页
      for (var i = 0, len = that.allTabs.length; i < len; i++) {
        const tab = that.allTabs[i]
        if (!flag && tab.route === path) { // 用路由匹配，如果存在即将对应的tab页设置为active显示桌面前端
          flag = true
          that.activeIndex = tab.route
          break
        }
      }
      if (!flag) {
        const tab = { route: path, title: to.meta.title, icon: to.meta.icon }
        this.$store.commit('add_tabs', tab)
        that.activeIndex = tab.route
      }
    }
  },
  computed: {
    allTabs() {
      return this.$store.state.tab.options
    },
    // 动态设置及获取当前激活的tab页
    activeIndex: {
      get() {
        return this.$store.state.tab.activeIndex
      },
      set(val) {
        this.$store.commit('set_active_index', `${val}`)
      }
    }
  }
}
</script>


<style lang="scss" >
</style>