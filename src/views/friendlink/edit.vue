<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加友情链接':'编辑友情链接'" :visible.sync="visible" @open="onDrawerOpen" ref="drawer" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="网站名称" prop="siteName">
          <el-input autocomplete="off" placeholder="请输入网站名称" v-model="formData.siteName"></el-input>
        </el-form-item>
        <el-form-item label="网站code" prop="siteCode">
          <el-input autocomplete="off" placeholder="请输入网站Code" v-model="formData.siteCode"></el-input>
        </el-form-item>
        <el-form-item label="网站链接:" prop="link">
          <el-input placeholder="请输入网站链接" required v-model="formData.link"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="orderSort">
          <el-input placeholder="请输入序号" type="number" v-model="formData.orderSort"></el-input>
        </el-form-item>
        <el-form-item label="网站logo:" prop="logo">
          <el-upload :action="attachApi + '/api/attach/upload'" :data="attachData" :file-list="logoList" :limit="1" :on-success="onAttachSuccess">
            <el-button size="small" type="primary">上传logo</el-button>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
import { friendLinkApi } from '../../api/admin/adminapi'
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
      formData: {
        id: '',
        siteCode: '',
        siteName: '',
        link: '',
        orderSort: 0,
        logo: '',
        isEnabled: true
      },
      logoList: [
      ],
      rules: {
        siteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        siteCode: [
          { required: true, message: '请输入网站code', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      if (isEmpty(that.id)) {
        that.loading = true
        friendLinkApi.add(that.formData)
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
        friendLinkApi.update(that.formData)
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
      friendLinkApi.getDetail(id)
        .then(res => {
          that.formData = res.data
        })
    },
    onBeforeClose() {
      this.$emit('update:visible', false)
    },
    onDrawerOpen() {
      if (!isEmpty(this.id)) {
        this.getDetail(this.id)
      } else if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields()
      }
    },
    onSaveSuccess() {
      this.$emit('success')
    },
    onAttachSuccess(response, file, fileList) {
      var that = this
      if (response && response.success === 1) {
        that.logoList = fileList
        that.formData.logo = response.url
      } else {
        that.$message({
          message: response.message,
          type: 'error'
        })
      }
    }
  },
  computed: {
    isAdd() {
      return isEmpty(this.id)
    },
    attachData() {
      var attachData = {
        path: 'logo/'
      }
      if (!isEmpty(this.formData.siteCode)) attachData.fileName = this.formData.siteCode
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
