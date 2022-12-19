<template>
  <div class="p-2 text-left">
    <el-button @click="handleAdd" class="mb-2" v-if="!EnabledIDS4" v-permission="permission.add">添加</el-button>
    <el-table :data="tableData" border row-key="id">
      <el-table-column header-align="center" label="菜单编号" prop="code" width="160"></el-table-column>
      <el-table-column header-align="center" label="菜单/按钮名称" prop="name" width="120"></el-table-column>
      <el-table-column align="center" label="菜单类型" prop="type_V" width="100"></el-table-column>
      <el-table-column header-align="center" label="菜单路由" prop="path" width="120"></el-table-column>
      <el-table-column header-align="center" label="组件路径" prop="component" width="120"></el-table-column>
      <el-table-column header-align="center" label="请求接口" prop="routeUrl"></el-table-column>
      <el-table-column align="center" label="是否显示" prop="isHide" width="100">
        <template slot-scope="scope">{{scope.row.isHide?'隐藏':'显示'}}</template>
      </el-table-column>
      <el-table-column align="center" label="图标" prop="icon" width="60">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Keepalive" prop="iskeepAlive" width="90">
        <template slot-scope="scope">{{scope.row.iskeepAlive?'是':'否'}}</template>
      </el-table-column>
      <el-table-column header-align="center" label="状态" prop="isEnabled" width="80">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isEnabled">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini" v-permission="permission.edit">编辑</el-button>
          <el-button :disabled="scope.row.isSystem" @click="handleDelete(scope.row)" size="mini" type="danger" v-permission="permission.del">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <permission-edit :id="id" :visible.sync="showDrawer" @success="handleSuccess"></permission-edit>
  </div>
</template>
<script>
import permissionApi from '../../api/admin/permission.js'
import PermissionEdit from './edit.vue'
import { permission } from '../../common/permissionCode'
import { EnabledIDS4 } from '../../common/constkey'
export default {
  components: {
    PermissionEdit
  },
  data() {
    return {
      EnabledIDS4,
      excludeCode: ['menu'],
      permission,
      tableData: [],
      isLoading: false,
      totalCount: 0,
      showDrawer: false,
      id: ''
    }
  },
  methods: {
    oncloseDrawer() {
      this.drawer = false
    },
    handleAdd() {
      this.id = ''
      this.showDrawer = true
    },
    handleEdit(row) {
      this.id = row.id
      this.showDrawer = true
    },
    handleDelete(row) {
      const that = this
      that.$confirm('确定要删除该文章?', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        permissionApi.del(row.id).then(() => {
          that.getList()
        })
      })
    },
    handleSuccess() {
      this.oncloseDrawer()
      this.getList()
    },
    getList() {
      var that = this
      permissionApi.getList()
        .then((res) => {
          that.tableData = res.data
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
.about {
}
</style>
