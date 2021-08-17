<template>
  <div class="p-2 text-left">
    <el-table :data="tableData" border>
      <el-table-column header-align="center" label="请求Url" prop="url" width="180"></el-table-column>
      <el-table-column header-align="center" label="请求方式" prop="httpMethod" width="80"></el-table-column>
      <el-table-column header-align="center" label="请求参数" prop="param"></el-table-column>
      <el-table-column header-align="center" label="返回结果" prop="result" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="耗时(毫秒)" prop="elapsedTime" width="65"></el-table-column>
      <el-table-column header-align="center" label="操作时间" prop="operateTime" width="165"></el-table-column>
      <el-table-column header-align="center" label="操作人" prop="operater" width="120"></el-table-column>
      <el-table-column align="center" header-align="center" label="执行成功" prop="isEnabled" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.success?'success':'danger'" disable-transitions>{{scope.row.success ? "成功":"失败"}}</el-tag>
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
import operatelogApi from '../../api/admin/operatelog.js'
export default {
  data() {
    return {
      tableData: [],
      isLoading: false,
      totalCount: 0,
      queryParam: {
        PageIndex: 1,
        PageSize: 10,
        SortKey: '',
        SortType: 0
      }
    }
  },
  methods: {
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
      operatelogApi.getPage(that.queryParam)
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
