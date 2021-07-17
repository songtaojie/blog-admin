<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加用户':'编辑用户'" :visible.sync="visible" @open="onDrawerOpen" ref="drawerRef" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="用户名称:" prop="userName">
          <el-input :disabled="!isAdd" autocomplete="off" placeholder="请输入用户名" v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input :disabled="!isAdd" autocomplete="off" placeholder="请输入邮箱" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="passWord" v-if="isAdd">
          <el-input placeholder="请输入密码" required show-password type="password" v-model="formData.passWord">
            <div slot="prefix">
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
        <el-form-item label="昵称:" prop="nickName">
          <el-input placeholder="请输入昵称" v-model="formData.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户头像:" prop="avatarUrl">
          <el-upload
            :action="attachApi + '/api/attach/upload'"
            :before-upload="beforeAvatarUpload"
            :class="{hideUpload:!isEmpty(formData.avatarUrl)}"
            :file-list="fileList"
            :headers="attachHeaders"
            :limit="1"
            :on-success="handleAvatarSuccess"
            list-type="picture-card"
            ref="uploadRef"
          >
            <i class="el-icon-plus"></i>
            <!-- <img :src="formData.avatarUrl" class="avatar" v-if="formData.avatarUrl" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>-->
            <div slot="file" slot-scope="{file}">
              <img :src="file.url" alt class="el-upload-list__item-thumbnail" />
              <span class="el-upload-list__item-actions">
                <span @click="handlePictureCardPreview(file)" class="el-upload-list__item-preview">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span @click="handlePictureRemove(file)" class="el-upload-list__item-delete">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible">
            <img :src="dialogImageUrl" alt width="100%" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="是否锁定:" prop="lock">
          <el-switch active-value="Y" inactive-value="N" v-model="formData.lock"></el-switch>
        </el-form-item>
      </el-form>
      <div class="d-flex">
        <el-button @click="onCancle" class="flex-fill">取 消</el-button>
        <el-button :loading="loading" @click="onSubmit" class="flex-fill" type="primary">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { isEmpty, isEmptyObject } from '../../common/index'
import userApi from '../../api/admin/user.js'
import { TOKEN_TYPE } from '../../common/constkey'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    var that = this
    var validateUserName = (rule, value, callback) => {
      that.remoteRule('checkUserName', rule.field, value, callback)
    }
    var validateEmail = (rule, value, callback) => {
      that.remoteRule('checkEmail', rule.field, value, callback)
    }
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
      loading: false,
      superAdminCode: 'SuperAdmin',
      attachApi: process.env.VUE_APP_ATTACH_API,
      attachHeaders: {
        Authorization: `${TOKEN_TYPE} ${this.$store.state.auth.access_token}`
      }, // 上传的头信息
      fileList: [],
      imgDialogVisible: false,
      dialogImageUrl: '',
      remoteRuleCache: [], // 缓存远程验证规则
      formData: {
        id: '',
        userName: '',
        email: '',
        passWord: '',
        nickName: '',
        avatarUrl: '',
        lock: false
      },
      menuTreeProps: {
        checkStrictly: false,
        label: 'name',
        value: 'id'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateUserName, trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    isEmpty,
    onSubmit() {
      var that = this
      if (that.isAdd) {
        that.loading = true
        userApi.add(that.formData)
          .then(() => {
            that.loading = false
            that.onSaveSuccess()
            that.onCancle()
          })
          .catch(() => {
            that.loading = false
          })
      } else {
        that.loading = true
        userApi.update(that.formData)
          .then(() => {
            that.loading = false
            that.onSaveSuccess()
            that.onCancle()
          })
          .catch(() => {
            that.loading = false
          })
      }
    },
    onCancle() {
      this.$refs.drawerRef.closeDrawer()
    },
    getDetail(id) {
      var that = this
      userApi.getDetail(id)
        .then(res => {
          that.formData = res.data
          if (!isEmpty(that.formData.avatarUrl)) {
            that.fileList.push({ url: that.formData.avatarUrl })
          }
        })
    },
    onBeforeClose() {
      this.fileList = []
      this.$emit('update:visible', false)
    },
    onDrawerOpen() {
      if (this.isAdd) {
        if (this.$refs.ruleForm) this.$refs.ruleForm.resetFields()
      } else {
        this.getDetail(this.id)
      }
    },
    onSaveSuccess() {
      this.$emit('success')
    },
    handleAvatarSuccess(res) {
      if (res && res.succeeded) {
        this.formData.avatarUrl = res.data.url
      }
    },
    beforeAvatarUpload(file) {
      const allowImages = ['image/jpeg', 'image/png', ' image/jpg']
      const isJPG = allowImages.indexOf(file.type) >= 0
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('请上传图片!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 图片上传穿
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    handlePictureRemove() {
      this.formData.avatarUrl = ''
      this.$refs.uploadRef.clearFiles()
    },
    remoteRule(method, field, value, callback) {
      var that = this
      if (!that.remoteRuleCache.hasOwnProperty(field)) that.remoteRuleCache[field] = []
      var cacheArray = that.remoteRuleCache[field]
      var cacheValue = cacheArray.find(r => r.value === value)
      if (!isEmptyObject(cacheValue)) {
        if (cacheValue.valid) {
          callback()
        } else {
          callback(cacheValue.message)
        }
      } else {
        userApi[method](value).then(() => {
          that.remoteRuleCache[field].push({
            value: value,
            valid: true
          })
          callback()
        }).catch(e => {
          if (e.data && e.data.succeeded === false) {
            that.remoteRuleCache[field].push({
              value: value,
              valid: false,
              message: e.data.message
            })
            callback(e.data.message)
          }
        })
      }
    }
  },
  computed: {
    isAdd() {
      return isEmpty(this.id)
    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.hideUpload /deep/ .el-upload--picture-card {
  display: none; /* 上传按钮隐藏 */
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
