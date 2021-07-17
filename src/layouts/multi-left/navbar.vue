<template>
  <el-header class="hx-navbar hx-fiexd-top">
    <el-dropdown @command="handleCommand" size="medium" trigger="click" type="primary">
      <el-button>
        设置 - {{nickName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" style="min-width: 8rem;">
        <el-dropdown-item command="/account/users">用户</el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
import userApi from '../../api/admin/user.js'
export default {
  name: 'layout-navbar',
  props: {
    theme: String,
    type: String,
    variant: String
  },
  data() {
    return {
      nickName: this.$store.getters.user.nickName,
      isLeftIcon: false
    }
  },
  computed: {},

  methods: {
    getChildrenRoutes(route) {
      // console.log(route)
      for (const r of this.$router.options.routes) {
        if (r.name === route.name && r.path === route.path) {
          return r.children
        }
      }
      return []
    },
    handleCommand(command) {
      if (command === 'logout') {
        userApi.
          this.$message(`click on item ${command}`)
      }
    }

  }
}
</script>

<style scoped>
.divider {
  padding-left: 0.75rem;
  border-left: #ffffff solid 1px;
}
</style>