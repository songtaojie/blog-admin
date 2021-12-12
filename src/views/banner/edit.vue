<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加首页横幅':'编辑首页横幅'" :visible.sync="visible" @open="onDrawerOpen" ref="drawer" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="标题:" prop="title">
          <el-input placeholder="请输入标题" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="图片:" prop="imgUrl">
          <el-upload
            :action="attachApi + '/api/attach/upload'"
            :headers="attachHeaders"
            :limit="1"
            :on-exceed="handlePictureExceed"
            :on-success="onAttachSuccess"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="网站链接:" prop="link">
          <el-input placeholder="请输入网站链接" required v-model="formData.link"></el-input>
        </el-form-item>
        <el-form-item label="跳转方式:" prop="target" v-if="!isEmpty(formData.link)">
          <el-select placeholder="请选择跳转方式" v-model="formData.target">
            <el-option label="_blank" value="_blank"></el-option>
            <el-option label="_self" value="_self"></el-option>
            <el-option label="_parent" value="_parent"></el-option>
            <el-option label="_top" value="_top"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号:" prop="orderSort">
          <el-input placeholder="请输入序号" type="number" v-model.number="formData.orderSort"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:" prop="isEnabled">
          <el-switch v-model="formData.isEnabled"></el-switch>
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
import { isEmpty } from '../../common/index'
import { bannerApi } from '../../api/admin/adminapi'
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
        Authorization: `${TOKEN_TYPE} ${this.$store.state.auth.token}`
      }, // 上传的头信息
      formData: {
        id: '',
        title: '',
        imgUrl: '',
        link: '',
        target: '',
        orderSort: 0,
        isEnabled: true
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传首页横幅图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    isEmpty,
    onSubmit() {
      var that = this
      if (isEmpty(that.id)) {
        that.loading = true
        bannerApi.add(that.formData)
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
        bannerApi.update(that.formData)
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
      this.$refs.drawer.closeDrawer()
    },
    getDetail(id) {
      var that = this
      bannerApi.getDetail(id)
        .then(res => {
          that.formData = res.data
        })
    },
    onBeforeClose() {
      this.$emit('update:visible', false)
    },
    onDrawerOpen() {
      var that = this
      if (!isEmpty(that.id)) {
        that.getDetail(that.id)
      } else if (that.$refs.ruleForm) {
        that.$refs.ruleForm.resetFields()
        that.formData.imgUrl = ''
      }
    },
    onSaveSuccess() {
      this.$emit('success')
    },
    onAttachSuccess(response) {
      var that = this
      if (response && response.successed) {
        that.formData.imgUrl = response.url
      } else {
        that.$message({
          message: response.message,
          type: 'error'
        })
      }
    },
    handlePictureExceed() {
      this.$message({
        message: '最多上传一个图片',
        type: 'warning'
      })
    }
  },
  computed: {
    isAdd() {
      return isEmpty(this.id)
    },
    attachData() {
      var attachData = {
        path: 'banner/'
      }
      if (!isEmpty(this.formData.title)) attachData.fileName = this.formData.title
      return attachData
    },
    showdrawer() {
      return this.visible
    }
  }
}
</script>
<style lang="scss">
#module-sidebar {
  .form-row {
    align-items: center;
  }
}
</style>
