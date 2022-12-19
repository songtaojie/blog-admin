<template>
  <div class="p-2 text-left">
    <el-button @click="handleAdd" class="mb-2">添加</el-button>
    <el-table :data="tableData" border>
      <el-table-column header-align="center" label="标签名字" prop="name"></el-table-column>
      <el-table-column align="center" label="预览" prop="bGColor" width="150">
        <template slot-scope="scope">
          <span :style="{ 'background-color': scope.row.bgColor}" class="tag">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" prop="orderSort" width="80"></el-table-column>
      <el-table-column align="center" label="状态" prop="isEnabled" width="80">
        <template slot-scope="scope">
          <el-switch disabled v-model="scope.row.isEnabled"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
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
    <tag-edit :id="id" :visible.sync="showDrawer" @success="handleSuccess"></tag-edit>
  </div>
</template>
<script>
import { isEmpty } from '../../../common/index'
import blogApi from '../../../api/admin/blogmanage'
import TagEdit from './edit.vue'
export default {
  components: {
    TagEdit
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
    isEmpty,
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
      that.$confirm('确定要删除该友情链接?', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        blogApi.delTag(row.id).then(() => {
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
      blogApi.getTagPage(that.queryParam)
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
.about {
}
.tag {
  display: block;
  margin: auto;
  color: #ffffff;
  border-radius: 10px;
  margin: 5px auto;
  padding: 3px 9px;
}
</style>
