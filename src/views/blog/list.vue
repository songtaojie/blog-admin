<template>
  <div class="about p-2">
    <el-table :data="tableData" border>
      <el-table-column header-align="center" label="标题" prop="title"></el-table-column>
      <el-table-column align="center" header-align="center" label="浏览量" prop="readCount" width="65"></el-table-column>
      <el-table-column align="center" header-align="center" label="评论数" prop="cmtCount" width="65"></el-table-column>
      <el-table-column align="center" header-align="center" label="是否发布" prop="publish" width="100">
        <template slot-scope="scope">
          <el-switch active-value="Y" disabled inactive-value="N" v-model="scope.row.publish"></el-switch>
        </template>>
      </el-table-column>
      <el-table-column header-align="center" label="发布时间" prop="publishDate" width="165"></el-table-column>
      <el-table-column header-align="center" label="创建时间" prop="publishDate" width="165"></el-table-column>
      <!-- <el-table-column header-align="center" label="状态" prop="isEnabled" width="80">
        <template slot-scope="scope">
          <el-switch disabled v-model="scope.row.isEnabled"></el-switch>
        </template>
      </el-table-column>-->
      <el-table-column align="center" header-align="center" label="操作" width="200">
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
  </div>
</template>
<script>
import blogApi from '../../api/admin/blogmanage.js'
import { toHex } from '../../common'
export default {
  data() {
    return {
      tableData: [],
      totalCount: 0,
      queryParam: {
        PageIndex: 1,
        PageSize: 2,
        SortKey: '',
        SortType: 0
      }
    }
  },
  methods: {
    handleEdit(row) {
      var p = toHex({
        id: row.id,
        isMarkDown: row.isMarkDown
      }, true)
      this.$router.push({
        path: '/blog/edit',
        query: {
          p
        }
      })
    },
    handleDelete(row) {
      const that = this
      that.$confirm('确定要删除该文章?', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        blogApi.del(row.id)
        that.getList()
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
    getList() {
      var that = this
      blogApi.getPage(that.queryParam)
        .then(res => {
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
.about {
}
</style>
