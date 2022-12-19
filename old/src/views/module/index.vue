<template>
  <div class="p-2 text-left">
    <el-button @click="handleAdd" class="mb-2">添加</el-button>
    <el-button @click="syncInterface" class="mb-2">同步接口</el-button>
    <el-table :data="tableData" border>
      <el-table-column header-align="center" label="接口名称" prop="name" width="220"></el-table-column>
      <el-table-column header-align="center" label="接口地址" prop="routeUrl" width="200"></el-table-column>
      <el-table-column header-align="center" label="描述" prop="description"></el-table-column>
      <el-table-column header-align="center" label="创建者" prop="creater" width="120"></el-table-column>
      <el-table-column header-align="center" label="创建时间" prop="createTime" width="180"></el-table-column>
      <el-table-column header-align="center" label="状态" prop="isEnabled" width="80">
        <template slot-scope="scope">
          <el-switch disabled v-model="scope.row.isEnabled"></el-switch>
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
    <module-edit :id="id" :visible.sync="showDrawer" @success="handleSuccess"></module-edit>
  </div>
</template>
<script>
import moduleApi from '../../api/admin/module'
import ModuleEdit from './edit.vue'
export default {
  components: {
    ModuleEdit
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
        PageSize: 10,
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
      that.$confirm('确定要删除该接口?', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        moduleApi.del(row.id).then(() => {
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
      moduleApi.getPage(that.queryParam)
        .then((res) => {
          that.totalCount = res.data.totalCount
          that.tableData = res.data.items
        })
    },
    syncInterface() {
      var that = this
      moduleApi.syncInterface()
        .then(() => {
          that.$message.success('同步成功')
          that.getList()
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
