<template>
  <div class="p-2 text-left">
    <el-button @click="handleAdd" class="mb-2" v-permission="roleCode.add">添加</el-button>
    <el-table :data="tableData" border>
      <el-table-column header-align="center" label="角色名" prop="name" width="120"></el-table-column>
      <el-table-column header-align="center" label="角色Code" prop="code" width="200"></el-table-column>
      <el-table-column header-align="center" label="说明" prop="description"></el-table-column>
      <el-table-column header-align="center" label="创建者" prop="creater" width="120"></el-table-column>
      <el-table-column header-align="center" label="创建时间" prop="createTime" width="180"></el-table-column>
      <el-table-column align="center" header-align="center" label="状态" prop="isEnabled" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isEnabled?'success':'danger'" disable-transitions>{{scope.row.isEnabled ? "正常":"禁用"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="showDialog(scope.row)" size="mini" v-permission="roleCode.assign">配置权限</el-button>
          <el-button @click="handleEdit(scope.row)" size="mini" v-if="!EnabledIDS4" v-permission="roleCode.edit">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger" v-if="!EnabledIDS4" v-permission="roleCode.del">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="d-flex justify-content-end align-items-center">
      <el-pagination
        :current-page.sync="queryParam.PageIndex"
        :page-size="queryParam.PageSize"
        :total="totalCount"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </div>

    <!-- 配置权限的dialog -->
    <el-dialog :visible.sync="dialogVisible" title="分配权限" width="40%">
      <el-form :model="formData" label-width="85px">
        <el-form-item label="菜单权限" prop="menuIds">
          <el-tree :data.sync="menuTreeList" :props="menuTreeProps" check-strictly empty-text="加载中，请稍后" node-key="id" ref="menuTree" show-checkbox />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="assignPermission" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <role-edit :id="id" :visible.sync="showDrawer" @success="handleSuccess"></role-edit>
  </div>
</template>
<script>
import roleApi from '../../api/admin/role.js'
import permissionApi from '../../api/admin/permission.js'
import RoleEdit from './edit.vue'
import { EnabledIDS4 } from '../../common/constkey'
import { role } from '../../common/permissionCode'
import { isArray } from '../../common/index'
export default {
  components: {
    RoleEdit
  },
  data() {
    return {
      EnabledIDS4,
      roleCode: role,
      superAdminCode: 'SuperAdmin',
      tableData: [],
      isLoading: false,
      totalCount: 0,
      showDrawer: false,
      id: '',
      dialogVisible: false,
      menuTreeList: [],
      menuTreeProps: {
        checkStrictly: true,
        label: 'name',
        value: 'id'
      },
      formData: {
        roleId: '',
        code: '',
        menuIds: []
      },
      queryParam: {
        PageIndex: 1,
        PageSize: 2,
        SortKey: '',
        SortType: 0
      }
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
        roleApi.del(row.id).then(() => {
          that.getList()
        })
      })
    },
    handleCurrentChange(val) {
      this.queryParam.PageIndex = val
      this.getList()
    },
    handleSizeChange(val) {
      this.queryParam.PageSize = val
      this.getList()
    },
    handleSuccess() {
      this.getList()
    },
    getList() {
      var that = this
      roleApi.getPage(that.queryParam)
        .then((res) => {
          that.totalCount = res.data.totalCount
          that.tableData = res.data.items
        })
    },
    showDialog(row) {
      var that = this
      roleApi.GetPermissions(row.id)
        .then(res => {
          that.changeMenuTreeData(res.data)
        })
      that.dialogVisible = true
      that.formData.code = row.code
      that.formData.roleId = row.id
      window.menuTree = this.$refs.menuTree
    },
    initRoleMenu() {
      permissionApi.getUserMenuTree()
        .then(res => {
          this.menuTreeList = res.data
        })
    },
    changeMenuTreeData(checkIds) {
      var menuTreeList = [...this.menuTreeList]
      if (this.formData.code === this.superAdminCode) {
        this.setDsiabledCheck(menuTreeList, true)
      } else {
        this.setDsiabledCheck(menuTreeList, false)
      }
      this.menuTreeList = menuTreeList
      if (isArray(checkIds)) {
        this.$refs.menuTree.setCheckedKeys(checkIds)
      }
    },
    setDsiabledCheck(menuTreeList, disabled) {
      if (menuTreeList && menuTreeList.length > 0) {
        menuTreeList.forEach(m => {
          m.disabled = disabled
          if (m.children && m.children.length > 0) {
            this.setDsiabledCheck(m.children, disabled)
          }
        })
      }
    },
    assignPermission() {
      var that = this
      that.formData.menuIds = that.$refs.menuTree.getCheckedKeys()
      roleApi.AssignPermission(that.formData)
        .then((res) => {
          if (res.succeeded) {
            that.dialogVisible = false
            that.getList()
          }
        })
    }
  },
  created() {
    this.getList()
    this.initRoleMenu()
  }
}
</script>

<style scoped>
</style>
