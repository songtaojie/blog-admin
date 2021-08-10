<template>
  <el-drawer :before-close="onBeforeClose" :title="isAdd?'添加角色':'编辑角色'" :visible.sync="visible" @open="onDrawerOpen" ref="drawerRef" size="35%">
    <div class="d-flex flex-column p-4 h-100">
      <el-form :model="formData" :rules="rules" @submit.stop.prevent="onSubmit" class="flex-fill" label-width="85px" ref="ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-input autocomplete="off" placeholder="请输入角色名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色Code:" prop="code">
          <el-input placeholder="请输入角色Code" required v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="描述说明:" prop="description">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述说明" type="textarea" v-model="formData.description"></el-input>
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
import roleApi from '../../api/admin/role.js'
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
      superAdminCode: 'SuperAdmin',
      formData: {
        id: '',
        name: '',
        code: '',
        description: '',
        orderSort: 0,
        isEnabled: true
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      if (isEmpty(that.id)) {
        that.loading = true
        roleApi.add(that.formData)
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
        roleApi.update(that.formData)
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
      roleApi.getDetail(id)
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
    }
  },
  created() {
  }
}
</script>
<style lang="scss">
</style>
