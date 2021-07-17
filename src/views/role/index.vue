<template>
  <div class="p-2 text-left">
    <el-button @click="handleAdd" class="mb-2">添加</el-button>
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
          <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger">删除</el-button>
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
    <role-edit :id="id" :visible.sync="showDrawer" @success="handleSuccess"></role-edit>
  </div>
</template>
<script>
import roleApi from '../../api/admin/role.js'
import RoleEdit from './edit.vue'
export default {
  components: {
    RoleEdit
  },
  data() {
    return {
      tableData: [],
      isLoading: false,
      totalCount: 0,
      showDrawer: false,
      id: '',
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
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
</style>
