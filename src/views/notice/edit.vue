<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加通知公告':'编辑通知公告'" :visible.sync="visible" @open="onDrawerOpen" ref="drawer" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="通知内容" prop="content">
          <el-input :rows="2" placeholder="请输入通知公告内容" type="textarea" v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="链接:" prop="link">
          <el-input placeholder="请输入跳转链接" required v-model="formData.link"></el-input>
        </el-form-item>
        <el-form-item label="跳转方式:" prop="target" v-if="!isEmpty(formData.link)">
          <el-select placeholder="请选择跳转方式" v-model="formData.target">
            <el-option label="_Blank" value="_Blank"></el-option>
            <el-option label="_Self" value="_Self"></el-option>
            <el-option label="_Parent" value="_Parent"></el-option>
            <el-option label="_Top" value="_Top"></el-option>
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
import { noticeApi } from '../../api/admin/adminapi'
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
        content: [
          { required: true, message: '请输入通知内容', trigger: 'blur' }
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
        noticeApi.add(that.formData)
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
        noticeApi.update(that.formData)
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
      noticeApi.getDetail(id)
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
