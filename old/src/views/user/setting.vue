<template>
  <div class="p-4 h-100">
    <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="90px" ref="ruleForm" width="50%">
      <el-form-item label="用户名称:" prop="userName">
        <el-input autocomplete="off" disabled placeholder="请输入用户名" v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input autocomplete="off" disabled placeholder="请输入邮箱" v-model="formData.email"></el-input>
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
      <el-form-item label="默认编辑器:" prop="useMdEdit">
        <el-switch active-text="Md编辑器" active-value="Y" inactive-text="富文本编辑器" inactive-value="N" v-model="formData.useMdEdit"></el-switch>
      </el-form-item>
    </el-form>
    <div>
      <el-button :loading="loading" @click="onSubmit" class="flex-fill" type="primary">{{ loading ? '提交中 ...' : '保存' }}</el-button>
    </div>
  </div>
</template>

<script>
import { isEmpty } from '../../common/index'
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
    return {
      loading: false,
      attachApi: process.env.VUE_APP_ATTACH_API,
      attachHeaders: {
        Authorization: `${TOKEN_TYPE} ${this.$store.state.auth.access_token}`
      }, // 上传的头信息
      fileList: [],
      imgDialogVisible: false,
      dialogImageUrl: '',
      formData: {
        id: '',
        userName: '',
        email: '',
        passWord: '',
        nickName: '',
        avatarUrl: '',
        lock: false,
        useMdEdit: 'N'
      },
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    isEmpty,
    onSubmit() {
      var that = this
      that.loading = true
      var user = that.$store.getters.user
      userApi.updateMyInfo(that.formData)
        .then(() => {
          // 更新完信息后，更新本地缓存中数据
          that.$store.commit('UPDATE_USER', {
            userId: user.userId,
            userName: user.userName,
            nickName: that.formData.nickName,
            avatarUrl: that.formData.avatarUrl,
            isUseMdEdit: that.formData.useMdEdit === 'Y'
          })
          that.loading = false
        })
        .catch(() => {
          that.loading = false
        })
    },
    getDetail() {
      var that = this
      userApi.getCurrentUserInfo()
        .then(res => {
          that.formData = res.data
          if (!isEmpty(that.formData.avatarUrl)) {
            that.fileList.push({ url: that.formData.avatarUrl })
          }
        })
    },
    handleAvatarSuccess(res) {
      if (res && res.success === 1) {
        this.formData.avatarUrl = res.url
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
    }
  },
  created() {
    this.getDetail()
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
