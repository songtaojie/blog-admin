<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加友情链接':'编辑友情链接'" :visible.sync="visible" @open="onDrawerOpen" ref="drawer" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="网站名称" prop="siteName">
          <el-input autocomplete="off" placeholder="请输入网站名称" v-model="formData.siteName"></el-input>
        </el-form-item>
        <el-form-item label="网站链接:" prop="link">
          <el-input placeholder="请输入网站链接" required v-model="formData.link"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="orderIndex">
          <el-input placeholder="请输入序号" type="number" v-model="formData.orderIndex"></el-input>
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
import adminapi from '../../api/admin/adminapi'
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
      formData: {
        id: '',
        name: '',
        routeUrl: '',
        controller: '',
        action: '',
        description: '',
        orderSort: '',
        isEnabled: true
      },
      rules: {
        siteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入网站链接', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      if (isEmpty(that.id)) {
        that.loading = true
        adminapi.friendLink.add(that.formData)
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
        adminapi.friendLink.update(that.formData)
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
      adminapi.friendLink.getDetail(id)
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
    }
  },
  computed: {
    isAdd() {
      return isEmpty(this.id)
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
