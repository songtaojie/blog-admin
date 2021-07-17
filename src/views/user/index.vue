<template>
  <div class="p-2 text-left">
    <el-button @click="handleAdd" class="mb-2">添加</el-button>
    <el-table :data="tableData" border>
      <el-table-column header-align="center" label="用户名" prop="userName" width="120"></el-table-column>
      <el-table-column header-align="center" label="昵称" prop="nickName" width="180"></el-table-column>
      <el-table-column header-align="center" label="邮箱" prop="email" width="120"></el-table-column>
      <el-table-column header-align="center" label="角色" prop="role"></el-table-column>
      <el-table-column header-align="center" label="注册时间" prop="registerTime" width="180"></el-table-column>
      <el-table-column header-align="center" label="上次登陆ip" prop="loginIp" width="120"></el-table-column>
      <el-table-column header-align="center" label="上次登陆时间" prop="lastLoginTime" width="180"></el-table-column>
      <el-table-column align="center" header-align="center" label="状态" prop="isLock" width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isLock?'danger':'success'" disable-transitions>{{scope.row.isLock ?"锁定": "正常"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <el-button @click="showRoleDialog(scope.row)" size="mini">配置角色</el-button>
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger">删除</el-button>
          <el-button @click="showPwdDialog(scope.row)" size="mini">修改密码</el-button>
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
    <user-edit :id="editId" :visible.sync="showDrawer" @success="handleSuccess"></user-edit>
    <!-- 修改密码的dialog -->
    <el-dialog :visible.sync="pwdDialogVisible" title="修改密码" width="40%">
      <el-form :model="formData" :rules="rules" label-width="85px">
        <el-form-item label="新密码" prop="newPassWord">
          <el-input autocomplete="off" placeholder="请输入新密码" v-model="formData.newPassWord">
            <div slot="suffix">
              <el-tooltip placement="top">
                <div slot="content">
                  <div>*只允许输入字母、数字、符号</div>
                  <div>*至少输入6位，最多输入16位</div>
                  <div>*密码必须包含数字、大小写字母、和一个特殊符号</div>
                </div>
                <i class="el-input__icon el-icon-question" />
              </el-tooltip>
            </div>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="pwdDialogVisible = false">取 消</el-button>
        <el-button @click="changePwd" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的dialog -->
    <el-dialog :visible.sync="roleDialogVisible" title="分配角色" width="40%">
      <el-form :model="formData" :rules="rules" label-width="85px">
        <el-form-item label="角色" prop="newPassWord">
          <el-select multiple placeholder="请选择角色" style="width:100%" v-model="formData.roldIds">
            <el-option :key="item.id" :label="item.label" :value="item.value" text-field="name" v-for="item in roleList" value-field="id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button @click="changePwd" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { isEmpty } from '../../common/index'
import userApi from '../../api/admin/user.js'
import roleApi from '../../api/admin/role.js'
import UserEdit from './edit.vue'
export default {
  components: {
    UserEdit
  },
  data() {
    var validatePass = (rule, value, callback) => {
      var regular = /^.*(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?]).{6,16}/
      if (isEmpty(value)) {
        callback(new Error('请输入密码'))
      } else if (!regular.test(value)) {
        callback(new Error('密码必须包含数字、大小写字母、和一个特殊符号,且长度为6~16！'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      isLoading: false,
      totalCount: 0,
      showDrawer: false,
      editId: '',
      pwdDialogVisible: false,
      roleDialogVisible: false,
      queryParam: {
        PageIndex: 1,
        PageSize: 2,
        SortKey: '',
        SortType: 0
      },
      formData: {
        newPassWord: '',
        roldIds: []
      },
      roleList: [],
      rules: {
        newPassWord: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    oncloseDrawer() {
      this.drawer = false
    },
    handleAdd() {
      this.editId = ''
      this.showDrawer = true
    },
    handleEdit(row) {
      this.editId = row.id
      this.showDrawer = true
    },
    handleDelete(row) {
      const that = this
      that.$confirm('确定要删除该用户?', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        userApi.del(row.id).then(() => {
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
      userApi.getPage(that.queryParam)
        .then((res) => {
          that.totalCount = res.data.totalCount
          that.tableData = res.data.items
        })
    },
    getRoleList() {
      var that = this
      roleApi.getList().then(res => {
        debugger
        that.roleList = res.data
      })
    },
    changePwd() {
      var that = this
      userApi.changePwd(that.formData)
    },
    showPwdDialog(row) {
      this.pwdDialogVisible = true
      this.editId = row.id
    },
    showRoleDialog(row) {
      this.roleDialogVisible = true
      this.editId = row.id
    }
  },
  created() {
    this.getList()
    this.getRoleList()
  }
}
</script>

<style scoped>
</style>
